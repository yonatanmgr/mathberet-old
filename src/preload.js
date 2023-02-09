const {
  contextBridge,
  ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          // whitelist channels
          let validChannels = ["toMain"];
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          }
      },
      receive: (channel, func) => {
          let validChannels = ["Shortcuts", "gotAllBlocks", "openArchive", "gotPageStyle", "gotUserTheme", "gotArchive", "gotUserColor", "openFiles", "newFile", "Save", "fromMain", "Text", "Graph", "Math", "Group", "gotNotebooks", "toggleNotebooks", "Search"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      },
      getNotebooks: () => {ipcRenderer.send("getNotebooks")},
      delete: (file) => {ipcRenderer.send("delete", file)},
      newFile: () => {ipcRenderer.send("newFile")},
      openFiles: () => {ipcRenderer.send("openFiles")},
      move: (oldDir, newDir) => {ipcRenderer.send("move", oldDir, newDir)},
      save: (data, file, newName) => {ipcRenderer.send("save", data, file, newName)},
      load: (file) => {ipcRenderer.send("load", file)},
      maximize: () => {ipcRenderer.send("maximize")},
      unmaximize: () => {ipcRenderer.send("unmaximize")},
      minimize: () => {ipcRenderer.send("minimize")},
      close: () => {ipcRenderer.send("close")},
      setUserColor: (color) => {ipcRenderer.send('setUserColor', color)},
      setPageStyle: (style) => {ipcRenderer.send('setPageStyle', style)},
      toggle: () => {ipcRenderer.send('dark-mode')},
      getUserColor: () => {ipcRenderer.send('getUserColor')},
      getPageStyle: () => {ipcRenderer.send('getPageStyle')},
      getUserTheme: () => {ipcRenderer.send('getUserTheme')},
      getArchive: () => {ipcRenderer.send('getArchive')},
      startSearch: () => {ipcRenderer.send('startSearch')}
      }
);
