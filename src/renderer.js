/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */



var grid = GridStack.init({
    float: false,
    handle: '.handle',
    resizable: {
        handles: 'sw'
    },
    margin: 7,
    cellHeight: 50
});


function create_textBlock() {
    let id = Date.now();

    var html = `
    <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
            <div class="handle">::</div>
            <div class="actionsArea">
                <div id="textEdit_${id}"></div>
            </div>
        </div>
    </div>
    `
    return {
        html: html,
        id: id
    };
}

function create_mq() {
    let id = Date.now();

    var html = `
    <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
            <div class="handle">::</div>
            <div class="actionsArea">
                <span id="math_field_${id}"></span>
            </div>
        </div>
    </div>
    `
    return {
        html: html,
        id: id
    };
}



function create_ggbBlock() {
    let id = Date.now();

    var html = `
        <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
        <div class="handle">::</div>
        <div class="actionsArea"> 
            <div id="ggBox_${id}" class="ggBox"></div> 
            </div>
            </div>
        </div>
    </div>
    `

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
        w: 8,
        minW: 1,
        minH: 2
    });

    let bindings = {
        ltr: {
            key: 219,
            ctrlKey: true,
            handler: function(range) {
                this.quill.formatLine(range, 'direction', '');
                this.quill.formatLine(range, 'align', '')
          }
        },
        rtl: {
            key: 221,
            ctrlKey: true,
            handler: function(range) {
                this.quill.formatLine(range, 'direction', 'rtl');
                this.quill.formatLine(range, 'align', 'right')
          }
        }
    }

    var quill = new Quill(`#textEdit_${created.id}`, {
        modules: {
            keyboard: {bindings: bindings},          
            formula: true,
            toolbar: [["formula"]]
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
        w: 12,
        minW: 1,
        maxH: 4
    });
    var mathFieldSpan = document.getElementById(`math_field_${created.id.toString()}`)
    var MQ = MathQuill.getInterface(2);
    let config = {
        autoCommands: 'to oo and or dots int deg pi theta sq sum sr cb ge pm alpha beta gamma delta eps zeta eta iota kappa lambda mu nu xi rho sigma tau ups phi chi psi omega ne neq notin sub sup cap cup nsub nsup RR ZZ NN CC HH QQ PP mid',
        autoOperatorNames: 'log ln lg'
        }
    var mathField = MQ.MathField(mathFieldSpan, config);

    mathField.focus();

};

function addGgb() {
    let created = create_ggbBlock()
    grid.addWidget(created.html, {
        h: 10,
        w: 4,
        noResize: true
    });
    createApplet(`ggBox_${created.id.toString()}`)

};


function removeWidget(el) {
    applets.pop(findApplet(el.querySelector(".ggBox").id)).getAppletObject().remove();
    el.remove();
    grid.removeWidget(el);
}

document.addEventListener("dblclick", function (e) {
    const target = e.target.closest(".handle");
    if (target) {removeWidget(target.parentElement.parentElement)}
});

let applets = [];

document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addLatex").addEventListener("click", addMq);
document.getElementById("save").addEventListener("click", saveGrid);
document.getElementById("load").addEventListener("click", loadGrid);

function findApplet(target) {
    return applets.find(applet => applet.getParameters().parent == target);
}

grid.on('resizestop', function (el) {
    let resized = el.target.querySelector(".ggBox");
    if (resized) {
        let a = findApplet(resized);
        console.log(document.getElementById(a.getParameters().parent))
        a.getAppletObject()
            .setSize(
                document.getElementById(a.getParameters().parent).offsetWidth,
                document.getElementById(a.getParameters().parent).offsetHeight
            );
        a.recalculateEnvironments()
    }
})

function createApplet(element) {
    var params = {
        "appName": "graphing",
        "autoHeight": true,
        "scaleContainerClass": "ggBox",
        "showToolBar": true,
        "showAlgebraInput": true,
        "useBrowserForJS": true,
        "showMenuBar": true,
        "parent": element
    };
    var applet = new GGBApplet(params, true);
    applet.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
    applet.inject(element);
    applets.push(applet)
}

function saveGrid() {items = grid.save()}
function loadGrid() {grid.removeAll(); grid.load(items)}