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
        vm.FBLogin = FBLogin;
        vm.googleLogin = googleLogin;
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
                    errorHandler({});
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
            CoreService.removeLoader();
        }
        function FBLogin() {
            var user = {};
            FB.login(function (resp) {
                CoreService.addLoader();
                if (resp.authResponse) {
                    FB.api('/me?fields=id, email', function (response) {
                        console.log(response);
                        CoreService.fbLogin({fbid: response.id, email: response.email}).then(function (response) {
                            if (response.status == 200) {
                                if(response.data && response.data.user_data){
                                    localStorage["userData"] = JSON.stringify(response.data.user_data);
                                    $rootScope.userData = response.data.user_data;
                                }                                
                                fetchUserData(response.data.user_token);
                            } else {
                                errorHandler({});
                            }
                        }, function (err) {
                            errorHandler(err);
                        }).catch(function (err) {
                            errorHandler(err);
                        });
                    });
                } else {
                    FlashService.Warning('User cancelled login or did not fully authorize.');
                    FlashService.clearFlashMessageOntimeout(5000);
                }
            }, { scope: "public_profile, email" })
        }

        function googleLogin() {
            var user = {};
            gapi.auth2.getAuthInstance().signIn().then(
                function(success) {
                    console.log(success)
                },
                function(error) {
                    // Error occurred
                    console.log(error) //to find the reason
                }
            );
        }
    }

})();