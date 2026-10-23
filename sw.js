/* Service worker: tiene in memoria l'app per giocare anche senza connessione. */
const CACHE = 'dama-scacchi-v3';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'privacy.html', 'licenze.html',
  'js/chess.js', 'js/firebase-app-compat.js', 'js/firebase-auth-compat.js', 'js/firebase-database-compat.js', 'js/firebase-config.js',
  'fonts/bodoni-moda-latin-500-normal.woff2', 'fonts/bodoni-moda-latin-700-normal.woff2', 'fonts/bodoni-moda-latin-500-italic.woff2',
  'fonts/instrument-sans-latin-400-normal.woff2', 'fonts/instrument-sans-latin-500-normal.woff2', 'fonts/instrument-sans-latin-600-normal.woff2', 'fonts/instrument-sans-latin-700-normal.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Firebase passa sempre dalla rete
  // Rete prima (così gli aggiornamenti arrivano subito), copia salvata se si è offline.
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
