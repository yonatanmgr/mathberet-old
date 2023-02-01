// loadGrid()

let dirTree, currentfile, currentBlock;
let maximizeStatus, sidebarStatus = 0


reloadDirTree();

let sidebar = document.getElementById("sidebarContainer")
let sidebarContent = document.getElementById("sidebarContent")
let notebookList = document.createElement('div')
notebookList.id = "notebookList"
sidebarContent.append(notebookList)

let sidebarGrid;

function reloadDirTree() {
  window.api.getNotebooks();
  window.api.receive("gotNotebooks", (data) => { dirTree = data });
}

function renderDirTree() {
  reloadDirTree();
  
  if (document.querySelector(".sidebarGrid")){document.querySelector(".sidebarGrid").gridstack.destroy()}

  let options = {
    class: "sidebarGrid",
    float: false,
    removable: '#fileTrashCan',
    dragOut: false,
    acceptWidgets: true,
    dragIn: '.sidebarItem',
    disableResize: true,
    // rtl: true,
    column: 1,
    itemClass: "sidebarItem",
    cellHeight: 45
  };

  sidebarGrid = GridStack.addGrid(document.getElementById('notebookList'), options)

  for (var item of dirTree) {
    let html = ""
    let isSubgrid = false
    let subgridOptions, gridItem;
    if (item.files) {
      let subGridItems = [];
      for (var file of item.files) {
        let html = `<div class="listedFile">${fileIcon}<div class="fileName">${file.name.replace(".json", "")}</div></div>`
        let gridItem = {
          content: html,
          w: 1,
          h: 1,
          id: file.path
        }
        subGridItems.push(gridItem)
      }
      isSubgrid = true;
      subgridOptions = {
        class: "notebook",
        float: false,
        removable: '#fileTrashCan',
        acceptWidgets: true,
        dragOut: true,
        dragIn: ".sidebarItem",
        disableResize: true,
        // rtl: true,
        column: 1,
        itemClass: "sidebarItem",
        cellHeight: 45,
        children: subGridItems
      }
      html = `<div class="folder"><div class="folderTitle">${folderIconClosed}<span class="folderTitleText">${item.name}</span></div><div class="folderContent"></div></div>`
      gridItem = {
        content: html,
        w: 1,
        h: 1,
        id: item.path,
        subGridDynamic: true,
        isFolder: true
      }
      sidebarGrid.addWidget(gridItem)
      createSubgrid(isSubgrid, item, subgridOptions);

    } else { continue } 
  }
  for (var item of dirTree) {
      if (item.files) { continue } 
      else {
      html = `<div class="listedFile">${fileIcon}<div class="fileName">${item.name.replace(".json", "")}</div></div>`
      gridItem = {
        content: html,
        w: 1,
        h: 1,
        id: item.path
      }
      sidebarGrid.addWidget(gridItem)
    }
  }
}

function createSubgrid(isSubgrid, item, subgridOptions) {
  if (isSubgrid) {
    GridStack.addGrid(
      document.querySelector('.sidebarGrid')
      .gridstack.getGridItems()
      .find(a => a.gridstackNode.id == item.path)
      .querySelector(".folderContent"), subgridOptions);
  }
}

function resetPage() {
  currentfile = undefined;
  closeSidebar()
  document.getElementById("placeHolder").style.display = "flex"
  document.getElementById("content").style.display = "none"
  document.getElementById("notebookName").innerText = ""
  document.getElementById("slash").innerText = ""
  document.getElementById("fileName").innerText = ""
}

function collapsableFolder(target, clicked, folder) {
  switch (folder.isOpen) {
    case false:
      if (folder.files.length == 0) {
        sidebarGrid.update(clicked.el, {h: folder.files.length + 2})
        let subgridOptions = {
          class: "notebook",
          float: false,
          acceptWidgets: true,
          dragOut: true,
          dragIn: ".sidebarItem",
          disableResize: true,
          column: 1,
          itemClass: "sidebarItem",
          cellHeight: 45,
          children: []
        }
        GridStack.addGrid(target.querySelector(".folderContent"), subgridOptions)
        clicked.el.querySelector(".notebook").style.height = "50px"
      }
      else { sidebarGrid.update(clicked.el, {h: folder.files.length + 1}) }
      folder.isOpen = true
      target.querySelector(".notebookIcon").id = "open"
      target.querySelector(".notebookIcon").innerHTML = folderIconOpenPath
      target.querySelector(".folderTitleText").id = "open"
      break;

    case true:
      sidebarGrid.update(clicked.el, {h: 1})
      folder.isOpen = false
      target.querySelector(".notebookIcon").id = "closed"
      target.querySelector(".notebookIcon").innerHTML = folderIconClosedPath
      target.querySelector(".folderTitleText").id = "closed"
      break;
  }
}

document.addEventListener("click", function (e) {
  const target = e.target.closest(".folderTitle")
  if (target) {
    let found = target.closest(".grid-stack-sub-grid").gridstackNode;
    collapsableFolder(target, found, findInTree(found))}
});

const getRandomColor = () => {
  // colors = [40, 80, 120, 160, 200, 240, 280, 320, 0]
  colors = 360
  const h = Math.floor(Math.random() * colors);
  document.querySelector(":root").style.setProperty("--theme-h", h);
};

function popupAnimation(scene) {
  var x = document.getElementById("snackbar");
  let snackbarInnerText = "";
  switch (scene) {
    case "save": snackbarInnerText = "הדף נשמר!"; break;
    case "clean": snackbarInnerText = "הדף נוקה!"; break;
    case "cantCreate": snackbarInnerText = "לא ניתן ליצור קובץ חדש, קיים קובץ בעל שם זהה!"; break;
    case "cantMove": snackbarInnerText = "לא ניתן להזיז את הקובץ למיקום זה!"; break;
    default: break;
  } 
  x.innerText = snackbarInnerText;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 1200);
}

window.addEventListener("resize", resizeAll);
document.getElementById('settings').addEventListener('click', window.api.toggle)
document.getElementById("settings").addEventListener("contextmenu", getRandomColor);
document.getElementById("logo").addEventListener("click", resetPage);
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("close").addEventListener("click", () => {
  saveGrid();
  window.api.close()
});
document.getElementById("newFile").addEventListener("click", newFile);
document.getElementById("maximize").addEventListener("click", toggleMaximize);
document.getElementById("notebooks").addEventListener("click", toggleSidebar);
document.getElementById("addQuill").addEventListener("click", addQuill);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addMF").addEventListener("click", addMF);

function toggleMaximize() {
  if (maximizeStatus == 0) {
    window.api.maximize();
    maximizeStatus = 1
  } else {
    window.api.unmaximize();
    maximizeStatus = 0
  }
}

function findInTree(a) {
  let attempt = dirTree.find(t => t.path == a.id)
  if (attempt == undefined) {
    for (var item of dirTree) {
      if (item.files && item.files.length > 0) {
        let secondTry = item.files.find(t => t.path == a.id)
        if (secondTry != undefined) {
          return secondTry
        } else continue
      } else continue
    }
  } else {
    return attempt
  }
}

function findInSidebar(a) {
  let arr = sidebarGrid.getGridItems()
  let attempt = arr.find(t => t.gridstackNode.id == a)
  if (attempt == undefined) {
    for (var item of arr) {
      if (item.querySelector(".notebook")) {
        if (item.querySelector(".notebook").gridstack.getGridItems().length > 0){
          let secondTry = item.querySelector(".notebook").gridstack.getGridItems().find(t => t.gridstackNode.id == a)
          if (secondTry != undefined) {
            return secondTry
          } else continue
        } else continue
      }
    }
  } else {
    return attempt
  }
}

document.addEventListener('contextmenu', function(e) {
  if (e.target.closest(".listedFile")){
    e.preventDefault();
    let file = e.target.closest(".listedFile");
    if (file.firstChild.classList.contains("toDelete")){
      file.firstChild.classList.remove("toDelete");
      file.firstChild.innerHTML = fileIconPath;
    } else {
      file.firstChild.classList.add("toDelete");
      file.firstChild.innerHTML = trashIcon;
    }
  }
}, false);

