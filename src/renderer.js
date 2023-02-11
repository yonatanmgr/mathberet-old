let dirTree, currentfile, currentBlock, currentTheme, archiveContent, pageStyle, hebPageStyle, allBlocks, currentSearchRes;
let maximizeStatus, sidebarStatus = 0;


function getColor() {
	window.api.getUserColor()
	window.api.receive("gotUserColor", (color) => {document.querySelector(":root").style.setProperty("--theme-h", color);})
}

getColor()

function getTheme() {
	window.api.getUserTheme()
	window.api.receive("gotUserTheme", (theme) => {currentTheme = theme})
}

getTheme()

function getPageStyle() {
	window.api.getPageStyle()
	window.api.receive("gotPageStyle", (style) => {
		pageStyle = style;
		switch (pageStyle) {
			case "ruled":
				hebPageStyle = "משבצות";
				document.querySelector(":root").style.setProperty("--page-style", "conic-gradient(from 90deg at 1px 1px,#0000 90deg,hsla(var(--theme-h), 80%, 30%, 0.15) 0) 0 0/49.2px 50px");
				break;
			case "dots":
				hebPageStyle = "נקודות";
				document.querySelector(":root").style.setProperty("--page-style", "radial-gradient(hsla(var(--theme-h), 80%, 30%, 0.25) 1px, transparent 2px) 0 0 / 49.5px 50px");
				break;
			case "transparent":
				hebPageStyle = "חלק";
				document.querySelector(":root").style.setProperty("--page-style", "transparent");
				break;
		}
	})
}

getPageStyle()

function getArchive(){
	window.api.getArchive()
	window.api.receive("gotArchive", (data) => {archiveContent = data})
}

getArchive()

function getPicture(id){
	window.api.getPicture(id)
	window.api.receive("gotPicture", (b64)=>{
		createPicture(id, b64)
	})
}

function startSearch() {
	window.api.startSearch()
	window.api.receive("gotAllBlocks", (result)=> {
		allBlocks = result;
	})
}

function search(text) {
	let finalResult = [];
	for (const file of allBlocks) {
		let result = [];
		for (const block of file.blocks) {
			let match;
			switch (block.type) {
				case "Graph": match = ""; continue;
				case "Group":
					let groupRes = [];
					block.h = block.memoryDims.h
					block.w = block.memoryDims.w
					block.blockContent.forEach(block=>{
						let match;
						switch (block.type) {
							case "Graph": match = ""; break;
							case "Math": match = block.blockContent; break;
							case "Text":
								tempRes = [];
								block.blockContent.ops.forEach(i=>tempRes.push(i.insert));
								match = tempRes.join("");
								break;
						}
						groupRes.push(match)
					})
					match = groupRes.join(" ");
					break;
				case "Math": match = block.blockContent; break;
				case "Text":
					tempRes = [];
					block.blockContent.ops.forEach(i=>tempRes.push(i.insert));
					match = tempRes.join("");
					break;
			}
			if (match){
				if (match.toLowerCase().includes(text.toLowerCase())) { result.push(block) } else continue;
			}
		}
		finalResult.push({"filePath": file.filePath, "fileName": file.fileName, "blocks": result})
	}
	return finalResult
}

document.onclick = hideMenu; 
document.addEventListener("contextmenu", function(e){ if(e.target.closest("#addGroup, .groupType, .groupTitle") && document.getElementById("searchPage").style == "none") {rightClick(e)} })

function hideMenu() {
  document.getElementById("contextMenu").children[0].id = "";
  document.getElementById("contextMenu").style.display = "none" 
} 

function rightClick(e) { 
    e.preventDefault(); 
    if (document.getElementById("contextMenu").style.display == "block"){hideMenu(); }
    else{ 
        var menu = document.getElementById("contextMenu")
        if (e.target.closest("#addGroup")){
          menu.children[0].id = ""
		  menu.style.display = 'block'; 
		  menu.style.left = e.pageX-50 + "px"; 
		  menu.style.top = e.pageY + "px"; 
  
        }
        else if (e.target.closest(".groupType") || e.target.closest(".groupTitle") && e.target.closest(".groupTop").querySelector(".groupType").innerText == ""){
          menu.children[0].id = e.target.closest('.block').gridstackNode.id
		  menu.style.display = 'block'; 
		  menu.style.left = e.pageX-50 + "px"; 
		  menu.style.top = e.pageY + "px"; 
  
        }
    } 
} 

