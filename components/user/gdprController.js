(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('gdprModalController', gdprModalController);

    gdprModalController.$inject = ['$scope', 'CoreService', '$state', '$rootScope', 'FlashService', '$timeout', '$uibModalInstance'];

    function gdprModalController($scope, CoreService, $state, $rootScope, FlashService, $timeout,  $uibModalInstance) {
        $scope.item = 'foobar';

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();