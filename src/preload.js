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
          let validChannels = ["Save", "fromMain", "Text", "Graph", "Math", "gotNotebooks", "toggleNotebooks", "Search"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      },
      getNotebooks: () => {ipcRenderer.send("getNotebooks")},
      save: (data, file, newName) => {ipcRenderer.send("save", data, file, newName)},
      load: (file) => {ipcRenderer.send("load", file)},
      maximize: () => {ipcRenderer.send("maximize")},
      unmaximize: () => {ipcRenderer.send("unmaximize")},
      minimize: () => {ipcRenderer.send("minimize")},
      close: () => {ipcRenderer.send("close")},
      toggle: () => {ipcRenderer.send('dark-mode:toggle')}
  }
);
