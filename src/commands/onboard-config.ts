import type { Nova EngineConfig } from "../config/config.js";

export function applyOnboardingLocalWorkspaceConfig(
  baseConfig: Nova EngineConfig,
  workspaceDir: string,
): Nova EngineConfig {
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
