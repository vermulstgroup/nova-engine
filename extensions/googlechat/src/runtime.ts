import type { PluginRuntime } from "nova-engine/plugin-sdk";

let runtime: PluginRuntime | null = null;

export function setGoogleChatRuntime(next: PluginRuntime) {
  runtime = next;
}

export function getGoogleChatRuntime(): PluginRuntime {
  if (!runtime) {
    throw new Error("Google Chat runtime not initialized");
  }
  return runtime;
}
