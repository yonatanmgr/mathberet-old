let shortcutDict = [
    {    
        "part": "כללי",
        "shortcuts": [
            {"text": "קובץ חדש", "keys": ["Ctrl+n"]},       
            {"text": "שמירת הקובץ הנוכחי", "keys": ["Ctrl+s"]},       
            {"text": "המחברות שלי", "keys": ["Ctrl+o"]},       
            {"text": "חיפוש", "keys": ["Ctrl+f"]},       
            {"text": "קיצורי מקלדת", "keys": ["Ctrl+h"]},
            {"text": "יציאה", "keys": ["Ctrl+w"]}  
        ]
    },
    {    
        "part": "עריכה וטקסט",
        "shortcuts": [
            {"text": "יצירת בלוק טקסט", "keys": ["Ctrl+t"]},       
            {"text": "יצירת בלוק מתמטי", "keys": ["Ctrl+m"]},       
            {"text": "יצירת בלוק גרפי", "keys": ["Ctrl+g"]},       
            {"text": "יצירת קבוצה", "keys": ["Ctrl+i"]},       
            {"text": "קיצורים לבלוק טקסט", "keys": null, "isSubTitle": true, "shortcuts":[
                {"text": "כותרת גדולה", "keys": ["#+␣"]},       
                {"text": "כותרת בינונית", "keys": ["##+␣"]},       
                {"text": "כותרת קטנה", "keys": ["###+␣"]},       
                {"text": "רשימה", "keys": ["-+␣"]},       
                {"text": "מספור", "keys": ["1+."]},  
                {"text": "רשימת תיוג", "keys": ["]+␣+["]},  
                {"text": "הדבקת משוואה", "keys": ["Shift ⇧+4"]}
            ]}
        ]
    },
    {    
        "part": "מתמטי",
        "shortcuts": [
            {"text": "פישוט ביטוי", "keys": ["Alt+x"]},       
            {"text": "העברת ביטוי לגרף", "keys": ["Alt+g"]},       
            {"text": "פעולות מתמטיות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "סכום", "latex": "\\sum", "keys": ["Alt+w"]},
                {"text": "מכפלה", "latex": "\\prod", "keys": ["Alt+P"]},
                {"text": "שורש ריבועי", "latex": "\\sqrt{\\square}", "keys": ["Alt+v"]},
                {"text": "אינטגרל", "latex": "\\int", "keys": ["Alt+b"]}
            ]},
            {"text": "חזקות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "העלאה בחזקה", "latex": "\\square^{\\square}", "keys": ["Shift ⇧+6"]},
                {"text": "העלאה בריבוע", "latex": "\\square^{2}", "keys": ["s+r"]},
                {"text": "העלאה בשלישית", "latex": "\\square^{3}", "keys": ["c+b"]}
            ]},
            {"text": "קבועים נפוצים", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "פאי", "latex": "\\pi", "keys": ["Alt+p"]},
                {"text": "המספר המדומה", "latex": "\\imaginaryI", "keys": ["i+i"]},
                {"text": "האקספוננט", "latex": "\\exponentialE", "keys": ["e+e"]}
            ]},
            {"text": "סימונים נפוצים", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "סימן המעלות", "latex": "\\degree", "keys": ["Shift ⇧+2"]},
                {"text": "אינסוף", "latex": "\\infty", "keys": ["o+o"]}
            ]},
            {"text": "קבוצות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "המספרים הטבעיים", "latex": "\\N", "keys": ["N+N"]},
                {"text": "המספרים השלמים", "latex": "\\Z", "keys": ["Z+Z"]},
                {"text": "המספרים הממשיים", "latex": "\\R", "keys": ["R+R"]},
                {"text": "המספרים הרציונליים", "latex": "\\Q", "keys": ["Q+Q"]},
                {"text": "המספרים המרוכבים", "latex": "\\C", "keys": ["C+C"]},
                {"text": "הקבוצה הריקה", "latex": "\\emptyset", "keys": ["Alt+o"]},
                {"text": "איחוד", "latex": "\\cup", "keys": ["Alt+u"]},
                {"text": "חיתוך", "latex": "\\cap", "keys": ["Alt+n"]}
            ]},
            {"text": "אותיות יווניות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "אלפא", "latex": "\\Alpha \\backslash \\alpha", "keys": ["&+A \\ a"]},
                {"text": "בטא", "latex": "\\Beta \\backslash \\beta", "keys": ["&+B \\ b"]},
                {"text": "גמא", "latex": "\\Gamma \\backslash \\gamma", "keys": ["&+G \\ g"]},
                {"text": "דלתא", "latex": "\\Delta \\backslash \\delta", "keys": ["&+D \\ d"]},
                {"text": "אפסילון", "latex": "\\Epsilon \\backslash \\epsilon", "keys": ["&+E \\ e"]},
                {"text": "זטא", "latex": "\\Zeta \\backslash \\zeta", "keys": ["&+Z \\ z"]},
                {"text": "אטא", "latex": "\\Eta \\backslash \\eta", "keys": ["&+Et \\ et"]},
                {"text": "תטא", "latex": "\\Theta \\backslash \\theta", "keys": ["&+T \\ t"]},
                {"text": "יוטא", "latex": "\\Iota \\backslash \\iota", "keys": ["&+I \\ i"]},
                {"text": "קפא", "latex": "\\Kappa \\backslash \\kappa", "keys": ["&+K \\ k"]},
                {"text": "למדא", "latex": "\\Lambda \\backslash \\lambda", "keys": ["&+L \\ l"]},
                {"text": "מו", "latex": "\\Mu \\backslash \\mu", "keys": ["&+M \\ m"]},
                {"text": "נו", "latex": "\\Nu \\backslash \\nu", "keys": ["&+N \\ n"]},
                {"text": "קסי", "latex": "\\Xi \\backslash \\xi", "keys": ["&+X \\ x"]},
                {"text": "אומיקרון", "latex": "\\Omicron \\backslash \\omicron", "keys": ["&+O \\ o"]},
                {"text": "פאי", "latex": "\\Pi \\backslash \\pi", "keys": ["&+P \\ p"]},
                {"text": "רו", "latex": "\\Rho \\backslash \\rho", "keys": ["&+R \\ r"]},
                {"text": "סיגמא", "latex": "\\Sigma \\backslash \\sigma", "keys": ["&+S \\ s"]},
                {"text": "טאו", "latex": "\\Tau \\backslash \\tau", "keys": ["&+Ta \\ ta"]},
                {"text": "אופסילון", "latex": "\\Upsilon \\backslash \\upsilon", "keys": ["&+U \\ u"]},
                {"text": "פי", "latex": "\\Phi \\backslash \\phi", "keys": ["&+Ph \\ ph"]},
                {"text": "כי", "latex": "\\Chi \\backslash \\chi", "keys": ["&+C \\ c"]},
                {"text": "פסי", "latex": "\\Psi \\backslash \\psi", "keys": ["&+Ps \\ ps"]},
                {"text": "אומגה", "latex": "\\Omega \\backslash \\omega", "keys": ["&+Om \\ om"]}
            ]}
        ]
    }
]

