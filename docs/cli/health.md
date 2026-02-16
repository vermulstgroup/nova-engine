---
summary: "CLI reference for `nova-engine health` (gateway health endpoint via RPC)"
read_when:
  - You want to quickly check the running Gateway’s health
title: "health"
---

# `nova-engine health`

Fetch health from the running Gateway.

```bash
nova-engine health
nova-engine health --json
nova-engine health --verbose
```

Notes:

- `--verbose` runs live probes and prints per-account timings when multiple accounts are configured.
- Output includes per-agent session stores when multiple agents are configured.
