---
summary: "CLI reference for `nova-engine agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
title: "agents"
---

# `nova-engine agents`

Manage isolated agents (workspaces + auth + routing).

Related:

- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
nova-engine agents list
nova-engine agents add work --workspace ~/.nova-engine/workspace-work
nova-engine agents set-identity --workspace ~/.nova-engine/workspace --from-identity
nova-engine agents set-identity --agent main --avatar avatars/nova-engine.png
nova-engine agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.nova-engine/workspace/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:

- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
nova-engine agents set-identity --workspace ~/.nova-engine/workspace --from-identity
```

Override fields explicitly:

```bash
nova-engine agents set-identity --agent main --name "Nova Engine" --emoji "🦞" --avatar avatars/nova-engine.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "Nova Engine",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/nova-engine.png",
        },
      },
    ],
  },
}
```
