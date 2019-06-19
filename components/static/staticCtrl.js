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
        if (localStorage["utoken"]) {
            CoreService.getProfileData({ utoken: localStorage["utoken"] }).then(function(resp) {
                console.log(resp)
            }, function(error) {
                console.log(error)
            }).catch(function(error) {

            })
        }
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();