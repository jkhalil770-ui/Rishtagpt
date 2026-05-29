const CACHE_NAME = "rishtagpt-next-cache-v1";
const ASSETS = [
  "/",
  "/manifest.json",
  "/assets/logo.png"
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
  // Only cache GET requests and avoid firebase/auth or gemini API calls
  if (e.request.method !== "GET" || e.request.url.includes("googleapis.com") || e.request.url.includes("firebase")) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((response) => {
        // Cache new successful requests for static assets
        if (response && response.status === 200 && response.type === "basic" && (e.request.url.includes("_next/static") || e.request.url.includes("fonts.gstatic.com"))) {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, cacheCopy);
          });
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback
      if (e.request.mode === "navigate") {
        return caches.match("/");
      }
    })
  );
});
