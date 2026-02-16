import type { PluginRuntime } from "nova-engine/plugin-sdk";

let runtime: PluginRuntime | null = null;

export function setIMessageRuntime(next: PluginRuntime) {
  runtime = next;
}

export function getIMessageRuntime(): PluginRuntime {
  if (!runtime) {
    throw new Error("iMessage runtime not initialized");
  }
  return runtime;
}
