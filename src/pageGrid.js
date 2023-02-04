// Initialize pageGrid

var pageGrid = GridStack.init({
    float: false,
    handle: '.handle',
    resizable: {handles: 's,sw,w'},
    removable: '#trashCan',
    margin: 7,
    cellHeight: 50
  });
  
  function removeBlock(el) {
    if (el.type == "Graph") {el.blockContent.getAppletObject().remove();}
    el.remove();
    pageGrid.removeWidget(el);
  }
  
  // pageGrid.on("remove", function (el) {if (el.type == "Graph") {el.blockContent.getAppletObject().remove();}})
  
  // Clear page on trash dblclick
  document.addEventListener("dblclick", function (e) {
    const target = e.target.closest("#trashCan");
    if (target) {pageGrid.getGridItems().map(removeBlock); popupAnimation("clean")}
  });
  
  // Scroll to top on background dblclick
  function scrollToTop() {document.querySelector(".pageContainer").scrollTop = 0}
  document.addEventListener("dblclick", function (e) {if (e.target.closest("#content")) {scrollToTop()}});
  
  // Resize applet on applet block resize
  pageGrid.on('resizestop', function (el) {
    let resized = el.target.gridstackNode;
    if (resized.type == "Graph") {
      let a = resized.blockContent;
      a.getAppletObject().setSize(
          document.getElementById(`ggBox_${resized.id}`).offsetWidth,
          document.getElementById(`ggBox_${resized.id}`).offsetHeight
        );
    }
  })
  
  // Resize all applets on window resize
  function resizeAll() {
    let items = pageGrid.getGridItems()
    for (var item of items) {
      if (item.gridstackNode.type == "Graph") {
        let applet = item.gridstackNode.blockContent.getAppletObject()
        setTimeout(() => {
          applet.setSize(
            document.getElementById(`ggBox_${item.gridstackNode.id}`).offsetWidth,
            document.getElementById(`ggBox_${item.gridstackNode.id}`).offsetHeight
          )
        }, 20);
      }
    }
  }
  
  window.addEventListener("resize", resizeAll);
  
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
      return ce.box(["Expand", ce.parse(expression)]).evaluate().latex
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
  
  document.getElementById("addQuill").addEventListener("click", addQuill);
  document.getElementById("addGgb").addEventListener("click", addGgb);
  document.getElementById("addMF").addEventListener("click", addMF);
  
  function addQuill() {
    let id = Date.now();
    let html = `${drag}</img><div class="actionsArea"><div id="textEdit_${id}" class="textBlock"></div></div>`
    let block = blockData(html, id, "Text", 2)
    pageGrid.addWidget(block);
    createQuill(id).focus();
    document.querySelector('button.ql-formula').addEventListener("click", ()=>{
      document.querySelector('.ql-tooltip-editor').innerHTML = `<math-field role="math" dir="ltr" aria-label="math input field" contenteditable="true" aria-multiline="false" tabindex="0"></math-field>`

    })

  };
  
  function addMF() {
    let id = Date.now();
    let html = `${drag}</img><div class="actionsArea"><div id="mf_${id}" class="mathBlock"></div></div>`
    let block = blockData(html, id, "Math", 2)
    pageGrid.addWidget(block)
    let created = createMF(id)
    created.focus()

    created.addEventListener('keydown', (ev) => {
      if (ev.altKey === true && ev.code === 'KeyX') {
        created.setValue(expand(ev.target.getValue()));
        ev.preventDefault();
      }});

      created.addEventListener('keydown', (ev) => {
      if (ev.altKey === true && ev.code === 'KeyG') {
        document.querySelector(".ggBox").closest('.grid-stack-item').gridstackNode.blockContent.getAppletObject().evalCommand(ev.target.getValue().replace("^{\\prime}", "'"))
        ev.preventDefault();
      }});
  };
  
  function addGgb() {
    let id = Date.now();
    var html = `${drag}</img><div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div>`
    let block = blockData(html, id, "Graph", 10)
    pageGrid.addWidget(block);
    let box = document.getElementById(`ggBox_${id.toString()}`)
    box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(id, "")
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
        keyboard: {bindings: bindings},
        toolbar: [["formula"]]
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
    mf.setOptions({
      inlineShortcuts: defShortcuts,
      plonkSound: null,
      id: id,
      onExport: (mf, latex) => `${latex}`
    })
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
    applet.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
    applet.inject(`ggBox_${id}`);
    return applet
  }
  
  function saveGrid() {
  
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
    if (sidebarScene == "notebooks") {renderDirTree()}
    let items = pageGrid.save();
    for (var item of items) {
      saveBlockContent(item);
      item.content = ""
    }
    window.api.save(JSON.stringify(items), currentfile, `${document.getElementById("fileName").innerText}.json`);
      let fileToUpdate = findInSidebar(currentfile)
      setTimeout(() => {
        let toUpdate = findInTree(fileToUpdate.gridstackNode)
        currentfile = currentfile.replace(currentfile.split("\\").pop(), `${document.getElementById("fileName").innerText}.json`)
        sidebarGrid.update(fileToUpdate, {id: currentfile})
        fileToUpdate.querySelector(".fileName").innerText = currentfile.split("\\").pop().replace(".json", "")
        toUpdate.path = currentfile
        toUpdate.name = currentfile.split("\\").pop()
      }, 5);
    
    popupAnimation("save")
    // createFolderList()
  }
  
  function loadGrid(path, file, folder) {
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
          let mfBlock = createMF(block.id);
          block.blockContent = mfBlock.setValue(block.blockContent)
          mfBlock.addEventListener('keydown', (ev) => {
            if (ev.altKey === true && ev.code === 'KeyX') {
              mfBlock.setValue(expand(ev.target.getValue()));
              ev.preventDefault();
            }});
          mfBlock.addEventListener('keydown', (ev) => {
            if (ev.altKey === true && ev.code === 'KeyG') {
              document.querySelector(".ggBox").closest('.grid-stack-item').gridstackNode.blockContent.getAppletObject().evalCommand(ev.target.getValue().replace("^{\\prime}", "'"))
              ev.preventDefault();
            }});
          break;
        case "Graph":
          let box = document.getElementById(`ggBox_${block.id}`)
          box.closest(".grid-stack-item").gridstackNode.blockContent = createGgb(block.id, block.blockContent)
          break;
        default:
          break;
      }
    }
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
  
  document.getElementById("close").addEventListener("click", saveGrid);