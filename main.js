if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log("service worker registered")
            registration.onupdatefound = function () {
                if (navigator.serviceWorker.controller) {
                    var installingWorker = registration.installing;

                    installingWorker.onstatechange = function () {
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
        }).catch(function (e) {
            console.error('Error during service worker registration:', e);
        });
} else {
    console.log('service worker is not supported');
}
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyAYJz1EZaNueb3VUV_5rLu0pq0-gm_0Ak0",
    authDomain: "webestrrado.firebaseapp.com",
    databaseURL: "https://webestrrado.firebaseio.com",
    projectId: "webestrrado",
    storageBucket: "webestrrado.appspot.com",
    messagingSenderId: "742634665928",
    appId: "1:742634665928:web:e68e51341c17c267"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function () {
        MsgElem.innerHTML = "Notification permission granted."
        console.log("Notification permission granted.");

        // get the token in the form of promise
        return messaging.getToken()
    })
    .then(function (token) {
        TokenElem.innerHTML = "token is : " + token
    })
    .catch(function (err) {
        ErrElem.innerHTML = ErrElem.innerHTML + "; " + err
        console.log("Unable to get permission to notify.", err);
    });

messaging.onMessage(function (payload) {
    var notificationData = JSON.parse(payload.data.notification);
    var notification = new Notification(notificationData.title, notificationData);
    console.log("Message received. ", payload);
    NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload)
});