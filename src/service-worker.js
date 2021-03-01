importScripts('ngsw-worker.js');

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return new Response("К сожалению, мы вынуждены показать Вам оффлайн страницу :(");
        })
    );
});