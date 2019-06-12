(function() {
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
        angular.element('.sidenav-overlay').remove();
        (function initController() {
            // reset login status
            CoreService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            CoreService.Login(vm.user).then(function(response) {
                if (response.status == 200) {
                    CoreService.SetCredentials(response.data.user_token);
                    $state.go('home');
                } else {
                    var message = response.data && response.data.display ? response.data.display : "Unknown Error Try after some time"
                    FlashService.Error(message);
                    FlashService.clearFlashMessageOntimeout(5000);
                }
            }, function(err) {
                var message = err.data && err.data.display ? err.data.display : "Unknown Error Try after some time"
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            }).catch(function(err) {
                var message = err.data && err.data.display ? err.data.display : "Unknown Error Try after some time"
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            });
        };
    }

})();