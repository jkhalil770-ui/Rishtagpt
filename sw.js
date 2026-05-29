const CACHE_NAME = "rishtagpt-v3-cache";
const ASSETS = [
  "./RishtaGPT.html",
  "./assets/logo.png",
  "./rishtagpt/config.js",
  "./rishtagpt/storage.js",
  "./rishtagpt/gemini.js",
  "./rishtagpt/pdf.js",
  "./rishtagpt/icons.jsx",
  "./rishtagpt/logo.jsx",
  "./rishtagpt/ui.jsx",
  "./rishtagpt/hero.jsx",
  "./rishtagpt/form.jsx",
  "./rishtagpt/result.jsx",
  "./rishtagpt/saved.jsx",
  "./rishtagpt/premium.jsx",
  "./rishtagpt/app.jsx"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    }).catch(() => {
      if (e.request.mode === "navigate") {
        return caches.match("./RishtaGPT.html");
      }
    })
  );
});
