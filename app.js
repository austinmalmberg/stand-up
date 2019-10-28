const url = require('url');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const Controller = require('./scripts/controller');
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

    controller.stopAllTimers();
    mainWindow = null;
  });
}

// Called when Electron finishes initialization
app.on('ready', () => {

  controller = new Controller();
  createWindow();

  /**
   * Binds a callback to each state timer. This callback sends the elapsed
   * number of seconds to the renderer, index.js
   */
  controller.getOrientations().forEach(orientation => {
    controller.bindCallback(orientation, (elapsed) => {
      mainWindow.webContents.send(`timer: ${orientation}`, secondsAsString(elapsed));
    });
  });

  // pass controller data to index.html to set initial button states
  ipcMain.on('index: ready', (e, req) => {
    e.sender.send('init-timer-states', {
      orientation: controller.getCurrentOrientation(),
      timerState: controller.getTimerState()
    });
  });

  // listen for and handle clicks
  ipcMain.on('clicked: orientation', (e, elementId) => controller.handleOrientation(elementId));
  ipcMain.on('clicked: timer-state', (e, elementId) => controller.handleTimerState(elementId));
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
