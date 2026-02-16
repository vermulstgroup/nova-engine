---
summary: "CLI reference for `nova-engine plugins` (list, install, uninstall, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
title: "plugins"
---

# `nova-engine plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:

- Plugin system: [Plugins](/tools/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
nova-engine plugins list
nova-engine plugins info <id>
nova-engine plugins enable <id>
nova-engine plugins disable <id>
nova-engine plugins uninstall <id>
nova-engine plugins doctor
nova-engine plugins update <id>
nova-engine plugins update --all
```

Bundled plugins ship with Nova Engine but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `nova-engine.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
nova-engine plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Npm specs are **registry-only** (package name + optional version/tag). Git/URL/file
specs are rejected. Dependency installs run with `--ignore-scripts` for safety.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
nova-engine plugins install -l ./my-plugin
```

### Uninstall

```bash
nova-engine plugins uninstall <id>
nova-engine plugins uninstall <id> --dry-run
nova-engine plugins uninstall <id> --keep-files
```

`uninstall` removes plugin records from `plugins.entries`, `plugins.installs`,
the plugin allowlist, and linked `plugins.load.paths` entries when applicable.
For active memory plugins, the memory slot resets to `memory-core`.

By default, uninstall also removes the plugin install directory under the active
state dir extensions root (`$NOVA_STATE_DIR/extensions/<id>`). Use
`--keep-files` to keep files on disk.

`--keep-config` is supported as a deprecated alias for `--keep-files`.

### Update

```bash
nova-engine plugins update <id>
nova-engine plugins update --all
nova-engine plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
