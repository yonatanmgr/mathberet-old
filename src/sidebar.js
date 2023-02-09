let currentFile;
let sidebar = document.getElementById("sidebarContainer")
let sidebarContent = document.getElementById("sidebarContent")
let sidebarGrid, sidebarScene;

document.getElementById("notebooks").addEventListener("click", () => {
	toggleSidebar("notebooks")
});

reloadDirTree();

let createMyNotebooks = () => {
	sidebarScene = "notebooks";
	document.getElementById("sidebarTitle").innerText = "המחברות שלי"
	document.getElementById("sidebarTitle").title = "לחצו פעמיים לפתיחת תיקיית המחברות"
	setTimeout(() => {
		renderDirTree();
		GridStack.getElements('.sidebarGrid, .notebook').forEach(gridEl => {addEvents(gridEl.gridstack)})
	}, 50)
	setTimeout(() => {
		renderDirTree()
	}, 1)

	function addEvents(grid) {
		grid.on('dropped', function(event, previousWidget, newWidget) {
			let movedItem = findInTree(previousWidget) // find the relevant dirtree item
			let sourceGrid = previousWidget.grid
			let targetGrid = newWidget.grid
			let targetGridItems = targetGrid.getGridItems().map(item => item.gridstackNode.id.split("\\").slice(-1)[0])
			if (hasDuplicates(targetGridItems) || movedItem.files) {
				popupAnimation("cantMove");
				targetGrid.removeWidget(newWidget.el)
				sourceGrid.addWidget(previousWidget.el, {
					id: previousWidget.id
				})
			} else {
				if (targetGrid.parentGridItem) { // if moved into a folder
					if (sourceGrid.parentGridItem) { // if original location is also a folder
						let targetFolder = findInTree(targetGrid.parentGridItem) // find target folder
						let sourceFolder = findInTree(sourceGrid.parentGridItem) // find original folder

						movedItem.path = movedItem.path.replace(sourceFolder.path, targetFolder.path) // change path to new path
						targetGrid.update(newWidget.el, {
							id: movedItem.path
						})
						console.log(previousWidget.id);
						console.log(newWidget.id);
						window.api.move(previousWidget.id, newWidget.id)

						sourceFolder.files.pop(movedItem) // removed moved item from og folder
						targetFolder.files.push(movedItem) // add moved item to target folder

						sidebarGrid.update(targetGrid.parentGridItem.el, {
							h: targetFolder.files.length + 1
						}) // update h for target folder
						sidebarGrid.update(sourceGrid.parentGridItem.el, {
							h: sourceFolder.files.length + 1
						}) // update h for og folder

					} else if (sourceGrid === sidebarGrid) {
						let targetFolder = findInTree(targetGrid.parentGridItem)

						movedItem.path = `${targetFolder.path}\\${movedItem.name}`
						targetGrid.update(newWidget.el, {
							id: movedItem.path
						})
						window.api.move(previousWidget.id, newWidget.id)

						dirTree.pop(movedItem)
						targetFolder.files.push(movedItem)

						sidebarGrid.update(targetGrid.parentGridItem.el, {
							h: targetFolder.files.length + 1
						})
					}
				} else {
					let sourceFolder = findInTree(sourceGrid.parentGridItem)
					movedItem.path = `${dirTreeLocation}\\${movedItem.name}`
					targetGrid.update(newWidget.el, {
						id: movedItem.path
					})
					window.api.move(previousWidget.id, newWidget.id)
					sourceFolder.files.pop(movedItem)
					dirTree.push(movedItem)
					sidebarGrid.update(sourceGrid.parentGridItem.el, {
						h: sourceFolder.files.length + 1
					})
				}
			}

			window.api.getNotebooks()
		});
	}
}

