// loadGrid()

var notebooks; 
var currentfile;

window.api.getNotebooks()
window.api.receive("gotNotebooks", (data) => {
  notebooks = data;
})


let sidebar = document.getElementById("sidebarContainer")
let sidebarContent = document.getElementById("sidebarContent")

function createFolderList() {
  contentList = []
  contentList.push('<div id="myNotebooks">המחברות שלי</div>')
  for (var n = 0; n < notebooks.length; n++){
    let folder = `<div id="folder_${notebooks[n].folder}" class="folder"><div class="folderTitle"><img src="icons/book.svg" alt="notebook" class="notebookIcon"><span class="folderTitleText">${notebooks[n].folder.replace("./files/", "")}</span></div><div class="folderContent"></div></div>`
    if (contentList.includes(folder) == false){
      contentList.push(folder)
    }
  }
  sidebarContent.innerHTML = contentList.join("")
}

function collapsableFolder(notebook){

  switch (notebook.isOpen) {
    case false:
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").src = "icons/openbook.svg"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderTitleText").id = "open"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").style.height = "fit-content"
      for (var file of notebook.files){
        document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").innerHTML += `<div class="listedFile" data-filename="${file.replace(".json", "")}" data-foldername="${notebook.folder}" data-path="${notebook.folder}/${file}"><div class="fileName">${file.replace(".json", "")}</div></div>`
        for (var item of document.getElementById(`folder_${notebook.folder}`).getElementsByClassName("listedFile")) {item.style.width = "250px"}
      }
      notebook.isOpen = true
      break;   
    case true:
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").style.height = "0px"

      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderTitleText").id = "closed"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".notebookIcon").src = "icons/book.svg"
      document.getElementById(`folder_${notebook.folder}`).querySelector(".folderContent").innerHTML = ""
      notebook.isOpen = false
      break;
  }
}


const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360),
        s = '65%',
        l = '89%';
  document.querySelector(":root").style.setProperty("--theme", `hsl(${h},${s},${l})`);
};

window.addEventListener("resize", resizeAll);
document.getElementById("logo").addEventListener("dblclick", getRandomColor);
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("close").addEventListener("click", window.api.close);
document.getElementById("maximize").addEventListener("click", toggleMaximize);
document.getElementById("notebooks").addEventListener("click", toggleSidebar);
document.getElementById("addQuill").addEventListener("click", addQuill);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addMF").addEventListener("click", addMF);
// document.getElementById("save").addEventListener("click", saveGrid);

let drag = "icons/drag-indicator-svgrepo-com.svg"
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

let maximizeStatus = 0
let sidebarStatus = 0

function toggleMaximize() {
  if (maximizeStatus == 0) {
    window.api.maximize();
    maximizeStatus = 1
  } else {
    window.api.unmaximize();
    maximizeStatus = 0
  }
}

function toggleSidebar() {
  if (sidebarStatus == 0) {
    sidebarStatus = 1
    createFolderList()
    sidebar.style.minWidth = "280px"
    sidebar.style.borderLeft = "1px solid #BEBEBE;"
    setTimeout(() => {
      document.getElementById("myNotebooks").style.width = "250px"
      for (var folder of document.getElementsByClassName("folder")) {folder.style.width = "250px"}
      for (var folderName of document.getElementsByClassName("folderTitleText")) {folderName.style.fontSize = "18px"}
      for (var item of document.getElementsByClassName("listedFile")) {item.style.width = "250px"}
    }, 30)
  } else {
    sidebarStatus = 0
    document.getElementById("myNotebooks").style.width = "0px"
    for (var folder of document.getElementsByClassName("folder")) {folder.style.width = "0px"}
    for (var folderName of document.getElementsByClassName("folderTitleText")) {folderName.style.fontSize = "0px"}
    for (var item of document.getElementsByClassName("listedFile")) {item.style.width = "0px"}
    sidebar.style.minWidth = "0px"
    sidebarContent.innerHTML = ""
  }
  setTimeout(() => {resizeAll()}, 600)
}

function expand(expression) {
  return ce.box(["Expand", ce.parse(expression)]).evaluate().latex
}

var grid = GridStack.init({
  float: false,
  handle: '.handle',
  resizable: {
    handles: 's,sw,w'
  },
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

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest(".handle");
  if (target) {
    removeWidget(target.closest(".grid-stack-item"))
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".folderTitle");
  if (target) {
    collapsableFolder(notebooks.find(folder => folder.folder == `./files/${target.innerText}`))
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".listedFile");
  if (target) {
    target.firstChild.id = "open"
    for (var file of document.getElementsByClassName("listedFile")){
      if (file != target)
      file.firstChild.id = "closed"
    }
    let path = target.getAttribute("data-path")
    let fileName = target.getAttribute("data-filename")
    let folderName = target.getAttribute("data-foldername").replace("./files/", "")
    loadGrid(path, fileName, folderName)
  }
});

function focus(e){
  let focused = e.target
    if (focused.closest(".actionsArea")) {
      document.querySelector(".pageContainer").style.border = "1px solid #DDD"
      focused = e.target.closest(".actionsArea")
      focused.style.border = "1px solid #BBB"
      for (var area of document.getElementsByClassName("actionsArea")){
        if (area != focused)
        area.style.border = "0px solid transparent"
      }
    }
    else if (focused.closest(".pageContainer")){
      focused = e.target.closest(".pageContainer")
      for (var area of document.getElementsByClassName("actionsArea")){area.style.border = "0px solid transparent"}
      focused.style.border = "1px solid #BBB"
    }
    else {
      for (var area of document.getElementsByClassName("actionsArea")){area.style.border = "0px solid transparent"}
      document.querySelector(".pageContainer").style.border = "1px solid #DDD"
    }
  }


document.addEventListener("click", e => focus(e))

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
  let html = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="textEdit_${id}" class="textBlock"></div></div>`
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
  var html = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div>`
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
  let html = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="mf_${id}" class="mathBlock"></div></div>`
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
      block.content = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="textEdit_${block.id}" class="textBlock"></div></div>`
      break;
    case "Math":
      block.content = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="mf_${block.id}" class="mathBlock"></div></div>`
      break;
    case "Graph":
      block.content = `<img src=${drag} class="handle"></img><div class="actionsArea"><div id="ggBox_${block.id}" class="ggBox"></div></div>`
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
  window.api.save(JSON.stringify(items), currentfile);
}

function loadGrid(path, file, folder) {
  window.api.load(path);
  document.getElementById("slash").innerText = " / "
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

window.api.receive("Text", () => addQuill())
window.api.receive("Graph", () => addGgb())
window.api.receive("Math", () => addMF())
window.api.receive("toggleNotebooks", () => toggleSidebar())
window.api.receive("Save", () => {
  if (currentfile == null){
    return
  } else {saveGrid()}
})
window.api.receive("Search", () => {})