document.addEventListener('click', function(e) {
  if (e.target.closest(".fileIcon.toDelete")){
    let file = e.target.closest(".listedFile");
    let gridstackItem = file.closest(".grid-stack-item").gridstackNode;
    let targetGrid = gridstackItem.grid;
    let sidebarGrid = document.querySelector(".sidebarGrid").gridstack;
    let targetFolder;
    let dirTreeItem = findInTree(gridstackItem);
    if (targetGrid != sidebarGrid){
      targetFolder = findInTree(targetGrid.parentGridItem);
      targetFolder.files.pop(dirTreeItem);
      targetGrid.removeWidget(gridstackItem.el);
      sidebarGrid.update(targetGrid.parentGridItem.el, {h: targetFolder.files.length+1});
    }
    else {sidebarGrid.removeWidget(gridstackItem.el);}
    window.api.delete(gridstackItem.id);
    reloadDirTree()
    
    if (dirTreeItem.path == currentfile){resetPage()}  
  }
}, false);

function hasDuplicates(array) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
          return true;
      }
      valuesSoFar[value] = true;
  }
  return false;
}

function openSidebar() {
  sidebarStatus = 1
  sidebar.style.minWidth = "280px"

  setTimeout(() => {
    renderDirTree();
    GridStack.getElements('.sidebarGrid, .notebook').forEach(gridEl => {addEvents(gridEl.gridstack)})
    document.getElementById("myNotebooks").style.display = "block"
  }, 50)
  setTimeout(() => {renderDirTree();}, 1)

  function addEvents(grid) {
    grid.on('dropped', function (event, previousWidget, newWidget) {
      let movedItem = findInTree(previousWidget) // find the relevant dirtree item
      let sourceGrid = previousWidget.grid
      let targetGrid = newWidget.grid
      let targetGridItems = targetGrid.getGridItems().map(item => item.gridstackNode.id.split("/").slice(-1)[0])
      if (hasDuplicates(targetGridItems) || movedItem.files){
        popupAnimation("cantMove");
        targetGrid.removeWidget(newWidget.el)
        sourceGrid.addWidget(previousWidget.el, {id: previousWidget.id})
      } else {
        if (targetGrid.parentGridItem) { // if moved into a folder
          if (sourceGrid.parentGridItem) { // if original location is also a folder
            let targetFolder = findInTree(targetGrid.parentGridItem) // find target folder
            let sourceFolder = findInTree(sourceGrid.parentGridItem) // find original folder
  
            movedItem.path = movedItem.path.replace(sourceFolder.path, targetFolder.path) // change path to new path
            targetGrid.update(newWidget.el, {id: movedItem.path})
            window.api.move(previousWidget.id, newWidget.id)
  
            sourceFolder.files.pop(movedItem) // removed moved item from og folder
            targetFolder.files.push(movedItem) // add moved item to target folder
  
            sidebarGrid.update(targetGrid.parentGridItem.el, {h: targetFolder.files.length + 1}) // update h for target folder
            sidebarGrid.update(sourceGrid.parentGridItem.el, {h: sourceFolder.files.length + 1}) // update h for og folder
  
          } else if (sourceGrid === sidebarGrid) {
            let targetFolder = findInTree(targetGrid.parentGridItem)
  
            movedItem.path = `${targetFolder.path}/${movedItem.name}`
            targetGrid.update(newWidget.el, {id: movedItem.path})
            window.api.move(previousWidget.id, newWidget.id)
  
            dirTree.pop(movedItem)
            targetFolder.files.push(movedItem)
  
            sidebarGrid.update(targetGrid.parentGridItem.el, {h: targetFolder.files.length + 1})
          }
        } else {
          let sourceFolder = findInTree(sourceGrid.parentGridItem)
          movedItem.path = `./files/${movedItem.name}`
          targetGrid.update(newWidget.el, {id: movedItem.path})
          window.api.move(previousWidget.id, newWidget.id)
          sourceFolder.files.pop(movedItem)
          dirTree.push(movedItem)
          sidebarGrid.update(sourceGrid.parentGridItem.el, {h: sourceFolder.files.length + 1})
        }
      }
      
      window.api.getNotebooks()
    });

  }
}

