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
                        CoreService.fbLogin({ fbid: response.id, email: response.email }).then(function (response) {
                            if (response.status == 200) {
                                if (response.data && response.data.user_data) {
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
            gapi.load('auth2', function() { // Loads the auth2 component of gapi
                gapi.auth2.init({ // initialize the auth2 using your credentials
                  client_id: '971257550676-94l84vfn2c96gq47mkqnqb8houuhd2p3.apps.googleusercontent.com'
                }).then(function onInit() { // on complete of init
                  gapi.signin2.render("g-signin2", { // render the HTML button on the screen providing the ID of the element (g-signin2)
                    onsuccess: function(googleUser) { // This executes when a user successfully authorizes you to their data by clicking the button and selecting their account.
                      var profile = googleUser.getBasicProfile();
                      console.log('ID: ' + profile.getId());
                      console.log('Name: ' + profile.getName());
                      console.log('Image URL: ' + profile.getImageUrl());
                      console.log('Email: ' + profile.getEmail());
                      // Do whatever you need to do to authenticate on your site.
                    }
                  });
                });
              });
            var myParams = {
                'clientid': '971257550676-94l84vfn2c96gq47mkqnqb8houuhd2p3.apps.googleusercontent.com', //You need to set client id
                'cookiepolicy': 'single_host_origin',
                'callback': loginCallback, //callback function
                'approvalprompt': 'force',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            };
            //gapi.auth.signIn(myParams);
        }
        function loginCallback (test){
            console.log(test)
        }
    }    
})();
