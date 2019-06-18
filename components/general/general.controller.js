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
    }

})();