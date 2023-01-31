// loadGrid()

let dirTree, currentfile, currentBlock;
let maximizeStatus, sidebarStatus = 0

let drag = `<svg class="handle" opacity="0.3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8,18 C9.1045695,18 10,18.8954305 10,20 C10,21.1045695 9.1045695,22 8,22 C6.8954305,22 6,21.1045695 6,20 C6,18.8954305 6.8954305,18 8,18 Z M16,18 C17.1045695,18 18,18.8954305 18,20 C18,21.1045695 17.1045695,22 16,22 C14.8954305,22 14,21.1045695 14,20 C14,18.8954305 14.8954305,18 16,18 Z M8,10 C9.1045695,10 10,10.8954305 10,12 C10,13.1045695 9.1045695,14 8,14 C6.8954305,14 6,13.1045695 6,12 C6,10.8954305 6.8954305,10 8,10 Z M16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 C14.8954305,14 14,13.1045695 14,12 C14,10.8954305 14.8954305,10 16,10 Z M8,2 C9.1045695,2 10,2.8954305 10,4 C10,5.1045695 9.1045695,6 8,6 C6.8954305,6 6,5.1045695 6,4 C6,2.8954305 6.8954305,2 8,2 Z M16,2 C17.1045695,2 18,2.8954305 18,4 C18,5.1045695 17.1045695,6 16,6 C14.8954305,6 14,5.1045695 14,4 C14,2.8954305 14.8954305,2 16,2 Z"/>
</svg>`

let fileIcon = `<svg class="fileIcon" width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0002 14C15.0002 14.2652 14.8948 14.5196 14.7073 14.7071C14.5197 14.8947 14.2654 15 14.0002 15H6.00015C5.73494 15 5.48058 14.8947 5.29305 14.7071C5.10551 14.5196 5.00015 14.2652 5.00015 14C5.00015 13.7348 5.10551 13.4805 5.29305 13.2929C5.48058 13.1054 5.73494 13 6.00015 13H14.0002C14.2654 13 14.5197 13.1054 14.7073 13.2929C14.8948 13.4805 15.0002 13.7348 15.0002 14ZM11.0002 17H6.00015C5.73494 17 5.48058 17.1054 5.29305 17.2929C5.10551 17.4805 5.00015 17.7348 5.00015 18C5.00015 18.2652 5.10551 18.5196 5.29305 18.7071C5.48058 18.8947 5.73494 19 6.00015 19H11.0002C11.2654 19 11.5197 18.8947 11.7073 18.7071C11.8948 18.5196 12.0002 18.2652 12.0002 18C12.0002 17.7348 11.8948 17.4805 11.7073 17.2929C11.5197 17.1054 11.2654 17 11.0002 17ZM20.0002 10.485V19C19.9986 20.3256 19.4713 21.5965 18.5339 22.5338C17.5966 23.4711 16.3257 23.9984 15.0002 24H5.00015C3.67456 23.9984 2.40371 23.4711 1.46637 22.5338C0.529035 21.5965 0.00174045 20.3256 0.000152588 19V5.00002C0.00174045 3.67443 0.529035 2.40358 1.46637 1.46624C2.40371 0.528905 3.67456 0.00161091 5.00015 2.30487e-05H9.51515C10.4348 -0.00234388 11.3457 0.177611 12.1954 0.529482C13.045 0.881354 13.8165 1.39816 14.4652 2.05002L17.9492 5.53602C18.6014 6.18426 19.1185 6.95548 19.4706 7.805C19.8226 8.65451 20.0026 9.56545 20.0002 10.485ZM13.0512 3.46402C12.7364 3.15918 12.3831 2.89695 12.0002 2.68402V7.00002C12.0002 7.26524 12.1055 7.51959 12.293 7.70713C12.4806 7.89467 12.7349 8.00002 13.0002 8.00002H17.3162C17.1031 7.61721 16.8405 7.26417 16.5352 6.95002L13.0512 3.46402ZM18.0002 10.485C18.0002 10.32 17.9682 10.162 17.9532 10H13.0002C12.2045 10 11.4414 9.68395 10.8788 9.12134C10.3162 8.55873 10.0002 7.79567 10.0002 7.00002V2.04702C9.83815 2.03202 9.67915 2.00002 9.51515 2.00002H5.00015C4.2045 2.00002 3.44144 2.31609 2.87883 2.8787C2.31622 3.44131 2.00015 4.20437 2.00015 5.00002V19C2.00015 19.7957 2.31622 20.5587 2.87883 21.1213C3.44144 21.684 4.2045 22 5.00015 22H15.0002C15.7958 22 16.5589 21.684 17.1215 21.1213C17.6841 20.5587 18.0002 19.7957 18.0002 19V10.485Z"/>
</svg>`

