const url = require('url');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const Timer = require('./scripts/timer');
const { states, OrientationTracker } = require('./scripts/tracker');

let mainWindow;
const ot = new OrientationTracker();

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

  const tick = () => {
    console.log(ot.timeInState());
    setTimeout(tick, 1000);
  }

  ipcMain.on('orientation', (e, id) => {
    if (id === 'sit') {
      process.stdout.write('Setting orientation to sitting...');
      ot.setState(states.SITTING);
    }

    else if (id === 'stand') {
      process.stdout.write('Setting orientation to standing...');
      ot.setState(states.STANDING);
    }

    else if (id === 'pause') {
      process.stdout.write('Setting orientation to paused...');
      ot.setState(states.PAUSED);
    }
  });

  ipcMain.on('time-control', (e, id) => {
    if (id === 'start') {
      process.stdout.write('Starting...');
      ot.start();
    }

    else if (id === 'stop') {
      process.stdout.write('Stopping...');
      ot.stop();
    }
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
