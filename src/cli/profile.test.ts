import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "nova-engine",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "nova-engine", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "nova-engine", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "nova-engine", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "nova-engine", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "nova-engine", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "nova-engine", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs(["node", "nova-engine", "--dev", "--profile", "work", "status"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs(["node", "nova-engine", "--profile", "work", "--dev", "status"]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join(path.resolve("/home/peter"), ".nova-engine-dev");
    expect(env.NOVA_PROFILE).toBe("dev");
    expect(env.NOVA_STATE_DIR).toBe(expectedStateDir);
    expect(env.NOVA_CONFIG_PATH).toBe(path.join(expectedStateDir, "nova-engine.json"));
    expect(env.NOVA_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      NOVA_STATE_DIR: "/custom",
      NOVA_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.NOVA_STATE_DIR).toBe("/custom");
    expect(env.NOVA_GATEWAY_PORT).toBe("19099");
    expect(env.NOVA_CONFIG_PATH).toBe(path.join("/custom", "nova-engine.json"));
  });

  it("uses NOVA_HOME when deriving profile state dir", () => {
    const env: Record<string, string | undefined> = {
      NOVA_HOME: "/srv/nova-engine-home",
      HOME: "/home/other",
    };
    applyCliProfileEnv({
      profile: "work",
      env,
      homedir: () => "/home/fallback",
    });

    const resolvedHome = path.resolve("/srv/nova-engine-home");
    expect(env.NOVA_STATE_DIR).toBe(path.join(resolvedHome, ".nova-engine-work"));
    expect(env.NOVA_CONFIG_PATH).toBe(
      path.join(resolvedHome, ".nova-engine-work", "nova-engine.json"),
    );
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("nova-engine doctor --fix", {})).toBe("nova-engine doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(formatCliCommand("nova-engine doctor --fix", { NOVA_PROFILE: "default" })).toBe(
      "nova-engine doctor --fix",
    );
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(formatCliCommand("nova-engine doctor --fix", { NOVA_PROFILE: "Default" })).toBe(
      "nova-engine doctor --fix",
    );
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(formatCliCommand("nova-engine doctor --fix", { NOVA_PROFILE: "bad profile" })).toBe(
      "nova-engine doctor --fix",
    );
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("nova-engine --profile work doctor --fix", { NOVA_PROFILE: "work" }),
    ).toBe("nova-engine --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("nova-engine --dev doctor", { NOVA_PROFILE: "dev" })).toBe(
      "nova-engine --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("nova-engine doctor --fix", { NOVA_PROFILE: "work" })).toBe(
      "nova-engine --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("nova-engine doctor --fix", { NOVA_PROFILE: "  jbnova-engine  " })).toBe(
      "nova-engine --profile jbnova-engine doctor --fix",
    );
  });

  it("handles command with no args after nova-engine", () => {
    expect(formatCliCommand("nova-engine", { NOVA_PROFILE: "test" })).toBe(
      "nova-engine --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm nova-engine doctor", { NOVA_PROFILE: "work" })).toBe(
      "pnpm nova-engine --profile work doctor",
    );
  });
});
