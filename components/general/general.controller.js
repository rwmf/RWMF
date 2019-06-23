(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('GeneralController', GeneralController);
    GeneralController.$inject = ['$scope', '$rootScope', 'CoreService', 'FlashService'];

    function GeneralController($scope, $rootScope, CoreService, FlashService) {
        var vm = this;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        vm.gotoPayment = gotoPayment;
        CoreService.getBusScheduleDetails().then(function(res) {
            vm.busSchedule = res.data.bus_schedule.schedule;
        }, function() {
            FlashService.Error("Something went wrong, please try later");
            vm.busSchedule = "/admin/uploads/rwmf_image/rwmf_bus_1.png";
        }).catch(function() {
            FlashService.Error("Something went wrong, please try later");
            vm.busSchedule = "/admin/uploads/rwmf_image/rwmf_bus_1.png";
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
    }

})();