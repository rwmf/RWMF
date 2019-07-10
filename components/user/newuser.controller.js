(function () {
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
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();

        });

        $scope.$on('$stateChangeStart', function ($event, next, current) {
            if (next.name === 'register.gdpr') {
                $scope.openModal();
            }
            if (next.name === 'register.terms') {
                $scope.openTermsModal();
            }
            else {
                $('#centralModalSuccess').modal('hide');
                $('#centralModalSuccess_a').modal('hide');
                //$scope.closeModal();
            }
        });

        function register() {
            vm.dataLoading = true;
            CoreService.createUser(vm.user)
                .then(function (response) {
                    if (response.status == 200) {
                        var message = response.data && response.data.display ? response.data.display : "Successfully Registered";
                        FlashService.Success(message);
                        FlashService.clearFlashMessageOntimeout(5000);
                    } else {
                        var message = response.data && response.data.display ? response.data.display : "Unknown Error";
                        FlashService.Error(message);
                        FlashService.clearFlashMessageOntimeout(5000);
                    }
                }, function (err) {
                    var message = err.data && err.data ? err.data.display : "Unknown Error";
                    FlashService.Error(message);
                    FlashService.clearFlashMessageOntimeout(5000);
                }).catch(function (err) {
                    var message = err.data && err.data ? err.data.display : "Unknown Error";
                    FlashService.Error(message);
                    FlashService.clearFlashMessageOntimeout(5000);
                });
        }

        function cancel() {
            vm.user = {};
            vm.userReg.$setPristine();
        }

        $scope.openModal = function () {
            $('#centralModalSuccess').modal('show');
        };
        $scope.openTermsModal = function () {
            $('#centralModalSuccess_a').modal('show');
        };
        $scope.closeModal = function () {
            $('#centralModalSuccess').modal('hide');
            $state.go('register');
        }
        $scope.closeTermsModal = function () {
            $('#centralModalSuccess_a').modal('hide');
            $state.go('register');
        }
    }

})();
