(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', '$state', '$stateParams', '$timeout', 'FlashService'];

    function HomeController($scope, $rootScope, CoreService, $state, $stateParams, $timeout, FlashService) {
        var vm = this;
        angular.element(".filter label input[type='radio']").prop("checked", false);
        vm.day = "1";
        vm.modifiedDay = '1';
        vm.events = [];
        vm.type = "1";
        if ($stateParams.params && $stateParams.params.type) {
        	vm.modifiedType = $stateParams.params.type;
        	vm.type = $stateParams.params.type;
        }
        else {
        	vm.modifiedType = '1';
        }
         if ($stateParams.params && $stateParams.params.day) {
        	vm.day = $stateParams.params.day;
        	vm.modifiedDay = $stateParams.params.day;
        }
        else {
        	vm.modifiedDay  = '1'
        }
        
        vm.isSearch = false;
        vm.programTypes = [];
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        vm.updateModel = updateModel;
        CoreService.addLoader();
        if ($stateParams.params && $stateParams.params.searchKey) {
            CoreService.getSearchedEvents({ search_key: $stateParams.params.searchKey }).then(function (res) {
                vm.events = res.data.programme_list;
                vm.isSearch = true;
                if(!vm.events.length || vm.events.length == 0){
                    FlashService.Warning("No Data to display");
                }
                CoreService.removeLoader();
            }, function (err) {
                handleError();
            }).catch(function (error) {
                handleError();
            });
        }
        else {
            vm.isSearch = false;
            CoreService.getAllEvents().then(function (res) {
                processResponse(res);
            }, function (err) {
                handleError();
            }).catch(function (error) {
                handleError();
            });
        }
        function processResponse(res) {
            if(res.data.programme_list)
            localStorage["events"] = JSON.stringify(res.data.programme_list);
            if(res.data.programme_types)
            localStorage["programTypes"] = JSON.stringify(res.data.programme_types);
            if(res.data.programme_days)
            localStorage["programDays"] = JSON.stringify(res.data.programme_days);
            if (res.data.user_data)
                localStorage["userData"] = JSON.stringify(res.data.user_data);
            vm.events = res.data.programme_list;
            vm.programTypes = res.data.programme_types;
            CoreService.removeLoader();
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
            if (navigator.onLine) {
                $state.go("programDetail", { program_id: id });
            }
            else {
                FlashService.Warning("You are in offline mode, Please go online to view programme details");
                //FlashService.clearFlashMessageOntimeout(5000);
            }
        }

        function updateModel($event) {
            console.log($event)
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
            $state.go('home.day', {day: vm.day});
        }

        vm.changeType = function (val) {
        	$state.go('home.day.event', {type: val, day: vm.modifiedDay});
        }

        vm.changeDay = function (val) {
        	$state.go('home.day', {day: val});
        }

        $scope.$on('$stateChangeStart', function($event, next, current) { 

        	if(next.name === 'home.day') {
            	vm.day = current.day;
            	vm.modifiedDay = current.day;
            }
            else {
            	vm.day = '1';
            	vm.modifiedDay = '1';
            }


            if(next.name === 'home.day.event') {
            	vm.modifiedType = current.type;
            	vm.type = current.type;

            	vm.day = current.day;
            	vm.modifiedDay = current.day;
            }
            else {
            	vm.modifiedType = '1';
            	vm.type = '1';
            }
        

            setTimeout(function () {
            	$scope.$digest();
            });

            setTimeout(function () {
            	$scope.$apply();
            	 try {
            	 	document.body.click();
	            	$(window).trigger('resize');
	            	$scope.$digest();
	            	 // window.getComputedStyle();

	            }
	            catch (e) {
	            	console.log('Window resize error: ', e);
	            }
            }, 200);
           
        });
    }

})();