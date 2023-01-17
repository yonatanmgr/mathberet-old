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
    resizable: { handles: 'all'}
});

var items = [];

function create_textBlock(){
    let id = Date.now();

    var textBlock = `
    <div class="grid-stack-item" id="${id}">
        <div class="grid-stack-item-content">
            <button class="xButton">X</button>
            <div class="textEdit" contenteditable="true" dir="rtl">
            </div>
        </div>
    </div>
    `
    return textBlock;
}

function create_ggbBlock(){
    let id = Date.now();

    var ggbBlock = `
        <div class="grid-stack-item" id="${id}">
        <div class="grid-stack-item-content">
            <button class="xButton">X</button>
            <div id="ggb-element"></div> 
            </div>
        </div>
    </div>
    `

    return ggbBlock;
}

function addText() {
    grid.addWidget(create_textBlock(), {
        w: 12
    });
};

function addGgb() {
    grid.addWidget(create_ggbBlock(), {
        w: 5
    });
};


function removeWidget(el) {
    el.remove();
    grid.removeWidget(el);
}

document.addEventListener("click", function(e){
  const target = e.target.closest(".xButton");

  if(target){
    removeWidget(target.parentElement.parentElement)
  }
});

document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
document.getElementById("loadGgb").addEventListener("click", loadGgb);



function loadGgb() {

    var params = {"appName": "graphing", "scaleContainerClass": "grid-stack-item-content", "showToolBar": true, "showAlgebraInput": true, "showMenuBar": true };
    var applet = new GGBApplet(params, true);
    applet.setHTML5Codebase('../src/Geogebra/HTML5/5.0/web3d/');
    applet.inject('ggb-element');
}
grid.load(items);