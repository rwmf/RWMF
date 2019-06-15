(function(global) {
    'use strict'
    global.toolbox.router.get('/(.*)', global.toolbox.fastest);
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