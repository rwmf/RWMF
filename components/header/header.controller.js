(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$rootScope', 'CoreService', '$state'];

    function HeaderController($rootScope, CoreService, $state) {
        CoreService.recall();
        CoreService.getAdDetails().then(function(resp){
            processResponse(resp);
        },function(err){
            handleError(err);
        }).catch(function(err){
            handleError(err);
        });
        function processResponse(res) {
            vm.ads = res.data.ads
            console.log(res)
        }
        function handleError(err) {
            console.log(err)
        }
        angular.element(".button-collapse").sideNav({
            closeOnClick: true
        });
        window.addEventListener('load', function () {
            var status = document.getElementById("status");
            var log = document.getElementById("log");

            function updateOnlineStatus(event) {
                var condition = navigator.onLine ? "online" : "offline";

                status.className = condition;
                status.innerHTML = condition.toUpperCase();

                log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
            }

            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });
        var vm = this;
        vm.closeSideNav = closeSideNav;
        vm.logout = logout;
        vm.setPlaceHolder = setPlaceHolder;
        vm.removePlaceHolder = removePlaceHolder;
        vm.showAppInstallBanner = showAppInstallBanner;
        vm.search = search;
        $rootScope.pageName = "home";

        function closeSideNav() {
            angular.element('.sidenav-overlay').remove();
        }

        function logout() {
            localStorage.removeItem("userToken");
            delete $rootScope.isLoggedIn;
            if (FB && FB.logout) {
                FB.logout(function () {
                    console.log("Loggedout from FB");
                    $state.go("login");
                })
            } else {
                $state.go("login");
            }

        }
        function search(event) {
            if (event.which === 13) {
                $state.go('homeSearch', { searchKey: vm.searchKey });
            }
        }
        function setPlaceHolder(event) {
            event.currentTarget.placeholder = "Search Here";
        }

        function removePlaceHolder(event) {
            event.currentTarget.placeholder = "";
        }
        $rootScope.deferredPrompt;
        window.addEventListener("beforeinstallprompt", function (event) {
            console.log("Before install fired");
            event.preventDefault();
            $rootScope.deferredPrompt = event;
        });
        window.addEventListener("resize", function (event) {
            console.log("resize fired");
            this.console.log(event)
        });
        function showAppInstallBanner() {
            //to create a prompt
            if ($rootScope.deferredPrompt) {
                $rootScope.deferredPrompt.prompt();
                $rootScope.deferredPrompt.userchoice.then(function (choiceResult) {
                    if (choiceResult.outcome === "dismissed") {
                        console.log("user cancelled")
                    } else {
                        console.log("app installed")
                    }
                    $rootScope.deferredPrompt = null;
                })
            }
        }
        angular.element(document).on("click", "body", function (evt) {
            $('.button-collapse').sideNav('hide');
            angular.element(".sidenav-overlay").not(":first").remove()
        });
    }

})();