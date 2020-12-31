// from: https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/

var timestamp = 1609387811214
var cacheName = "cache".concat(timestamp);

// use: dir /s/b > list.txt
const assets = [
	"/assets",
	"/buttons.css",
	"/components.html",
	"/favicon.ico",
	"/helpers.css",
	"/helpers.js",
	"/index.html",
	"/layout.css",
	"/lib",
	"/list.txt",
	"/manifest.json",
	"/normalize.css",
	"/ReadMe.md",
	"/reset.css",
	"/service-worker-register.js",
	"/service-worker.js",
	"/style.css",
	"/styles.js",
	"/assets/icons",
	"/assets/sounds",
	"/assets/icons/logo-192.png",
	"/assets/icons/logo-512.png",
	"/assets/icons/menu.svg",
	"/assets/icons/numeric-0.svg",
	"/assets/icons/numeric-1.svg",
	"/assets/icons/play.svg",
	"/assets/icons/stop.svg",
	"/assets/icons/undo.svg",
	"/assets/icons/volume-high.svg",
	"/assets/sounds/click-1.mp3",
	"/assets/sounds/click-2.mp3",
	"/assets/sounds/click-3.mp3",
	"/lib/NoSleep.min.js"
]

var catchLog = promise => {
	if (promise instanceof Promise) {
		return promise.catch(err => {
			logger.error(err)
			throw err
		})
	}
	return promise
}


self.addEventListener("install", event => {
  event.waitUntil(catchLog(caches
	.open(cacheName)
	.then(cache => {
		cache.addAll(assets)
    })
  ))
})

self.addEventListener("fetch", event => {
  event.respondWith(catchLog(caches
	.match(event.request)
	.then(res => {
		return res || fetch(event.request)
    })
  ))
})
