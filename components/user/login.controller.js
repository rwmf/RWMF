(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'CoreService', 'FlashService', '$rootScope'];

    function LoginController($state, CoreService, FlashService, $rootScope) {
        var vm = this;
        $rootScope.pageName = "login";
        vm.user = {};
        vm.login = login;
        vm.FBLogin = FBLogin
        angular.element('.sidenav-overlay').remove();
        (function initController() {
            // reset login status
            CoreService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            CoreService.Login(vm.user).then(function (response) {
                if (response.status == 200) {
                    fetchUserData(response.data.user_token);
                } else {
                    errorHandler(err);
                }
            }, function (err) {
                errorHandler(err);
            }).catch(function (err) {
                errorHandler(err);
            });
        };
        function fetchUserData(token) {
            CoreService.SetCredentials(token);
            CoreService.getAllRegisteredProgrammes({ utoken: token }).then(function (response) {
                localStorage["registered_prgms"] = JSON.stringify(response.data.registered_prgms);
                $state.go('home');
            }, function (err) {
                $state.go('home');
            }).catch(function (err) {
                $state.go('home');
            });
        }
        function errorHandler(err) {
            var message = err.data && err.data.display ? err.data.display : "Unknown Error Try after some time"
            FlashService.Error(message);
            FlashService.clearFlashMessageOntimeout(5000);
        }
        function FBLogin() {
            var user = {};
            FB.login(function (resp) {
                if (resp.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me?fields=id, email', function (response) {
                        console.log(response);
                        CoreService.fbLogin({fbid: response.id, email: response.email}).then(function (response) {
                            if (response.status == 200) {
                                fetchUserData(response.data.user_token);
                            } else {
                                errorHandler(err);
                            }
                        }, function (err) {
                            errorHandler(err);
                        }).catch(function (err) {
                            errorHandler(err);
                        });
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: "public_profile, email" })
        }
    }

})();