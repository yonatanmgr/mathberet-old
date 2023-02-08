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
    document.querySelectorAll(".archiveBlockType").forEach(title=>title
    .addEventListener("click", (e) => {
        let con = e.target.closest(".archiveBlockTitle")
        if (con.classList.contains("open")) {
            con.classList.remove("open")

        } else {
            con.classList.add("open")

        }
    }))