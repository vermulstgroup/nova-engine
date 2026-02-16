import { afterEach, beforeEach } from "vitest";
import { Nova EngineApp } from "../app.ts";

// oxlint-disable-next-line typescript/unbound-method
const originalConnect = Nova EngineApp.prototype.connect;

export function mountApp(pathname: string) {
  window.history.replaceState({}, "", pathname);
  const app = document.createElement("nova-engine-app") as Nova EngineApp;
  document.body.append(app);
  return app;
}

export function registerAppMountHooks() {
  beforeEach(() => {
    Nova EngineApp.prototype.connect = () => {
      // no-op: avoid real gateway WS connections in browser tests
    };
    window.__NOVA_CONTROL_UI_BASE_PATH__ = undefined;
    localStorage.clear();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    Nova EngineApp.prototype.connect = originalConnect;
    window.__NOVA_CONTROL_UI_BASE_PATH__ = undefined;
    localStorage.clear();
    document.body.innerHTML = "";
  });
}
