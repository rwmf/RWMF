(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('ForgotController', ForgotController);
    ForgotController.$inject = ['$rootScope', 'CoreService', 'FlashService', '$timeout', '$state'];

    function ForgotController($rootScope, CoreService, FlashService, $timeout, $state) {
        var vm = this;
        $rootScope.pageName = "login";
        vm.forgotPassword = forgotPassword;
        angular.element('.sidenav-overlay').remove();

        function forgotPassword(data) {
            CoreService.forgotPassword({ email: data }).then(function(resp) {
                if (resp.status == 200) {
                    FlashService.Success(resp.data.display);
                    $timeout(function() {
                        $state.go("login");
                    }, 4000)
                }
            }, function(err) {
                var message = err.data && err.data ? err.data.display : "Unknown Error";
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            }).catch(function(err) {
                var message = err.data && err.data ? err.data.display : "Unknown Error";
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            })
        }
    }

})();