(function() {
    'use strict';
    angular.module('RWMF')
        .constant('urlConfig', {
            "https": "https://",
            "http": "http://",
            "api_endpoint": "rwmf.estrradodemo.com/admin/api/rwmf/",
            "root_path": "rwmf.estrradodemo.com",
            "api_root_path": "rwmf.estrradodemo.com/admin/api"
        }).constant('stateHeaders', {
            "home": "Programmes",
            "registeredPgm": "My Registered Programmes",
            "programDetail": "Programme Details",
            "ticketInfo": "Tickets Info",
            "busSchedule": "Shuttle Bus Schedule",
            "venueLocator": "Venue Locator",
            "about": "About",
            "profile": "Profile",
            "contactDetails": "Contact Us"
        });
})();