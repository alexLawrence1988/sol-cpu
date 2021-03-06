'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import systemInfo from './helpers/system';
import networkInfo from './helpers/network';
import cpu from './helpers/cpu';
import memoryInfo from './helpers/memory';


const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
// For google api access (geolocation etc)
process.env.GOOGLE_API_KEY = 'AIzaSyAeCOiuqOZdAf70NbERwoWt2Ao6Iuoo5Z8'



let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    title: 'SolCPU',
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// Functions to get system info
const getNetworkInfo = async () => {
  const info = await networkInfo.get();
  win.webContents.send('network-info', info);
}

const getCPUInfo = async () => {
  const info = await cpu.info.get();
  win.webContents.send('cpu-info', info);
}

const getCPUTemp = async () => {
  const info = await cpu.temperature.get();
  win.webContents.send('cpu-temp', info);
}

const getCPUSpeed = async () => {
  const info = await cpu.speed.get();
  win.webContents.send('cpu-speed', info);
}

const getMemoryInfo = async () => {
  const info = await memoryInfo.get();
  win.webContents.send('memory-info', info);
} 

// IPC event bus handlers
ipcMain.on('quit', () => {
  app.exit();
});

ipcMain.on('minimize', () => {
  win.minimize();
});

ipcMain.on('maximize', () => {
  win.maximize();
});

ipcMain.on('restore', () => {
  win.restore();
});

ipcMain.on('get-system-info', async () => {
  const info = await systemInfo.get();
  win.webContents.send('system-info', info);
});

ipcMain.on('get-network-info', async () => {
  getNetworkInfo();
});

ipcMain.on('get-cpu-info', async () => {
 getCPUInfo();
});

ipcMain.on('get-cpu-temp', async () => {
  getCPUTemp();
});

// Poll system info
setInterval(getNetworkInfo, 2000);
setInterval(getCPUSpeed, 10000);
setInterval(getMemoryInfo, 2000);