let folderIconClosed = `<svg id="closed" class="notebookIcon" width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0002 0H5.00015C3.67456 0.00158786 2.40371 0.528882 1.46637 1.46622C0.529035 2.40356 0.00174045 3.67441 0.000152588 5V20C0.000152588 21.0609 0.42158 22.0783 1.17173 22.8284C1.92187 23.5786 2.93929 24 4.00015 24H15.0002C16.3257 23.9984 17.5966 23.4711 18.5339 22.5338C19.4713 21.5964 19.9986 20.3256 20.0002 19V5C19.9986 3.67441 19.4713 2.40356 18.5339 1.46622C17.5966 0.528882 16.3257 0.00158786 15.0002 0V0ZM18.0002 5V16H6.00015V2H15.0002C15.7958 2 16.5589 2.31607 17.1215 2.87868C17.6841 3.44129 18.0002 4.20435 18.0002 5ZM4.00015 2.172V16C3.29778 15.9994 2.60776 16.1847 2.00015 16.537V5C2.00024 4.37969 2.19261 3.77466 2.55079 3.2682C2.90896 2.76175 3.41532 2.37877 4.00015 2.172ZM15.0002 22H4.00015C3.46972 22 2.96101 21.7893 2.58594 21.4142C2.21087 21.0391 2.00015 20.5304 2.00015 20C2.00015 19.4696 2.21087 18.9609 2.58594 18.5858C2.96101 18.2107 3.46972 18 4.00015 18H18.0002V19C18.0002 19.7956 17.6841 20.5587 17.1215 21.1213C16.5589 21.6839 15.7958 22 15.0002 22Z"/>
</svg>`

let folderIconOpen = `<svg id="open" class="notebookIcon" width="24" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2 1.16303C21.6378 0.692962 20.9791 0.352423 20.2705 0.165598C19.5619 -0.0212274 18.8209 -0.0497575 18.1 0.0820333L14.278 0.776033C13.3956 0.938077 12.5933 1.39206 12 2.06503C11.4052 1.3909 10.6006 0.936811 9.716 0.776033L5.9 0.0820333C5.17916 -0.0498729 4.43813 -0.0217166 3.72938 0.164509C3.02062 0.350735 2.36147 0.690477 1.79857 1.15969C1.23567 1.6289 0.782786 2.2161 0.471982 2.87974C0.161178 3.54338 4.88125e-05 4.26722 0 5.00003L0 15.793C5.74559e-05 16.9638 0.410977 18.0975 1.16113 18.9964C1.91129 19.8953 2.95311 20.5025 4.105 20.712L10.391 21.855C11.455 22.0484 12.545 22.0484 13.609 21.855L19.9 20.712C21.051 20.5014 22.0916 19.8938 22.8408 18.995C23.5899 18.0962 24.0002 16.9631 24 15.793V5.00003C24.0005 4.26748 23.8394 3.54383 23.5283 2.88063C23.2171 2.21742 22.7636 1.63097 22.2 1.16303ZM11 19.928C10.916 19.916 10.832 19.902 10.748 19.887L4.463 18.745C3.77176 18.6193 3.14659 18.2549 2.69649 17.7154C2.24638 17.176 1.99989 16.4956 2 15.793V5.00003C2 4.20438 2.31607 3.44132 2.87868 2.87871C3.44129 2.3161 4.20435 2.00003 5 2.00003C5.18109 2.00047 5.36179 2.01686 5.54 2.04903L9.36 2.74903C9.81961 2.83314 10.2353 3.0755 10.5348 3.43408C10.8344 3.79265 10.999 4.24479 11 4.71203V19.928ZM22 15.793C22.0001 16.4956 21.7536 17.176 21.3035 17.7154C20.8534 18.2549 20.2282 18.6193 19.537 18.745L13.252 19.887C13.168 19.902 13.084 19.916 13 19.928V4.71203C12.9999 4.24365 13.1643 3.79009 13.4643 3.43044C13.7644 3.0708 14.1812 2.82787 14.642 2.74403L18.463 2.04403C18.8957 1.9653 19.3405 1.98269 19.7657 2.09494C20.191 2.2072 20.5863 2.41159 20.9238 2.69364C21.2613 2.97569 21.5326 3.32849 21.7186 3.72706C21.9046 4.12563 22.0007 4.56021 22 5.00003V15.793Z"/>
</svg>`

