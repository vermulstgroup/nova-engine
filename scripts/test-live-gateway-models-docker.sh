#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_NAME="${NOVA_IMAGE:-${CLAWDBOT_IMAGE:-nova-engine:local}}"
CONFIG_DIR="${NOVA_CONFIG_DIR:-${CLAWDBOT_CONFIG_DIR:-$HOME/.nova-engine}}"
WORKSPACE_DIR="${NOVA_WORKSPACE_DIR:-${CLAWDBOT_WORKSPACE_DIR:-$HOME/.nova-engine/workspace}}"
PROFILE_FILE="${NOVA_PROFILE_FILE:-${CLAWDBOT_PROFILE_FILE:-$HOME/.profile}}"

PROFILE_MOUNT=()
if [[ -f "$PROFILE_FILE" ]]; then
  PROFILE_MOUNT=(-v "$PROFILE_FILE":/home/node/.profile:ro)
fi

echo "==> Build image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME" -f "$ROOT_DIR/Dockerfile" "$ROOT_DIR"

echo "==> Run gateway live model tests (profile keys)"
docker run --rm -t \
  --entrypoint bash \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e HOME=/home/node \
  -e NODE_OPTIONS=--disable-warning=ExperimentalWarning \
  -e NOVA_LIVE_TEST=1 \
  -e NOVA_LIVE_GATEWAY_MODELS="${NOVA_LIVE_GATEWAY_MODELS:-${CLAWDBOT_LIVE_GATEWAY_MODELS:-all}}" \
  -e NOVA_LIVE_GATEWAY_PROVIDERS="${NOVA_LIVE_GATEWAY_PROVIDERS:-${CLAWDBOT_LIVE_GATEWAY_PROVIDERS:-}}" \
  -e NOVA_LIVE_GATEWAY_MODEL_TIMEOUT_MS="${NOVA_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-${CLAWDBOT_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-}}" \
  -v "$CONFIG_DIR":/home/node/.nova-engine \
  -v "$WORKSPACE_DIR":/home/node/.nova-engine/workspace \
  "${PROFILE_MOUNT[@]}" \
  "$IMAGE_NAME" \
  -lc "set -euo pipefail; [ -f \"$HOME/.profile\" ] && source \"$HOME/.profile\" || true; cd /app && pnpm test:live"
