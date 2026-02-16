import type {
  AnyAgentTool,
  NovaEnginePluginApi,
  NovaEnginePluginToolFactory,
} from "../../src/plugins/types.js";
import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: NovaEnginePluginApi) {
  api.registerTool(
    ((ctx) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createLobsterTool(api) as AnyAgentTool;
    }) as NovaEnginePluginToolFactory,
    { optional: true },
  );
}
