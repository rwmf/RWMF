(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('StaticController', StaticController);
    StaticController.$inject = ['$rootScope', 'CoreService'];

    function StaticController($rootScope, CoreService) {
        var vm = this;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
    }

})();