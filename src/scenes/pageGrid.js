let allDefenitions = [];

// Initialize pageGrid
var pageGrid = GridStack.init({
	float: false,
	handle: '.handle',
	resizable: {
		handles: 's,sw,w'
	},
	removable: '#trashCan',
	itemClass: 'block',
	margin: 7,
	cellHeight: 50,
	acceptWidgets: '.block',
	dragOut: true,
	dragIn: '.block',
});

function removeBlock(el) {
	if (el.type == "Graph") {
		el.blockContent.getAppletObject().remove();
	}
	el.remove();
	pageGrid.removeWidget(el);
}

// pageGrid.on("remove", function (el) {if (el.type == "Graph") {el.blockContent.getAppletObject().remove();}})

// Clear page on trash dblclick
document.addEventListener("dblclick", function (e) {
	const target = e.target.closest("#trashCan");
	if (target) {
		pageGrid.getGridItems().map(removeBlock);
		popupAnimation("clean")
	}
});

// Scroll to top on background dblclick
function scrollToTop() {
	document.querySelector(".pageContainer").scrollTop = 0
}
document.addEventListener("dblclick", function (e) {
	if (e.target.id == "content") {
		scrollToTop()
	}
});

// Resize applet on applet block resize
pageGrid.on('resizestop', async function (el) {
	let resized = el.target.gridstackNode;
	if (resized.type == "Graph") {
		let a = await resized.blockContent;
		a.getAppletObject().setSize(
			resized.el.querySelector(".ggBox").offsetWidth,
			resized.el.querySelector(".ggBox").offsetHeight
		);
	}
	if (resized.type == "Group") {
		resizeAll(resized.el.querySelector(".Group").gridstack)
	}

	// if (resized.type == "Picture") {
	// 	console.log(resized.el.querySelector("canvas")); 
	// }
})

pageGrid.on('dropped', function (event, previousWidget, newWidget) {
	let resized = previousWidget;
	if (resized.type == "Graph") {
		let a = resized.blockContent;
		a.getAppletObject().setSize(
			resized.el.querySelector(".ggBox").offsetWidth,
			resized.el.querySelector(".ggBox").offsetHeight
		);
	}
	else if (resized.type == "Math"){
		resized.el.querySelector("math-field")._mathfield.setOptions({
			inlineShortcuts: defShortcuts,
			plonkSound: null,
			id: resized.id,
			onExport: (mf, latex) => `${latex}`
		})
	}
})

// Resize all applets on window resize
async function resizeAll(grid) {
	let items = grid.getGridItems()
	for (var item of items) {
		if (item.gridstackNode.type == "Graph") {
			let applet = await item.gridstackNode.blockContent
			let appletObject = applet.getAppletObject()
			appletObject.setSize(
				item.gridstackNode.el.querySelector(".ggBox").offsetWidth,
				item.gridstackNode.el.querySelector(".ggBox").offsetHeight
			)
		} else if (item.gridstackNode.type == "Group") {
			resizeAll(item.gridstackNode.el.querySelector(".Group").gridstack)
		}
	}
}

window.addEventListener("resize", () => {
	resizeAll(pageGrid)
});

// Focus on block
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

function expand(expression) {
	if (expression.startsWith("\\begin{gathered}")) {
		let arr = expression.split("\\begin{gathered}")[1].split("\\end{gathered}")[0].split("\\\\").map(s=>s.trim())
		let res = arr.map(exp => ce.box(["Expand", ce.parse(exp)]).evaluate().latex);
		return `\\begin{gathered}${res.join("\\\\")}\\end{gathered}`
	} else if (expression.startsWith("\\begin{matrix}")) {
		let arr = expression.split("\\begin{matrix}")[1].split("\\end{matrix}")[0].split("\\\\").map(s=>s.trim())
		let splitArr = arr.map(a => a.split("&").map(s=>s.trim()));
		let res = splitArr.map(line => line.map(exp => ce.box(["Expand", ce.parse(exp)]).evaluate().latex).join(" & "));
		return `\\begin{matrix}${res.join("\\\\")}\\end{matrix}`
	}
	else return ce.box(["Expand", ce.parse(expression)]).evaluate().latex
}

function blockData(html, id, type, h, blockContent = {}, x = 12, y = 1000, w = 6, minW = 2, minH = 2, maxH = 1000, maxW = 12) {
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
		blockContent: blockContent,
		maxH: maxH,
		maxW: maxW
	}
}

