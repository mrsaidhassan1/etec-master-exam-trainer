// ETEC Trainer service worker: network first, cached copy only when offline.
// Never touches the Apps Script backend (sign-in, progress sync): those requests go straight to the network.
const CACHE = "etec-trainer-v1";
const SHELL = ["./", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"];
const CDN = ["cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if(!sameOrigin && CDN.indexOf(url.hostname) === -1) return;
  e.respondWith(
    fetch(req).then(function(res){
      if(res && (res.ok || res.type === "opaque")){
        const copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){ return hit || (req.mode === "navigate" ? caches.match("./") : Response.error()); });
    })
  );
});
