// from: https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/
// from: https://github.com/sveltejs/sapper-template/blob/master/src/service-worker.js

var timestamp = 1609387811214
var ASSETS = "cache".concat(timestamp);

// use: dir /s/b > list.txt
const assets = [
	"/",
	"/__/firebase/8.2.1/firebase-app.js",
	"/__/firebase/8.2.1/firebase-auth.js",
	"/__/firebase/8.2.1/firebase-database.js",
	"/__/firebase/8.2.1/firebase-firestore.js",
	"/__/firebase/8.2.1/firebase-functions.js",
	"/__/firebase/8.2.1/firebase-messaging.js",
	"/__/firebase/8.2.1/firebase-storage.js",
	"/__/firebase/8.2.1/firebase-analytics.js",
	"/__/firebase/8.2.1/firebase-remote-config.js",
	"/__/firebase/8.2.1/firebase-performance.js",
	"/__/firebase/init.js",
	"/__/firebase/init.json",
	"/__/firebase/init.js?useEmulator=true",
	"/__/firebase/init.json?useEmulator=true",
	"/favicon.ico",
	"/index.html",
	"/manifest.json",
	"/assets/icons/account-cancel-outline.svg",
	"/assets/icons/account-check.svg",
	"/assets/icons/arrow-left.svg",
	"/assets/icons/logo-192.png",
	"/assets/icons/logo-512.png",
	"/assets/icons/menu.svg",
	"/assets/icons/numeric-0.svg",
	"/assets/icons/numeric-1.svg",
	"/assets/icons/play.svg",
	"/assets/icons/stop.svg",
	"/assets/icons/undo.svg",
	"/assets/icons/volume-high.svg",
	"/assets/icons/weather-night.svg",
	"/js/common/helpers.js",
	"/lib/alpine.min.js",
	"/lib/firebase-ui-auth.css",
	"/lib/firebase-ui-auth.js",
	"/lib/NoSleep.min.js",
	"/lib/tailwind.min.css",
	"/service-worker.js",
	"/styles/app/style.css",
	"/styles/common/buttons.css",
	"/styles/common/helpers.css",
	"/styles/common/normalize.css",
	"/styles/common/reset.css",
]

var catchLog = function(promise) {
	if (promise instanceof Promise) {
		return promise.catch(function(err) {
			console.error(err)
			throw err
		})
	}
	return promise
}


self.addEventListener("install", function(event) {
  event.waitUntil(catchLog(caches
	.open(ASSETS)
	.then(function(cache) {
		return cache.addAll(assets)
    })
	.then(function() {
		self.skipWaiting()
	})
  ))
})


// self.addEventListener('activate', function(event) {
	// event.waitUntil(catchLog(caches
		// .keys()
		// .then(async keys => {
			// // delete old caches
			// for (var i = 0, len = keys.length; i < len; i++) {
              	// var key = keys[i]
				// if (key !== ASSETS) await caches.delete(key);
			// }

			// self.clients.claim();
		// })
	// ))
// })

// transform: https://babeljs.io/repl#?browsers=chrome%20%3E%3D%2033&build=&builtIns=false&spec=false&loose=true&code_lz=M4UwNgZgdAhgJnAogNxAOwC4BkCWwPogBOAFAOQwDGGOyMBZANAAQQCua1OA9miSKkwBKZgG8AUAEgB6DFADuMHBgCqmHGBKV6lABZZuAcy1VdIYFMlQA1iACewEkMtQMZvjGB3OzWw-YAvAB8YpaSAPThzHDgIATM3GBwzNp65mEQ3ETMJHTZOIHMAAwsYOiFfsBQZWiGbgDczAUAPMw1jTgA1J0iEsz9A4ODknm-9hX2wADaOAC6YZI4EDl-zACEAQHMAIIAyruIACq7IjCKyimm5lAxZQQkfkL1YQC-4mGgkFCUYDiyVT8lABbJzPSSSF7OSRCZyQoA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=&prettier=false&targets=&version=7.12.9&externalPlugins=%40babel%2Fplugin-transform-arrow-functions%407.12.1%2Cbabel-plugin-async-to-promises%401.0.5

self.addEventListener('activate', function (event) {
  event.waitUntil(catchLog(caches.keys().then(function (keys) {
    function _recursive() {
      var _test;

      return Promise.resolve().then(function () {
        _test = i < len;

        if (_test) {
          key = keys[i];
        }

        if (_test && key !== ASSETS) {
          return caches.delete(key);
        }
      }).then(function () {
        if (_test) {
          i++;
          return _recursive();
        }
      });
    }

    var i, len, key;
    return Promise.resolve().then(function () {
      // delete old caches
      i = 0, len = keys.length;
      return _recursive();
    }).then(function () {
      self.clients.claim();
    });
  })));
});

self.addEventListener("fetch", function(event) {
  event.respondWith(catchLog(caches
	.match(event.request)
	.then(function(res) {
		return res || fetch(event.request)
			// .then(res => {
				// caches.open(ASSETS).put(event.request, res.clone())
				// return res
			// })
    })
  ))
})