document.getElementById("addQuill").addEventListener("click", addQuill);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addMF").addEventListener("click", addMF);
document.getElementById("addPicture").addEventListener("click", addPicture);
document.getElementById("addDivider").addEventListener("click", addDivider);
document.getElementById("addGroup").addEventListener("click", () => {addGroup()});

function addGroup(type) {
	let groupType;
	let seperator = "&nbsp;-&nbsp;"
	switch (type) {
		case "proof":
			groupType = "הוכחה 📝";
			break;
		case "theorem":
			groupType = "משפט 💡";
			break;
		case "assumption":
			groupType = "הנחה ❓";
			break;
		case "defenition":
			groupType = "הגדרה ❗";
			break;
		case undefined:
			seperator = "";
			groupType = "";
			break;
	}
	let id = Date.now();
	let html = `<div class='groupTop'>${drag}<span class='groupTitle' contenteditable='true'>קבוצה</span><span class='seperator'>${seperator}</span><span class='groupType'>${groupType}</span></div><div class="actionsArea"><div id="group_${id}" class="Group"></div></div>`
	let block = {
		id: id,
		content: html,
		x: 12,
		y: 1000,
		h: 8,
		w: 6,
		minW: 4,
		minH: 4,
		memoryDims: {},
		subType: type,
		groupTitle: "קבוצה",
		type: "Group",
		isOpen: true,
		subGridDynamic: true,
		blockContent: []
	}
	subgridOptions = {
		float: false,
		class: "blockGroup",
		removable: '#trashCan',
		acceptWidgets: ".block:not(.grid-stack-sub-grid)",
		dragOut: true,
		dragIn: ".block:not(.grid-stack-sub-grid)",
		itemClass: "block",
		children: [],
		handle: '.handle',
		resizable: {
			handles: 's,sw,w'
		},
		margin: 7,
		cellHeight: 50
	}

	let groupBlock = pageGrid.addWidget(block);

	groupBlock.classList.remove("theorem")
	groupBlock.classList.remove("defenition")
	groupBlock.classList.remove("assumption")
	groupBlock.classList.remove("proof")
	groupBlock.classList.add(type)

	let group = GridStack.init(subgridOptions, `#group_${id}`)
	group.on('resizestop', function (el) {
		let resized = el.target.gridstackNode;
		if (resized.type == "Graph") {
			let a = resized.blockContent;
			a.getAppletObject().setSize(
				document.getElementById(`ggBox_${resized.id}`).offsetWidth,
				document.getElementById(`ggBox_${resized.id}`).offsetHeight
			);
		}
	})

	group.on('dropped', function (event, previousWidget, newWidget) {
		let resized = previousWidget;
		if (resized.type == "Graph") {
			let a = resized.blockContent;
			a.getAppletObject().setSize(
				document.getElementById(`ggBox_${resized.id}`).offsetWidth,
				document.getElementById(`ggBox_${resized.id}`).offsetHeight
			);
		}
		else if (resized.type == "Math"){
			resized.el.querySelector("math-field")._mathfield.setOptions({
				inlineShortcuts: defShortcuts,
				plonkSound: null,
				id: block.id,
				onExport: (mf, latex) => `${latex}`
			})
		}
	})
	let currentDims;
	group.parentGridItem.el.querySelector(".handle").addEventListener("click", () => {
		switch (group.parentGridItem.isOpen) {
			case true:
				currentDims = {
					"h": group.parentGridItem.h,
					"w": group.parentGridItem.w
				}
				pageGrid.update(group.parentGridItem.el, {
					minH: 1,
					h: 1,
					memoryDims: currentDims,
					isOpen: false,
					noResize: true
				})
				break;
			case false:
				pageGrid.update(group.parentGridItem.el, {
					minH: 4,
					h: currentDims.h,
					isOpen: true,
					noResize: false
				})
				break;
			default:
				break;
		}
	})
}

