(function() {
    'use strict';
    angular
        .module('RWMF')
        .controller('ProgramController', ProgramController);
    ProgramController.$inject = ['$rootScope', 'CoreService', '$state', 'FlashService', '$timeout'];

    function ProgramController($rootScope, CoreService, $state, FlashService, $timeout) {
        var vm = this;
        $rootScope.pageName = "home";
        vm.day = "1"
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        if (localStorage['userToken']) {
            CoreService.addLoader();
            CoreService.getAllRegisteredProgrammes({ utoken: localStorage['userToken'] }).then(function(response) {
                vm.programmes = response.data.registered_prgms;
                CoreService.removeLoader();
            }, function(err) {
                CoreService.removeLoader();
            }).catch(function(err) {
                CoreService.removeLoader();
            });
        } else {
            FlashService.Warning("You are not permitted to view this page without being logged in, You will be redirected to login page soon. Please login and come back");
            $timeout(function() {
                $state.go("login")
            }, 5000)
        }

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        }
    }

})();