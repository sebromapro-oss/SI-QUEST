'use strict';
const CACHE = 'siquest-cycle27-20261025';
const FILES = [
  './', './index.html', './play.html', './manifest.webmanifest',
  './assets/hub-si-quest.png', './assets/icon.svg', './assets/icon-192.png', './assets/icon-512.png',
  './src/style.css', './src/physics.js', './src/catalog.js', './src/storage.js', './src/coaching.js', './src/home.js', './src/game.js',
  './mondes/gear-forge/index.html'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('siquest-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  })));
});
