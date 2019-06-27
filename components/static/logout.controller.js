(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('LogoutController', LogoutController);
    LogoutController.$inject = ['$state', '$rootScope'];

    function LogoutController($state, $rootScope) {
        localStorage.removeItem("userToken");
            delete $rootScope.isLoggedIn;
            if (FB && FB.logout) {
                FB.logout(function () {
                    console.log("Loggedout from FB");
                    $state.go("login");
                })
            } else {
                $state.go("login");
            }
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();