(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeSearchController', HomeSearchController);

    HomeSearchController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$state', '$stateParams', 'FlashService'];

    function HomeSearchController($scope, $rootScope, CoreService, $state, $stateParams, FlashService) {
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
            if(res.data && res.data.programme_list && res.data.programme_list.length > 0) {
                vm.type = res.data.programme_list[0].type;
                vm.day = res.data.programme_list[0].day;
                vm.events = res.data.programme_list;
            }
            else {
                FlashService.Warning("No search results found for this keyword");
            }
            $rootScope.mainHeader = "Search Results";
            CoreService.removeLoader();
        }
        function handleError() {
            if (localStorage["events"]) {
                vm.events = JSON.parse(localStorage["events"]);
            }
            else {
                FlashService.Warning("Ohh... Can't fetch search results");
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