document.getElementById("contextMenu").children[0].querySelector('.undefined').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  if (clicked){
    let block = findInGrid(clicked)
    block.querySelector(".seperator").innerHTML = ""
  
    block.querySelector(".groupType").innerText = ""
	  
	block.classList.remove("theorem")
	block.classList.remove("defenition")
	block.classList.remove("assumption")
	block.classList.remove("proof")

    pageGrid.update(block, {subType: undefined})
  }
  else{ addGroup() }
})
document.getElementById("contextMenu").children[0].querySelector('.proof').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  if (clicked){

  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "הוכחה 📝"
  
  block.classList.remove("theorem")
  block.classList.remove("defenition")
  block.classList.remove("assumption")
  block.classList.add("proof")

  pageGrid.update(block, {subType: "proof"})
}
else{ addGroup("proof") }

})
document.getElementById("contextMenu").children[0].querySelector('.assumption').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  if (clicked){

  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "הנחה ❓"

  block.classList.remove("theorem")
  block.classList.remove("defenition")
  block.classList.add("assumption")
  block.classList.remove("proof")

  pageGrid.update(block, {subType: "assumption"})
}
  else{ addGroup("assumption") }

})
document.getElementById("contextMenu").children[0].querySelector('.theorem').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  if (clicked){

	let block = findInGrid(clicked)
	block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

	block.querySelector(".groupType").innerText = "משפט 💡"

	block.classList.add("theorem")
	block.classList.remove("defenition")
	block.classList.remove("assumption")
	block.classList.remove("proof")

	pageGrid.update(block, {subType: "theorem"})
	}
  else{ addGroup("theorem") }

})
document.getElementById("contextMenu").children[0].querySelector('.defenition').addEventListener("click", ()=>{  
  let clicked = document.getElementById("contextMenu").children[0].id
  if (clicked){

	let block = findInGrid(clicked)
	block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

	block.querySelector(".groupType").innerText = "הגדרה ❗"
		
	block.classList.remove("theorem")
	block.classList.add("defenition")
	block.classList.remove("assumption")
	block.classList.remove("proof")

	pageGrid.update(block, {subType: "defenition"})
}
  else{ addGroup("defenition") }

})

function findInGrid(id){return pageGrid.getGridItems().find(t => t.gridstackNode.id == id)}

// GENERAL

// Return to start page
function resetPage() {
	currentfile = undefined;
	closeSidebar();
	document.getElementById("shortcutsHelp").classList.replace("open", "closed");
	document.getElementById("placeHolder").style.display = "flex";
	document.getElementById("archivePage").style.display = "none";
	document.getElementById("searchPage").style.display = "none";
	document.getElementById("content").style.display = "none";
	document.getElementById("notebookName").innerText = "";
	document.getElementById("slash").innerText = "";
	document.getElementById("fileName").style.fontWeight = 700;
	document.getElementById("fileName").innerText = "";
}

const noResults = (a) => a.blocks.length == 0;

function searchMode() {
	currentfile = undefined;
	startSearch();
    let app = document.getElementById("searchApp");
	document.getElementById("shortcutsHelp").classList.replace("open", "closed");
	document.getElementById("notebookName").innerText = "";
	document.getElementById("slash").innerText = "";
	document.getElementById("fileName").contentEditable = false;
	document.getElementById("fileName").innerHTML = `<input id="searchBar" type="text" placeholder="מה תרצו לחפש?">`;
	document.getElementById("searchBar").focus();
	if (!document.getElementById("searchBar").value){app.innerHTML = ""}
	document.getElementById("searchBar").addEventListener("input", ()=>{
		if (document.getElementById("searchBar").value){
			app.style.display = "flex"
			document.getElementById("placeHolder").style.display = "none";
			document.getElementById("archivePage").style.display = "none";
			document.getElementById("content").style.display = "none";
			document.getElementById("searchPage").style.display = "flex";
		} else {
			document.getElementById("searchPage").style.display = "none";
			app.style.display = "none"
		}
		let res = search(document.getElementById("searchBar").value).filter(file => file.blocks.length > 0);
		if (res.every(noResults)) {app.innerHTML = ""}
		else {		
			let html = [];
			app.innerHTML = "";
			app.innerHTML = res.forEach(file => {
				let fileName = file.fileName;
				let filePath = file.filePath;
				let container = `<div class="searchContainer"><div class="sideLine"><div class="sideContainer"><div class="circle"></div><div class="line"></div></div></div><div class="biglist"><div class="searchBlockTitle first" id="title_${filePath}"><span class="titleText">${fileName}</span></div><div class="listContainer"><div class="list" id="file_${filePath}"></div></div></div></div>`
				html.push(container)
				});
			
			app.innerHTML = html.join("");
			
			res.forEach(file => {
				let options = {
					disableResize: true,
					disableDrag: true,
					float: false,
					handle: '.handle',
					class: 'blockGroup',
					column: 1,
					itemClass: 'block',
					children: [],
					margin: 10,
					cellHeight: 50,
				}
				let resGrid = GridStack.init(options, document.getElementById(`file_${file.filePath}`))
				
			})
			

			document.querySelectorAll(".searchBlockTitle.first span").forEach(title=>title
				.addEventListener("click", (e) => {
					let titleGrid = document.getElementById(title.parentElement.id.replace("title_", "file_")).gridstack
					let con = e.target.closest(".searchContainer")
					if (con.querySelector(".line").classList.contains("open")) {
						titleGrid.removeAll()
						con.classList.remove("open")
						con.querySelector(".titleText").classList.remove("open")
						con.querySelector(".listContainer").classList.remove("open")
						con.querySelector(".line").classList.remove("open")
			
					} else {
						let blocks = res.find(file => file.filePath == title.parentElement.id.replace("title_", "")).blocks
						blocks.forEach(loadBlockContent)
						titleGrid.load(blocks);
						blocks.forEach(loadBlock)

						con.classList.add("open")
						con.querySelector(".titleText").classList.add("open")
						con.querySelector(".listContainer").classList.add("open")
						con.querySelector(".line").classList.add("open")
			
					}
			}))
		}
	})
}

