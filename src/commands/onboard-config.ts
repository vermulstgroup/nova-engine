import type { NovaEngineConfig } from "../config/config.js";

export function applyOnboardingLocalWorkspaceConfig(
  baseConfig: NovaEngineConfig,
  workspaceDir: string,
): NovaEngineConfig {
  return {
    ...baseConfig,
    agents: {
      ...baseConfig.agents,
      defaults: {
        ...baseConfig.agents?.defaults,
        workspace: workspaceDir,
      },
    },
    gateway: {
      ...baseConfig.gateway,
      mode: "local",
    },
  };
}
