// Code base on:
// https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0

'use strict';

const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  'manifest.json',
  '/images/icons/icon-128x128.png',
  'images/favicon.ico',
];

self.addEventListener('install', (evt) => {
  console.log('ServiceWorker: Install');

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('ServiceWorker: Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('ServiceWorker: Activate');
  // Check and remove previous cached from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('ServiceWorker: Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {

  if (evt.request.url.includes('/dreams')) {
    console.log('Service Worker: Fetching dreams', evt.request.url);
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          }).catch(() => {
            return cache.match(evt.request);
          });
      })
    );
    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(cache, evt.request)
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
  );

});

