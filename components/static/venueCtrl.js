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
        var cities = [
            {
                "id": "1",
                "name": "Theatre Stage",
                "description": "Theatre Stage",
                "location": "Rainforest World Music Festival",
                "latitude": "1.749415",
                "longitude": "111.316273",
                "image": ""
            }, {
                "id": "2",
                "name": "Raine Forest Music House",
                "description": "Raine Forest Music House",
                "location": "Raine Forest Music House",
                "latitude": "1.749471",
                "longitude": "112.316775",
                "image": ""
            }, {
                "id": "3",
                "name": "Chinese Farm House",
                "description": "Chinese Farm House",
                "location": "Chinese Farm House",
                "latitude": "1.750316",
                "longitude": "113.315839",
                "image": ""
            }, {
                "id": "4",
                "name": "Indigenous Stage",
                "description": "Indigenous Stage",
                "location": "Sarawak Cultural Village",
                "latitude": "2.9593974378660602",
                "longitude": "114.31673014163971",
                "image": ""
            }, {
                "id": "5",
                "name": "Big Tent Stage",
                "description": "Big Tent Stage",
                "location": "Sarawak Cultural Villag",
                "latitude": "3.750808",
                "longitude": "110.314645",
                "image": ""
            }, {
                "id": "6",
                "name": "Jungle Stage",
                "description": "Jungle Stage",
                "location": "Jungle Stage",
                "latitude": "4.748825",
                "longitude": "110.318054",
                "image": ""
            }, {
                "id": "7",
                "name": "Tree Stage",
                "description": "Tree Stage",
                "location": "Tree Stage",
                "latitude": "1.748689",
                "longitude": "118.317740",
                "image": ""
            }, {
                "id": "8",
                "name": "Dewan Lagenda",
                "description": "Dewan Lagenda",
                "location": "Dewan Lagenda",
                "latitude": "1.949435",
                "longitude": "120.318339",
                "image": ""
            }, {
                "id": "9",
                "name": "Iban Longhouse",
                "description": "Iban Longhouse",
                "location": "Iban Longhouse",
                "latitude": "5.749558",
                "longitude": "110.317642",
                "image": ""
            }, {
                "id": "10",
                "name": "Bidayuh Baruk",
                "description": "Bidayuh Baruk",
                "location": "Bidayuh Baruk",
                "latitude": "6.749255",
                "longitude": "110.317041",
                "image": ""
            },
            {
                "id": "11",
                "name": "Bidayuh Terrace",
                "description": "Bidayuh Terrace",
                "location": "Bidayuh Terrace",
                "latitude": "1.749014",
                "longitude": "110.317162",
                "image": ""
            }, {
                "id": "12",
                "name": "Escobar",
                "description": "Escobar",
                "location": "Escobar",
                "latitude": "1.7500355059684187",
                "longitude": "110.31398624181747",
                "image": ""
            }, {
                "id": "13",
                "name": "Damai Central",
                "description": "",
                "location": "Damai Central",
                "latitude": "1.7500837632110315",
                "longitude": "110.3148901462555",
                "image": ""
            }, {
                "id": "14",
                "name": "Amphitheatre",
                "description": "",
                "location": "Amphitheatre",
                "latitude": "1.7498184478298837",
                "longitude": "110.31457614835153",
                "image": ""
            }, {
                "id": "15",
                "name": "Public Toilet - Damai Central",
                "description": "",
                "location": "Damai Central",
                "latitude": "1.749951883698941",
                "longitude": "110.31479981377345",
                "image": ""
            }, {
                "id": "16",
                "name": "ATM - Damai Central",
                "description": "",
                "location": "Damai Central",
                "latitude": "1.7503376000107398",
                "longitude": "110.31489579257766",
                "image": ""
            }, {
                "id": "17",
                "name": "Shuttle Service Pick Up/Drop Off",
                "description": "",
                "location": "Shuttle Service Pick Up/Drop Off",
                "latitude": "1.7499564044939213",
                "longitude": "110.315034245942",
                "image": ""
            }, {
                "id": "18",
                "name": "RWMF Festival Entrance",
                "description": "",
                "location": "RWMF Festival Entrance",
                "latitude": "1.7496067547849883",
                "longitude": "110.31603091413285",
                "image": ""
            }, {
                "id": "19",
                "name": "Sarawak Tourism Board Showcase",
                "description": "",
                "location": "Sarawak Tourism Board Showcase",
                "latitude": "1.749186969369907",
                "longitude": "110.31638138541973",
                "image": ""
            }, {
                "id": "20",
                "name": "Village Mart",
                "description": "",
                "location": "Village Mart",
                "latitude": "1.7501757963255877",
                "longitude": "110.31615786772898",
                "image": ""
            }
        ];
        vm.cities = cities;
        CoreService.setClientHeight().then(function () {
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
            } else {
                CoreService.getVenueDetails().then(function (resp) {
                    drawMap(resp.data.venues);
                }, function (error) {
                    drawMap(cities);
                }).catch(function (error) {
                    drawMap(cities);
                });

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
                if (document.getElementById("map")) {
                    CoreService.setClientHeight();
                    var center = $scope.map.getCenter();
                    google.maps.event.trigger($scope.map, "resize");
                    $scope.map.setCenter(center);
                }
            });
        }

        function createMarker(info, infoWindow) {
            var position = new google.maps.LatLng(parseInt(info.latitude) + (Math.floor(Math.random() * 6) - 6), parseInt(info.longitude) + (Math.floor(Math.random() * 6) - 6));
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