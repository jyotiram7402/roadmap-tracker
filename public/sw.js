// Minimal service worker — EXISTS ONLY to make the app installable on mobile
// (Android Chrome requires a registered SW with a fetch handler to offer the
// "Install app" prompt / build a WebAPK). It does NO offline caching: every
// request just goes to the network as normal.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
// A fetch handler must be present for installability. We don't call
// respondWith(), so the browser handles each request normally (network).
self.addEventListener("fetch", () => {});
