---
summary: "CLI reference for `nova-engine setup` (initialize config + workspace)"
read_when:
  - You’re doing first-run setup without the full onboarding wizard
  - You want to set the default workspace path
title: "setup"
---

# `nova-engine setup`

Initialize `~/.nova-engine/nova-engine.json` and the agent workspace.

Related:

- Getting started: [Getting started](/start/getting-started)
- Wizard: [Onboarding](/start/onboarding)

## Examples

```bash
nova-engine setup
nova-engine setup --workspace ~/.nova-engine/workspace
```

To run the wizard via setup:

```bash
nova-engine setup --wizard
```
