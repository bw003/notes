document.addEventListener("DOMContentLoaded", () => {

/* Animated Subject Counter */

const cards = document.querySelectorAll(".note-card");
const total = cards.length;
const countEl = document.getElementById("subjectCount");
let count = 0;
const duration = 1000;
const stepTime = Math.floor(duration / total);

const counter = setInterval(() => {
    count++;
    countEl.textContent = `Total Subjects: ${count}`;
    if (count >= total) clearInterval(counter);
}, stepTime);

/* Dark Mode */

const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️ Light Mode";
}

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", dark);
    toggle.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

/* Keyboard Navigation */

cards.forEach((card, index) => {

    card.addEventListener("keydown", (e) => {

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleCard(card);
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = cards[index + 1];
            if (next) next.focus();
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = cards[index - 1];
            if (prev) prev.focus();
        }

        if (e.key === "Escape") {
            card.classList.remove("active");
            const arrow = card.querySelector(".arrow");
            if (arrow) arrow.textContent = "▼";
        }

    });

});

/* Scroll To Top Button */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

});

/* Preview PDF */

function previewPDF(file) {
    window.open(file, "_blank");
}

/* Download PDF */

function downloadPDF(file) {
    const a = document.createElement("a");
    a.href = file;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("✓ Download started");
}

/* Share PDF Link — shows the URL in toast */

async function shareFile(file, label) {

    const base = window.location.origin +
        window.location.pathname.replace("index.html", "");
    const url = base + file;

    try {
        await navigator.clipboard.writeText(url);
        showToast("🔗 Link copied", url);
    } catch {
        showToast("⚠️ Copy failed — share manually");
    }

}

/* Toast Notification */

function showToast(message, url) {

    const toast = document.getElementById("toast");

    if (url) {
        toast.innerHTML =
            `${message}<span class="toast-url">${url}</span>`;
    } else {
        toast.textContent = message;
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}

/* Disable Right Click */

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

/* Disable Dragging */

document.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

/* Disable Text Selection */

document.addEventListener("selectstart", function (e) {
    e.preventDefault();
});

/* Disable Common Developer Shortcuts */

document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
    }
});

/* Collapsible Cards */

function toggleCard(card) {

    const allCards = document.querySelectorAll(".note-card");

    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove("active");
            const arrow = c.querySelector(".arrow");
            if (arrow) arrow.textContent = "▼";
        }
    });

    card.classList.toggle("active");

    const arrow = card.querySelector(".arrow");
    arrow.textContent = card.classList.contains("active") ? "▲" : "▼";

}

/* Splash Screen */

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash").classList.add("hide");
    }, 1200);
});

/* PWA Service Worker */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
    });
}
