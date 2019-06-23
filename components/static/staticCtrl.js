(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('StaticController', StaticController);
    StaticController.$inject = ['$scope', '$rootScope', 'CoreService', 'FlashService'];

    function StaticController($scope, $rootScope, CoreService, FlashService) {
        var vm = this;
        vm.updateUserProfile = updateUserProfile;
        $rootScope.pageName = "home";
        $rootScope.previewFile = previewFile;
        if (localStorage["userToken"]) {
            CoreService.getProfileData({ utoken: localStorage["userToken"] }).then(function (resp) {
                console.log(resp)
                vm.userData = resp.data.user_data;
            }, function (err) {
                var message = err.data && err.data ? err.data.display : "Can't fetch profile data, Unknown Error";
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            }).catch(function (err) {
                var message = err.data && err.data ? err.data.display : "Can't fetch profile data,  Unknown Error";
                FlashService.Error(message);
                FlashService.clearFlashMessageOntimeout(5000);
            })
        }
        function updateUserProfile(data) {
            console.log(data)
        }
        angular.element('.sidenav-overlay').remove();
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();