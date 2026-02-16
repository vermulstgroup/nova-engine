import type { PluginRuntime } from "nova-engine/plugin-sdk";

let runtime: PluginRuntime | null = null;

export function setBlueBubblesRuntime(next: PluginRuntime): void {
  runtime = next;
}

export function getBlueBubblesRuntime(): PluginRuntime {
  if (!runtime) {
    throw new Error("BlueBubbles runtime not initialized");
  }
  return runtime;
}
