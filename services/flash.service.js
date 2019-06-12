(function() {
    'use strict';

    angular
        .module('RWMF')
        .factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope', '$timeout'];

    function FlashService($rootScope, $timeout) {
        var service = {};

        service.Success = Success;
        service.Error = Error;
        service.Warning = Warning;
        service.clearFlashMessageOntimeout = clearFlashMessageOntimeout;
        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function() {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function clearFlashMessageOntimeout(timeout) {
            $timeout(function() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }, timeout);
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Warning(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'warning',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();