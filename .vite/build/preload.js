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
  }
  // Any other methods you want to expose in the window object.
  // ...
});
