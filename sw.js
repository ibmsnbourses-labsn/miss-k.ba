// Service Worker pour PWA - Pour Khadidiatou ❤️
const CACHE_NAME = 'khadidiatou-love-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/video.mp4',
  '/musique.mp3',
  '/icon-192.png',
  '/icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation...');
  event.waitUntil(
    caches.open('khadidiatou-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json'
      ]);
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activé');
});

// Stratégie de cache : Network First, puis Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Gestion des notifications push
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '💕 Message d\'amour';
  const options = {
    body: data.body || 'Un nouveau message pour Khadidiatou',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'love-notification',
    requireInteraction: false,
    data: {
      url: '/'
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});