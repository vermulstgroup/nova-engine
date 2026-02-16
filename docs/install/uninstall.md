---
summary: "Uninstall Nova Engine completely (CLI, service, state, workspace)"
read_when:
  - You want to remove Nova Engine from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

# Uninstall

Two paths:

- **Easy path** if `nova-engine` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
nova-engine uninstall
```

Non-interactive (automation / npx):

```bash
nova-engine uninstall --all --yes --non-interactive
npx -y nova-engine uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
nova-engine gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
nova-engine gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${NOVA_STATE_DIR:-$HOME/.nova-engine}"
```

If you set `NOVA_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.nova-engine/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g nova-engine
pnpm remove -g nova-engine
bun remove -g nova-engine
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/Nova Engine.app
```

Notes:

- If you used profiles (`--profile` / `NOVA_PROFILE`), repeat step 3 for each state dir (defaults are `~/.nova-engine-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `nova-engine` is missing.

### macOS (launchd)

Default label is `bot.molt.gateway` (or `bot.molt.<profile>`; legacy `com.nova-engine.*` may still exist):

```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

If you used a profile, replace the label and plist name with `bot.molt.<profile>`. Remove any legacy `com.nova-engine.*` plists if present.

### Linux (systemd user unit)

Default unit name is `nova-engine-gateway.service` (or `nova-engine-gateway-<profile>.service`):

```bash
systemctl --user disable --now nova-engine-gateway.service
rm -f ~/.config/systemd/user/nova-engine-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `Nova Engine Gateway` (or `Nova Engine Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "Nova Engine Gateway"
Remove-Item -Force "$env:USERPROFILE\.nova-engine\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.nova-engine-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://nova-engine.ai/install.sh` or `install.ps1`, the CLI was installed with `npm install -g nova-engine@latest`.
Remove it with `npm rm -g nova-engine` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `nova-engine ...` / `bun run nova-engine ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.