const parser = new DOMParser();
const toDOM = (el) => {return parser.parseFromString(el, "image/svg+xml")}

window.api.getNotebooks()
window.api.receive("gotNotebooks", (data) => {dirTree = data})

let sidebar = document.getElementById("sidebarContainer")
let sidebarContent = document.getElementById("sidebarContent")
let notebookList = document.createElement('div')
notebookList.id = "notebookList"
sidebarContent.append(notebookList)

let sidebarGrid;

function renderDirTree(){
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
    cellHeight: 50
  };

  sidebarGrid = GridStack.addGrid(document.getElementById('notebookList'), options)

  window.api.getNotebooks()
  window.api.receive("gotNotebooks", (data) => {dirTree = data})
  for (var item of dirTree){
    let html = ""
    let isSubgrid = false
    let subgridOptions, gridItem;
    if (item.files){
      let subGridItems = [];
      for (var file of item.files){
        let html = `<div class="listedFile">${fileIcon}<div class="fileName">${file.name}</div></div>`
        let gridItem = {
          content: html,
          w: 1, h: 1,
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
          cellHeight: 50,
          children: subGridItems
        }
        html = `<div class="folder"><div class="folderTitle">${folderIconClosed}<span class="folderTitleText">${item.name}</span></div><div class="folderContent"></div></div>`
        gridItem = {content: html, w: 1, h: item.files.length+1, id: item.path, subGridDynamic: true, isFolder: true}
      } else {
        html = `<div class="listedFile">${fileIcon}<div class="fileName">${item.name}</div></div>`
        gridItem = {content: html, w: 1, h: 1, id: item.path}
      }
    sidebarGrid.addWidget(gridItem)
    // let sidebarItem = document.querySelector('.sidebarGrid')
    //     .gridstack.getGridItems()
    //     .find(a => a.gridstackNode.id == item.path)
    
    // sidebarItem.style.minHeight = "400px";
    if (isSubgrid){
      GridStack.addGrid(
        document.querySelector('.sidebarGrid')
        .gridstack.getGridItems()
        .find(a => a.gridstackNode.id == item.path)
        .querySelector(".folderContent"), subgridOptions)
    }
  }
  

}


// function createFolderList() {
//   window.api.getNotebooks()
//   window.api.receive("gotNotebooks", (data) => {dirTree = data})

//   contentList = []
//   contentList.push('<div id="myNotebooks">המחברות שלי</div>')
//   contentList.push('<div id="notebookList" ondragover="onDragOver(event)" ondrop="moveFile(event)">')

//   for (var item of dirTree){
//     if (item.type == "folder"){
//         let folder = `<div id="folder_${item.folder}" class="folder" ondragover="onDragOver(event)" ondrop="moveFile(event)"><div class="folderTitle">${folderIconClosed}<span class="folderTitleText">${item.folder.replace("./files/", "")}</span></div><div class="folderContent"></div></div>`
//         if (contentList.includes(folder) == false){contentList.push(folder)}
//     } else {
//         let file = `<div id="file_${item.path}" class="listedFile" draggable="true" ondragstart="onDragStart(event)" data-foldername="" data-filename="${item.fileName}" data-path="${item.path}">${fileIcon}<div class="fileName">${item.fileName}</div></div>`
//         if (contentList.includes(file) == false){contentList.push(file)}
//     }
//   }
//   contentList.push('</div>')
//   sidebarContent.innerHTML = contentList.join("")
//   for (var el of document.getElementsByClassName(".listedFile")){el.id = el.id.replace("./files/./files/", "./files/")}

// }


function resetPage(){
  currentfile = undefined;
  closeSidebar()
  document.getElementById("placeHolder").style.display = "flex"
  document.getElementById("content").style.display = "none"
  document.getElementById("notebookName").innerText = ""
  document.getElementById("slash").innerText = ""
  document.getElementById("fileName").innerText = ""
}

function trashFile(event) {
  if (event.target.closest("#fileTrashCan")){
    const id = event.dataTransfer.getData('text');
    event.dataTransfer.clearData(); 
    window.api.delete(id.replace("file_", ""))
    document.getElementById(id).remove()
    resetPage()
  }
  window.api.getNotebooks()
  window.api.receive("gotNotebooks", (data) => {dirTree = data})
}

// const trashCanTarget = document.getElementById("fileTrashCan");
// trashCanTarget.addEventListener("dragenter", (event) => {
//   if (trashCanTarget.classList.contains("trashZone")) {
//     trashCanTarget.classList.add("dragover");
//   }
// });

