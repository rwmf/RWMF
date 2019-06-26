(function() {
    'use strict';
    angular
        .module('RWMF')
        .controller('ProgramController', ProgramController);
    ProgramController.$inject = ['$scope', '$rootScope', 'CoreService', '$state', 'FlashService', '$timeout'];

    function ProgramController($scope, $rootScope, CoreService, $state, FlashService, $timeout) {
        var vm = this;
        $rootScope.pageName = "home";
        vm.day = "1";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        vm.gotoVenue = gotoVenue;
        vm.share = share;
        vm.removeProgram = removeProgram;
        if (localStorage['userToken']) {
            CoreService.addLoader();
            CoreService.getAllRegisteredProgrammes({ utoken: localStorage['userToken'] }).then(function(response) {
                if (response.data.registered_prgms.length > 0) {
                    vm.programmes = response.data.registered_prgms;
                    localStorage["registered_prgms"] = JSON.stringify(vm.programmes);
                } else {
                    FlashService.Warning("You have not registered for any programmes");
                }
                CoreService.removeLoader();
            }, function(err) {
                if (localStorage["registered_prgms"]) {
                    vm.programmes = JSON.parse(localStorage["registered_prgms"]);
                }
                CoreService.removeLoader();
            }).catch(function(err) {
                if (localStorage["registered_prgms"]) {
                    vm.programmes = JSON.parse(localStorage["registered_prgms"]);
                }
                CoreService.removeLoader();
            });
        } else {
            FlashService.Warning("You are not permitted to view this page without being logged in, You will be redirected to login page soon. Please login and come back");
            $timeout(function() {
                $state.go("login")
            }, 5000)
        }
        $scope.$on('$destroy', function() {
            angular.element('.sidenav-overlay').remove();
        });
        function removeProgram(id) {
            CoreService.addLoader();
            var data = {programme_id: id};
            if(localStorage["userToken"]){
                data["utoken"] = localStorage["userToken"]
            }
            CoreService.removeProgram(data).then(function(response){
                if (response.data.registered_prgms.length > 0) {
                    vm.programmes = response.data.registered_prgms;
                    localStorage["registered_prgms"] = JSON.stringify(vm.programmes);
                } else {
                    FlashService.Warning("You have not registered for any programmes");
                }
                CoreService.removeLoader();
            },function(err){
                CoreService.removeLoader();
                FlashService.Warning("Something went wrong, Can't remove Program, Try later");
            }).catch(function(err){
                CoreService.removeLoader();
                FlashService.Warning("Something went wrong, Can't remove Program, Try later");
            });
        }
        function share() {
            var text = 'Add text to share with the URL';
            if ('share' in navigator) {
                navigator.share({
                    title: document.title,
                    text: text,
                    url: location.href,
                })
            } else {
                // Here we use the WhatsApp API as fallback; remember to encode your text for URI
                location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
            }
        }
        function gotoDetail(id) {
            if (navigator.onLine) {
                $state.go("programDetail", { program_id: id });
            }
            else {
                FlashService.Warning("You are in offline mode, Please go online to view programme details");
                FlashService.clearFlashMessageOntimeout(5000);
            }
        };        
        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        };

        function gotoVenue(venueObj) {
            $state.go('venue', { venueDetails: venueObj });
        };
    }

})();