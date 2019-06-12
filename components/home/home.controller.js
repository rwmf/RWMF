(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'CoreService', '$state', '$state'];

    function HomeController($rootScope, CoreService, $state) {
        var vm = this;
        vm.day = "1";
        vm.events = [];
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        CoreService.addLoader();
        CoreService.getAllEvents().then(function(res) {
            vm.events = res.data.programme_list;
            CoreService.removeLoader();
        }, function(err) {
            CoreService.removeLoader();
        }).catch(function(error) {
            console.log(error)
            CoreService.removeLoader();
        });

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        }
    }

})();