function addQuill() {
	if (currentfile) {

		let id = Date.now();
		let html = `${drag}<div class="actionsArea"><div id="textEdit_${id}" class="textBlock"></div></div>`
		let block = blockData(html, id, "Text", 2)
		pageGrid.addWidget(block);
		createQuill(id).focus();
		document.querySelector('button.ql-formula').addEventListener("click", () => {
			document.querySelector('.ql-tooltip-editor').innerHTML = `<math-field role="math" dir="ltr" aria-label="math input field" contenteditable="true" aria-multiline="false" tabindex="0"></math-field>`

		})
	} else return
};
function addDivider() {
	if (currentfile) {
		let id = Date.now();
		let html = `${drag}<hr class="pageDivider"></div>`
		let block = blockData(html, id, "Divider", 1, {}, 12, 1000, 12, 1, 1, 1, 12)
		pageGrid.addWidget(block);
	} else return
};

function addPicture() {
	if (currentfile) {
		let id = Date.now();
		let html = `${drag}<div class="actionsArea"><input type="file" class="picturePicker" accept="image/*" id="picker_${id}"></div>`
		let block = blockData(html, id, "Picture", 6)
		pageGrid.addWidget(block);
		createPicture(id, "")
	} else return
};

function createPicture(id, base64){
	let picBlock = document.getElementById(`picker_${id}`)
	let actions = picBlock.closest(".actionsArea")
	if (base64 == "") {
		picBlock.addEventListener('drop', (e)=>{
			e.preventDefault();
			const reader = new FileReader();
			reader.readAsDataURL(e.dataTransfer.files[0]);
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result;
				image.onload = () => {
					picBlock.parentElement.innerHTML = `<canvas width="${image.width}" height="${image.height}" id="picture_${id}" class="pictureBlock"></canvas>`
					picBlock = document.getElementById(`picture_${id}`)
					const context = picBlock.getContext('2d');
					context.drawImage(image, 0, 0, image.width, image.height, 0, 0, picBlock.width, picBlock.height);
					picBlock.style.setProperty("aspect-ratio", `${image.width} / ${image.height}`)
				}
			}
		})
		picBlock.addEventListener('change', (e)=>{
			const reader = new FileReader();
			reader.readAsDataURL(picBlock.files[0]);
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result;
				image.onload = () => {
					picBlock.parentElement.innerHTML = `<canvas width="${image.width}" height="${image.height}" id="picture_${id}" class="pictureBlock"></canvas>`
					picBlock = document.getElementById(`picture_${id}`)
					const context = picBlock.getContext('2d');
					context.drawImage(image, 0, 0, image.width, image.height, 0, 0, picBlock.width, picBlock.height);
					picBlock.style.setProperty("aspect-ratio", `${image.width} / ${image.height}`)
				}
			}
		})
	} else {
		const image = new Image();
		image.src = base64;
		image.decode()
		.then(() => {
			actions.innerHTML = `<canvas width="${image.width}" height="${image.height}" id="picture_${id}" class="pictureBlock"></canvas>`
			let newPicBlock = actions.querySelector(`.pictureBlock`)
			const context = newPicBlock.getContext('2d');
			context.drawImage(image, 0, 0, image.width, image.height, 0, 0, newPicBlock.width, newPicBlock.height);
			newPicBlock.style.setProperty("aspect-ratio", `${image.width} / ${image.height}`)
				})
			.catch((encodingError) => {
				actions.innerHTML = `<input type="file" class="picturePicker" accept="image/*" id="picker_${id}">`
				createPicture(id, "")
			})
	}
	return
}

