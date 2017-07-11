"use strict";
importScripts("node_modules/sw-toolbox/sw-toolbox.js");

toolbox.options.debug = true;
toolbox.precache([
    "index.html"
]);
toolbox.router.get("*", toolbox.cacheFirst);
toolbox.router.get("*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });

self.addEventListener("sync", function (event) {
    if (event.tag === "uploadData") {
        event.waitUntil(test.hierKomEk());
    }
});

