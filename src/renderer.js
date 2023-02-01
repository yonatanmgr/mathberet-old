let dirTree, currentfile, currentBlock;
let maximizeStatus, sidebarStatus = 0

// GENERAL

// Return to start page
function resetPage() {
  currentfile = undefined;
  closeSidebar()
  document.getElementById("placeHolder").style.display = "flex"
  document.getElementById("content").style.display = "none"
  document.getElementById("notebookName").innerText = ""
  document.getElementById("slash").innerText = ""
  document.getElementById("fileName").innerText = ""
}

// Maximize / Unmaximize window
function toggleMaximize() {
  if (maximizeStatus == 0) {window.api.maximize(); maximizeStatus = 1} 
  else {window.api.unmaximize(); maximizeStatus = 0}
}

// Create a snackbar popup; Specify scenario in "scene" 
function popupAnimation(scene) {
  var x = document.getElementById("snackbar");
  let snackbarInnerText = "";
  switch (scene) {
    case "save": snackbarInnerText = "הדף נשמר!"; break;
    case "clean": snackbarInnerText = "הדף נוקה!"; break;
    case "cantCreate": snackbarInnerText = "לא ניתן ליצור קובץ חדש, קיים קובץ בעל שם זהה!"; break;
    case "cantMove": snackbarInnerText = "לא ניתן להזיז את הקובץ למיקום זה!"; break;
    default: break;
  } 
  x.innerText = snackbarInnerText;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 1200);
}

// Get random theme color
function getRandomColor() {
  // colors = [40, 80, 120, 160, 200, 240, 280, 320, 0]
  colors = 360
  const h = Math.floor(Math.random() * colors);
  document.querySelector(":root").style.setProperty("--theme-h", h);
};

// Returns true if given array has duplicates, false otherwise
function hasDuplicates(array) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
          return true;
      }
      valuesSoFar[value] = true;
  }
  return false;
}

// Buttons
document.getElementById("close"   ).addEventListener("click", () => {saveGrid(); window.api.close()});
document.getElementById("logo"    ).addEventListener("click", resetPage);
document.getElementById("minimize").addEventListener("click", window.api.minimize);
document.getElementById("maximize").addEventListener("click", toggleMaximize);
document.getElementById("addQuill").addEventListener("click", addQuill);
document.getElementById("addGgb"  ).addEventListener("click", addGgb);
document.getElementById("addMF"   ).addEventListener("click", addMF);
document.getElementById("settings").addEventListener('click', window.api.toggle)
document.getElementById("settings").addEventListener("contextmenu", getRandomColor);


// Shortcuts
window.api.receive("Text",            () => document.getElementById("addQuill").click())
window.api.receive("Graph",           () => document.getElementById("addGgb").click())
window.api.receive("Math",            () => document.getElementById("addMF").click())
window.api.receive("newFile",         () => document.getElementById("newFile").click())
window.api.receive("toggleNotebooks", () => document.getElementById("notebooks").click())
window.api.receive("Save",            () => {if (currentfile == null) {return} else {saveGrid()}})
window.api.receive("Search",          () => {})
