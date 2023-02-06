let dirTree, currentfile, currentBlock, currentTheme;
let maximizeStatus, sidebarStatus = 0

function getColor() {
	window.api.getUserColor()
	window.api.receive("gotUserColor", (color) => {
		document.querySelector(":root").style.setProperty("--theme-h", color);
	})
}

function getTheme() {
	window.api.getUserTheme()
	window.api.receive("gotUserTheme", (theme) => {
		currentTheme = theme;
	})
	return currentTheme
}
getColor()
getTheme()

document.onclick = hideMenu; 
document.addEventListener("contextmenu", function(e){ if(e.target.closest(".groupType, .groupTitle")) {rightClick(e)} })

function hideMenu() {
  document.getElementById("contextMenu").children[0].id = "";
  document.getElementById("contextMenu").style.display = "none" 
} 

function rightClick(e) { 
    e.preventDefault(); 
    if (document.getElementById("contextMenu").style.display == "block"){
      hideMenu(); 
    }
    else{ 
        var menu = document.getElementById("contextMenu")  
        menu.children[0].id = e.target.closest('.block').gridstackNode.id
        menu.style.display = 'block'; 
        menu.style.left = e.pageX-50 + "px"; 
        menu.style.top = e.pageY + "px"; 
    } 
} 

function findInGrid(id){
  let arr = pageGrid.getGridItems()
	return arr.find(t => t.gridstackNode.id == id)
}

document.getElementById("contextMenu").children[0].querySelector('.undefined').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = ""

  block.querySelector(".groupType").innerText = ""
  pageGrid.update(block, {subType: undefined})
})
document.getElementById("contextMenu").children[0].querySelector('.proof').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "הוכחה 📝"
  pageGrid.update(block, {subType: "proof"})
})
document.getElementById("contextMenu").children[0].querySelector('.assumption').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "הנחה ❓"
  pageGrid.update(block, {subType: "assumption"})
})
document.getElementById("contextMenu").children[0].querySelector('.theorem').addEventListener("click", ()=>{
  let clicked = document.getElementById("contextMenu").children[0].id
  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "משפט 💡"
  pageGrid.update(block, {subType: "theorem"})
})
document.getElementById("contextMenu").children[0].querySelector('.defenition').addEventListener("click", ()=>{  
  let clicked = document.getElementById("contextMenu").children[0].id
  let block = findInGrid(clicked)
  block.querySelector(".seperator").innerHTML = "&nbsp;-&nbsp;"

  block.querySelector(".groupType").innerText = "הגדרה ❗"
  pageGrid.update(block, {subType: "defenition"})
})


// GENERAL

// Return to start page
function resetPage() {
	currentfile = undefined;
	closeSidebar()
	document.getElementById("shortcutsHelp").classList.replace("open", "closed")
	document.getElementById("placeHolder").style.display = "flex"
	document.getElementById("content").style.display = "none"
	document.getElementById("notebookName").innerText = ""
	document.getElementById("slash").innerText = ""
	document.getElementById("fileName").innerText = ""
}


// Maximize / Unmaximize window
function toggleMaximize() {
	if (maximizeStatus == 0) {
		window.api.maximize();
		maximizeStatus = 1
	} else {
		window.api.unmaximize();
		maximizeStatus = 0
	}
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
		if (value in valuesSoFar) {
			return true;
		}
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

document.getElementById('fileName').addEventListener('keydown', (evt) => {
	if (evt.key === 'Enter') {
		evt.preventDefault();
	}
});

// Buttons
document.getElementById("close").addEventListener("click", () => {
	setTimeout(() => {
		window.api.close()
	}, 2);
});
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("maximize").addEventListener("click", toggleMaximize);
document.getElementById("logo").addEventListener("click", resetPage);
document.getElementById("help").addEventListener('click', toggleHelp)
document.getElementById("settings").addEventListener('click', () => {
	toggleSidebar('settings')
})
document.addEventListener('coloris:pick', event => {
	window.api.setUserColor(parseInt(event.detail.color.split(",")[0].split("(")[1]))
	document.querySelector(":root").style.setProperty("--theme-h", parseInt(event.detail.color.split(",")[0].split("(")[1]));
});

// Shortcuts
window.api.receive("Shortcuts", () => document.getElementById("help").click())
window.api.receive("Group", () => document.getElementById("addGroup").click())
window.api.receive("Text", () => document.getElementById("addQuill").click())
window.api.receive("Graph", () => document.getElementById("addGgb").click())
window.api.receive("Math", () => document.getElementById("addMF").click())
window.api.receive("newFile", () => document.getElementById("newFile").click())
window.api.receive("toggleNotebooks", () => document.getElementById("notebooks").click())
window.api.receive("Save", () => {
	if (currentfile == null) {
		return
	} else {
		saveGrid()
	}
})
window.api.receive("Search", () => {})