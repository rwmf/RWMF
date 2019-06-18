(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', 'CoreService', '$state', '$rootScope', 'FlashService', '$timeout'];

    function RegisterController($scope, CoreService, $state, $rootScope, FlashService, $timeout) {
        var vm = this;
        vm.user = {};
        $rootScope.pageName = "login";
        vm.register = register;
        vm.cancel = cancel;
        angular.element('.sidenav-overlay').remove();
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();

        });

        function register() {
            vm.dataLoading = true;
            CoreService.createUser(vm.user)
                .then(function(response) {
                    if (response.status == 200) {
                        var message = response.data && response.data ? response.data : "Success";
                        FlashService.Success(message, true);
                        $state.go('login');
                    } else {
                        var message = response.data && response.data ? response.data : "Unknown Error";
                        FlashService.Error(message);
                        FlashService.clearFlashMessageOntimeout(8000);
                    }
                }, function(err) {
                    var message = err.data && err.data ? err.data.display : "Unknown Error";
                    FlashService.Error(message);
                    FlashService.clearFlashMessageOntimeout(8000);
                }).catch(function(err) {
                    var message = err.data && err.data ? err.data.display : "Unknown Error";
                    FlashService.Error(message);
                    FlashService.clearFlashMessageOntimeout(8000);
                });
        }

        function cancel() {
            vm.user = {};
            vm.userReg.$setPristine();
        }
    }

})();