let createSettings = () => {
	sidebarScene = "settings";

	document.getElementById("sidebarTitle").innerText = "העדפות"
	document.getElementById("sidebarTitle").title = ""
	document.getElementById("sidebarTitle").title = ""
	document.getElementById("sidebarList").innerHTML = `
  <div id='settingsZone'>
  <div class='settingsArea'>
	<span class='settingsText'>צבע נושא</span><input id="colorSwitcher" type="button" data-coloris>
  </div>
    <div class='settingsArea'>
    <span class='settingsText'>ערכת נושא</span><div class='settingsButton' id='themeSwitcher'>${currentTheme == "light" ? "מצב אור" : "מצב חושך"}</div>
    </div>
    <div class='settingsArea'>
      <span class='settingsText'>סגנון דף</span><div class='settingsButton' id="pageSwitcher">${hebPageStyle}</div>
    </div>
  </div>`
	document.getElementById("themeSwitcher").addEventListener('click', () => {
		let theme;
		switch (document.getElementById("themeSwitcher").innerText) {
			case "מצב אור":
				theme = "מצב חושך"
				break;
			case "מצב חושך":
				theme = "מצב אור"
				break;
		}
		document.getElementById("themeSwitcher").innerText = theme
		Coloris.close();
		window.api.toggle()
	})
	document.getElementById("colorSwitcher").addEventListener('click', (a) => {
		getTheme()
		Coloris({
			swatches: 
			[
				'hsl(192, 100%, 89%)', 'hsl(224, 100%, 89%)', 'hsl(256, 100%, 89%)', 'hsl(288, 100%, 89%)', 'hsl(330, 100%, 89%)', 'hsl(2, 100%, 89%)', 'hsl(32, 100%, 89%)', 'hsl(48, 100%, 89%)', 'hsl(96, 100%, 89%)', 'hsl(128, 100%, 89%)', 'hsl(160, 100%, 89%)'
			],
			format: 'hsl',
			margin: 10,
			swatchesOnly: true
		});
	})
	document.getElementById("pageSwitcher").addEventListener('click', (a) => {
		switch (pageStyle) {
			case "dots":
				document.getElementById("pageSwitcher").innerText = "חלק"
				window.api.setPageStyle("transparent")
				break;
			case "transparent":
				document.getElementById("pageSwitcher").innerText = "משבצות"
				window.api.setPageStyle("ruled")
				break;
			case "ruled":
				document.getElementById("pageSwitcher").innerText = "נקודות"
				window.api.setPageStyle("dots")
				break;
		
			default:
				break;
		}
		getPageStyle()
	})



}

// Self explainatory
function openSidebar(scene) {
	sidebarStatus = 1

	switch (scene) {
		case "notebooks":
			document.getElementById("sidebarList").innerHTML = ""
			createMyNotebooks();
			break;
		case "settings":
			if (sidebarScene == "notebooks") {
				document.getElementById("sidebarList").innerHTML = ""
			}
			createSettings();
			break;

		default:
			break;
	}
}

// Self explainatory
function closeSidebar() {
	sidebar.classList.replace("open", "closed")
	sidebarContent.classList.replace("open", "closed")
	sidebarStatus = 0;
}

// Self explainatory
function toggleSidebar(scene) {
	if (sidebarStatus == 0) {
		sidebar.classList.replace("closed", "open")
		sidebarContent.classList.replace("closed", "open")
		openSidebar(scene)
	} else {
		scene == sidebarScene ? closeSidebar() : openSidebar(scene)
	}

	// sidebarStatus == 0 ? openSidebar(scene) : closeSidebar();
	setTimeout(() => {
		resizeAll(pageGrid);
	}, 400)
}

// Fetch dirTree from files folder
function reloadDirTree() {
	window.api.getNotebooks();
	window.api.receive("gotNotebooks", (data) => {
		dirTree = data.allFiles;
		dirTreeLocation = data.filesPath
	});
}

