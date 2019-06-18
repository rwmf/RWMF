(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$state'];

    function HomeController($scope, $rootScope, CoreService, $state) {
        var vm = this;
        vm.day = "1";
        vm.events = [];
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        CoreService.addLoader();
        CoreService.getAllEvents().then(function(res) {
            localStorage["events"] = JSON.stringify(res.data.programme_list);
            vm.events = res.data.programme_list;
            CoreService.removeLoader();
            for (var i = 0; i < vm.events.length; i++) {
                CoreService.getProgramDetails(vm.events[i].id).then(function(res) {
                    localStorage["program_" + res.data.programme_data.id] = JSON.stringify(res.data.programme_data);
                });
            }
        }, function(err) {
            if (localStorage["events"])
                vm.events = JSON.parse(localStorage["events"]);
            CoreService.removeLoader();
        }).catch(function(error) {
            console.log(error)
            CoreService.removeLoader();
        });
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        }
    }

})();