function shortcutsToHtml(shortcutDict){
    let html = []
    for (var part of shortcutDict){
        html.push(`<div class="keysRow"><h2>${part.part}</h2><hr>`)
        html.push(`<shortcut-list>`)
        for (var shortcut of part.shortcuts){
            function readKeys(shortcut){
                let keys = ""
                for (const shortcutKeys of shortcut.keys) {
                    let allKeys = [];
                    for (const key of shortcutKeys.split("+")) {
                        allKeys.push(`<kbd class="kbc-button">${key}</kbd>`)
                    }
                    keys = allKeys.join("+")
                }
                let latex = shortcut.latex ? `<math-field read-only style="display: inline-block;">\\textstyle{(\\, ${shortcut.latex} \\,)} \\: </math-field>` : ""
                html.push(`<custom-shortcut><shortcut-text>${shortcut.text+latex}</shortcut-text><shortcut-keys>${keys}</shortcut-keys></custom-shortcut>`)
            }
            if (shortcut.isSubTitle == true){
                html.push(`<details><summary>• ${shortcut.text} <span>...</span></summary>`)
                for (const subShortcut of shortcut.shortcuts) {
                    readKeys(subShortcut)
                }
                html.push(`</details>`)
            }
            else{readKeys(shortcut)}
        }
        html.push(`</shortcut-list>`)
        html.push(`</div>`)
    }
    return html.join("")
}

window.onload(document.getElementById("keysContent").innerHTML = shortcutsToHtml(shortcutDict))