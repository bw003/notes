const CACHE = "bed-notes-v1";

const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json"
];

/* Install — cache core assets */
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

/* Activate — clear old caches */
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

/* Fetch — cache first, fallback to network */
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
