(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('VenueController', VenueController);
    VenueController.$inject = ['$rootScope', '$scope', "CoreService", "$stateParams", "$timeout"];

    function VenueController($rootScope, $scope, CoreService, $stateParams, $timeout) {
        var vm = this;
        $rootScope.mainHeader = "Venue Locator";
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        var cities = 
        vm.cities = cities;
        vm.isNavigated = false;
        CoreService.setClientHeight().then(function () {
            var mapOptions;
            $rootScope.isLoading = true;
            if ($stateParams.venueDetails) {
                vm.isNavigated = true;
                $stateParams.venueDetails.latitude = $stateParams.venueDetails.stage_latitude;
                $stateParams.venueDetails.longitude = $stateParams.venueDetails.stage_longitude;
                $stateParams.venueDetails.location = $stateParams.venueDetails.stage_location;
                mapOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng($stateParams.venueDetails.latitude, $stateParams.venueDetails.longitude),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }
                $scope.infoWindow = new google.maps.InfoWindow();
                var position = new google.maps.LatLng($stateParams.venueDetails.latitude, $stateParams.venueDetails.longitude);
                $scope.bounds = new google.maps.LatLngBounds();
                $scope.bounds.extend(position);
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                createMarker($stateParams.venueDetails, $scope.infoWindow);
                google.maps.event.addListener($scope.infoWindow, 'domready', function () {
                    $('.infoWindowContent').parents(".gm-style .gm-style-iw-c").addClass("custom-marker");
                });
                $scope.openInfoWindow = function (e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }
            } 
             else {
                $rootScope.isLoading = false; 
                vm.isNavigated = false;
            //     CoreService.getVenueDetails().then(function (resp) {
            //         drawMap(resp.data.venues);
            //     }, function (error) {
            //         drawMap(cities);
            //     }).catch(function (error) {
            //         drawMap(cities);
            //     });

             }
        })
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });

        function drawMap(cities) {
            var mapOptions = {
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }
            $scope.bounds = new google.maps.LatLngBounds();
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            $scope.map.setTilt(45);
            $scope.infoWindow = new google.maps.InfoWindow();
            for (i = 0; i < cities.length; i++) {
                createMarker(cities[i], $scope.infoWindow);
            }


            google.maps.event.addListener($scope.infoWindow, 'domready', function () {
                $('.infoWindowContent').parents(".gm-style .gm-style-iw-c").addClass("custom-marker");
            });
            $scope.openInfoWindow = function (e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
            google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function () {
                $rootScope.isLoading = false;
            });
            google.maps.event.addDomListener(window, "resize", function () {
                document.getElementById('iframeMap').contentDocument.location.reload(true);
                if (document.getElementById("map")) {
                    CoreService.setClientHeight();
                    var center = $scope.map.getCenter();
                    google.maps.event.trigger($scope.map, "resize");
                    $scope.map.setCenter(center);
                }
            });
        }

        function createMarker(info, infoWindow) {
            var position = new google.maps.LatLng(parseInt(info.latitude), parseInt(info.longitude));
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: position,
                title: info.location
            });
            var content = '<div class="infoWindowContent"><h4 class="info-header">' + marker.title + '</h4>' +
                '<ul class="location">' +
                '<li class="address mb-3"><span><b class="text-upper">' + info.description + '</b></span></li>' +
                '</ul></div>';
            $scope.bounds.extend(position);
            $timeout(function () {
                $scope.map.fitBounds($scope.bounds)
            }, 500)
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(content);
                infoWindow.open($scope.map, marker);
            });
        }

    }

})();