function addMF() {
	if (currentfile) {

		let id = Date.now();
		let html = `${drag}<div class="actionsArea"><div id="mf_${id}" class="mathBlock"></div></div>`
		let block = blockData(html, id, "Math", 3)
		pageGrid.addWidget(block)
		let created = createMF(id)
		created.focus()
		created.setOptions({
			inlineShortcuts: defShortcuts,
			plonkSound: null,
			id: id,
			onExport: (mf, latex) => `${latex}`
		})
		async function getSelection(scene) {
			let text = await navigator.clipboard.readText();
			created.executeCommand(['copyToClipboard', '#0'])
			let newText = await navigator.clipboard.readText();
			switch (scene) {
				case "expand":
					created.executeCommand(['insert', expand(newText), {'insertionMode': 'replaceSelection'}])
					break;
				case "graph":
					let adapted = newText
						.replace("^{\\prime}", "'")
						.replace("\\left", "")
						.replace("\\right", "")
						.replace("\\cos", "cos")
						.replace("\\sin", "sin")
						.replace("\\tan", "tan")

					if (document.querySelector(".ggBox")) {
						document.querySelector(".ggBox").closest('.grid-stack-item').gridstackNode.blockContent.getAppletObject().evalCommand(adapted);
					}
					break;
				default:
					break;
			}
			navigator.clipboard.writeText(text);
		}

		created.addEventListener('keydown', (ev) => {
			if (ev.altKey === true) {
				switch (ev.code) {
					case "KeyX":
						getSelection("expand");
						ev.preventDefault();
						break;
					case "KeyG":
						getSelection("graph");
						ev.preventDefault();
						break;
					case "Equal":
						created.insert('\\approx');
						ev.preventDefault();
						break;
					case "Comma":
						created.insert('\\measuredangle');
						ev.preventDefault();
						break;
					case "Digit0":
						created.insert('\\emptyset');
						ev.preventDefault();
						break;
					case "Enter":
						created.insert('\\begin{gathered} {#?} \\end{gathered}');
						ev.preventDefault();
						break;
					case "KeyC":
						if (ev.shiftKey === true) {
							created.insert('\\complement');
							ev.preventDefault();
							break;
						}
						case "KeyT":
							if (ev.shiftKey === true) {
								created.insert('\\triangle');
								ev.preventDefault();
								break;
							}
							default:
								break;
				}
				ev.preventDefault();
			} else if (ev.shiftKey === true && ev.code === 'Enter') {
				created.executeCommand('addRowAfter');
				ev.preventDefault();
			}
		});

		created.addEventListener('input', (ev) => {
			let foundDefs = pageGrid.getGridItems().filter(item=>{
				if (item.gridstackNode.type == "Math") {
					return item.querySelector("math-field").value.includes("\\coloneq") && item.querySelector("math-field").value.split("\\coloneq")[1] != ""
				}
			})
			function setDefenitions() {
				for (const defenition of foundDefs) {
					let defJson = {
						"blockId": defenition.gridstackNode.id,
						"defenition": {
							[defenition.querySelector("math-field").value.split("\\coloneq")[0]]: defenition.querySelector("math-field").value.split("\\coloneq")[1]
						}
					}
					if (allDefenitions.map(def=>def=def.blockId).includes(defJson.blockId) == false) {	
						allDefenitions.push(defJson)
						ce.assume(Object.keys(defJson.defenition)[0], Object.values(defJson.defenition)[0])
					} else {
						let oldDef = allDefenitions.find(def => {return def.blockId == defJson.blockId})
						if (oldDef.blockId == defJson.blockId && oldDef.defenition != defJson.defenition) { 
							oldDef.defenition = defJson.defenition
							ce.forget(Object.keys(defJson.defenition)[0])
							ce.assume(Object.keys(defJson.defenition)[0], Object.values(defJson.defenition)[0])
						}
					}
				}
			}
			setDefenitions()
		})
	} else return
};

function addGgb() {
	if (currentfile) {
		let id = Date.now();
		var html = `${drag}<div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div>`
		let block = blockData(html, id, "Graph", 10)
		pageGrid.addWidget(block);
		let box = document.getElementById(`ggBox_${id.toString()}`)
		box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(id, "")
	} else return
};

