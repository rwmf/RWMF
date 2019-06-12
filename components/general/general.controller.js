(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('GeneralController', GeneralController);
    GeneralController.$inject = ['$rootScope', 'CoreService'];

    function GeneralController($rootScope, CoreService) {
        var vm = this;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        CoreService.getBusScheduleDetails().then(function(res) {
            vm.busSchedule = res.data.bus_schedule.schedule;
        }, function() {
            vm.busSchedule = "/admin/uploads/rwmf_image/rwmf_bus_1.png";
        }).catch(function() {
            vm.busSchedule = "/admin/uploads/rwmf_image/rwmf_bus_1.png";
        })
        vm.busSchedule
    }

})();