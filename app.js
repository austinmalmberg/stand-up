const url = require('url');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const Timer = require('./scripts/timer');

const { Tracker } = require('./scripts/tracker');
const secondsFormatted = require('./scripts/helpers/time_formatter');

let mainWindow;
let tracker;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 640,
    height: 360,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      defaultFontFamily: {
        sansSerif: 'Segoe UI'
      }
    }
  });

  mainWindow.loadFile('public/index.html');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// Called when Electron finishes initialization
app.on('ready', () => {
  createWindow();

  tracker = new Tracker();

  ipcMain.on('init-btn', (e, req) => {

  });

  ipcMain.on('orientation', (e, req) => {
    tracker.handleState(req.elementId);
    console.log(`${req.elementId} button click registered`);
  });
  ipcMain.on('time-control', (e, req) => {
    tracker.handleTimer(req.elementId);
    console.log(`${req.elementId} button click registered`);
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