function closeSidebar() {
  document.getElementById("myNotebooks").style.display = "none"
  sidebarGrid.destroy();
  sidebarStatus = 0;
  sidebar.style.minWidth = "0px"
}

function toggleSidebar() {
  sidebarStatus == 0 ? openSidebar() : closeSidebar();
  setTimeout(() => {
    resizeAll();
  }, 400)
}

function expand(expression) {
  return ce.box(["Expand", ce.parse(expression)]).evaluate().latex
}

var pageGrid = GridStack.init({
  float: false,
  handle: '.handle',
  resizable: {handles: 's,sw,w'},
  removable: '#trashCan',
  margin: 7,
  cellHeight: 50
});

function removeWidget(el) {
  if (el.type == "Graph") {
    el.blockContent.getAppletObject().remove();
  }
  el.remove();
  pageGrid.removeWidget(el);
}

pageGrid.on("remove", function (el) {
  if (el.type == "Graph") {
    el.blockContent.getAppletObject().remove();
  }
})
document.addEventListener("dblclick", function (e) {
  const target = e.target.closest("#trashCan");
  if (target) {
    for (var item of pageGrid.getGridItems()) {
      removeWidget(item)
    }
    popupAnimation("clean")
  }
});


document.addEventListener("click", function (e) {
  const target = e.target.closest(".listedFile");
  if (target) {
    target.querySelector(".fileName").id = "open"
    for (var file of document.getElementsByClassName("listedFile")) {
      if (file != target)
        file.querySelector(".fileName").id = "closed"
    }
  }
});

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest(".listedFile");
  if (target) {
    let path = target.closest(".grid-stack-item").gridstackNode.id
    let fileName = target.closest(".grid-stack-item").gridstackNode.id.split("/").pop()
    let folderName = target.closest(".grid-stack-item").gridstackNode.id.split("/").slice(-2, -1)[0]
    loadGrid(path, fileName, folderName)
  }
});

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest("#content");
  if (target) {
    scrollToTop()
  }
});

function scrollToTop() {
  document.querySelector(".pageContainer").scrollTop = 0
}

document.addEventListener("click", e => focus(e))

function focus(e) {
  let focused = e.target
  if (focused.closest(".actionsArea")) {
    document.querySelector(".pageContainer").style.border = "1px solid rgba(100, 100, 100, 0.2)"
    focused = e.target.closest(".actionsArea")
    currentBlock = focused.closest(".grid-stack-item").gridstackNode
    currentBlock.el.querySelector(".actionsArea").style.border = "1px solid rgba(100, 100, 100, 0.3)"
    for (var area of document.getElementsByClassName("actionsArea")) {
      if (area != focused)
        area.style.border = "0px solid transparent"
    }
  } else if (focused.closest(".pageContainer")) {
    focused = e.target.closest(".pageContainer")
    for (var area of document.getElementsByClassName("actionsArea")) {
      area.style.border = "0px solid transparent"
    }
    focused.style.border = "1px solid rgba(100, 100, 100, 0.3)"
  } else {
    for (var area of document.getElementsByClassName("actionsArea")) {
      area.style.border = "0px solid transparent"
    }
    document.querySelector(".pageContainer").style.border = "1px solid rgba(100, 100, 100, 0.2)"
  }
}

pageGrid.on('resizestop', function (el) {
  let resized = el.target.gridstackNode;
  if (resized.type == "Graph") {
    let a = resized.blockContent;
    a.getAppletObject()
      .setSize(
        document.getElementById(`ggBox_${resized.id}`).offsetWidth,
        document.getElementById(`ggBox_${resized.id}`).offsetHeight
      );
  }
})

function resizeAll() {
  let items = pageGrid.getGridItems()
  for (var item of items) {
    if (item.gridstackNode.type == "Graph") {
      item.gridstackNode.blockContent.getAppletObject().setSize(
        document.getElementById(`ggBox_${item.gridstackNode.id}`).offsetWidth,
        document.getElementById(`ggBox_${item.gridstackNode.id}`).offsetHeight
      )
    }
  }
}

function blockData(html, id, type, h, blockContent = {}, x = 12, y = 1000, w = 6, minW = 2, minH = 2) {
  return {
    id: id,
    content: html,
    x: x,
    y: y,
    h: h,
    w: w,
    minW: minW,
    minH: minH,
    type: type,
    blockContent: blockContent
  }
}