// trashCanTarget.addEventListener("dragleave", (event) => {
//   if (trashCanTarget.classList.contains("trashZone")) {
//     trashCanTarget.classList.remove("dragover");
//   }
// });


function collapsableFolder(notebook){

  switch (notebook.isOpen) {
    case false:
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").innerHTML = folderIconOpen
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").replaceWith(...document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").childNodes);
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").firstChild.remove()
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderTitleText").id = "open"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").style.height = "fit-content"
      for (var file of notebook.files){
        let fileHTML = `<div id="file_${notebook.folder}/${file}" class="listedFile" ondragstart="onDragStart(event)" draggable="true" data-filename="${file.replace(".json", "")}" data-foldername="${notebook.folder}" data-path="${notebook.folder}/${file}">${fileIcon}<div class="fileName">${file.replace(".json", "")}</div></div>`
        document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").innerHTML += fileHTML
        for (var item of document.getElementById(`folder_${notebook.folder}`).getElementsByClassName("listedFile")) {item.style.width = "250px"}
      }
      notebook.isOpen = true
      break;   
    case true:
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").style.height = "0px"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderTitleText").id = "closed"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").innerHTML = folderIconClosed
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").replaceWith(...document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").childNodes);
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").firstChild.remove()
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").innerHTML = ""
      notebook.isOpen = false
      break;
  }
}


const getRandomColor = () => {
  // colors = [40, 80, 120, 160, 200, 240, 280, 320, 0]
  colors = 360
  const h = Math.floor(Math.random() * colors);
  document.querySelector(":root").style.setProperty("--theme-h", h);
};

function saveAnimation(scene) {
  switch (scene) {
    case "save":
      var x = document.getElementById("snackbar");
      x.innerText = "הדף נשמר!"
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1200);    
      break;
    case "clean":
      var x = document.getElementById("snackbar");
      x.innerText = "הדף נוקה!"
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1200);    
      break;
  
    default:
      break;
  }
}

window.addEventListener("resize", resizeAll);
document.getElementById('settings').addEventListener('click', window.api.toggle)
document.getElementById("settings").addEventListener("contextmenu", getRandomColor);
document.getElementById("logo").addEventListener("click", resetPage);
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("close").addEventListener("click", ()=>{saveGrid(); window.api.close()});
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


function findInTree(a){
  let attempt = dirTree.find(t => t.path == a.id)
  if (attempt == undefined){
    for (var item of dirTree){
      if (item.files && item.files.length > 0){
        return item.files.find(t => t.path == a.id)
      }
    }
  } else {return attempt}
}


