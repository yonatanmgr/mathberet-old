document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addLatex").addEventListener("click", addML);
document.getElementById("save").addEventListener("click", saveGrid);
document.getElementById("load").addEventListener("click", loadGrid);
let applets = [];
let drag = "drag-indicator-svgrepo-com.svg"
let defShortcuts = {
    'sr': '^2',
    'cb': '^3',
    '&': '\\&',
    '%': '\\%',
  
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
    'epsilon': '\\epsilon',
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
    'upsilon': '\\upsilon',
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

var grid = GridStack.init({
    float: false,
    handle: '.handle',
    resizable: {
        handles: 's,sw,w'
    },
    margin: 7,
    cellHeight: 50
});

function create_textBlock() {
    let id = Date.now();
    var html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="textEdit_${id}"></div></div></div></div>`
    return {
        html: html,
        id: id
    };
}

function create_mq() {
    let id = Date.now();
    var html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><span id="math_field_${id}"></span></div></div></div>`
    return {
        html: html,
        id: id
    };
}

function create_ml() {
    let id = Date.now();
    var html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="mf_${id}"></div></div></div></div></div>`
    return {
        html: html,
        id: id
    };
}

function create_ggbBlock() {
    let id = Date.now();
    var html = `<div class="grid-stack-item" id="blockId_${id}"><div class="grid-stack-item-content"><img src=${drag} class="handle"></img><div class="actionsArea"><div id="ggBox_${id}" class="ggBox"></div></div></div></div></div>`
    return {
        html: html,
        id: id
    };
}

function addText() {
    let created = create_textBlock()
    grid.addWidget(created.html, {
        x: 12,
        y: 1000,
        h: 2,
        w: 6,
        minW: 1,
        minH: 2,
        id: created.id
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

    var quill = new Quill(`#textEdit_${created.id}`, {
        modules: {
            keyboard: {
                bindings: bindings
            },
            formula: true,
            toolbar: [
                []
            ]
        },
        theme: 'bubble'
    });
    quill.format('direction', 'rtl');
    quill.format('align', 'right');

    // quill.on('selection-change', range => {
    //     if (range) {
    //       quill.theme.tooltip.show();
    //       quill.theme.tooltip.position(quill.getBounds(range));
    //     }
    // }
    // )

    // var enableMathQuillFormulaAuthoring = mathquill4quill();
    // enableMathQuillFormulaAuthoring(quill);
    const quillMarkdown = new QuillMarkdown(quill)
    quill.focus()
};

function addMq() {
    let created = create_mq()
    grid.addWidget(created.html, {
        h: 2,
        w: 6,
        minW: 1,
        maxH: 4,
        id: created.id
    });
    var mathFieldSpan = document.getElementById(`math_field_${created.id.toString()}`)
    var MQ = MathQuill.getInterface(2);
    let config = {
        autoCommands: 'to oo and or dots int deg pi theta sq sum sr cb ge pm alpha beta gamma delta eps zeta eta iota kappa lambda mu nu xi rho sigma tau ups phi chi psi omega ne neq in notin sub sup cap cup nsub nsup RR ZZ NN CC HH QQ PP mid',
        autoOperatorNames: 'log ln lg'
    }
    var mathField = MQ.MathField(mathFieldSpan, config);

    mathField.focus();
};

function addGgb() {
    let created = create_ggbBlock()
    grid.addWidget(created.html, {
        h: 10,
        w: 6,
        id: created.id
        });
    createApplet(`ggBox_${created.id.toString()}`)

};

function addML() {
    let created = create_ml()
    grid.addWidget(created.html, {
        h: 2,
        w: 6,
        id: created.id
        });
    let mf = new MathfieldElement();
    
    mf.setOptions({
        inlineShortcuts: defShortcuts,
        plonkSound: null
    })
    document.getElementById(`mf_${created.id}`).appendChild(mf)
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
    return applets.find(applet => applet.getParameters().parent == target);
}

grid.on('resizestop', function (el) {
    let resized = el.target.querySelector(".ggBox");
    if (resized) {
        let a = findApplet(resized.id);
        a.getAppletObject()
            .setSize(
                document.getElementById(a.getParameters().parent).offsetWidth,
                document.getElementById(a.getParameters().parent).offsetHeight
            );
    }
})

function createApplet(element) {
    console.log(document.getElementById(element).offsetWidth);
    var params = {
        "appName": "suite",
        // "autoHeight": true,
        // "scaleContainerClass": "ggBox",
        "showToolBar": true,
        "height": document.getElementById(element).offsetHeight,
        "width": document.getElementById(element).offsetWidth,
        "showToolBarHelp": false,
        "showAlgebraInput": true,
        "useBrowserForJS": true,
        "showMenuBar": true,
        "buttonShadows": false,
        "buttonRounding": 0.6,
        "parent": element,
        "id": element
    };
    var applet = new GGBApplet(params, true);
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

function saveGrid() {
    let items = grid.save();
    for (var item of items) {
        item.applet = checkForApplet(item)
        item.appletBase64 = saveApplet(item.applet)
        if (item.applet) {item.appletParent = item.applet.getParameters().parent}
        console.log(JSON.stringify(items));
        window.api.send("toMain", JSON.stringify(items));
    }
}

function loadGrid() {
    window.api.send("toMain", "LOAD");

    window.api.receive("fromMain", (data) => {
        let items = JSON.parse(data.toString());
        grid.removeAll();
        grid.load(items)
        for (var item of items) {
            if (item.applet) {
                var params = {
                    "appName": "suite",
                    // "autoHeight": true,
                    // "scaleContainerClass": "ggBox",
                    "height": document.getElementById(item.appletParent).offsetHeight,
                    "width": document.getElementById(item.appletParent).offsetWidth,            
                    "showToolBar": true,
                    "showAlgebraInput": true,
                    "showToolBarHelp": false,
                    "useBrowserForJS": true,
                    "buttonShadows": false,
                    "showMenuBar": true,
                    "parent": item.appletParent,
                    "id": item.appletParent,
                    "ggbBase64": item.appletBase64
                };
                var app = new GGBApplet(params, true);
                app.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
                // app.getAppletObject().setBase64(item.appletBase64)
                app.inject(item.appletParent);
                item.applet = app;
                applets.push(item.applet)

            }

        }
    });
}