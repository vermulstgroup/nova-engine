---
summary: "CLI reference for `nova-engine webhooks` (webhook helpers + Gmail Pub/Sub)"
read_when:
  - You want to wire Gmail Pub/Sub events into Nova Engine
  - You want webhook helper commands
title: "webhooks"
---

# `nova-engine webhooks`

Webhook helpers and integrations (Gmail Pub/Sub, webhook helpers).

Related:

- Webhooks: [Webhook](/automation/webhook)
- Gmail Pub/Sub: [Gmail Pub/Sub](/automation/gmail-pubsub)

## Gmail

```bash
nova-engine webhooks gmail setup --account you@example.com
nova-engine webhooks gmail run
```

See [Gmail Pub/Sub documentation](/automation/gmail-pubsub) for details.