// Render the dirTree grid in the sidebar
function renderDirTree() {
	reloadDirTree();

	if (document.querySelector(".sidebarGrid")) {
		document.querySelector(".sidebarGrid").gridstack.destroy()
	}

	let options = {
		class: "sidebarGrid",
		float: false,
		removable: '#fileTrashCan',
		dragOut: true,
		acceptWidgets: '.sidebarItem',
		dragIn: '.sidebarItem',
		disableResize: true,
		// rtl: true,
		column: 1,
		itemClass: "sidebarItem",
		cellHeight: 45
	};

	sidebarGrid = GridStack.addGrid(document.getElementById('sidebarList'), options)

	for (var item of dirTree) {
		let html = ""
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
				acceptWidgets: '.sidebarItem',
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

			function createSubgrid(item, subgridOptions) {
				GridStack.addGrid(
					document.querySelector('.sidebarGrid')
					.gridstack.getGridItems()
					.find(a => a.gridstackNode.id == item.path)
					.querySelector(".folderContent"), subgridOptions);
			}

			sidebarGrid.addWidget(gridItem)
			createSubgrid(item, subgridOptions);

		} else {
			continue
		}
	}
	for (var item of dirTree) {
		if (item.files) {
			continue
		} else {
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

// Find file in dirTree
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

// Find sidebarGrid item
function findInSidebar(a) {
	let arr = sidebarGrid.getGridItems()
	let attempt = arr.find(t => t.gridstackNode.id == a)
	if (attempt == undefined) {
		for (var item of arr) {
			if (item.querySelector(".notebook")) {
				if (item.querySelector(".notebook").gridstack.getGridItems().length > 0) {
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

// Collapse or open folder
function collapsableFolder(target, clicked, folder) {
	switch (folder.isOpen) {
		case false:
			if (folder.files.length == 0) {
				sidebarGrid.update(clicked.el, {
					h: folder.files.length + 2
				})
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
			} else {
				sidebarGrid.update(clicked.el, {
					h: folder.files.length + 1
				})
			}
			folder.isOpen = true
			target.querySelector(".notebookIcon").id = "open"
			target.querySelector(".notebookIcon").innerHTML = folderIconOpenPath
			target.querySelector(".folderTitleText").id = "open"
			break;

		case true:
			sidebarGrid.update(clicked.el, {
				h: 1
			})
			folder.isOpen = false
			target.querySelector(".notebookIcon").id = "closed"
			target.querySelector(".notebookIcon").innerHTML = folderIconClosedPath
			target.querySelector(".folderTitleText").id = "closed"
			break;
	}
}

// Listen to folder click
document.addEventListener("click", function(e) {
	const target = e.target.closest(".folderTitle")
	if (target) {
		let found = target.closest(".grid-stack-sub-grid").gridstackNode;
		collapsableFolder(target, found, findInTree(found))
	}
});

// Open files folder on myNotebooks double click
document.addEventListener("dblclick", function(e) {
	if (sidebarScene == "notebooks" && e.target.closest("#sidebarTitle")) {
		window.api.openFiles()
	}
});

// File deletion context menu
document.addEventListener('contextmenu', function(e) {
	if (e.target.closest(".listedFile")) {
		e.preventDefault();
		let file = e.target.closest(".listedFile");
		if (file.firstChild.classList.contains("toDelete")) {
			file.firstChild.classList.remove("toDelete");
			file.firstChild.innerHTML = fileIconPath;
		} else {
			file.firstChild.classList.add("toDelete");
			file.firstChild.innerHTML = trashIcon;
		}
	}
}, false);

// File deletion function
document.addEventListener('click', function(e) {
	if (e.target.closest(".fileIcon.toDelete")) {
		let file = e.target.closest(".listedFile");
		let gridstackItem = file.closest(".grid-stack-item").gridstackNode;
		let targetGrid = gridstackItem.grid;
		let sidebarGrid = document.querySelector(".sidebarGrid").gridstack;
		let targetFolder;
		let dirTreeItem = findInTree(gridstackItem);
		if (targetGrid != sidebarGrid) {
			targetFolder = findInTree(targetGrid.parentGridItem);
			targetFolder.files.pop(dirTreeItem);
			targetGrid.removeWidget(gridstackItem.el);
			sidebarGrid.update(targetGrid.parentGridItem.el, {
				h: targetFolder.files.length + 1
			});
		} else {
			sidebarGrid.removeWidget(gridstackItem.el);
		}
		window.api.delete(gridstackItem.id);
		reloadDirTree()

		if (dirTreeItem.path == currentfile) {
			resetPage()
		}
	}
}, false);

// Highlight file
document.addEventListener("click", function(e) {
	const target = e.target.closest(".listedFile");
	if (target) {
		target.querySelector(".fileName").id = "open"
		for (var file of document.getElementsByClassName("listedFile")) {
			if (file != target)
				file.querySelector(".fileName").id = "closed"
		}
	}
});

// Open file
document.addEventListener("dblclick", function(e) {
	const target = e.target.closest(".listedFile");
	if (target) {
		let path = target.closest(".grid-stack-item").gridstackNode.id
		let fileName = findInTree(target.closest(".grid-stack-item").gridstackNode).name
		let folderName = findInTree(target.closest(".grid-stack-item").gridstackNode).parentFolder.split("\\").pop()
		loadGrid(path, fileName, folderName)
	}
});

// Create a new file
function newFile() {

	if (dirTree.map(file => file = file.path).includes(`${dirTreeLocation}\\קובץ חדש.json`)) {
		popupAnimation("cantCreate")
	} else {
		
		window.api.newFile()
		document.getElementById("fileName").style.fontWeight = 700
		document.getElementById("fileName").contentEditable = true
		document.getElementById("fileName").style.userSelect = "unset"
	
		document.querySelectorAll(".archiveBlock").forEach(block => {
			document.getElementById(block.id).gridstack.destroy();
		})
		document.getElementById("archivePage").style.display = "none"
		document.getElementById("placeHolder").style.display = "none"
		document.getElementById("content").style.display = "flex"
		document.getElementById("slash").innerText = ""
		document.getElementById("notebookName").innerText = ""
		document.getElementById("fileName").innerText = "קובץ חדש"
		currentfile = `${dirTreeLocation}\\קובץ חדש.json`
		if (sidebarStatus == 1) {
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

document.getElementById("newFile").addEventListener("click", newFile);