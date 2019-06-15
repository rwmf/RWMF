(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$rootScope', 'CoreService', '$state'];

    function HeaderController($rootScope, CoreService, $state) {
        CoreService.recall();
        angular.element(".button-collapse").sideNav({
            closeOnClick: true
        });

        var vm = this;
        vm.closeSideNav = closeSideNav;
        vm.logout = logout;
        vm.setPlaceHolder = setPlaceHolder;
        vm.removePlaceHolder = removePlaceHolder;
        vm.showAppInstallBanner = showAppInstallBanner;
        $rootScope.pageName = "home";

        function closeSideNav() {
            angular.element('.sidenav-overlay').remove();
        }

        function logout() {
            localStorage.removeItem("userToken");
            delete $rootScope.isLoggedIn;
            $state.go("login");
        }

        function setPlaceHolder(event) {
            event.currentTarget.placeholder = "Search Here";
        }

        function removePlaceHolder(event) {
            event.currentTarget.placeholder = "";
        }
        $rootScope.deferredPrompt;
        window.addEventListener("beforeinstallprompt", function(event) {
            console.log("Before install fired");
            event.preventDefault();
            $rootScope.deferredPrompt = event;
        });

        function showAppInstallBanner() {
            //to create a prompt
            if ($rootScope.deferredPrompt) {
                $rootScope.deferredPrompt.prompt();
                $rootScope.deferredPrompt.userchoice.then(function(choiceResult) {
                    if (choiceResult.outcome === "dismissed") {
                        console.log("user cancelled")
                    } else {
                        console.log("app installed")
                    }
                    $rootScope.deferredPrompt = null;
                })
            }
        }
        angular.element(document).on("click", "body", function(evt) {
            $('.button-collapse').sideNav('hide');
            angular.element(".sidenav-overlay").not(":first").remove()
        });
    }

})();