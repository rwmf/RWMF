// global.toolbox is defined in a different script, sw-toolbox.js, which is part of the
// https://github.com/GoogleChrome/sw-toolbox project.
// That sw-toolbox.js script must be executed first, so it needs to be listed before this in the
// importScripts() call that the parent service worker makes.
(function(global) {
    'use strict'
    global.toolbox.router.get('/(.*)', global.toolbox.fastest);
    // global.toolbox.router.get('/', global.toolbox.fastest)
    // global.toolbox.router.get('/details', global.toolbox.fastest)
    // global.toolbox.router.get('/layout', global.toolbox.fastest)
    // global.toolbox.router.get('/header', global.toolbox.fastest)
    // global.toolbox.router.get('/shots', global.toolbox.fastest)
    global.toolbox.router.get('index.html', global.toolbox.fastest)
    global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
        origin: /\.(?:googleapis|gstatic|bootstrapcdn|estrradodemo)\.com$/
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://rwmf.estrradodemo.com'
    });
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://khm0.googleapis.com'
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://cbk0.googleapis.com/cbk'
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://maps.googleapis.com'
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://rwmf.estrradodemo.com/admin/api/rwmf/'
    })
})(self)