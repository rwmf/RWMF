(function () {
    'use strict';

    angular
        .module('RWMF')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$rootScope', 'CoreService', '$state'];

    function HeaderController($rootScope, CoreService, $state) {
        CoreService.recall();
        var vm = this;
        CoreService.getAdDetails().then(function (resp) {
            processResponse(resp);
        }, function (err) {
            handleError(err);
        }).catch(function (err) {
            handleError(err);
        });
        function processResponse(res) {
            vm.ads = res.data.ads;
        }
        function handleError(err) {
            vm.ads = [];
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
        
        vm.closeSideNav = closeSideNav;
        vm.setPlaceHolder = setPlaceHolder;
        vm.removePlaceHolder = removePlaceHolder;
        vm.showAppInstallBanner = showAppInstallBanner;
        vm.search = search;
        $rootScope.pageName = "home";

        function closeSideNav() {
            angular.element('.sidenav-overlay').remove();
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
            if (document.getElementById("iframeMap")) {
                CoreService.setClientHeight("iframeMap");
            }
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