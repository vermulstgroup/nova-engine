---
summary: "CLI reference for `nova-engine reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `nova-engine reset`

Reset local config/state (keeps the CLI installed).

```bash
nova-engine reset
nova-engine reset --dry-run
nova-engine reset --scope config+creds+sessions --yes --non-interactive
```
