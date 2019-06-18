(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('StaticController', StaticController);
    StaticController.$inject = ['$scope', '$rootScope', 'CoreService'];

    function StaticController($scope, $rootScope, CoreService) {
        var vm = this;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();