import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let settings = { url: 'https://www.instagram.com/explore/tags/awebpage/' };
const settings_path = path.join(
  app.getPath('desktop'),
  'egualmente_settings.json'
);
let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    acceptFirstMouse: true,
    fullscreen: true,
    frame: false,
    kiosk: true,
    // height: 600,
    // width: 800,
    title: '#awebpage'
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.loadURL(settings.url);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(
      'html,body{cursor: none;}::-webkit-scrollbar {display: none;}'
    );
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Auto Reload
  setInterval(() => {
    mainWindow.webContents.reload();
  }, 60 * 1000);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
