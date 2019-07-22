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
        vm.FBSignUp = FBSignUp;
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
                        FlashService.clearFlashMessageOntimeout(3000);
                        $timeout(function () {
                            $state.go('login');
                        }, 3000)
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
        function FBSignUp() {
            var user = {};
            FB.api('/me?fields=id, email, first_name, last_name', function (response) {
                console.log(response);
                CoreService.fbLogin({ fbid: response.id, email: response.email }).then(function (response) {
                    if (response.status == 200) {
                        if (response.data && response.data.user_data) {
                            localStorage["userData"] = JSON.stringify(response.data.user_data);
                            $rootScope.userData = response.data.user_data;
                        }
                        fetchUserData(response.data.user_token);
                    } else {
                        errorHandler(response);
                    }
                }, function (err) {
                    errorHandler(err);
                }).catch(function (err) {
                    errorHandler(err);
                });
            });
        }
        window.auth2 = gapi.auth2.init({
            client_id: '971257550676-94l84vfn2c96gq47mkqnqb8houuhd2p3.apps.googleusercontent.com',
            scope: 'profile email'
        });
        var myParams = {
            'clientid': '971257550676-94l84vfn2c96gq47mkqnqb8houuhd2p3.apps.googleusercontent.com', //You need to set client id
            'cookiepolicy': 'single_host_origin',
            'approvalprompt': 'force',
            'scope': 'profile email'
        };
        gapi.signin2.render('signupButton', myParams);
        window.auth2.attachClickHandler('signupButton', myParams, onSignUp, onSignUpFailure);
        function onSignUp(googleUser) {
            console.log(googleUser)
        }
        function onSignUpFailure(error) {
            if (error.error == "popup_closed_by_user") {
                FlashService.Error('User cancelled Signup or did not fully authorize.');
            }
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
