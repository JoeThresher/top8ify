// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  // Custom CSS APIs
  saveCustomCss: async (cssContent) => {
    return await ipcRenderer.invoke('save-custom-css', cssContent);
  },
  loadCustomCss: async () => {
    return await ipcRenderer.invoke('load-custom-css');
  },
  getCustomCssPath: async () => {
    return await ipcRenderer.invoke('get-custom-css-path');
  },
  restoreOriginalCss: async () => {
    return await ipcRenderer.invoke('restore-original-css');
  },
  openExternalLink(url) {
    console.log('Requesting to open external link:', url);
    ipcRenderer.send('open-external-link', url);
  },
  saveCustomLogo: async (imagePath) => {
    return await ipcRenderer.invoke('save-custom-logo', imagePath);
  },
  loadCustomLogo: async () => {
    return await ipcRenderer.invoke('load-custom-logo');
  },
  getCustomLogoPath: async () => {
    return await ipcRenderer.invoke('get-custom-logo-path');
  },
  saveCustomBackground: async (imagePath) => {
    return await ipcRenderer.invoke('save-custom-background', imagePath);
  },
  loadCustomBackground: async () => {
    return await ipcRenderer.invoke('load-custom-background');
  },
  getCustomBackgroundPath: async () => {
    return await ipcRenderer.invoke('get-custom-background-path');
  },
  // Any other methods you want to expose in the window object.
  // ...
});
