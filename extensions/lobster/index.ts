import type {
  AnyAgentTool,
  Nova EnginePluginApi,
  Nova EnginePluginToolFactory,
} from "../../src/plugins/types.js";
import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: Nova EnginePluginApi) {
  api.registerTool(
    ((ctx) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createLobsterTool(api) as AnyAgentTool;
    }) as Nova EnginePluginToolFactory,
    { optional: true },
  );
}
