// Service Worker para Casa Austin PWA
const CACHE_NAME = 'casa-austin-v1.0.0';
const urlsToCache = [
  '/',
  '/web-version.html',
  '/index.html',
  '/styles/style.css',
  '/styles/mobile-fix.css',
  '/assets/jquery-3.5.1.min.js',
  '/assets/moment.min.js',
  '/assets/daterangepicker.min.js',
  '/assets/daterangepicker.css',
  '/assets/es.min.js',
  '/assets/loading.gif',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Error al cachear archivos', error);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', event => {
  // Solo interceptar requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Estrategia: Cache First para recursos estáticos, Network First para API
  if (event.request.url.includes('casaaustin.pe/api/')) {
    // Para la API, usar Network First
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si la respuesta es exitosa, actualizar cache
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, intentar desde cache
          return caches.match(event.request);
        })
    );
  } else {
    // Para recursos estáticos, usar Cache First
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(response => {
              // Verificar si la respuesta es válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              // Clonar la respuesta
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
    );
  }
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Manejar notificaciones push (para futuras funcionalidades)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver Disponibilidad',
          icon: '/icons/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'Cerrar',
          icon: '/icons/icon-72x72.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/web-version.html')
    );
  } else if (event.action === 'close') {
    // No hacer nada, solo cerrar
  } else {
    // Clic en la notificación principal
    event.waitUntil(
      clients.openWindow('/web-version.html')
    );
  }
});

// Manejar actualizaciones en segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí se pueden agregar tareas de sincronización
      console.log('Service Worker: Sincronización en segundo plano')
    );
  }
});
