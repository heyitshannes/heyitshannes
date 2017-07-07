//(global => {
//    "use strict";
//    importScripts("/node_modules/sw-toolbox/sw-toolbox.js");

//    // Ensure that our service worker takes control of the page as soon as possible.
//    //global.addEventListener("install", event => event.waitUntil(global.skipWaiting()));
//    //global.addEventListener("activate", event => event.waitUntil(true));

//    global.toolbox.options.debug = true;
//    toolbox.precache([
//        "/index.html"
//    ] );
//    toolbox.router.get("/index.html", toolbox.cacheFirst, {
//        cache: {
//            name: "siteCache",
//            maxEntries: 1000000,
//            maxAgeSeconds: 172800
//        }
//    });

//    //toolbox.router.get("/images/*", global.toolbox.cacheFirst);
//    //toolbox.router.get("/*", global.toolbox.networkFirst, { networkTimeoutSeconds: 5 });
//    //toolbox.router.get("/", global.toolbox.offline);
//})(self);

"use strict";
importScripts("/node_modules/sw-toolbox/sw-toolbox.js");

// Ensure that our service worker takes control of the page as soon as possible.
//global.addEventListener("install", event => event.waitUntil(global.skipWaiting()));
//global.addEventListener("activate", event => event.waitUntil(true));

toolbox.options.debug = true;
toolbox.precache([
    "/index.html"
]);
toolbox.router.get("/*", toolbox.cacheFirst);
//toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });
