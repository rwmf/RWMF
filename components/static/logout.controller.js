(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('LogoutController', LogoutController);
    LogoutController.$inject = ['$state', '$rootScope', '$scope'];

    function LogoutController($state, $rootScope, $scope) {
        localStorage.removeItem("userToken");
        delete $rootScope.isLoggedIn;
        $state.go("login");
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();