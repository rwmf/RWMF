(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('ProgramDetailController', ProgramDetailController)
        .filter('trusted', ['$sce', function($sce) {
            return function(url) {
                url = url.replace("/watch", "/embed");
                return $sce.trustAsResourceUrl(url);
            };
        }]);
    ProgramDetailController.$inject = ['$rootScope', 'CoreService', '$state', '$stateParams', 'FlashService'];

    function ProgramDetailController($rootScope, CoreService, $state, $stateParams, FlashService) {
        var vm = this;
        $rootScope.pageName = "home";
        $rootScope.isLoading = true;
        vm.register = register;

        CoreService.getProgramDetails($stateParams.program_id).then(function(res) {
            vm.programDetail = res.data.programme_data;
            $rootScope.isLoading = false;
        }, function(res) {
            $rootScope.isLoading = false;
        }).catch(function() {
            $rootScope.isLoading = false;
        });

        function register(id) {
            if (localStorage["userToken"]) {
                var token = localStorage["userToken"];
                var data = {
                    programme_id: id,
                    utoken: token
                }
                CoreService.registerToProgram(data).then(function(response) {
                    if (response.status == 200) {
                        vm.programDetail.register_status = "1";
                        FlashService.Success(response.data.display);
                    }
                }, function(err) {
                    FlashService.Error(err.data.display);
                }).catch(function(err) {
                    FlashService.Error(err.data.display);
                })
            } else {
                FlashService.Warning("Please Login/Sign Up first, to register to a program");
                FlashService.clearFlashMessageOntimeout(5000);
            }
        }
    }

})();