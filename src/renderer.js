/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


var grid = GridStack.init({
    float: false,
    handle: '.grid-stack-item',
    resizable: {
        handles: 'all'
    }
});

var items = [];

function create_textBlock() {
    let id = Date.now();

    var textBlock = `
    <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
            <button class="xButton">X</button>
            <div class="textEdit" contenteditable="true" dir="rtl">
            </div>
        </div>
    </div>
    `
    return textBlock;
}

function create_ggbBlock() {
    let id = Date.now();

    var ggbBlock = `
        <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
        <button class="xButton">X</button>
        <div class="ggbContainer"> 
            <div id="ggBox_${id}" class="ggBox"></div> 
            </div>
            </div>
        </div>
    </div>
    `

    return {html: ggbBlock, uuid: id};
}

function addText() {
    grid.addWidget(create_textBlock(), {
        w: 12
    });
};

function addGgb() {
    let created = create_ggbBlock()
    grid.addWidget(created["html"], {
        w: 5
    });
    loadGgb("ggBox_"+created["uuid"].toString())

};


function removeWidget(el) {
    el.remove();
    grid.removeWidget(el);
}

document.addEventListener("click", function (e) {
    const target = e.target.closest(".xButton");

    if (target) {
        removeWidget(target.parentElement.parentElement)
    }
});

let applets = [];


document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
// document.getElementById("loadGgb").addEventListener("click", applets.map(updateSize));


grid.on('resizestop', function(el) {
    var resized = el.target.querySelector(".ggBox");
        if (resized != null){
            var found = applets.find(applet => applet.getParameters().parent.id == resized.id)
            found
            .getAppletObject()
            .setSize(
                found.getParameters().parent.offsetWidth,
                found.getParameters().parent.offsetHeight
            )
    }
})

function loadGgb(element) {
    var params = {
        "appName": "graphing",
        "autoHeight": true,
        "scaleContainerClass": "ggbContainer",
        "showToolBar": true,
        "showAlgebraInput": true,
        "useBrowserForJS": true,
        "showMenuBar": true,
        "parent": document.getElementById(element)
    };
    var applet = new GGBApplet(params, true);
    applet.setHTML5Codebase('Geogebra/HTML5/5.0/web3d/');
    applet.inject(element);
    applets.push(applet)
}
grid.load(items);