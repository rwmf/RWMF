(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('VenueController', VenueController);
    VenueController.$inject = ['$rootScope', '$sce', '$scope', "CoreService", "$stateParams", "FlashService"];

    function VenueController($rootScope, $sce, $scope, CoreService, $stateParams, FlashService) {
        var vm = this;
        $rootScope.mainHeader = "Venue Locator";
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        vm.isNavigated = false;
        CoreService.setClientHeight("map").then(function () {            
            $rootScope.isLoading = true;
            if ($stateParams.venueDetails) {
                vm.isNavigated = true;
                $stateParams.venueDetails.latitude = parseFloat($stateParams.venueDetails.stage_latitude);
                $stateParams.venueDetails.longitude = parseFloat($stateParams.venueDetails.stage_longitude);
                $stateParams.venueDetails.location = $stateParams.venueDetails.stage_location;
                var geocoder = new google.maps.Geocoder;
                var latlng = { lat: $stateParams.venueDetails.latitude, lng: $stateParams.venueDetails.longitude };
                geocoder.geocode({ 'location': latlng }, function (results, status) {
                    if (status === 'OK' && results[0]) {
                        vm.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyAgSkVT1uTk7XBFToLLzS50JO7UJtMujTM&q=" + results[0].formatted_address);
                    } else {
                        vm.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyAgSkVT1uTk7XBFToLLzS50JO7UJtMujTM&q=" + $stateParams.venueDetails.stage_latitude + "," + $stateParams.venueDetails.stage_longitude);
                        FlashService.Warning("Map loaded with coordinates Full address not available");
                        FlashService.clearFlashMessageOntimeout(3000);
                    }
                });
                
            }
            else {
                vm.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/d/embed?mid=1g4Nr2mOxgBA2jqI_FeVefdeKNncFVj8T");
                FlashService.Error("Google maps not available map loaded over offline, If not loaded please try after sometime.");
                FlashService.clearFlashMessageOntimeout(3000);
            }
        })
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();