const CACHE_NAME = 'nature-studios-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/script.js'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Handle Image Requests: Cache First, then Network
    if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If not in cache, fetch and cache
                return fetch(request)
                    .then(response => {
                        // Verify response is valid (allow opaque responses for cross-origin images)
                        if (!response || (response.status !== 200 && response.type !== 'opaque')) {
                            return response;
                        }

                        // Clone response to cache it
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            try {
                                cache.put(request, responseToCache);
                            } catch (err) {
                                console.warn('Failed to cache image:', err);
                            }
                        });

                        return response;
                    })
                    .catch(err => {
                        console.error('Image fetch failed:', err);
                    });
            })
        );
        return;
    }

    // Handle other requests: Stale-While-Revalidate
    // (Serve from cache immediately, then update cache from network)
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            const fetchPromise = fetch(request).then(response => {
                if (!response || (response.status !== 200 && response.type !== 'opaque')) {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, responseToCache);
                });
                return response;
            }).catch(() => {
                // If network fails, we just don't update cache.
                // If we didn't have a cached response, this branch might need to handle the error,
                // but we return cachedResponse || fetchPromise below.
            });

            return cachedResponse || fetchPromise;
        })
    );
});
