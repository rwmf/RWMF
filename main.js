if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log("service worker registered")
            registration.onupdatefound = function() {
                if (navigator.serviceWorker.controller) {
                    var installingWorker = registration.installing;

                    installingWorker.onstatechange = function() {
                        switch (installingWorker.state) {
                            case 'installed':
                                break;
                            case 'redundant':
                                throw new Error('The installing ' +
                                    'service worker became redundant.');
                            default:
                                // Ignore
                        }
                    };
                }
            };
        }).catch(function(e) {
            console.error('Error during service worker registration:', e);
        });
} else {
    console.log('service worker is not supported');
}