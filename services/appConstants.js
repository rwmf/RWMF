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
            "home": "Events",
            "registeredPgm": "Registered Events",
            "programDetail": "Event Details",
            "ticketInfo": "Tickets",
            "busSchedule": "Bus Schedule",
            "venueLocator": "Venue Locator",
            "about": "About",
            "profile": "Profile",
            "contact": "Contact Us"
        });
})();