importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/5.0.0/workbox-sw.js')

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
)
