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
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js', {
                    scope: './'
                })
                .then(function(registration) {
                    registration.onupdatefound = function() {
                        if (navigator.serviceWorker.controller) {
                            var installingWorker = registration.installing;

                            installingWorker.onstatechange = function() {
                                switch (installingWorker.state) {
                                    case 'installed':
                                        break;
                                    case 'redundant':
                                        throw new Error('The installing ' +
                                            'service worker became redundant.');
                                    default:
                                        // Ignore
                                }
                            };
                        }
                    };
                }).catch(function(e) {
                    console.error('Error during service worker registration:', e);
                });
        } else {
            console.log('service worker is not supported');
        }
        var vm = this;
        vm.closeSideNav = closeSideNav;
        vm.logout = logout;
        vm.setPlaceHolder = setPlaceHolder;
        vm.removePlaceHolder = removePlaceHolder;
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
        angular.element(document).on("click", "body", function(evt) {
            $('.button-collapse').sideNav('hide');
            angular.element(".sidenav-overlay").not(":first").remove()
        });
    }

})();