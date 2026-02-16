#!/usr/bin/env bash
set -euo pipefail

cd /repo

export NOVA_STATE_DIR="/tmp/openclaw-test"
export NOVA_CONFIG_PATH="${NOVA_STATE_DIR}/openclaw.json"

echo "==> Build"
pnpm build

echo "==> Seed state"
mkdir -p "${NOVA_STATE_DIR}/credentials"
mkdir -p "${NOVA_STATE_DIR}/agents/main/sessions"
echo '{}' >"${NOVA_CONFIG_PATH}"
echo 'creds' >"${NOVA_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${NOVA_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm openclaw reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${NOVA_CONFIG_PATH}"
test ! -d "${NOVA_STATE_DIR}/credentials"
test ! -d "${NOVA_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${NOVA_STATE_DIR}/credentials"
echo '{}' >"${NOVA_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm openclaw uninstall --state --yes --non-interactive

test ! -d "${NOVA_STATE_DIR}"

echo "OK"
