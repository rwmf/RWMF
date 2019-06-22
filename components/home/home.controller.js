(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$state', '$stateParams'];

    function HomeController($scope, $rootScope, CoreService, $state, $stateParams) {
        var vm = this;
        vm.day = "1";
        vm.events = [];
        vm.type = "1";
        vm.programTypes = [];
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        vm.updateModel = updateModel;
        CoreService.addLoader();
        if ($stateParams.current.params && $stateParams.current.params.searchKey) {
            CoreService.getSearchedEvents().then(function (res) {
                localStorage["events"] = JSON.stringify(res.data.programme_list);
                vm.events = res.data.programme_list;
                CoreService.removeLoader();
            }, function (err) {
                handleError();
            }).catch(function (error) {
                handleError();
            });
        }
        else {
            CoreService.getAllEvents().then(function (res) {
                processResponse(res);
            }, function (err) {
                handleError();
            }).catch(function (error) {
                handleError();
            });
        }
        function processResponse(res) {
            localStorage["events"] = JSON.stringify(res.data.programme_list);
            localStorage["programTypes"] = JSON.stringify(res.data.programme_types);
            if (res.data.user_data)
                localStorage["userData"] = JSON.stringify(res.data.user_data);
            vm.events = res.data.programme_list;
            vm.programTypes = res.data.programme_types;
            CoreService.removeLoader();
            for (var i = 0; i < vm.events.length; i++) {
                CoreService.getProgramDetails(vm.events[i].id).then(function (res) {
                    localStorage["program_" + res.data.programme_data.id] = JSON.stringify(res.data.programme_data);
                });
            }
        }
        function handleError() {
            if (localStorage["events"]) {
                vm.events = JSON.parse(localStorage["events"]);
            }
            if (localStorage["programTypes"]) {
                vm.programTypes = JSON.parse(localStorage["programTypes"])
            }
            CoreService.removeLoader();
        }
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        }

        function updateModel($event) {
            console.log($event)
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        }
    }

})();