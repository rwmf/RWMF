(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('ProgramDetailController', ProgramDetailController)
        .filter('trusted', ['$sce', function($sce) {
            return function(url) {
                url = url.replace("/watch", "/embed");
                return $sce.trustAsResourceUrl(url);
            };
        }]);
    ProgramDetailController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$stateParams', 'FlashService'];

    function ProgramDetailController($scope, $rootScope, CoreService, $state, $stateParams, FlashService) {
        var vm = this;
        $rootScope.pageName = "home";
        $rootScope.isLoading = true;
        vm.register = register;
        vm.gotoVenue = gotoVenue;
        CoreService.getProgramDetails($stateParams.program_id).then(function(res) {
            vm.programDetail = res.data.programme_data;
            $rootScope.isLoading = false;
        }, function(res) {
            if (localStorage["program_" + $stateParams.program_id]) {
                vm.programDetail = JSON.parse(localStorage["program_" + $stateParams.program_id]);
            }
            $rootScope.isLoading = false;
        }).catch(function() {
            $rootScope.isLoading = false;
        });

        function register(id) {
            if (navigator.onLine) {
                if (localStorage["userToken"]) {
                    var token = localStorage["userToken"];
                    var data = {
                        programme_id: id,
                        utoken: token
                    }
                    CoreService.registerToProgram(data).then(function(response) {
                        if (response.status == 200) {
                            vm.programDetail.register_status = "1";
                            FlashService.Success(response.data.display);
                        }
                    }, function(err) {
                        FlashService.Error(err.data.display);
                    }).catch(function(err) {
                        FlashService.Error("Something went wrong, please try later");
                    })
                } else {
                    FlashService.Warning("Please Login/Sign Up first, to register to a program");
                    FlashService.clearFlashMessageOntimeout(5000);
                }
            } else {
                FlashService.Warning("Data loaded offline, Please try while on online to register");
                FlashService.clearFlashMessageOntimeout(5000);
            }
        }
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });

        function gotoVenue(venueObj) {
            $state.go('venue', { venueDetails: venueObj });
        }
    }

})();