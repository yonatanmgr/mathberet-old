

async function renderArchive(){
    getArchive()

    let app = document.getElementById("archiveApp");
    app.innerHTML = "";
    let html = [];
    for (const group of archiveContent) {
        let groupName = group.groupName;
        let container = `<div class="archiveContainer"><div class="sideLine"><div class="sideContainer"><div class="circle"></div><div class="line"></div></div></div><div class="biglist"><div class="archiveBlockTitle first"><span class="titleText">${groupName}</span></div><div class="listContainer"><div class="list">`
        html.push(container)
        for (const subGroup of group.subGroups) {
            let subGroupType = "";
            switch (subGroup.subType) {
                case "proof": subGroupType = "📝 הוכחה"; break;
                case "defenition": subGroupType = "❗ הגדרה"; break;
                case "assumption": subGroupType = "❓ הנחה"; break;
                case "theorem": subGroupType = "💡 משפט"; break;
                case undefined: subGroupType = "ללא סוג"; break;
                default: break;
            }
            if (subGroup.subType != undefined) {
                let listed = `<div class="archiveBlockTitle"><div class="archiveContent"><span class="archiveBlockType">${subGroupType}</span><div class="archiveBlock ${subGroup.subType}" id="${subGroup.id}"></div></div></div>`
                html.push(listed)
            }
        }
        html.push(`</div></div></div></div>`)
    }
    
    if (archiveContent.length != 0) {
        document.getElementById("archivePlaceHolder").style.display = "none"
        app.style.display = "flex"
        app.parentElement.style.height = "unset";

        app.innerHTML = html.join("")
    
        document.querySelectorAll(".archiveBlock").forEach(async block => {
            let search = () => {
                for (const group of archiveContent) {
                    for (const subGroup of group.subGroups) {
                        if (subGroup.id == block.id) {return subGroup}
                    }
                }
            }
            let found = search()
            let options = {
                disableResize: true,
                disableDrag: true,
                float: false,
                handle: '.handle',
                class: 'blockGroup',
                resizable: {handles: 's,sw,w'},
                itemClass: 'block',
                children: [],
                column: 1,
                margin: 10,
                cellHeight: 50,
                dragOut: false,
                dragIn: false,
            }
            let grid = GridStack.init(options, document.getElementById(block.id))
            // grid.on('resizestop', function (el) {
            //     let resized = el.target.gridstackNode;
            //     if (resized.type == "Graph") {
            //         let a = resized.blockContent;
            //         a.getAppletObject().setSize(
            //             document.getElementById(`ggBox_${resized.id}`).offsetWidth,
            //             document.getElementById(`ggBox_${resized.id}`).offsetHeight
            //         );
            //     }
            // })
            await getAllPictures("")
            setTimeout(() => {
                found.blockContent.forEach(loadBlockContent)
                grid.load(found.blockContent);
                found.blockContent.forEach(loadBlock)
                // found.blockContent.map(loadBlock)
            }, 100);
        })
    
    
        document.querySelectorAll(".archiveBlockTitle.first span").forEach(title=>title
            .addEventListener("click", (e) => {
                let con = e.target.closest(".archiveContainer")
                if (con.querySelector(".line").classList.contains("open")) {
                    con.classList.remove("open")
                    con.querySelector(".titleText").classList.remove("open")
                    con.querySelector(".listContainer").classList.remove("open")
                    con.querySelector(".line").classList.remove("open")
        
                } else {
                    con.classList.add("open")
                    con.querySelector(".titleText").classList.add("open")
                    con.querySelector(".listContainer").classList.add("open")
                    con.querySelector(".line").classList.add("open")
        
                }
        }))
            document.querySelectorAll(".archiveBlockType").forEach(title=>{title
            .addEventListener("click", (e) => {
                let con = e.target.closest(".archiveBlockTitle")
                let type = e.target.closest(".archiveBlockType")
                if (con.classList.contains("open")) {
                    con.classList.remove("open")
                    con.style.height = "30px"
                    type.classList.remove("open")
                    
                } else {
                    con.classList.add("open")
                    type.classList.add("open")
                    function updateHeight(){
                        let h = 0;
                        for (const item of con.querySelector('.archiveBlock').gridstack.getGridItems()) {h += item.gridstackNode.h;}
                        if (h == 0) {con.style.height = con.querySelector('.archiveBlock').gridstack.getCellHeight()}
                        else {con.style.height = `${con.querySelector('.archiveBlock').gridstack.getCellHeight() * h}px`}
                    }
                    updateHeight()
                    con.querySelector('.archiveBlock').gridstack.on('resize', updateHeight)
                    resizeAll(con.querySelector('.archiveBlock').gridstack)
                    updateHeight()
                }
        })
        title.addEventListener("mouseover", (e)=>{
            let date = new Date(parseInt(e.target.closest(".archiveBlockTitle").querySelector(".archiveBlock").id))
            let newDate = `${date.toLocaleDateString('he-IL')}, ${date.toLocaleTimeString('he-IL', { hour: "2-digit", minute: "2-digit" })}`

            let ttp = document.getElementById("timeTooltip")
            ttp.style.top = `${e.target.offsetTop + 8}px`;
            ttp.style.left = `${e.target.offsetLeft + 180}px`;
            ttp.innerText = newDate
            ttp.style.opacity = "50%";
        })
        title.addEventListener("mouseleave", (e)=>{
            let ttp = document.getElementById("timeTooltip")
            ttp.style.opacity = "0%";
        })
    })
    
    }

    else {
        document.getElementById("archivePlaceHolder").style.display = "flex"
        app.style.display = "none"

        app.parentElement.style.height = "100%";
        let placeHolderHtml = [];
        placeHolderHtml.push(`<div class="placeHolderText">הארכיון ריק!</div>`)
        placeHolderHtml.push(`<br>`)
        placeHolderHtml.push(`<div class="placeHolderText">כדי למלא את הארכיון, תוכלו ליצור קבוצות בעלות שם זהה מסוגים שונים,</div>`)
        placeHolderHtml.push(`<div class="placeHolderText">והן יגיעו לכאן באופן אוטומטי</div>`)
        placeHolderHtml.push(`<br>`)
        placeHolderHtml.push(`<br>`)
        document.getElementById('archivePlaceHolder').innerHTML = placeHolderHtml.join("");
    }
}