function createQuill(id) {
  let bindings = {
    ltr: {
      key: 219,
      ctrlKey: true,
      handler: function (range) {
        this.quill.formatLine(range, 'direction', '');
        this.quill.formatLine(range, 'align', '')
      }
    },
    rtl: {
      key: 221,
      ctrlKey: true,
      handler: function (range) {
        this.quill.formatLine(range, 'direction', 'rtl');
        this.quill.formatLine(range, 'align', 'right')
      }
    }
  }

  var quill = new Quill(`#textEdit_${id}`, {
    modules: {
      keyboard: {
        bindings: bindings
      },
      toolbar: [
        ["formula"]
      ]
    },
    theme: 'bubble'
  });
  quill.format('direction', 'rtl');
  quill.format('align', 'right');
  new QuillMarkdown(quill)
  return quill
}

function addQuill() {
  let id = Date.now();
  let html = `${drag}</img><div class="actionsArea"><div id="textEdit_${id}" class="textBlock"></div></div>`
  let block = blockData(html, id, "Text", 2)
  pageGrid.addWidget(block);
  createQuill(id).focus()
};

function createGgb(id, base64) {
  let options = {
    "appName": "suite",
    "showToolBar": true,
    "height": document.getElementById(`ggBox_${id}`).offsetHeight,
    "width": document.getElementById(`ggBox_${id}`).offsetWidth,
    "showToolBarHelp": false,
    "showAlgebraInput": true,
    "useBrowserForJS": true,
    "showMenuBar": true,
    "enableFileFeatures": false,
    "preventFocus": true,
    "buttonShadows": false,
    "id": id,
    "ggbBase64": base64
  };


  var applet = new GGBApplet(options, true);
  applet.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
  applet.inject(`ggBox_${id}`);
  return applet
}

function addGgb() {
  let id = Date.now();
  var html = `${drag}</img><div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div>`
  let block = blockData(html, id, "Graph", 10)
  pageGrid.addWidget(block);
  let box = document.getElementById(`ggBox_${id.toString()}`)
  box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(id, "")
};

function createMF(id) {
  let mf = new MathfieldElement();
  mf.setOptions({
    inlineShortcuts: defShortcuts,
    plonkSound: null,
    id: id,
    onExport: (mf, latex) => `${latex}`
  })
  document.getElementById(`mf_${id}`).appendChild(mf)
  return mf
}

function addMF() {
  let id = Date.now();
  let html = `${drag}</img><div class="actionsArea"><div id="mf_${id}" class="mathBlock"></div></div>`
  let block = blockData(html, id, "Math", 2)
  pageGrid.addWidget(block)
  createMF(id).focus()
};

function saveApplet(applet) {
  if (applet) {
    return applet.getAppletObject().getBase64()
  }
}

function saveBlockContent(block) {
  switch (block.type) {
    case "Text":
      block.blockContent = document.getElementById(`textEdit_${block.id}`).__quill.getContents()
      break;
    case "Math":
      block.blockContent = document.getElementById(`mf_${block.id}`).firstChild.value
      break;
    case "Graph":
      block.blockContent = block.blockContent.getAppletObject().getBase64()
      break;
    default:
      break;
  }
}

function loadBlockContent(block) {
  switch (block.type) {
    case "Text":
      block.content = `${drag}</img><div class="actionsArea"><div id="textEdit_${block.id}" class="textBlock"></div></div>`
      break;
    case "Math":
      block.content = `${drag}</img><div class="actionsArea"><div id="mf_${block.id}" class="mathBlock"></div></div>`
      break;
    case "Graph":
      block.content = `${drag}</img><div class="actionsArea"><div id="ggBox_${block.id}" class="ggBox"></div></div>`
      break;
    default:
      break;
  }
}

function loadBlock(block) {
  switch (block.type) {
    case "Text":
      block.blockContent = createQuill(block.id).setContents(block.blockContent)
      break;
    case "Math":
      block.blockContent = createMF(block.id).setValue(block.blockContent)
      break;
    case "Graph":
      let box = document.getElementById(`ggBox_${block.id}`)
      box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(block.id, block.blockContent)
      break;
    default:
      break;
  }
}

