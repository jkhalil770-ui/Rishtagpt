// Client-side in-memory cache to save repeated page navigation API calls
const clientBioCache = new Map();
const SESSION_CACHE_PREFIX = "rishtagpt_bio_cache_";

// Tracks active browser-side promises to prevent StrictMode double-generation duplicate calls
const activeClientPromises = new Map();

// Helper to look up cache from sessionStorage or in-memory map
function getCachedResult(cacheKey) {
  if (clientBioCache.has(cacheKey)) {
    return clientBioCache.get(cacheKey);
  }
  
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const stored = window.sessionStorage.getItem(SESSION_CACHE_PREFIX + cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        clientBioCache.set(cacheKey, parsed);
        return parsed;
      }
    } catch (e) {
      console.warn("[Client Cache] Error reading sessionStorage:", e);
    }
  }
  return null;
}

// Helper to write to both caches
function setCachedResult(cacheKey, data) {
  clientBioCache.set(cacheKey, data);
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(SESSION_CACHE_PREFIX + cacheKey, JSON.stringify(data));
    } catch (e) {
      console.warn("[Client Cache] Error writing to sessionStorage:", e);
    }
  }
}

/**
 * Client-facing generation request.
 * Invokes the secure server-side /api/generate gateway instead of making direct browser Gemini calls.
 */
export async function generateBio({ data, lang, onStatusChange }) {
  const cacheKey = `${JSON.stringify(data)}_${lang}`;

  // 1. Caching Layer check
  const cached = getCachedResult(cacheKey);
  if (cached) {
    console.log(`%c[Client AI Manager] Cache Hit for lang: ${lang}. Returning cached result instantly.`, "color: #00bcd4; font-weight: bold;");
    onStatusChange?.("success");
    return cached;
  }

  // 2. Prevent concurrent duplicate calls (Deduplication)
  if (activeClientPromises.has(cacheKey)) {
    console.log(`[Client AI Manager] Reusing active pending request for lang: ${lang}`);
    onStatusChange?.("queued");
    return activeClientPromises.get(cacheKey);
  }

  // Define client execution promise
  const promise = (async () => {
    const reqId = `cli_${Math.random().toString(36).substring(2, 11)}`;
    const startTime = Date.now();

    console.log(`[Client AI Manager] ${reqId} | Dispatching request to Server API Gateway /api/generate | Lang: ${lang}`);
    onStatusChange?.("generating");

    try {
      // Dispatch POST request to our secure Next.js API route
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, lang }),
      });

      const duration = Date.now() - startTime;

      if (!resp.ok) {
        let errorMsg = "AI could not generate bio. Please try again.";
        try {
          const errJson = await resp.json();
          if (errJson?.error) {
            errorMsg = errJson.error;
          }
        } catch (_) {}
        throw new Error(errorMsg);
      }

      const parsedJson = await resp.json();
      
      // Cache success payload
      setCachedResult(cacheKey, parsedJson);
      
      console.log(`%c[Client AI Manager] ${reqId} | SUCCESS | Duration: ${duration}ms`, "color: #4CAF50; font-weight: bold;");
      onStatusChange?.("success");
      return parsedJson;

    } catch (err) {
      const duration = Date.now() - startTime;
      console.warn(`%c[Client AI Manager] ${reqId} | FAILED | Duration: ${duration}ms | Reason: ${err.message}`, "color: #FF5722; font-weight: bold;");
      
      onStatusChange?.("failed", err.message);
      throw err;
    } finally {
      activeClientPromises.delete(cacheKey);
    }
  })();

  activeClientPromises.set(cacheKey, promise);
  return promise;
}
