const url = require('url');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const { states, Controller } = require('./scripts/controller');
const { secondsAsString } = require('./scripts/helpers/formatter');

let mainWindow;
let controller;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 853,
    height: 480,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      defaultFontFamily: {
        sansSerif: 'Malgun Gothic'
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

  controller = new Controller();
  states.forEach(state => controller.bindCallback(state, (elapsed) => mainWindow.webContents.send(`timer:${state}`, secondsAsString(elapsed))));

  // pass controller data to index.html so it can set initial button states
  ipcMain.on('index:ready', (e, req) => {
    e.sender.send('ready:init', {
      state: controller.getState(),
      status: controller.getStatus()
    });
  });

  // listen for and handle clicks
  ipcMain.on('clicked:state', (e, id) => controller.handleState(id));
  ipcMain.on('clicked:time-control', (e, id) => controller.handleTimer(id));
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
