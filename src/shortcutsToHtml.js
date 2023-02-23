let shortcutDict = [
    {    
        "part": "כללי",
        "shortcuts": [
            {"text": "מסך הבית", "keys": ["Ctrl+h"]},
            {"text": "קובץ חדש", "keys": ["Ctrl+n"]},       
            {"text": "שמירת הקובץ הנוכחי", "keys": ["Ctrl+s"]},       
            {"text": "המחברות שלי", "keys": ["Ctrl+o"]},       
            {"text": "פתיחת הארכיון", "keys": ["Ctrl+Alt+a"]},       
            {"text": "חיפוש", "keys": ["Ctrl+f"]},       
            {"text": "קיצורי מקלדת", "keys": ["Ctrl+Alt+h"]},
            {"text": "רענון", "keys": ["Ctrl+r"]},       
            {"text": "יציאה", "keys": ["Ctrl+w"]}  
        ]
    },
    {    
        "part": "עריכה וטקסט",
        "shortcuts": [
            {"text": "יצירת בלוק טקסט", "keys": ["Ctrl+t"]},       
            {"text": "יצירת בלוק מתמטי", "keys": ["Ctrl+m"]},       
            {"text": "יצירת בלוק גרפי", "keys": ["Ctrl+g"]},       
            {"text": "יצירת בלוק תמונה", "keys": ["Ctrl+p"]},       
            {"text": "יצירת קבוצה", "keys": ["Ctrl+k"]},       
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
            {"text": "פתיחת מקלדת וירטואלית", "keys": ["Alt+k"]},       
            {"text": "פישוט הביטוי המסומן", "keys": ["Alt+x"]},       
            {"text": "העברת הביטוי המסומן לגרף", "keys": ["Alt+g"]},       
            {"text": "מעבר לכתיבה בשורות", "keys": ["Alt+Enter ↵"]},
            {"text": "ירידה בשורה", "keys": ["Ctrl+Enter ↵"]},
            {"text": "מחיקת שורה", "keys": ["Ctrl+⌫"]},
            {"text": "הוספת טבלה", "keys": ["tbl"]},
            {"text": "חלוקה למקרים", "keys": ["cas"]},
            {"text": "פעולות מתמטיות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "סכום", "latex": "\\sum", "keys": ["Alt+w"]},
                {"text": "מכפלה", "latex": "\\prod", "keys": ["Alt+P"]},
                {"text": "שורש ריבועי", "latex": "\\sqrt{\\square}", "keys": ["Alt+v"]},
                {"text": "שורש", "latex": "\\sqrt[\\square]{\\square}", "keys": ["nv"]},
            ]},
            {"text": "יחסים", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "חוסר שוויון", "latex": "\\ne", "keys": ["!+="]},
                {"text": "גדול/שווה", "latex": "\\geq", "keys": ["<+="]},
                {"text": "קטן/שווה", "latex": "\\leq", "keys": [">+="]},
                {"text": "קירוב", "latex": "\\approx", "keys": ["Alt+="]}
            ]},
            {"text": "חזקות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "העלאה בחזקה", "latex": "\\square^{\\square}", "keys": ["Shift ⇧+6"]},
                {"text": "העלאה בריבוע", "latex": "\\square^{2}", "keys": ["sr"]},
                {"text": "העלאה בשלישית", "latex": "\\square^{3}", "keys": ["cb"]}
            ]},
            {"text": "קבועים נפוצים", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "פאי", "latex": "\\pi", "keys": ["Alt+p"]},
                {"text": "המספר המדומה", "latex": "\\imaginaryI", "keys": ["ii"]},
                {"text": "האקספוננט", "latex": "\\exponentialE", "keys": ["ee"]}
            ]},
            {"text": "גיאומטריה", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "זווית", "latex": "\\measuredangle", "keys": ["Alt+>"]},
                {"text": "מעלה", "latex": "\\square\\degree", "keys": ["Shift ⇧+2"]},
                {"text": "ניצב", "latex": "\\perp", "keys": ["TT"]},
                {"text": "מקביל", "latex": "\\parallel", "keys": ["II"]},
                {"text": "משולש", "latex": "\\triangle", "keys": ["Ctrl+Shift ⇧+T"]},

            ]},
            {"text": "אנליזה", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "פונקציה", "latex": "f(x)", "keys": ["fx"]},
                {"text": "סדרה אינסופית", "latex": "\\{ a_n \\} _{n=1}^{\\infty}", "keys": ["ann"]},
                {"text": "איבר כללי בסדרה", "latex": "a_n", "keys": ["an"]},
                {"text": "נגזרת חלקית", "latex": "\\differentialD", "keys": ["Alt+d"]},
                {"text": "אינטגרל מסוים", "latex": "\\int_{a}^{b}", "keys": ["intt"]},
                {"text": "אינטגרל לא מסוים", "latex": "\\int", "keys": ["int"]},
                {"text": "אינטגרל של פונקציה", "latex": "\\int_{a}^{b} f(x) \\differentialD x", "keys": ["int+fx"]},
                {"text": "גבול", "latex": "\\lim", "keys": ["lim"]},
                {"text": "גבול של פונקציה", "latex": "\\lim_{x \\to a} f(x)", "keys": ["lim+fx"]},
                {"text": "אינסוף", "latex": "\\infty", "keys": ["oo"]}
            ]},
            {"text": "אלגברה", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "וקטור", "latex": "\\vec{\\square}", "keys": ["vec"]},
                {"text": "וקטור היחידה", "latex": "\\hat{\\square}", "keys": ["^^"]},
                {"text": "ערך מוחלט/נורמה", "latex": "||\\square||", "keys": ["abs"]},
            ]},
            {"text": "מטריצות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "מטריצה חדשה", "latex": "\\begin{smallmatrix} \\square & \\square \\\\ \\square & \\square \\end{smallmatrix}", "keys": ["mx"]},
                {"text": "הוספת עמודה מימין", "keys": ["Ctrl+,"]},
                {"text": "הוספת עמודה משמאל", "keys": ["Ctrl+Shift ⇧+,"]},
                {"text": "הוספת שורה מתחת", "keys": ["Ctrl+;"]},
                {"text": "הוספת שורה מעל", "keys": ["Ctrl+Shift ⇧+;"]},
                {"text": "מחיקת השורה הנוכחית", "keys": ["Ctrl+⌫"]},
                {"text": "מחיקת העמודה הנוכחית", "keys": ["Shift ⇧+⌫"]}
            ]},
            {"text": "קומבינטוריקה", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "מקדם בינומי", "latex": "\\binom{c}{k}", "keys": ["n+C+k"]},
            ]},
            {"text": "לוגיקה", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "שלילה", "latex": "\\neg", "keys": ["-+["]},
                {"text": "גרירה", "latex": "\\Rightarrow", "keys": ["<="]},
                {"text": "אם ורק אם", "latex": "\\iff", "keys": ["<=>"]},
                {"text": "קיים", "latex": "\\exists", "keys": ["EE"]},
                {"text": "לא קיים", "latex": "\\nexists", "keys": ["!+EE"]},
                {"text": "לכל", "latex": "\\forall", "keys": ["AA"]},
                {"text": "וגם...", "latex": "\\land", "keys": ["Alt+6"]},
                {"text": "או...", "latex": "\\lor", "keys": ["Alt+Shift ⇧+6"]},
                {"text": "לכן", "latex": "\\therefore", "keys": [":+."]},
                {"text": "מפני ש...", "latex": "\\because", "keys": [".+:"]},
                {"text": "הגדרה", "latex": "\\equiv", "keys": ["=="]}
            ]},
            {"text": "תורת הקבוצות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "המספרים הטבעיים", "latex": "\\N", "keys": ["NN"]},
                {"text": "המספרים השלמים", "latex": "\\Z", "keys": ["ZZ"]},
                {"text": "המספרים הממשיים", "latex": "\\R", "keys": ["RR"]},
                {"text": "המספרים הרציונליים", "latex": "\\Q", "keys": ["QQ"]},
                {"text": "המספרים המרוכבים", "latex": "\\C", "keys": ["CC"]},
                {"text": "קבוצה", "latex": "\\Set{ \\square | \\square }", "keys": ["set"]},
                {"text": "הקבוצה הריקה", "latex": "\\emptyset", "keys": ["Alt+0"]},
                {"text": "הרכבה", "latex": "\\circ", "keys": ["Alt+o"]},
                {"text": "איחוד", "latex": "\\cup", "keys": ["Alt+u"]},
                {"text": "חיתוך", "latex": "\\cap", "keys": ["Alt+n"]},
                {"text": "משלים", "latex": "\\complement", "keys": ["Alt+Shift ⇧+c"]},
                {"text": "שייכות", "latex": "\\in", "keys": ["in"]},
                {"text": "חוסר שייכות", "latex": "\\notin", "keys": ["!+in"]},
                {"text": "מכפלה קרטזית", "latex": "\\times", "keys": ["xx"]},
                {"text": "הכלה", "latex": "\\subseteq", "keys": ["sub"]},
                {"text": "הכלה ממש", "latex": "\\subset", "keys": ["subb"]},
                {"text": "הפרש", "latex": "\\backslash", "keys": ["Alt+\\"]},
                {"text": "כלל התאמה", "latex": "\\mapsto", "keys": ["<-|"]}
            ]},
            {"text": "אותיות יווניות", "keys": null, "isSubTitle": true, "shortcuts":
            [
                {"text": "אלפא", "latex": "\\Alpha \\backslash \\alpha", "keys": ["&+A \\ a"]},
                {"text": "בטא", "latex": "\\Beta \\backslash \\beta", "keys": ["&+B \\ b"]},
                {"text": "גמא", "latex": "\\Gamma \\backslash \\gamma", "keys": ["&+G \\ g"]},
                {"text": "דלתא", "latex": "\\Delta \\backslash \\delta", "keys": ["&+D \\ d"]},
                {"text": "אפסילון", "latex": "\\Epsilon \\backslash \\varepsilon", "keys": ["&+E \\ e"]},
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
    document.getElementById("keysContent").innerHTML = html.join("")
    return
}

let shortcuts = shortcutsToHtml(shortcutDict)

window.onload = shortcuts