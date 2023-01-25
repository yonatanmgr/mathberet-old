// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const fs = require("fs")

let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500,
    height: 900,
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })

  // and load the index.html of the app.
  win.loadFile('./src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.on("maximize", ()=>{win.maximize()})
  ipcMain.on("unmaximize", ()=>{win.unmaximize()})
  ipcMain.on("minimize", ()=>{win.minimize()})
  ipcMain.on("close", ()=>{win.close()})

  ipcMain.on("toMain", (event, args) => {
    if (args == "LOAD") {
      return
    } else {

      fs.writeFileSync("./file.json", args, "utf-8", (error) => {
        if (error) {
          console.error("error: " + error);
        }
      });
    }
  });

  ipcMain.on("toMain", (event, args) => {
    if (args != "LOAD") {
      return
    } else {
      fs.readFile("./file.json", "utf-8", (error, data) => {
        win.webContents.send("fromMain", data);
      });
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.