// Return to start page
function openArchive() {
	currentfile = undefined;
	closeSidebar();
	document.getElementById("shortcutsHelp").classList.replace("open", "closed");
	document.getElementById("placeHolder").style.display = "none";
	document.getElementById("archivePage").style.display = "flex";
	document.getElementById("searchPage").style.display = "none";
	document.getElementById("content").style.display = "none";
	document.getElementById("notebookName").innerText = "";
	document.getElementById("slash").innerText = "";
	document.getElementById("fileName").style.fontWeight = 200;
	document.getElementById("fileName").innerText = "ארכיון";
	document.getElementById("fileName").contentEditable = false;
	document.getElementById("fileName").style.userSelect = "none";
	if (pageGrid != undefined) {pageGrid.removeAll()}
	renderArchive();
}


// Maximize / Unmaximize window
function toggleMaximize() {
	if (maximizeStatus == 0) {window.api.maximize(); maximizeStatus = 1}
	else {window.api.unmaximize(); maximizeStatus = 0}
}

// Create a snackbar popup; Specify scenario in "scene" 
function popupAnimation(scene) {
	var x = document.getElementById("snackbar");
	let snackbarInnerText = "";
	switch (scene) {
		case "save":
			snackbarInnerText = "הדף נשמר!";
			break;
		case "clean":
			snackbarInnerText = "הדף נוקה!";
			break;
		case "cantCreate":
			snackbarInnerText = "לא ניתן ליצור קובץ חדש, קיים קובץ בעל שם זהה!";
			break;
		case "cantMove":
			snackbarInnerText = "לא ניתן להזיז את הקובץ למיקום זה!";
			break;
		default:
			break;
	}
	x.innerText = snackbarInnerText;
	x.className = "show";
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 1200);
}


// Returns true if given array has duplicates, false otherwise
function hasDuplicates(array) {
	var valuesSoFar = Object.create(null);
	for (var i = 0; i < array.length; ++i) {
		var value = array[i];
		if (value in valuesSoFar) {return true;}
		valuesSoFar[value] = true;
	}
	return false;
}

function toggleHelp() {
	if (document.getElementById("shortcutsHelp").classList.contains("closed")) {
		document.getElementById("shortcutsHelp").classList.replace("closed", "open")
	} else {
		document.getElementById("shortcutsHelp").classList.replace("open", "closed")
	}
}

document.getElementById('fileName').addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {e.preventDefault();}
});

// Buttons
document.getElementById("close").addEventListener("click", () => {setTimeout(() => {window.api.close()}, 2)});
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("maximize").addEventListener("click", toggleMaximize);
document.getElementById("logo").addEventListener("click", resetPage);
document.getElementById("archive").addEventListener("click", openArchive);
document.getElementById("help").addEventListener('click', toggleHelp)
document.getElementById("search").addEventListener('click', searchMode)
document.getElementById("settings").addEventListener('click', () => {toggleSidebar('settings')})
document.addEventListener('coloris:pick', event => {
	window.api.setUserColor(parseInt(event.detail.color.split(",")[0].split("(")[1]))
	document.querySelector(":root").style.setProperty("--theme-h", parseInt(event.detail.color.split(",")[0].split("(")[1]));
});

// Shortcuts
window.api.receive("openArchive", () => document.getElementById("archive").click())
window.api.receive("Shortcuts", () => document.getElementById("help").click())
window.api.receive("Group", () => document.getElementById("addGroup").click())
window.api.receive("Text", () => document.getElementById("addQuill").click())
window.api.receive("Graph", () => document.getElementById("addGgb").click())
window.api.receive("Math", () => document.getElementById("addMF").click())
window.api.receive("newFile", () => document.getElementById("newFile").click())
window.api.receive("toggleNotebooks", () => document.getElementById("notebooks").click())
window.api.receive("Save", () => {if (currentfile == null) {return} else {saveGrid()}})
window.api.receive("Search", () => document.getElementById("search").click())
window.api.receive("Home", () => resetPage())