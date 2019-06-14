// global.toolbox is defined in a different script, sw-toolbox.js, which is part of the
// https://github.com/GoogleChrome/sw-toolbox project.
// That sw-toolbox.js script must be executed first, so it needs to be listed before this in the
// importScripts() call that the parent service worker makes.
(function(global) {
    'use strict'
    global.toolbox.router.get('/(.*)', global.toolbox.fastest);
    global.toolbox.router.get('/', global.toolbox.fastest);
    global.toolbox.router.get('/admin', global.toolbox.fastest);
    global.toolbox.router.get('/components', global.toolbox.fastest);
    global.toolbox.router.get('/css', global.toolbox.fastest);
    global.toolbox.router.get('/font', global.toolbox.fastest);
    global.toolbox.router.get('/images', global.toolbox.fastest);
    global.toolbox.router.get('/img', global.toolbox.fastest);
    global.toolbox.router.get('/js', global.toolbox.fastest);
    global.toolbox.router.get('/services', global.toolbox.fastest);
    global.toolbox.router.get('/index.html', global.toolbox.fastest);


    global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
        origin: /\.(?:googleapis|gstatic|bootstrapcdn|estrradodemo)\.com$/
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://rwmf.estrradodemo.com'
    })
    global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
        origin: 'https://rwmf.estrradodemo.com/admin/api/rwmf/'
    })
})(self)