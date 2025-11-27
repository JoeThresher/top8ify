import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import started from 'electron-squirrel-startup';
import Store from 'electron-store';

let store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  console.log('Getting value for key:', val);
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  console.log('Setting value for key:', key, 'to', val);
  store.set(key, val);
});

// Open external link in default browser
ipcMain.on('open-external-link', async (event, url) => {
  console.log('Opening external link:', url);
  shell.openExternal(url);
});

// Prefer to edit the project's `src/assets/graphicScreen.css` when available (dev mode).
// If that file isn't available/writable (packaged or missing), fall back to saving in userData.
// const projectGraphicPath = path.resolve(process.cwd(), 'src', 'assets', 'graphicScreen.css');
const customFileName = 'graphicScreen.css';
const customLogoFileName = 'tournament-logo.png';
const backupName = 'graphicScreen.original.css';
const backupPath = () => path.join(app.getPath('userData'), backupName);

async function resolveGraphicCssPath() {
  const userPath = path.join(app.getPath('userData'), customFileName);
  return { path: userPath, location: 'userData' };
}

async function resolveGraphicLogoPath() {
  const userPath = path.join(app.getPath('userData'), customLogoFileName);
  return { path: userPath, location: 'userData' };
}

ipcMain.handle('save-custom-css', async (event, cssContent) => {
  try {
    const info = await resolveGraphicCssPath();
    // If we're about to overwrite the project file, save a backup of the original if not already present
    if (info.location === 'project') {
      try {
        await fs.access(backupPath());
        // backup exists
      } catch {
        try {
          const original = await fs.readFile(info.path, 'utf8');
          await fs.writeFile(backupPath(), original, 'utf8');
        } catch (e) {
          // ignore backup failure but log
          console.warn('Could not create backup of original graphicScreen.css:', e);
        }
      }
    }

    await fs.writeFile(info.path, cssContent, 'utf8');
    return { success: true, path: info.path, location: info.location };
  } catch (err) {
    console.error('Failed to save graphicScreen.css:', err);
    return { success: false, error: String(err) };
  }
});

// Restore original CSS (if a backup exists). This will prefer restoring to project asset when available,
// otherwise it will restore to the userData fallback path.
ipcMain.handle('restore-original-css', async () => {
  try {
    const bPath = backupPath();
    await fs.access(bPath);
    const original = await fs.readFile(bPath, 'utf8');
    // Determine current target path (project if exists, else userData)
    let targetInfo = await resolveGraphicCssPath();
    // If project file doesn't exist but backup was created from project, attempt to restore to project path
    // try {
    //   await fs.access(projectGraphicPath);
    //   targetInfo = { path: projectGraphicPath, location: 'project' };
    // } catch {
    //   // keep resolved path
    // }

    await fs.writeFile(targetInfo.path, original, 'utf8');
    return { success: true, path: targetInfo.path, location: targetInfo.location };
  } catch (err) {
    console.error('Failed to restore original graphicScreen.css:', err);
    return { success: false, error: String(err) };
  }
});

ipcMain.handle('load-custom-css', async () => {
  try {
    const info = await resolveGraphicCssPath();
    const content = await fs.readFile(info.path, 'utf8');
    return { exists: true, content, path: info.path, location: info.location };
  } catch (err) {
    // File might not exist in either location
    return { exists: false, error: String(err) };
  }
});

ipcMain.handle('get-custom-css-path', async () => {
  const info = await resolveGraphicCssPath();
  return info.path;
});

ipcMain.handle('save-custom-logo', async (event, dataUrl) => {
  try {
    const info = await resolveGraphicLogoPath();
    // Extract base64 data from Data URL (format: "data:image/png;base64,xxxxx")
    const base64Data = dataUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid data URL format');
    }
    // Decode Base64 and write as binary
    const buffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(info.path, buffer);
    return { success: true, path: info.path, location: info.location };
  } catch (err) {
    console.error('Failed to save tournament-logo.png:', err);
    return { success: false, error: String(err) };
  }
});

ipcMain.handle('load-custom-logo', async () => {
  try {
    const info = await resolveGraphicLogoPath();
    // Read as binary and return as Data URL for direct use in img src
    const buffer = await fs.readFile(info.path);
    const base64Content = buffer.toString('base64');
    // Determine MIME type from file extension
    const ext = path.extname(info.path).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Content}`;
    return { exists: true, content: dataUrl, path: info.path, location: info.location };
  } catch (err) {
    // File might not exist in either location
    return { exists: false, error: String(err) };
  }
});

ipcMain.handle('get-custom-logo-path', async () => {
  const info = await resolveGraphicLogoPath();
  return info.path;
});
