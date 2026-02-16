---
summary: "CLI reference for `nova-engine dns` (wide-area discovery helpers)"
read_when:
  - You want wide-area discovery (DNS-SD) via Tailscale + CoreDNS
  - You’re setting up split DNS for a custom discovery domain (example: nova-engine.internal)
title: "dns"
---

# `nova-engine dns`

DNS helpers for wide-area discovery (Tailscale + CoreDNS). Currently focused on macOS + Homebrew CoreDNS.

Related:

- Gateway discovery: [Discovery](/gateway/discovery)
- Wide-area discovery config: [Configuration](/gateway/configuration)

## Setup

```bash
nova-engine dns setup
nova-engine dns setup --apply
```
