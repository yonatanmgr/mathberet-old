document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("addLatex").addEventListener("click", addMq);
document.getElementById("save").addEventListener("click", saveGrid);
document.getElementById("load").addEventListener("click", loadGrid);
let applets = [];
let drag = "drag-indicator-svgrepo-com.svg"

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