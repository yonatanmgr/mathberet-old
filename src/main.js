// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  nativeTheme
} = require('electron')

const trash = require('trash')
const path = require('path')
const fs = require("fs");

let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500,
    height: 900,
    titleBarStyle: 'hidden',
    icon: "src\icons\iconizer-mathberet.ico",
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })

  // and load the index.html of the app.
  win.loadFile('./src/index.html')
  fs.readFile("./preferences.json", "utf-8", (error, data)=>{nativeTheme.themeSource = JSON.parse(data).theme})

  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Blocks',
    submenu: [
      {
      role: 'Add Text Block',
      accelerator: 'Ctrl+T',
      click: () => {win.webContents.send("Text");}
    },
      {
      role: 'Add Math Block',
      accelerator: 'Ctrl+M',
      click: () => {win.webContents.send("Math");}
    },
      {
      role: 'Add Geogebra Block',
      accelerator: 'Ctrl+G',
      click: () => {win.webContents.send("Graph");}
    }
  ]
  })),
  menu.append(new MenuItem({
    label: 'Misc',
    submenu: [
      {
      role: 'Open Devtools',
      accelerator: 'Ctrl+Shift+I',
      click: () => {win.webContents.openDevTools();}
    },
    {
      role: 'Create a new File...',
      accelerator: 'Ctrl+N',
      click: () => {win.webContents.send("newFile");}
    },
    {
      role: 'Save',
      accelerator: 'Ctrl+S',
      click: () => {win.webContents.send("Save");}
    },
    {
      role: 'Quit',
      accelerator: 'Ctrl+W',
      click: () => {win.close()}
    },
    {
      role: 'Refresh',
      accelerator: 'Ctrl+R',
      click: () => {win.webContents.reloadIgnoringCache()}
    }
  ]
  }))
  menu.append(new MenuItem({
    label: 'Actions',
    submenu: [
      {
      role: 'Toggle Notebooks',
      accelerator: 'Ctrl+O',
      click: () => {win.webContents.send("toggleNotebooks");}
    },
      {
      role: 'Search',
      accelerator: 'Ctrl+F',
      click: () => {win.webContents.send("Search");}
    }
  ]
  }))
  Menu.setApplicationMenu(menu)
  
  ipcMain.on("maximize", () => {
    win.maximize()
  })
  ipcMain.on("unmaximize", () => {
    win.unmaximize()
  })
  ipcMain.on("minimize", () => {
    win.minimize()
  })
  ipcMain.on("close", () => {
    win.close()
  })

  ipcMain.on("newFile", (event, data) => {
    fs.writeFileSync(`./files/קובץ חדש.json`, "[]", "utf-8");
    fs.readFile(`./files/קובץ חדש.json`, "utf-8", (error, data) => {
      win.webContents.send("fromMain", data);
    });
  })

  ipcMain.on("save", (event, data, file, newName) => {
    fs.writeFileSync(file, data, "utf-8");
    let name = file.split("/").pop()
    fs.rename(file, file.replace(name, newName), ()=>{})
  })
  ipcMain.on("delete", (event, file) => {trash(file)})

  ipcMain.on("move", (event, oldDir, newDir) => {fs.rename(oldDir, newDir, ()=>{})})

  ipcMain.on("load", (event, file) => {
    fs.readFile(file, "utf-8", (error, data) => {
      win.webContents.send("fromMain", data);
    });
  })
  
  ipcMain.on('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
      fs.readFile("./preferences.json", "utf-8", (error, data)=>{
        let readData = JSON.parse(data)
        readData.theme = 'light'
        let newdata = JSON.stringify(readData)
        fs.writeFileSync("./preferences.json", newdata, "utf-8");
      });
      
    } else {
      nativeTheme.themeSource = 'dark'
      fs.readFile("./preferences.json", "utf-8", (error, data)=>{
        let readData = JSON.parse(data)
        readData.theme = 'dark'
        let newdata = JSON.stringify(readData)
        fs.writeFileSync("./preferences.json", newdata, "utf-8");
      });

    }
  })

  ipcMain.on("getNotebooks", (event, args) => {
    const expanded = []

    const files = source => (fs.readdirSync(source, {withFileTypes: true}))
    .filter(file => file.isFile())
    .map(file => file = {path: `./files/${file.name}`, fileName: file.name.replace(".json", "")})
    
    for (var file of files("./files")){
      expanded.push({type: "file", fileName: file.fileName, path: file.path})
      }

    const folders = source => (fs.readdirSync(source, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => `./files/${dirent.name}`)
    
    for (var folder of folders("./files")){
      expanded.push({type: "folder", folder: folder, files: fs.readdirSync(folder), isOpen: false})
      }

    win.webContents.send("gotNotebooks", expanded);
  })
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
