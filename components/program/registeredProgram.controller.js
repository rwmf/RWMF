(function() {
    'use strict';
    angular
        .module('RWMF')
        .controller('ProgramController', ProgramController);
    ProgramController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', 'FlashService', '$timeout'];

    function ProgramController($scope, $rootScope, CoreService, $state, FlashService, $timeout) {
        var vm = this;
        $rootScope.pageName = "home";
        vm.day = "1";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        vm.gotoVenue = gotoVenue;
        if (localStorage['userToken']) {
            CoreService.addLoader();
            CoreService.getAllRegisteredProgrammes({ utoken: localStorage['userToken'] }).then(function(response) {
                if (response.data.registered_prgms.length > 0) {
                    vm.programmes = response.data.registered_prgms;
                    localStorage["registered_prgms"] = JSON.stringify(vm.programmes);
                } else {
                    FlashService.Warning("You have not registered for any programmes");
                }
                CoreService.removeLoader();
            }, function(err) {
                if (localStorage["registered_prgms"]) {
                    vm.programmes = JSON.parse(localStorage["registered_prgms"]);
                }
                CoreService.removeLoader();
            }).catch(function(err) {
                if (localStorage["registered_prgms"]) {
                    vm.programmes = JSON.parse(localStorage["registered_prgms"]);
                }
                CoreService.removeLoader();
            });
        } else {
            FlashService.Warning("You are not permitted to view this page without being logged in, You will be redirected to login page soon. Please login and come back");
            $timeout(function() {
                $state.go("login")
            }, 5000)
        }
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        };

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        };

        function gotoVenue(venueObj) {
            $state.go('venue', { venueDetails: venueObj });
        };
    }

})();