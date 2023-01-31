self.addEventListener('fetch', event => {
  return false
})

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install')
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})