function saveGrid() {
  renderDirTree()
  let items = pageGrid.save();
  for (var item of items) {
    saveBlockContent(item);
    item.content = ""
  }
  window.api.save(JSON.stringify(items), currentfile, `${document.getElementById("fileName").innerText}.json`);
  let oldName = currentfile
  currentfile = currentfile.replace(currentfile.split("/").pop(), `${document.getElementById("fileName").innerText}.json`)
  let fileToUpdate = findInSidebar(oldName)
  sidebarGrid.update(fileToUpdate, {id: currentfile})
  fileToUpdate.firstChild.firstChild.lastChild.innerText = currentfile.split("/").pop().replace(".json", "")
  
  popupAnimation("save")
  // createFolderList()
}

function loadGrid(path, file, folder) {
  // if (currentfile != undefined) {
  //   saveGrid()
  // }
  document.getElementById("placeHolder").style.display = "none"
  document.getElementById("content").style.display = "flex"

  window.api.load(path);
  folder != "files" ? document.getElementById("slash").innerText = " / " : document.getElementById("slash").innerText = ""
  folder != "files" ? document.getElementById("notebookName").innerText = folder : document.getElementById("notebookName").innerText = ""
  document.getElementById("fileName").innerText = file.replace(".json", "")
  currentfile = path
  window.api.receive("fromMain", (data) => {
    let items = JSON.parse(data.toString());
    pageGrid.removeAll();
    items.map(loadBlockContent)
    pageGrid.load(items);
    items.map(loadBlock)
  });
}

function newFile() {
  if (dirTree.map(file => file = file.path).includes("./files/קובץ חדש.json")) {
    popupAnimation("cantCreate")
  }
  else {
    window.api.newFile()
    document.getElementById("placeHolder").style.display = "none"
    document.getElementById("content").style.display = "flex"
    document.getElementById("slash").innerText = ""
    document.getElementById("notebookName").innerText = ""
    document.getElementById("fileName").innerText = "קובץ חדש"
    currentfile = "./files/קובץ חדש.json"
    if (sidebarStatus == 1){
      sidebarGrid.addWidget({
        content: `<div class="listedFile">${fileIcon}<div class="fileName">קובץ חדש</div></div>`,
        w: 1,
        h: 1,
        id: currentfile
      })
    }
    window.api.receive("fromMain", (data) => {
      pageGrid.load([])
    })
    window.api.getNotebooks()
  }
}

window.api.receive("Text", () => document.getElementById("addQuill").click())
window.api.receive("Graph", () => addGgb())
window.api.receive("newFile", () => newFile())
window.api.receive("Math", () => addMF())
window.api.receive("toggleNotebooks", () => toggleSidebar())
window.api.receive("Save", () => {
  if (currentfile == null) {
    return
  } else {
    saveGrid()
  }
})
window.api.receive("Search", () => {})

// class Block {
//   constructor(){
//     this.htmlContent = `<img src=${drag} class="handle"></img><div class="actionsArea"></div>`
//     this.blockContent = undefined
//     this.id = Date.now()
//     this.x = 12
//     this.y = 1000
//     this.h = 2
//     this.w = 6
//     this.minH = 2
//     this.minW = 2
//     this.type = undefined
//   }

//   add(){
//     grid.addWidget({
//       id: this.id,
//       content: this.htmlContent,
//       blockContent: this.blockContent,
//       type: this.type,
//       x: this.x,
//       y: this.y,
//       h: this.h,
//       w: this.w,
//       minW: this.minW,
//       minH: this.minH
//     })
//   }

//   remove(){grid.removeWidget(this)}

//   save(){return}
// }

// class TextBlock extends Block {
//   constructor(){
//     super()
//     this.htmlContent = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="textEdit_${this.id}" class="textBlock"></div></div>`
//     this.blockContent = undefined
//     this.type = "Text"
//   }

//   create(){
//     createQuill(this.id).focus()
//   }

//   save(){
//     this.blockContent = document.getElementById(`textEdit_${this.id}`).__quill.getContents()
//   }
// }