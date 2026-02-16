import { describe, expect, it } from "vitest";
import { resolveIrcInboundTarget } from "./monitor.js";

describe("irc monitor inbound target", () => {
  it("keeps channel target for group messages", () => {
    expect(
      resolveIrcInboundTarget({
        target: "#nova-engine",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: true,
      target: "#nova-engine",
      rawTarget: "#nova-engine",
    });
  });

  it("maps DM target to sender nick and preserves raw target", () => {
    expect(
      resolveIrcInboundTarget({
        target: "nova-engine-bot",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: false,
      target: "alice",
      rawTarget: "nova-engine-bot",
    });
  });

  it("falls back to raw target when sender nick is empty", () => {
    expect(
      resolveIrcInboundTarget({
        target: "nova-engine-bot",
        senderNick: " ",
      }),
    ).toEqual({
      isGroup: false,
      target: "nova-engine-bot",
      rawTarget: "nova-engine-bot",
    });
  });
});