function openSidebar(){
  
  sidebarStatus = 1
  // createFolderList()
  renderDirTree()

  function addEvents(grid) {
    grid.on('dropped', function(event, previousWidget, newWidget) { 
      
      let originalGrid = previousWidget.grid
      let targetGrid = newWidget.grid

      if (newWidget.grid.parentGridItem){ // if newloacted to a folder
        console.log(newWidget.id);
        
        if (originalGrid.parentGridItem){ // if original location is also a folder
          let movedItem = findInTree(newWidget) // find the relevant dirtree item
  
          // console.log(movedItem);
          let targetFolder = findInTree(newWidget.grid.parentGridItem) // find target folder

          let ogfolder = findInTree(originalGrid.parentGridItem) // find original folder
          movedItem.path = movedItem.path.replace(ogfolder.path, targetFolder.path) // change path to new path
          targetGrid.update(newWidget.el, {id: movedItem.path})
          
          ogfolder.files.pop(movedItem) // removed moved item from og folder
          targetFolder.files.push(movedItem) // add moved item to target folder

          sidebarGrid.update(targetGrid.parentGridItem.el, {h: targetFolder.files.length+1}) // update h for target folder
          sidebarGrid.update(originalGrid.parentGridItem.el, {h: ogfolder.files.length+1}) // update h for og folder
          // console.log(newWidget.grid.getGridItems());

        }
        // else {
        //   dirTree.pop(movedItem)
        //   targetFolder.files.push(movedItem)
        //   sidebarGrid.update(newWidget.grid.parentGridItem.el, {h: targetFolder.files.length+1, id: targetFolder.path})
        // }
      // console.log(movedItem);
    } 
    // console.log(dirTree);
    // else {
    //   let sidebarItem = dirTree.find(a => a.path == previousWidget.grid.parentGridItem.id)
    //   let sidebarItemChild = dirTree.find(a => a.path == previousWidget.id)
    //   let moved = sidebarItem.files.pop(sidebarItemChild)
    //   moved.path = "./files/"+moved.name
    //   dirTree.push(moved)
    //   sidebarGrid.update(previousWidget.grid.parentGridItem.el, {h: sidebarItem.files.length+1, id: sidebarItem.path})

    // }
    });
  }
    
    let gridEls = GridStack.getElements('.grid-stack');
    gridEls.forEach(gridEl => {
      let grid = gridEl.gridstack;
      addEvents(grid);
    })

  // sidebarGrid.on('dropped', function(event, previousWidget, newWidget) {    
  //   if (previousWidget){
  //     console.log("aaaa");
  //   }
  //   if (newWidget){
  //     console.log("Bbbb");
  //   }
  //   if (newWidget.grid.parentGridItem){
  //     let sidebarItem = dirTree.find(a => a.path == newWidget.grid.parentGridItem.id)
  //     let sidebarItemChild = dirTree.find(a => a.path == newWidget.id)
  //     sidebarItem.files.push(sidebarItemChild)
  //     // moved.path = newWidget.id moved.name
  //     sidebarGrid.update(newWidget.grid.parentGridItem.el, {h: sidebarItem.files.length+1, id: sidebarItem.path})
  //   } 
  //   else {
  //     let sidebarItem = dirTree.find(a => a.path == previousWidget.grid.parentGridItem.id)
  //     let sidebarItemChild = dirTree.find(a => a.path == previousWidget.id)
  //     let moved = sidebarItem.files.pop(sidebarItemChild)
  //     // moved.path = newWidget.id moved.name
  //     dirTree.push(moved)
  //     sidebarGrid.update(previousWidget.grid.parentGridItem.el, {h: sidebarItem.files.length+1, id: sidebarItem.path})

  //   }

  // })

  sidebar.style.minWidth = "280px"
  sidebar.style.borderLeft = "1px solid #BEBEBE;"
  setTimeout(() => {
    document.getElementById("myNotebooks").style.width = "250px"
    for (var folder of document.getElementsByClassName("folder")) {folder.style.width = "250px"}
    for (var folderName of document.getElementsByClassName("folderTitleText")) {folderName.style.fontSize = "18px"}
    for (var item of document.getElementsByClassName("listedFile")) {item.style.width = "250px"}
  }, 30)
}

function closeSidebar(){
  sidebarStatus = 0
  document.getElementById("myNotebooks").style.width = "0px"
  for (var folder of document.getElementsByClassName("folder")) {folder.style.width = "0px"}
  for (var folderName of document.getElementsByClassName("folderTitleText")) {folderName.style.fontSize = "0px"}
  for (var item of document.getElementsByClassName("listedFile")) {item.style.width = "0px"}
  sidebar.style.minWidth = "0px"
  sidebarContent.innerHTML = ""
}

function toggleSidebar() {
  if (sidebarStatus == 0) { openSidebar() } else { closeSidebar() }
  setTimeout(() => {resizeAll()}, 600)
}

function expand(expression) {
  return ce.box(["Expand", ce.parse(expression)]).evaluate().latex
}

var grid = GridStack.init({
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
  grid.removeWidget(el);
}

grid.on("remove", function (el) {
  if (el.type == "Graph") {
    el.blockContent.getAppletObject().remove();
  }
})
document.addEventListener("dblclick", function (e) {
  const target = e.target.closest("#trashCan");
  if (target) {
    for (var item of grid.getGridItems()){
      removeWidget(item)
      saveAnimation("clean")
  }}
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".folderTitle");
  if (target) {
    collapsableFolder(dirTree.find(folder => folder.folder == `./files/${target.innerText}`))
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".listedFile");
  if (target) {
    target.querySelector(".fileName").id = "open"
    for (var file of document.getElementsByClassName("listedFile")){
      if (file != target)
      file.querySelector(".fileName").id = "closed"
    }  }
});
document.addEventListener("dblclick", function (e) {
  const target = e.target.closest(".listedFile");
  if (target) {

    let path = target.getAttribute("data-path")
    let fileName = target.getAttribute("data-filename")
    let folderName = target.getAttribute("data-foldername").replace("./files/", "")
    loadGrid(path, fileName, folderName)
  }
});

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest("#content");
  if (target) {scrollToTop()}
});

function scrollToTop(){document.querySelector(".pageContainer").scrollTop = 0}

document.addEventListener("click", e => focus(e))

