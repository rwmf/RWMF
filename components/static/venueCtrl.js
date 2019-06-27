(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('VenueController', VenueController);
    VenueController.$inject = ['$rootScope', '$sce', '$scope', "CoreService", "$stateParams", "$timeout"];

    function VenueController($rootScope, $sce, $scope, CoreService, $stateParams, $timeout) {
        var vm = this;
        $rootScope.mainHeader = "Venue Locator";
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        var cities = 
        vm.cities = cities;
        vm.isNavigated = false;
        CoreService.setClientHeight().then(function () {
            vm.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/d/embed?mid=1g4Nr2mOxgBA2jqI_FeVefdeKNncFVj8T");
            $rootScope.isLoading = true;
            if ($stateParams.venueDetails) {
                 vm.isNavigated = true;
                 $stateParams.venueDetails.latitude = $stateParams.venueDetails.stage_latitude;
                 $stateParams.venueDetails.longitude = $stateParams.venueDetails.stage_longitude;
                 $stateParams.venueDetails.location = $stateParams.venueDetails.stage_location;
                 vm.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyAgSkVT1uTk7XBFToLLzS50JO7UJtMujTM&q="+$stateParams.venueDetails.stage_latitude+","+$stateParams.venueDetails.stage_longitude);     
            } 
        })
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();