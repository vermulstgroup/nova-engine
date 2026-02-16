# Security Policy

If you believe you've found a security issue in Nova Engine, please report it privately.

## Reporting

Report vulnerabilities directly to the repository where the issue lives:

- **Core CLI and gateway** — [nova-engine/nova-engine](https://github.com/nova-engine/nova-engine)
- **macOS desktop app** — [nova-engine/nova-engine](https://github.com/nova-engine/nova-engine) (apps/macos)
- **iOS app** — [nova-engine/nova-engine](https://github.com/nova-engine/nova-engine) (apps/ios)
- **Android app** — [nova-engine/nova-engine](https://github.com/nova-engine/nova-engine) (apps/android)
- **ClawHub** — [nova-engine/clawhub](https://github.com/nova-engine/clawhub)
- **Trust and threat model** — [nova-engine/trust](https://github.com/nova-engine/trust)

For issues that don't fit a specific repo, or if you're unsure, email **security@nova-engine.ai** and we'll route it.

For full reporting instructions see our [Trust page](https://trust.nova-engine.ai).

### Required in Reports

1. **Title**
2. **Severity Assessment**
3. **Impact**
4. **Affected Component**
5. **Technical Reproduction**
6. **Demonstrated Impact**
7. **Environment**
8. **Remediation Advice**

Reports without reproduction steps, demonstrated impact, and remediation advice will be deprioritized. Given the volume of AI-generated scanner findings, we must ensure we're receiving vetted reports from researchers who understand the issues.

## Security & Trust

**Jamieson O'Reilly** ([@theonejvo](https://twitter.com/theonejvo)) is Security & Trust at Nova Engine. Jamieson is the founder of [Dvuln](https://dvuln.com) and brings extensive experience in offensive security, penetration testing, and security program development.

## Bug Bounties

Nova Engine is a labor of love. There is no bug bounty program and no budget for paid reports. Please still disclose responsibly so we can fix issues quickly.
The best way to help the project right now is by sending PRs.

## Maintainers: GHSA Updates via CLI

When patching a GHSA via `gh api`, include `X-GitHub-Api-Version: 2022-11-28` (or newer). Without it, some fields (notably CVSS) may not persist even if the request returns 200.

## Out of Scope

- Public Internet Exposure
- Using Nova Engine in ways that the docs recommend not to
- Prompt injection attacks

## Operational Guidance

For threat model + hardening guidance (including `nova-engine security audit --deep` and `--fix`), see:

- `https://docs.nova-engine.ai/gateway/security`

### Tool filesystem hardening

- `tools.exec.applyPatch.workspaceOnly: true` (recommended): keeps `apply_patch` writes/deletes within the configured workspace directory.
- `tools.fs.workspaceOnly: true` (optional): restricts `read`/`write`/`edit`/`apply_patch` paths to the workspace directory.
- Avoid setting `tools.exec.applyPatch.workspaceOnly: false` unless you fully trust who can trigger tool execution.

### Web Interface Safety

Nova Engine's web interface (Gateway Control UI + HTTP endpoints) is intended for **local use only**.

- Recommended: keep the Gateway **loopback-only** (`127.0.0.1` / `::1`).
  - Config: `gateway.bind="loopback"` (default).
  - CLI: `nova-engine gateway run --bind loopback`.
- Do **not** expose it to the public internet (no direct bind to `0.0.0.0`, no public reverse proxy). It is not hardened for public exposure.
- If you need remote access, prefer an SSH tunnel or Tailscale serve/funnel (so the Gateway still binds to loopback), plus strong Gateway auth.
- The Gateway HTTP surface includes the canvas host (`/__nova-engine__/canvas/`, `/__nova-engine__/a2ui/`). Treat canvas content as sensitive/untrusted and avoid exposing it beyond loopback unless you understand the risk.

## Runtime Requirements

### Node.js Version

Nova Engine requires **Node.js 22.12.0 or later** (LTS). This version includes important security patches:

- CVE-2025-59466: async_hooks DoS vulnerability
- CVE-2026-21636: Permission model bypass vulnerability

Verify your Node.js version:

```bash
node --version  # Should be v22.12.0 or later
```

### Docker Security

When running Nova Engine in Docker:

1. The official image runs as a non-root user (`node`) for reduced attack surface
2. Use `--read-only` flag when possible for additional filesystem protection
3. Limit container capabilities with `--cap-drop=ALL`

Example secure Docker run:

```bash
docker run --read-only --cap-drop=ALL \
  -v nova-engine-data:/app/data \
  nova-engine/nova-engine:latest
```

## Security Scanning

This project uses `detect-secrets` for automated secret detection in CI/CD.
See `.detect-secrets.cfg` for configuration and `.secrets.baseline` for the baseline.

Run locally:

```bash
pip install detect-secrets==1.5.0
detect-secrets scan --baseline .secrets.baseline
```
