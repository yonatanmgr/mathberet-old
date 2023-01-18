/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
var MQ = MathQuill.getInterface(2);

var grid = GridStack.init({
    rtl: true,
    float: false,
    handle: '.handle',
    resizable: {
        handles: 'sw'
    }
});

var items = [];

function create_textBlock() {
    let id = Date.now();

    var textBlock = `
    <div class="grid-stack-item" id="blockId_${id}">
        <div class="grid-stack-item-content">
            <div class="handle">::</div>
            <div class="actionsArea">
                <div id="textEdit_${id}"></div>
            </div>
        </div>
    </div>
    `
    return {html: textBlock, id: id};
}

// function create_title() {
//     let id = Date.now();

//     var title = `
//     <div class="grid-stack-item" id="blockId_${id}">
//         <div class="grid-stack-item-content">
//             <div class="handle">::</div>
//             <div class="actionsArea">
//                 <textarea class="title" type="text" dir="rtl"></textarea>
//             </div>
//         </div>
//     </div>
//     `
//     return title;
// }



function create_ggbBlock() {
    let id = Date.now();

    var ggbBlock = `
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
        html: ggbBlock,
        uuid: id
    };
}

function addText() {
    let created = create_textBlock()
    grid.addWidget(created.html, {
        h: 3,
        w: 8,
        minW: 1,
        minH: 1
    });
    var quill = new Quill(`#textEdit_${created.id}`, {
        theme: 'bubble'
      });
      quill.format('direction', 'rtl');
      quill.format('align', 'right');
};

// function addTitle() {
//     grid.addWidget(create_title(), {
//         h: 1,
//         w: 8,
//         minW: 1,
//         maxH: 1
//     });
// };

function addGgb() {
    let created = create_ggbBlock()
    grid.addWidget(created.html, {
        minH: 5,
        minW: 4,
        maxH: 5,
        maxW: 4
    });
    createApplet("ggBox_" + created.uuid.toString())

};


function removeWidget(el) {
    el.remove();
    grid.removeWidget(el);
}

document.addEventListener("dblclick", function (e) {
    const target = e.target.closest(".handle");

    if (target) {
        removeWidget(target.parentElement.parentElement)
    }
});

let applets = [];


document.getElementById("addText").addEventListener("click", addText);
document.getElementById("addGgb").addEventListener("click", addGgb);
// document.getElementById("loadGgb").addEventListener("click", addTitle);

function findApplet(target) {
    return applets.find(applet => applet.getParameters().parent == target.id)
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
grid.load(items);