function createQuill(id) {
	let bindings = {
		ltr: {
			key: 219,
			shortKey: true,
			handler: function (range) {
				this.quill.formatLine(range, 'direction', '');
				this.quill.formatLine(range, 'align', '')
				this.quill.typingDirection = ''
				this.quill.currentAlign = ''
			}
		},
		rtl: {
			key: 221,
			shortKey: true,
			handler: function (range) {
				this.quill.formatLine(range, 'direction', 'rtl');
				this.quill.formatLine(range, 'align', 'right')
				this.quill.typingDirection = 'rtl'
				this.quill.currentAlign = 'right'
			}
		},
		math: {
			key: 52,
			shiftKey: true,
			handler: async function (range) {
				const text = await navigator.clipboard.readText();
				let selection = this.quill.getSelection();
				this.quill.insertEmbed(selection.index, 'formula', text);
				this.quill.setSelection(30, 30);
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
	quill.typingDirection = 'rtl'
	quill.currentAlign = 'right'

	new QuillMarkdown(quill)

	return quill
}


function createMF(id) {
	let mf = new MathfieldElement();
	document.getElementById(`mf_${id}`).appendChild(mf)
	return mf
}

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
	applet.setHTML5Codebase('libraries/Geogebra/HTML5/5.0/web3d/');
	applet.inject(`ggBox_${id}`);
	return applet
}

function saveGrid() {

	function saveBlockContent(block) {
		switch (block.type) {
			case "Divider":
				block.content = `${drag}<hr class="pageDivider"></div>`
				break;
			case "Picture":
				if (document.getElementById(`picture_${block.id}`)) {block.blockContent = document.getElementById(`picture_${block.id}`).toDataURL();}
				else {block.blockContent = ""}
				break;
			case "Text":
				block.blockContent = document.getElementById(`textEdit_${block.id}`).__quill.getContents()
				break;
			case "Math":
				block.blockContent = document.getElementById(`mf_${block.id}`).firstChild.value
				break;
			case "Graph":
				block.blockContent = block.blockContent.getAppletObject().getBase64()
				break;
			case "Group":
				block.groupTitle = document.getElementById(`group_${block.id}`).closest(".grid-stack-item-content").querySelector(".groupTitle").innerText
				let foundGroup = document.getElementById(`group_${block.id}`).gridstack
				let groupItems = foundGroup.save()
				for (var item of groupItems) {
					saveBlockContent(item);
					item.content = "";
				}
				let currentDims = {
					"h": foundGroup.parentGridItem.h,
					"w": foundGroup.parentGridItem.w
				}
				pageGrid.update(foundGroup.parentGridItem.el, {
					memoryDims: currentDims
				})
				block.blockContent = groupItems
				delete block.subGrid
				break;
			default:
				break;
		}
	}
	if (sidebarScene == "notebooks") {
		renderDirTree()
	}
	let items = pageGrid.save();
	for (var item of items) {
		saveBlockContent(item);
		item.content = "";
	}

	window.api.save(JSON.stringify(items), currentfile, `${document.getElementById("fileName").innerText}.json`);
	let fileToUpdate = findInSidebar(currentfile)
	setTimeout(() => {
		let toUpdate = findInTree(fileToUpdate.gridstackNode)
		currentfile = currentfile.replace(currentfile.split("\\").pop(), `${document.getElementById("fileName").innerText}.json`)
		sidebarGrid.update(fileToUpdate, {
			id: currentfile
		})
		fileToUpdate.querySelector(".fileName").innerText = currentfile.split("\\").pop().replace(".json", "")
		toUpdate.path = currentfile
		toUpdate.name = currentfile.split("\\").pop()
	}, 5);
	getArchive()
	popupAnimation("save")
	// createFolderList()
}

function loadBlockContent(block) {
	switch (block.type) {
		case "Divider":
			block.content = `${drag}<hr class="pageDivider"></div>`
			break;
		case "Picture":
			block.content = `${drag}<div class="actionsArea"><input type="file" class="picturePicker" accept="image/*" id="picker_${block.id}"></div>`
			break;
		case "Text":
			block.content = `${drag}<div class="actionsArea"><div id="textEdit_${block.id}" class="textBlock"></div></div>`
			break;
		case "Math":
			block.content = `${drag}<div class="actionsArea"><div id="mf_${block.id}" class="mathBlock"></div></div>`
			break;
		case "Graph":
			block.content = `${drag}<div class="actionsArea"><div id="ggBox_${block.id}" class="ggBox"></div></div>`
			break;
		case "Group":
			let groupType;
			let seperator = "&nbsp;-&nbsp;"
			switch (block.subType) {
				case "proof":
					groupType = "הוכחה 📝";
					break;
				case "theorem":
					groupType = "משפט 💡";
					break;
				case "assumption":
					groupType = "הנחה ❓";
					break;
				case "defenition":
					groupType = "הגדרה ❗";
					break;
				case undefined:
					seperator = "";
					groupType = "";
					break;
			}
			block.content = `<div class='groupTop'>${drag}<span class='groupTitle' contenteditable='true'>${block.groupTitle}</span><span class='seperator'>${seperator}</span><span class='groupType'>${groupType}</span></div><div class="actionsArea"><div id="group_${block.id}" class="Group"></div></div>`
			async function setClass() {
				let id = await block.id.toString()
				let blockParent = findInGrid(id)
				blockParent.classList.remove("theorem")
				blockParent.classList.remove("defenition")
				blockParent.classList.remove("assumption")
				blockParent.classList.remove("proof")
				blockParent.classList.add(block.subType)
			}
			if (document.getElementById("searchPage").style.display == "none") {setClass()}
			break;
		default:
			break;
	}

}

function loadBlock(block) {
	
	switch (block.type) {
		case "Picture":
			let found = currentAllPics.find(pic=>{return pic.Path.split("\\").pop().split(".")[0] == block.id})
			if (found != undefined) {
				createPicture(block.id, found.Base64)
			}
			break;
		case "Text":
			block.blockContent = createQuill(block.id).setContents(block.blockContent)
			break;
		case "Math":
			let mfBlock = createMF(block.id);
			mfBlock.setOptions({
				inlineShortcuts: defShortcuts,
				plonkSound: null,
				id: block.id,
				onExport: (mf, latex) => `${latex}`
			})
			block.blockContent = mfBlock.setValue(block.blockContent)
			async function getSelection(scene) {
				let text = await navigator.clipboard.readText();
				mfBlock.executeCommand(['copyToClipboard', '#0'])
				let newText = await navigator.clipboard.readText();
				switch (scene) {
					case "expand":
						mfBlock.executeCommand(['insert', expand(newText), {'insertionMode': 'replaceSelection'}])
						break;
					case "graph":
						let adapted = newText
							.replace("^{\\prime}", "'")
							.replace("\\left", "")
							.replace("\\right", "")
							.replace("\\cos", "cos")
							.replace("\\sin", "sin")
							.replace("\\tan", "tan")

						if (document.querySelector(".ggBox")) {
							document.querySelector(".ggBox").closest('.grid-stack-item').gridstackNode.blockContent.getAppletObject().evalCommand(adapted);
						}
						break;
					default:
						break;
				}
				navigator.clipboard.writeText(text);
			}
			mfBlock.addEventListener('keydown', (ev) => {
				if (ev.altKey === true) {
					switch (ev.code) {
						case "KeyX":
							getSelection("expand");
							ev.preventDefault();
							break;
						case "KeyG":
							getSelection("graph");
							ev.preventDefault();
							break;
						case "Equal":
							mfBlock.insert('\\approx');
							ev.preventDefault();
							break;
						case "Comma":
							mfBlock.insert('\\measuredangle');
							ev.preventDefault();
							break;
						case "Digit0":
							mfBlock.insert('\\emptyset');
							ev.preventDefault();
							break;
						case "KeyC":
							if (ev.shiftKey === true) {
								mfBlock.insert('\\complement');
								ev.preventDefault();
								break;
							}
							case "KeyT":
								if (ev.shiftKey === true) {
									mfBlock.insert('\\triangle');
									ev.preventDefault();
									break;
								}
								case "Enter": {
									mfBlock.insert('\\begin{gathered} {#?} \\end{gathered}');
									ev.preventDefault();
									break;
								}
								default:
									break;
					}
					ev.preventDefault();
				} else if (ev.shiftKey === true && ev.code === 'Enter') {
					mfBlock.executeCommand('addRowAfter');
					ev.preventDefault();
				}
			});

			mfBlock.addEventListener('input', (ev) => {
				let foundDefs = pageGrid.getGridItems().filter(item=>{
					if (item.gridstackNode.type == "Math") {
						return item.querySelector("math-field").value.includes("\\coloneq") && item.querySelector("math-field").value.split("\\coloneq")[1] != ""
					}
				})
				function setDefenitions() {
					for (const defenition of foundDefs) {
						let defJson = {
							"blockId": defenition.gridstackNode.id,
							"defenition": {
								[defenition.querySelector("math-field").value.split("\\coloneq")[0]]: defenition.querySelector("math-field").value.split("\\coloneq")[1]
							}
						}
						if (allDefenitions.map(def=>def=def.blockId).includes(defJson.blockId) == false) {	
							allDefenitions.push(defJson)
							ce.pushScope(defJson.defenition)
						} else {
							let oldDef = allDefenitions.find(def => {return def.blockId == defJson.blockId})
							if (oldDef.blockId == defJson.blockId && oldDef.defenition != defJson.defenition) { 
								oldDef.defenition = defJson.defenition
								ce.pushScope(oldDef.defenition)
							}
						}
					}
				}
				setDefenitions()
			})
			break;
		case "Graph":
			if (document.getElementById("searchPage").style.display != "none"){
				let box = document.getElementById(`ggBox_${block.id}`)
				box.closest(".grid-stack-item").gridstackNode.blockContent = {};
			}
			else{
				let box = document.getElementById(`ggBox_${block.id}`)
				box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(block.id, block.blockContent)
			}
			break;

		case "Group":

			let group = document.getElementById(`group_${block.id}`)
			let items = group.closest(".grid-stack-item").gridstackNode.blockContent
			let subgridOptions = {
				float: false,
				class: "blockGroup",
				removable: '#trashCan',
				acceptWidgets: ".block:not(.grid-stack-sub-grid)",
				dragOut: true,
				dragIn: ".block:not(.grid-stack-sub-grid)",
				itemClass: "block",
				children: [],
				handle: '.handle',
				resizable: {
					handles: 's,sw,w'
				},
				margin: 7,
				cellHeight: 50
			}
			let createdGrid = GridStack.init(subgridOptions, group.id)
			// group = GridStack.init(subgridOptions, group.id)
			createdGrid.on('resizestop', function (el) {
				let resized = el.target.gridstackNode;
				if (resized.type == "Graph") {
					let a = resized.blockContent;
					a.getAppletObject().setSize(
						document.getElementById(`ggBox_${resized.id}`).offsetWidth,
						document.getElementById(`ggBox_${resized.id}`).offsetHeight
					);
				}
			})
			createdGrid.on('dropped', function (event, previousWidget, newWidget) {
				let resized = previousWidget;
				if (resized.type == "Graph") {
					let a = resized.blockContent;
					a.getAppletObject().setSize(
						document.getElementById(`ggBox_${resized.id}`).offsetWidth,
						document.getElementById(`ggBox_${resized.id}`).offsetHeight
					);
				}
				else if (resized.type == "Math"){
					resized.el.querySelector("math-field")._mathfield.setOptions({
						inlineShortcuts: defShortcuts,
						plonkSound: null,
						id: block.id,
						onExport: (mf, latex) => `${latex}`
					})
				}
			})
			items.forEach(loadBlockContent)
			createdGrid.load(items);
			items.forEach(loadBlock)
			let currentDims;
			let memDims = group.gridstack.parentGridItem.memoryDims;
			group.gridstack.parentGridItem.el.querySelector(".handle").addEventListener("click", () => {
				switch (group.gridstack.parentGridItem.isOpen) {
					case true:
						currentDims = {
							"h": group.gridstack.parentGridItem.h,
							"w": group.gridstack.parentGridItem.w
						}
						pageGrid.update(group.gridstack.parentGridItem.el, {
							minH: 1,
							h: 1,
							memoryDims: currentDims,
							isOpen: false,
							noResize: true
						})
						break;
					case false:
						pageGrid.update(group.gridstack.parentGridItem.el, {
							minH: 4,
							h: memDims.h,
							isOpen: true,
							noResize: false
						})
						break;
					default:
						break;
				}
			})
			group.gridstack.parentGridItem.el.children[0].style.flexDirection = "column-reverse"
			setTimeout(() => {
				group.gridstack.parentGridItem.el.children[0].style.flexDirection = "column"
			}, 2);
	}
}

function loadGrid(path, file, folder) {

	

	// if (currentfile != undefined) {
	//   saveGrid()
	// }
	document.getElementById("fileName").style.fontWeight = 700
	document.getElementById("fileName").contentEditable = true
	document.getElementById("fileName").style.userSelect = "unset"
	document.getElementById("searchPage").style.display = "none";
	document.getElementById("archivePage").style.display = "none"
	document.querySelectorAll(".archiveBlock").forEach(block => {
		document.getElementById(block.id).gridstack.destroy();
	})
	document.getElementById("placeHolder").style.display = "none"
	document.getElementById("content").style.display = "flex"

	window.api.load(path);
	getAllPictures(path)
	folder != "files" ? document.getElementById("slash").innerText = " / " : document.getElementById("slash").innerText = ""
	folder != "files" ? document.getElementById("notebookName").innerText = folder : document.getElementById("notebookName").innerText = ""
	document.getElementById("fileName").innerText = file.replace(".json", "")
	currentfile = path
	window.api.receive("fromMain", (data) => {
		let items = JSON.parse(data.toString());
		pageGrid.removeAll();
		items.forEach(loadBlockContent)
		pageGrid.load(items);
		items.forEach(loadBlock)
	});
}

if (currentfile) {
	document.getElementById("close").addEventListener("click", saveGrid);
} else {
	document.getElementById("close").removeEventListener("click", saveGrid);
}