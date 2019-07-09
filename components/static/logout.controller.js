(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('LogoutController', LogoutController);
    LogoutController.$inject = ['$state', '$rootScope', '$scope'];

    function LogoutController($state, $rootScope, $scope) {
        localStorage.removeItem("userToken");
        delete $rootScope.isLoggedIn;
        if(window.auth2) {
            window.auth2.disconnect();
        }
        $state.go("login");
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();