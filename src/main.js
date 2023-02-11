// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  nativeTheme, 
  shell
} = require('electron')
const path = require('path')
const Store = require('electron-store')
const fs = require("fs")

let win;




async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500,
    height: 900,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, "icons", "mathberet2.ico"),
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })
  
  // and load the index.html of the app.
  win.loadFile('./src/index.html');

  const schema = {
    theme: {type: 'string', default: 'light'},
    color: {type: 'number', maximum: 360, minimum: 1, default: 203},
    pageStyle: {type: 'string', default: 'transparent'}
  };

  if (fs.readFileSync(path.join(app.getPath('userData'), "config.json")) == "") {
    fs.writeFileSync(path.join(app.getPath('userData'), "config.json"), "{}")
  }
  const store = new Store({schema});

  nativeTheme.themeSource = store.get('theme');

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
    },
      {
      role: 'Add Group',
      accelerator: 'Ctrl+K',
      click: () => {win.webContents.send("Group");}
    }
  ]
  }))

  menu.append(new MenuItem({
    label: 'Misc',
    submenu: [
      {
      role: 'Open Devtools',
      accelerator: 'Ctrl+Shift+I',
      click: () => {win.webContents.openDevTools();}
    },
      {
      role: 'Home',
      accelerator: 'Ctrl+H',
      click: () => {win.webContents.send("Home");}
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
    },
    {
      role: 'Help',
      accelerator: 'Ctrl+Alt+H',
      click: () => {win.webContents.send("Shortcuts")}
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
      role: 'Open Archive',
      accelerator: 'Ctrl+Alt+A',
      click: () => {win.webContents.send("openArchive");}
    },
      {
      role: 'Search',
      accelerator: 'Ctrl+F',
      click: () => {win.webContents.send("Search");}
    }
  ]
  }))

  Menu.setApplicationMenu(menu)
  
  ipcMain.on("maximize", () => {win.maximize()})

  ipcMain.on("unmaximize", () => {win.unmaximize()})

  ipcMain.on("minimize", () => {win.minimize()})

  ipcMain.on("close", () => {win.close()})

  ipcMain.on("newFile", (event, data) => {
    fs.writeFileSync(path.join(__dirname, "..", "files", "קובץ חדש.json"), "[]", "utf-8");
    fs.readFile(path.join(__dirname, "..", "files", "קובץ חדש.json"), "utf-8", (error, data) => {
      win.webContents.send("fromMain", data);
    });
  })

  ipcMain.on("save", (event, data, file, newName) => {
    let nonPicturesData = [];
    let allPictureIds = [];
    let tempData = JSON.parse(data)
    for (const block of tempData) {
      let tempBlock = block;
      if (block.type == "Picture") {
        allPictureIds.push(block.id);
        fs.writeFileSync(path.join(__dirname, "..", "attachments", `${block.id}.png`), block.blockContent.split(';base64,').pop(), 'base64')
        tempBlock.blockContent = "";
      }
      nonPicturesData.push(tempBlock);
    }

    let allPics = fs.readdirSync(path.join(__dirname, "..", "attachments"), {withFileTypes: true});
    for (const picture of allPics) {
      if (!allPictureIds.find(pic => {return pic == picture.name.split(".")[0]})){
        foundPath = path.join(__dirname, "..", "attachments", picture.name);
        shell.trashItem(path.resolve(foundPath)).then((res) => {}).catch((err) => {})
        break;
      }
    }

    fs.writeFileSync(file, JSON.stringify(nonPicturesData), "utf-8");
    let name = file.split("\\").pop()
    fs.rename(file, file.replace(name, newName), ()=>{})
  })
  
  ipcMain.on("delete", (event, file) => {shell.trashItem(path.resolve(file)).then((res) => {}).catch((err) => {})})

  ipcMain.on("openFiles", (event) => {shell.openPath(path.resolve(path.join(__dirname, "..", "files"))).then((res) => {}).catch((err) => {})})

  ipcMain.on("move", (event, oldDir, newDir) => {fs.renameSync(oldDir, newDir)})

  ipcMain.on("load", (event, file) => {fs.readFile(file, "utf-8", (error, data) => {win.webContents.send("fromMain", data)})})
  
  ipcMain.on("setUserColor", (event, color) => {
    store.set('color', color);
  })
  
  ipcMain.on("setPageStyle", (event, style) => {
    store.set('pageStyle', style);
  })

  ipcMain.on("getPageStyle", (event, args) => {
    win.webContents.send("gotPageStyle", store.get('pageStyle'))
  })
  ipcMain.on("getUserTheme", (event, args) => {
    win.webContents.send("gotUserTheme", store.get('theme'))
  })

  ipcMain.on("getUserColor", (event, args) => {
    win.webContents.send("gotUserColor", store.get('color'))
  })
  
  ipcMain.on('dark-mode', () => {
    if (nativeTheme.shouldUseDarkColors) {nativeTheme.themeSource = 'light'; store.set('theme', 'light')} 
    else {nativeTheme.themeSource = 'dark'; store.set('theme', 'dark')}
  })

  ipcMain.on("getNotebooks", (event, args) => {
    const filesPath = path.join(__dirname, "..", "files")
    const all = () => (fs.readdirSync(filesPath, {withFileTypes: true})).map(
      file => file = 
      {
        "parentFolder": filesPath,
        "path": path.join(filesPath, file.name),
        "name": file.name,
        "files": file.isDirectory() ? fs.readdirSync(path.join(filesPath, file.name), {withFileTypes: true})
        .map(subfile => subfile = {
          "parentFolder": path.join(filesPath, file.name),
          "path": path.join(filesPath, file.name, subfile.name),
          "name": subfile.name,
          "isOpen": false
        }) : null,
        "isOpen": false
      }
    ) 
    win.webContents.send("gotNotebooks", {"filesPath": filesPath, "allFiles": all()});
  })

  ipcMain.on("getPicture", (event, id) => {
    let allPics = fs.readdirSync(path.join(__dirname, "..", "attachments"), {withFileTypes: true});
    let foundPath;
    for (const picture of allPics) {
      if (picture.name.split(".")[0] == id.toString()){
        foundPath = path.join(__dirname, "..", "attachments", picture.name);
        break;
      }
    }
    let b64 = fs.readFileSync(foundPath, "base64")
    win.webContents.send("gotPicture", `data:image/png;base64,${b64}`);
    return
  })

  ipcMain.on("getAllPictures", (event) => {
    let allPics = fs.readdirSync(path.join(__dirname, "..", "attachments"), {withFileTypes: true});
    let allPicsArr = []
    let foundPath;
    for (const picture of allPics) {
      foundPath = path.join(__dirname, "..", "attachments", picture.name);
      let b64 = fs.readFileSync(foundPath, "base64")
      allPicsArr.push({"Path": foundPath, "Base64": `data:image/png;base64,${b64}`})
    }
    win.webContents.send("gotAllPictures", allPicsArr);
  })

  ipcMain.on("getArchive", (event, args) => {
    const filesPath = path.join(__dirname, "..", "files")

    let groupsToFilter = [];
    function getAllGroups() {
      let allGroups = [];
      let allFiles = fs.readdirSync(filesPath, {withFileTypes: true})
      for (const file of allFiles) {
        if (file.isDirectory()) {
          let subFiles = fs.readdirSync(path.join(filesPath, file.name), {withFileTypes: true})
          for (const subfile of subFiles) {
            let readFile = fs.readFileSync(path.join(filesPath, file.name, subfile.name), "utf-8")
            for (const block of JSON.parse(readFile)) {if (block.type == 'Group') {allGroups.push(block)}}
          }
        }
        else {
          let readFile = fs.readFileSync(path.join(filesPath, file.name), "utf-8")
          for (const block of JSON.parse(readFile)) {if (block.type == 'Group') {allGroups.push(block)}}
        }
      }
      return allGroups
    }

    let allGroups = getAllGroups()
    
    function removeDups(arr){
      const uniqueIds = [];
      const unique = arr.filter(element => {
        const isDuplicate = uniqueIds.includes(element);
        if (!isDuplicate) {uniqueIds.push(element); return true;}
        return false;
      });
      return unique.map(groupTitle => groupTitle = {'groupName': groupTitle, 'subGroups': []})
    }

    for (const group of allGroups) {groupsToFilter.push(group.groupTitle);}

    let finalArr = [];
    for (const group of removeDups(groupsToFilter)) {
      if (group.groupName != "קבוצה") {
        for (const subGroup of allGroups) {
          if (subGroup.groupTitle == group.groupName){
            group.subGroups.push(subGroup)
          }
        }
        finalArr.push(group)
      }

    }

    win.webContents.send("gotArchive", finalArr);
  })
  
  ipcMain.on("startSearch", (event, args) =>{
    const filesPath = path.join(__dirname, "..", "files")
    function getAllBlocks() {
      let allGroups = [];
      let allFiles = fs.readdirSync(filesPath, {withFileTypes: true})
      for (const file of allFiles) {
        if (file.isDirectory()) {
          let subFiles = fs.readdirSync(path.join(filesPath, file.name), {withFileTypes: true})
          for (const subfile of subFiles) {
            let readFile = fs.readFileSync(path.join(filesPath, file.name, subfile.name), "utf-8")
            allGroups.push({"filePath": path.join(filesPath, file.name, subfile.name), "fileName": subfile.name.replace(".json", ""), "blocks": JSON.parse(readFile)})
          }
        }
        else {
          let readFile = fs.readFileSync(path.join(filesPath, file.name), "utf-8")
          allGroups.push({"filePath": path.join(filesPath, file.name), "fileName": file.name.replace(".json", ""), "blocks": JSON.parse(readFile)})
        }
      }
      return allGroups
    }
    let allGroups = getAllBlocks()
    win.webContents.send("gotAllBlocks", allGroups);
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