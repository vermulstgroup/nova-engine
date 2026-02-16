import { describe, expect, it } from "vitest";
import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "nova-engine", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "nova-engine", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "nova-engine", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "nova-engine", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "nova-engine", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "nova-engine", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "nova-engine", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "nova-engine"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "nova-engine", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "nova-engine", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "nova-engine", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "nova-engine", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "nova-engine", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "nova-engine", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "nova-engine", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "nova-engine", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "nova-engine", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "nova-engine", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "nova-engine", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "nova-engine", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "nova-engine", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "nova-engine", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node", "nova-engine", "status"],
    });
    expect(nodeArgv).toEqual(["node", "nova-engine", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node-22", "nova-engine", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "nova-engine", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node-22.2.0.exe", "nova-engine", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "nova-engine", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node-22.2", "nova-engine", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "nova-engine", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node-22.2.exe", "nova-engine", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "nova-engine", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["/usr/bin/node-22.2.0", "nova-engine", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "nova-engine", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["nodejs", "nova-engine", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "nova-engine", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["node-dev", "nova-engine", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "nova-engine", "node-dev", "nova-engine", "status"]);

    const directArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["nova-engine", "status"],
    });
    expect(directArgv).toEqual(["node", "nova-engine", "status"]);

    const bunArgv = buildParseArgv({
      programName: "nova-engine",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "nova-engine",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "nova-engine", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "nova-engine", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "config", "get", "update"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "config", "unset", "update"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "models", "list"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "models", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "nova-engine", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "nova-engine", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["config", "get"])).toBe(false);
    expect(shouldMigrateStateFromPath(["models", "status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
