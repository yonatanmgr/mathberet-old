document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addLatex").addEventListener("click", addML);
document.getElementById("save").addEventListener("click", saveGrid);
document.getElementById("load").addEventListener("click", loadGrid);
let applets = [];
let mfList = []
let drag = "drag-indicator-svgrepo-com.svg"

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
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\imaginaryI',
    },
    'jj': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\imaginaryJ',
    },
    'ee': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\exponentialE',
    },
  
    'nabla': '\\nabla',
    'grad': '\\nabla',
    'del': '\\partial',
    'deg': { after: 'digit+space', value: '\\degree' },
  
    'infty': '\\infty',
  
    '\u221E': '\\infty', // @TODO: doesn't work
    // '&infin;': '\\infty',
    // '&#8734;': '\\infty',
    'oo': {
      after:
        'nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space',
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
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\differentialD x',
    },
    'dy': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\differentialD y',
    },
    'dt': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
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
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\eta',
    },
    'gamma': '\\gamma',
    'Gamma': '\\Gamma',
    'iota': '\\iota',
    'kappa': '\\kappa',
    'lambda': '\\lambda',
    'Lambda': '\\Lambda',
    'mu': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\mu',
    },
    'nu': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\nu',
    },
    'µ': '\\mu', // @TODO: or micro?
    'phi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\phi',
    },
    'Phi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\Phi',
    },
    'varphi': '\\varphi',
    'psi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\psi',
    },
    'Psi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\Psi',
    },
    'rho': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\rho',
    },
    'sigma': '\\sigma',
    'Sigma': '\\Sigma',
    'tau': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\tau',
    },
    'vartheta': '\\vartheta',
    'ups': '\\upsilon',
    'xi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space',
      value: '\\xi',
    },
    'Xi': {
      after:
        'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
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

function setGGBParams(id, parentId, base64=""){
  return {
    "appName": "suite",
    "showToolBar": true,
    "height": document.getElementById(parentId).offsetHeight,
    "width": document.getElementById(parentId).offsetWidth,
    "showToolBarHelp": false,
    "showAlgebraInput": true,
    "useBrowserForJS": true,
    "showMenuBar": true,
    "buttonShadows": false,
    "buttonRounding": 0.6,
    "id": id,
    "ggbBase64": base64
  };
}


function expand(expression){
    return ce.box(["Expand", ce.parse(expression.getValue())]).evaluate().latex
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



function create_ggbBlock() {
    return {
        html: html,
        id: id
    };
}

function addText() {
    let id = Date.now();
    let html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="textEdit_${id}" class="textBlock"></div></div></div></div>`
    grid.addWidget(html, {
        x: 12,
        y: 1000,
        h: 2,
        w: 6,
        minW: 1,
        minH: 2,
        id: id,
        type: "Text",
        content: {}
    });

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
        modules: {keyboard: {bindings: bindings}, toolbar: [["formula"]]},
        theme: 'bubble'
    });
    quill.format('direction', 'rtl');
    quill.format('align', 'right');
    const quillMarkdown = new QuillMarkdown(quill)
    quill.focus()
};

function addGgb() {
    let id = Date.now();
    var html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div></div></div></div>`

    grid.addWidget(html, {
        h: 10,
        w: 6,
        id: id,
        type: "Graph",
        content: {}
        });
    createApplet(`ggBox_${id.toString()}`)

};

function addML() {
    let id = Date.now();
    let html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="mf_${id}" class="mathBlock"></div></div></div></div></div>`
    grid.addWidget(html, {
        h: 2,
        w: 6,
        x: 12,
        y: 1000,
        id: id,
        type: "Math",
        content: {}
        });
    let mf = new MathfieldElement();
    
    mf.setOptions({inlineShortcuts: defShortcuts, plonkSound: null, id: id, onExport: (mf, latex) => `${latex}`})
    document.getElementById(`mf_${id}`).appendChild(mf)
    mf.focus()
    
};

function removeWidget(el) {
    if (el.querySelector(".ggBox")) {
        findApplet(el.querySelector(".ggBox").id).getAppletObject().remove();
    }
    el.remove();
    grid.removeWidget(el);
}

document.addEventListener("dblclick", function (e) {
    const target = e.target.closest(".handle");
    if (target) {
        removeWidget(target.parentElement.parentElement)
    }
});

function findApplet(target) {
    return applets.find(applet => applet.getParameters().id == target);
}

grid.on('resizestop', function (el) {
    let resized = el.target.querySelector(".ggBox");
    if (resized) {
        let a = findApplet(resized.id);
        a.getAppletObject()
            .setSize(
                document.getElementById(a.getParameters().id).offsetWidth,
                document.getElementById(a.getParameters().id).offsetHeight
            );
    }
})

function createApplet(element) {
    var applet = new GGBApplet(setGGBParams(element, element), true);
    applet.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
    applet.inject(element);
    applets.push(applet)
}

function saveApplet(applet) {
    if (applet) {
        return applet.getAppletObject().getBase64()
    }
}

function checkForApplet(item) {
    var doc = new DOMParser().parseFromString(item.content, "text/html")
    if (doc.querySelector(".ggBox")) {
        found = findApplet(doc.querySelector(".ggBox").id)
        doc = null
        return found
    } else return
}

function saveBlockContent(block){
  switch (block.type) {
    case "Text":
      block.content = block.querySelector(".textBlock").__quill.getContents()
      break;
    case "Math":
      block.content = block.querySelector("math-field").value
      break;
    case "Graph":
      block.content = saveApplet(block.applet)
      break;
    default:
      break;
  }
}

function saveGrid() {
    let items = grid.save();
    for (var item of items) {
        saveBlockContent(item)
        item.applet = checkForApplet(item)
        if (item.applet) {item.appletParent = item.applet.getParameters().id}
        window.api.send("toMain", JSON.stringify(items));
    }
}

function loadGrid() {
    window.api.send("toMain", "LOAD");

    window.api.receive("fromMain", (data) => {
        let items = JSON.parse(data.toString());
        grid.removeAll();
        mfList = []
        grid.load(items);
        for (var item of items) {
            if (item.type == "Graph") {
                let parent = `ggBox_${item.id}`
                var app = new GGBApplet(setGGBParams(item.id, parent, item.content), true);
                app.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
                app.inject(parent);
                applets.push(app)

            }
            if (item.type == "Math"){
                let mf = new MathfieldElement();
    
                mf.setOptions({inlineShortcuts: defShortcuts, plonkSound: null, id: item.id, onExport: (mf, latex) => `${latex}`})
                mf.setValue(item.content)
                document.getElementById(`mf_${item.id}`).firstChild.remove()
                document.getElementById(`mf_${item.id}`).appendChild(mf)
            }
        }
    });
}

