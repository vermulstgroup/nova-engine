---
summary: "CLI reference for `nova-engine voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
title: "voicecall"
---

# `nova-engine voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
nova-engine voicecall status --call-id <id>
nova-engine voicecall call --to "+15555550123" --message "Hello" --mode notify
nova-engine voicecall continue --call-id <id> --message "Any questions?"
nova-engine voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
nova-engine voicecall expose --mode serve
nova-engine voicecall expose --mode funnel
nova-engine voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.
