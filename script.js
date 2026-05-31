document.addEventListener("DOMContentLoaded", () => {

    const cards =
        document.querySelectorAll(".note-card");

    document.getElementById("subjectCount")
        .textContent =
        `Total Subjects: ${cards.length}`;

    const toggle =
        document.getElementById("themeToggle");

    if(localStorage.getItem("darkMode")==="true"){
        document.body.classList.add("dark");
        toggle.textContent="☀️ Light Mode";
    }

    toggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem("darkMode",dark);

        toggle.textContent =
            dark ?
            "☀️ Light Mode" :
            "🌙 Dark Mode";
    });

    document
        .querySelectorAll(".download-btn")
        .forEach(btn=>{

            btn.addEventListener("click",()=>{
                showToast("✓ Download started");
            });

        });

});

function shareFile(file){

    const url =
        window.location.origin +
        window.location.pathname
            .replace("index.html","") +
        file;

    navigator.clipboard.writeText(url);

    showToast("🔗 Link copied");
}

function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);
}

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    topBtn.style.display =
        window.scrollY > 200 ?
        "block" :
        "none";
});

topBtn.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker
            .register("sw.js");
    });
}
