/* Karinthi · Compagnon — Service Worker
   Stratégie :
   - precache de la coquille applicative (HTML, CSS, JSX, icônes, manifest)
   - runtime cache pour les ressources CDN (React, ReactDOM, Babel, Google Fonts)
   - navigation : network-first avec repli vers le cache puis offline.html
   - statique same-origin : stale-while-revalidate
*/

const VERSION = "v1.1.0";
const PRECACHE = `karinthi-precache-${VERSION}`;
const RUNTIME  = `karinthi-runtime-${VERSION}`;

// Coquille applicative à mettre en cache au moment de l'install.
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./offline.html",
  "./styles.css",
  "./pwa.css",
  "./data.jsx",
  "./ui.jsx",
  "./screens.jsx",
  "./tweaks-panel.jsx",
  "./app.jsx",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/favicon-16.png"
];

// CDN à mettre en cache à la première utilisation
const RUNTIME_ALLOWLIST = [
  "https://unpkg.com/",
  "https://fonts.googleapis.com/",
  "https://fonts.gstatic.com/"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== PRECACHE && k !== RUNTIME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isRuntimeAllowed(url) {
  return RUNTIME_ALLOWLIST.some((prefix) => url.startsWith(prefix));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Requêtes de navigation → network-first avec repli cache/offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const shell = await caches.match("./index.html");
          if (shell) return shell;
          return caches.match("./offline.html");
        })
    );
    return;
  }

  // Same-origin → stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetched = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetched;
      })
    );
    return;
  }

  // CDN tiers autorisé → cache-first puis réseau
  if (isRuntimeAllowed(url.href)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && (res.status === 200 || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => cached);
      })
    );
  }
});
