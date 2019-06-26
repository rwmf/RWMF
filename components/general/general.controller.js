(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('GeneralController', GeneralController);
    GeneralController.$inject = ['$scope', '$rootScope', 'CoreService', 'FlashService', '$window'];

    function GeneralController($scope, $rootScope, CoreService, FlashService, $window) {
        var vm = this;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        vm.gotoPayment = gotoPayment;
        vm.gotoSceduleMap = gotoSceduleMap;
        CoreService.getBusScheduleDetails().then(function(res) {
            vm.busSchedule = res.data.bus_schedule.schedule;
        }, function() {
            FlashService.Error("Something went wrong, please try later");
        }).catch(function() {
            FlashService.Error("Something went wrong, please try later");
        })
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });
        function gotoPayment() {
            if (navigator.onLine) {
                $window.location.href = 'https://www.galactix.asia/rainforest-world-music-festival-2019';
            } else {
                FlashService.Warning("You seems to be offline, Try after connect to Internet");
                FlashService.clearFlashMessageOntimeout(5000);
            }
        }
        function gotoSceduleMap() {
            if (navigator.onLine) {
                $window.location.href = 'https://www.google.com/maps/d/u/0/viewer?mid=1XW6veqawwPMM4iP44ZXE2G6pD62VaJVX&ll=1.6497968277448967%2C110.35116994999998&z=11';
            } else {
                FlashService.Warning("You seems to be offline, Try after connect to Internet");
                FlashService.clearFlashMessageOntimeout(5000);
            }
        }
    }

})();