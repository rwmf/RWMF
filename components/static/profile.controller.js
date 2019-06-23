(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('ProfileController', ProfileController);
    ProfileController.$inject = ['$scope', '$rootScope', 'CoreService', 'FlashService'];

    function ProfileController($scope, $rootScope, CoreService, FlashService) {
        var vm = this;
        vm.updateUserProfile = updateUserProfile;
        $rootScope.pageName = "home";
        angular.element('.sidenav-overlay').remove();
        CoreService.addLoader();
        if (localStorage["userToken"]) {
            CoreService.getProfileData({ utoken: localStorage["userToken"] }).then(function (resp) {
                vm.userData = resp.data.user_data;
                localStorage["userImage"] = resp.data.user_data.image;
                CoreService.removeLoader();
            }, function (err) {
                handleError();
            }).catch(function (err) {
                handleError();
            })
        }
        function updateUserProfile(data) {
            CoreService.addLoader();
            if (localStorage["userImage"]);
            data.image = localStorage["userImage"];
            if (localStorage["userToken"]);
            data.utoken = localStorage["userToken"];
            CoreService.updateprofile(data).then(function (resp) {
                FlashService.Success(resp.data.display);
                CoreService.removeLoader();
            }, function (err) {
                handleError();
            }).catch(function (err) {
                handleError();
            });
        }
        function handleError() {
            CoreService.removeLoader();
            FlashService.Error("Something went wrong, Can't remove Program, Try later");
            FlashService.clearFlashMessageOntimeout(4000);
        }
        $scope.$on('$destroy', function () {
            angular.element('.sidenav-overlay').remove();
        });
    }

})();
function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
        localStorage["userImage"] = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}