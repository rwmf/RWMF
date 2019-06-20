(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('VenueController', VenueController);
    VenueController.$inject = ['$rootScope', '$scope', "CoreService", "$stateParams"];

    function VenueController($rootScope, $scope, CoreService, $stateParams) {
        var vm = this;
        $rootScope.mainHeader = "Venue Locator";
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        var cities = [{
                "id": "1",
                "name": "Theatre Stage",
                "description": "Theatre Stage",
                "location": "Rainforest World Music Festival",
                "latitude": "1.7493987783454987",
                "longitude": "111.31633585691452",
                "image": ""
            },
            {
                "id": "4",
                "name": "Indigenous Stage",
                "description": "Indigenous Stage",
                "location": "Sarawak Cultural Village",
                "latitude": "1.7493974378660602",
                "longitude": "112.31673014163971",
                "image": ""
            },
            {
                "id": "5",
                "name": "Big Tent Stage",
                "description": "Big Tent Stage",
                "location": "Sarawak Cultural Villag",
                "latitude": "1.74668211939595",
                "longitude": "113.31431078910828",
                "image": ""
            },
            {
                "id": "6",
                "name": "Jungle Stage",
                "description": "Jungle Stage",
                "location": "Jungle Stage",
                "latitude": "1.749408161701505",
                "longitude": "114.31672477722168",
                "image": ""
            },
            {
                "id": "7",
                "name": "Tree Stage",
                "description": "Tree Stage",
                "location": "Tree Stage",
                "latitude": "1.7493974378660602",
                "longitude": "115.31673014163971",
                "image": ""
            }
        ];
        vm.cities = cities;
        CoreService.setClientHeight().then(function() {
            var mapOptions;
            $rootScope.isLoading = true;
            if ($stateParams.venueDetails) {
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
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                createMarker($stateParams.venueDetails, $scope.infoWindow);
                google.maps.event.addListener($scope.infoWindow, 'domready', function() {
                    $('.infoWindowContent').parents(".gm-style .gm-style-iw-c").addClass("custom-marker");
                });
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }
            } else {
                CoreService.getVenueDetails().then(function(resp) {
                    vm.cities = resp.data.venues;
                    mapOptions = {
                        zoom: 4,
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    }
                    $scope.bounds = new google.maps.LatLngBounds();
                    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    $scope.map.setTilt(45);
                    $scope.infoWindow = new google.maps.InfoWindow();
                    for (i = 0; i < vm.cities.length; i++) {
                        var position = new google.maps.LatLng(vm.cities[i].latitude, vm.cities[i].longitude);
                        $scope.bounds.extend(position);
                        createMarker(vm.cities[i], $scope.infoWindow);
                        $scope.map.fitBounds($scope.bounds);
                    }
                    google.maps.event.addListener($scope.infoWindow, 'domready', function() {
                        $('.infoWindowContent').parents(".gm-style .gm-style-iw-c").addClass("custom-marker");
                    });
                    $scope.openInfoWindow = function(e, selectedMarker) {
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    }
                    google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function() {
                        $rootScope.isLoading = false;
                    });
                }, function(error) {
                    vm.cities = cities;
                }).catch(function(error) {
                    vm.cities = cities;
                });

            }

            google.maps.event.addDomListener(window, "resize", function() {
                if (document.getElementById("map")) {
                    CoreService.setClientHeight();
                    var center = $scope.map.getCenter();
                    google.maps.event.trigger($scope.map, "resize");
                    $scope.map.setCenter(center);
                }
            });
        })
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });

        function createMarker(info, infoWindow) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(parseInt(info.latitude), parseInt(info.longitude)),
                title: info.location
            });
            var content = '<div class="infoWindowContent"><h4 class="info-header">' + marker.title + '</h4>' +
                '<ul class="location">' +
                '<li class="address mb-3"><span><b class="text-upper">' + info.description + '</b></span></li>' +
                '</ul></div>';

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(content);
                infoWindow.open($scope.map, marker);
            });
            return marker;
        }

    }

})();