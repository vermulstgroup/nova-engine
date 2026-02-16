---
summary: "CLI reference for `nova-engine config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
title: "config"
---

# `nova-engine config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `nova-engine configure`).

## Examples

```bash
nova-engine config get browser.executablePath
nova-engine config set browser.executablePath "/usr/bin/google-chrome"
nova-engine config set agents.defaults.heartbeat.every "2h"
nova-engine config set agents.list[0].tools.exec.node "node-id-or-name"
nova-engine config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
nova-engine config get agents.defaults.workspace
nova-engine config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
nova-engine config get agents.list
nova-engine config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
nova-engine config set agents.defaults.heartbeat.every "0m"
nova-engine config set gateway.port 19001 --json
nova-engine config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.
