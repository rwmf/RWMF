(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('ForgotController', ForgotController);
    ForgotController.$inject = ['UserService', '$rootScope'];

    function ForgotController(UserService, $rootScope) {
        var vm = this;
        $rootScope.pageName = "login";
        angular.element('.sidenav-overlay').remove();
    }

})();