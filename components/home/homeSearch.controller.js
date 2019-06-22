(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeSearchController', HomeSearchController);

    HomeSearchController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$state', '$stateParams', '$timeout'];

    function HomeSearchController($scope, $rootScope, CoreService, $state, $stateParams, $timeout) {        
        var vm = this;
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        vm.updateModel = updateModel;
        CoreService.addLoader();
        if ($stateParams.params && $stateParams.params.searchKey) {           
            vm.isSearch = false;
            CoreService.getSearchedEvents({ search_key: $stateParams.params.searchKey }).then(function (res) {
                processResponse(res);
            }, function (err) {
                handleError();
            }).catch(function (error) {
                handleError();
            });
        }
        function processResponse(res) {
            if (localStorage["programTypes"]) {
                vm.programTypes = JSON.parse(localStorage["programTypes"])
            }
            if(localStorage["programDays"]){
                vm.programDays = JSON.parse(localStorage["programDays"])
            }
            vm.type = res.data.programme_list[0].type;
            vm.day = res.data.programme_list[0].day;
            vm.events = res.data.programme_list;
            CoreService.removeLoader();
        }
        function handleError() {
            if (localStorage["events"]) {
                vm.events = JSON.parse(localStorage["events"]);
            }
            if (localStorage["programTypes"]) {
                vm.programTypes = JSON.parse(localStorage["programTypes"])
            }
            if(localStorage["programDays"]){
                vm.programTypes = JSON.parse(localStorage["programDays"])
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