function focus(e){
  let focused = e.target
    if (focused.closest(".actionsArea")) {
      document.querySelector(".pageContainer").style.border = "1px solid rgba(100, 100, 100, 0.2)"
      focused = e.target.closest(".actionsArea")
      currentBlock = focused.closest(".grid-stack-item").gridstackNode
      currentBlock.el.querySelector(".actionsArea").style.border = "1px solid rgba(100, 100, 100, 0.3)"
      for (var area of document.getElementsByClassName("actionsArea")){
        if (area != focused)
        area.style.border = "0px solid transparent"
      }
    }
    else if (focused.closest(".pageContainer")){
      focused = e.target.closest(".pageContainer")
      for (var area of document.getElementsByClassName("actionsArea")){area.style.border = "0px solid transparent"}
      focused.style.border = "1px solid rgba(100, 100, 100, 0.3)"
    }
    else {
      for (var area of document.getElementsByClassName("actionsArea")){area.style.border = "0px solid transparent"}
      document.querySelector(".pageContainer").style.border = "1px solid rgba(100, 100, 100, 0.2)"
    }
  }

grid.on('resizestop', function (el) {
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
  let items = grid.getGridItems()
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
  grid.addWidget(block);
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
  grid.addWidget(block);
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
  grid.addWidget(block)
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
  let items = grid.save();
  for (var item of items) {
    saveBlockContent(item);
    item.content = ""
  }
  
  window.api.save(JSON.stringify(items), currentfile, `${document.getElementById("fileName").innerText}.json`);
  saveAnimation("save")
  // createFolderList()

}

function loadGrid(path, file, folder) {
  if (currentfile != undefined) {saveGrid()}
  document.getElementById("placeHolder").style.display = "none"
  document.getElementById("content").style.display = "flex"
  window.api.load(path);
  if (folder != ""){document.getElementById("slash").innerText = " / "} else {document.getElementById("slash").innerText = ""}
  document.getElementById("fileName").innerText = file
  document.getElementById("notebookName").innerText = folder
  currentfile = path
  window.api.receive("fromMain", (data) => {
    let items = JSON.parse(data.toString());
    grid.removeAll();
    items.map(loadBlockContent)
    grid.load(items);
    items.map(loadBlock)
  });
}

function newFile() {
  window.api.newFile()
  document.getElementById("placeHolder").style.display = "none"
  document.getElementById("content").style.display = "flex"
  document.getElementById("slash").innerText = ""
  document.getElementById("notebookName").innerText = ""
  document.getElementById("fileName").innerText = "קובץ חדש"
  currentfile = "./files/קובץ חדש.json"
  window.api.receive("fromMain", (data) => {grid.load([])})
  window.api.getNotebooks()
  window.api.receive("gotNotebooks", (data) => {dirTree = data})
}

window.api.receive("Text", () => document.getElementById("addQuill").click())
window.api.receive("Graph", () => addGgb())
window.api.receive("newFile", () => newFile())
window.api.receive("Math", () => addMF())
window.api.receive("toggleNotebooks", () => toggleSidebar())
window.api.receive("Save", () => {if (currentfile == null){return} else {
  saveGrid()
}})
window.api.receive("Search", () => {})

let defShortcuts = {
  'sr': '^2',
  'cb': '^3',
  '&': '\\&',
  '%': '\\%',
  '@': '\\degree',

  // Primes
  "''": '^{\\doubleprime}',

  // Greek letters
  'alpha': '\\alpha',
  'delta': '\\delta',
  'Delta': '\\Delta',
  'pi': '\\pi',
  'Pi': '\\Pi',
  'theta': '\\theta',
  'Theta': '\\Theta',

  // Letter-like
  'ii': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\imaginaryI',
  },
  'jj': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\imaginaryJ',
  },
  'ee': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\exponentialE',
  },

  'nabla': '\\nabla',
  'grad': '\\nabla',
  'del': '\\partial',
  'deg': {
    after: 'digit+space',
    value: '\\degree'
  },

  'infty': '\\infty',

  '\u221E': '\\infty', // @TODO: doesn't work
  // '&infin;': '\\infty',
  // '&#8734;': '\\infty',
  'oo': {
    after: 'nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space',
    value: '\\infty',
  },

  // Big operators
  '∑': '\\sum',
  'sum': '\\sum_{#?}^{#?}',
  'int': '\\int_{#?}^{#?}',
  'prod': '\\prod_{#?}^{#?}',
  'sqrt': '\\sqrt{#?}',
  // '∫':                    '\\int',             // There's a alt-B command for this
  '∆': '\\differentialD', // @TODO: is \\diffD most common?
  '∂': '\\differentialD',

  // Functions
  'arcsin': '\\arcsin',
  'arccos': '\\arccos',
  'arctan': '\\arctan',
  'arcsec': '\\arcsec',
  'arccsc': '\\arccsc',

  'arsinh': '\\arsinh',
  'arcosh': '\\arcosh',
  'artanh': '\\artanh',
  'arcsech': '\\arcsech',
  'arccsch': '\\arccsch',
  'arg': '\\arg',
  'ch': '\\ch',
  'cosec': '\\cosec',
  'cosh': '\\cosh',
  'cot': '\\cot',
  'cotg': '\\cotg',
  'coth': '\\coth',
  'csc': '\\csc',
  'ctg': '\\ctg',
  'cth': '\\cth',
  'sec': '\\sec',
  'sinh': '\\sinh',
  'sh': '\\sh',
  'tanh': '\\tanh',
  'tg': '\\tg',
  'th': '\\th',

  'sin': '\\sin',
  'cos': '\\cos',
  'tan': '\\tan',

  'lg': '\\lg',
  'lb': '\\lb',
  'log': '\\log',
  'ln': '\\ln',
  'exp': '\\exp',
  'lim': '\\lim_{#?}',

  // Differentials
  // According to ISO31/XI (ISO 80000-2), differentials should be upright
  'dx': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\differentialD x',
  },
  'dy': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\differentialD y',
  },
  'dt': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\differentialD t',
  },

  // Logic
  'AA': '\\forall',
  'EE': '\\exists',
  '!EE': '\\nexists',
  '&&': '\\land',
  // The shortcut for the greek letter "xi" is interfering with "x in"
  'xin': {
    after: 'nothing+text+relop+punct+openfence+space',
    value: 'x \\in',
  },
  'in': {
    after: 'nothing+letter+closefence',
    value: '\\in',
  },
  '!in': '\\notin',

  // Sets
  'NN': '\\mathbb{N}', // Natural numbers
  'ZZ': '\\Z', // Integers
  'QQ': '\\Q', // Rational numbers
  'RR': '\\R', // Real numbers
  'CC': '\\C', // Complex numbers

  // Operators
  'xx': '\\times',
  '+-': '\\pm',
  '-+': '\\mp',

  // Relational operators
  '≠': '\\ne',
  '!=': '\\ne',
  '\u2265': '\\ge',
  '>=': '\\ge',
  '\u2264': '\\le',
  '<=': '\\le',
  '<<': '\\ll',
  '>>': '\\gg',
  '~~': '\\approx',

  // More operators
  '≈': '\\approx',
  '?=': '\\questeq',
  '÷': '\\div',
  '¬': '\\neg',
  ':=': '\\coloneq',
  '::': '\\Colon',

  // Fences
  '(:': '\\langle',
  ':)': '\\rangle',

  // More Greek letters
  'beta': '\\beta',
  'chi': '\\chi',
  'eps': '\\epsilon',
  'varepsilon': '\\varepsilon',
  'eta': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\eta',
  },
  'gamma': '\\gamma',
  'Gamma': '\\Gamma',
  'iota': '\\iota',
  'kappa': '\\kappa',
  'lambda': '\\lambda',
  'Lambda': '\\Lambda',
  'mu': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\mu',
  },
  'nu': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\nu',
  },
  'µ': '\\mu', // @TODO: or micro?
  'phi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\phi',
  },
  'Phi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\Phi',
  },
  'varphi': '\\varphi',
  'psi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\psi',
  },
  'Psi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\Psi',
  },
  'rho': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\rho',
  },
  'sigma': '\\sigma',
  'Sigma': '\\Sigma',
  'tau': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\tau',
  },
  'vartheta': '\\vartheta',
  'ups': '\\upsilon',
  'xi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space',
    value: '\\xi',
  },
  'Xi': {
    after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
    value: '\\Xi',
  },
  'zeta': '\\zeta',
  'omega': '\\omega',
  'Omega': '\\Omega',
  'Ω': '\\omega', // @TODO: or ohm?

  // More Logic
  'forall': '\\forall',
  'exists': '\\exists',
  '!exists': '\\nexists',
  ':.': '\\therefore',
  // MORE FUNCTIONS
  // 'arg': '\\arg',
  'liminf': '\\liminf_{#?}',
  'limsup': '\\limsup_{#?}',
  'argmin': '\\operatorname*{arg~min}_{#?}',
  'argmax': '\\operatorname*{arg~max}_{#?}',
  'det': '\\det',
  'mod': '\\mod',
  'max': '\\max',
  'min': '\\min',

  'erf': '\\operatorname{erf}',
  'erfc': '\\operatorname{erfc}',
  'bessel': '\\operatorname{bessel}',
  'mean': '\\operatorname{mean}',
  'median': '\\operatorname{median}',

  'fft': '\\operatorname{fft}',

  'lcm': '\\operatorname{lcm}',

  'gcd': '\\operatorname{gcd}',

  'randomReal': '\\operatorname{randomReal}',
  'randomInteger': '\\operatorname{randomInteger}',
  'Re': '\\operatorname{Re}',

  'Im': '\\operatorname{Im}',

  // UNITS
  'mm': {
    after: 'nothing+digit+operator',
    value: '\\operatorname{mm}', // Millimeter
  },
  'cm': {
    after: 'nothing+digit+operator',
    value: '\\operatorname{cm}', // Centimeter
  },
  'km': {
    after: 'nothing+digit+operator',
    value: '\\operatorname{km}', // Kilometer
  },
  'kg': {
    after: 'nothing+digit+operator',
    value: '\\operatorname{kg}', // Kilogram
  },

  // '||':                   '\\lor',
  '...': '\\ldots', // In general, use \ldots
  '+...': '+\\cdots', // ... but use \cdots after + ...
  '-...': '-\\cdots', // ... - and ...
  '->...': '\\to\\cdots', // ->

  '->': '\\to',
  '|->': '\\mapsto',
  '-->': '\\longrightarrow',
  //    '<-':                   '\\leftarrow',
  '<--': '\\longleftarrow',
  '=>': '\\Rightarrow',
  '==>': '\\Longrightarrow',
  // '<=': '\\Leftarrow',     // CONFLICTS WITH LESS THAN OR EQUAL
  '<=>': '\\Leftrightarrow',
  '<->': '\\leftrightarrow',

  '(.)': '\\odot',
  '(+)': '\\oplus',
  '(/)': '\\oslash',
  '(*)': '\\otimes',
  '(-)': '\\ominus',
  // '(-)':                  '\\circleddash',

  '||': '\\Vert',
  '{': '\\{',
  '}': '\\}',

  '*': '\\cdot',

  /*
      //
      // ASCIIIMath
      //
      // Binary operation symbols
      '**':                   '\\ast',
      '***':                  '\\star',
      '//':                   '\\slash',
      '\\\\':                 '\\backslash',
      'setminus':             '\\backslash',
      '|><':                  '\\ltimes',
      '><|':                  '\\rtimes',
      '|><|':                 '\\bowtie',
      '-:':                   '\\div',
      'divide':               '\\div',
      '@':                    '\\circ',
      'o+':                   '\\oplus',
      'ox':                   '\\otimes',
      'o.':                   '\\odot',
      '^^':                   '\\wedge',
      '^^^':                  '\\bigwedge',
      'vv':                   '\\vee',
      'vvv':                  '\\bigvee',
      'nn':                   '\\cap',
      'nnn':                  '\\bigcap',
      'uu':                   '\\cup',
      'uuu':                  '\\bigcup',
      // Binary relation symbols
      '-=':                   '\\equiv',
      '~=':                   '\\cong',
      'lt':                   '<',
      'lt=':                  '\\leq',
      'gt':                   '>',
      'gt=':                  '\\geq',
      '-<':                   '\\prec',
      '-lt':                  '\\prec',
      '-<=':                  '\\preceq',
      // '>-':                   '\\succ',
      '>-=':                  '\\succeq',
      'prop':                 '\\propto',
      'diamond':              '\\diamond',
      'square':               '\\square',
      'iff':                  '\\iff',
      'sub':                  '\\subset',
      'sup':                  '\\supset',
      'sube':                 '\\subseteq',
      'supe':                 '\\supseteq',
      'uarr':                 '\\uparrow',
      'darr':                 '\\downarrow',
      'rarr':                 '\\rightarrow',
      'rArr':                 '\\Rightarrow',
      'larr':                 '\\leftarrow',
      'lArr':                 '\\Leftarrow',
      'harr':                 '\\leftrightarrow',
      'hArr':                 '\\Leftrightarrow',
      'aleph':                '\\aleph',
      // Logic
      'and':                  '\\land',
      'or':                   '\\lor',
      'not':                  '\\neg',
      '_|_':                   '\\bot',
      'TT':                   '\\top',
      '|--':                  '\\vdash',
      '|==':                  '\\models',
      
      // Other functions
      '|__':                  '\\lfloor',
      '__|':                  '\\rfloor',
      '|~':                   '\\lceil',
      '~|':                   '\\rceil',
      // Arrows
      '>->':                   '\\rightarrowtail',
      '->>':                   '\\twoheadrightarrow',
      '>->>':                  '\\twoheadrightarrowtail'
  */
};

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
