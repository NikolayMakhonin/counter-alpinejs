if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
			.register("js/common/service-worker.js")
			.then(function(res) {
				console.log("service worker registered")
			})
			.catch(function(err) {
				console.log("service worker not registered", err)
			})
	})
}