const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 480,
    height: 640,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      defaultFontFamily: {
        sansSerif: 'Malgun Gothic'
      }
    }
  });

  mainWindow.loadFile('public/index.html');

  // mainWindow.webContents.openDevTools();

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
