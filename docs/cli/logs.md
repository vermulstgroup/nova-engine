---
summary: "CLI reference for `nova-engine logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `nova-engine logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
nova-engine logs
nova-engine logs --follow
nova-engine logs --json
nova-engine logs --limit 500
nova-engine logs --local-time
nova-engine logs --follow --local-time
```

Use `--local-time` to render timestamps in your local timezone.
