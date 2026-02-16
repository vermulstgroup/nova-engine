import { afterEach, beforeEach } from "vitest";
import { NovaEngineApp } from "../app.ts";

// oxlint-disable-next-line typescript/unbound-method
const originalConnect = NovaEngineApp.prototype.connect;

export function mountApp(pathname: string) {
  window.history.replaceState({}, "", pathname);
  const app = document.createElement("nova-engine-app") as NovaEngineApp;
  document.body.append(app);
  return app;
}

export function registerAppMountHooks() {
  beforeEach(() => {
    NovaEngineApp.prototype.connect = () => {
      // no-op: avoid real gateway WS connections in browser tests
    };
    window.__NOVA_CONTROL_UI_BASE_PATH__ = undefined;
    localStorage.clear();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    NovaEngineApp.prototype.connect = originalConnect;
    window.__NOVA_CONTROL_UI_BASE_PATH__ = undefined;
    localStorage.clear();
    document.body.innerHTML = "";
  });
}
