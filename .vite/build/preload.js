"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  store: {
    get(key) {
      return electron.ipcRenderer.sendSync("electron-store-get", key);
    },
    set(property, val) {
      electron.ipcRenderer.send("electron-store-set", property, val);
    }
    // Other method you want to add like has(), reset(), etc.
  },
  // Custom CSS APIs
  saveCustomCss: async (cssContent) => {
    return await electron.ipcRenderer.invoke("save-custom-css", cssContent);
  },
  loadCustomCss: async () => {
    return await electron.ipcRenderer.invoke("load-custom-css");
  },
  getCustomCssPath: async () => {
    return await electron.ipcRenderer.invoke("get-custom-css-path");
  },
  restoreOriginalCss: async () => {
    return await electron.ipcRenderer.invoke("restore-original-css");
  },
  openExternalLink(url) {
    console.log("Requesting to open external link:", url);
    electron.ipcRenderer.send("open-external-link", url);
  }
  // Any other methods you want to expose in the window object.
  // ...
});
