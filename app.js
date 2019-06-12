(function() {
    'use strict';

    angular
        .module('RWMF', ['ui.router', 'ngCookies', 'ngSanitize'])
        .config(config)
        .filter('filterWithDay', ['CoreService', function(CoreService) {
            return function(items, day) {
                if (items.length > 0) {
                    var filtered = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (items[i].day === day) {
                            filtered.push(item);
                        }
                    }
                    return filtered;
                }
            };
        }]).filter('to24Hrs', ['CoreService', function(CoreService) {
            return function(item) {
                return item ? CoreService.convert12to24(item) : item;
            };
        }])
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'innerPages': {
                        controller: 'HomeController',
                        templateUrl: 'components/home/home.html',
                        controllerAs: 'homectrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            }).state('registeredPgm', {
                url: '/registeredPgm',
                views: {
                    'innerPages': {
                        controller: 'ProgramController',
                        templateUrl: 'components/program/registeredProgram.html',
                        controllerAs: 'regPgmctrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            }).state('programDetail', {
                url: '/programDetail/:program_id',
                views: {
                    'innerPages': {
                        controller: 'ProgramDetailController',
                        templateUrl: 'components/program/programDetail.html',
                        controllerAs: 'pgmctrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            }).state('ticketInfo', {
                url: '/ticketInfo',
                views: {
                    'innerPages': {
                        controller: 'GeneralController',
                        templateUrl: 'components/general/ticketInfo.html',
                        controllerAs: 'genctrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            }).state('busSchedule', {
                url: '/busSchedule',
                views: {
                    'innerPages': {
                        controller: 'GeneralController',
                        templateUrl: 'components/general/busSchedule.html',
                        controllerAs: 'genctrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            }).state('venueLocator', {
                url: '/venueLocator',
                views: {
                    'innerPages': {
                        controller: 'VenueController',
                        templateUrl: 'components/general/venueLocator.html',
                        controllerAs: 'venCtrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'login@': {
                        controller: 'LoginController',
                        templateUrl: 'components/user/login.html',
                        controllerAs: 'loginCtrl'
                    }
                }

            })
            .state('register', {
                url: '/register',
                views: {
                    'login@': {
                        controller: 'RegisterController',
                        templateUrl: 'components/user/newuser.html',
                        controllerAs: 'regCtrl'
                    }
                }
            })
            .state('forgot', {
                url: '/forgot',
                views: {
                    'login@': {
                        controller: 'ForgotController',
                        templateUrl: 'components/user/forgot.html',
                        controllerAs: 'forgotCtrl'
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    'innerPages@': {
                        controller: 'DashController',
                        templateUrl: 'components/dashboard/dashboard.html',
                        controllerAs: 'vm'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    'innerPages@': {
                        templateUrl: 'components/static/about.html'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                views: {
                    'innerPages@': {
                        templateUrl: 'components/static/contact.html'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            })
        $urlRouterProvider.otherwise('/home');
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'CoreService'];

    function run($rootScope, $location, $cookieStore, $http, CoreService) {
        // keep user logged in after page refresh
        $(".button-collapse").sideNav();
        if (CoreService.isStandalone()) {
            CoreService.activateSplash();
        }
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgot']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/login');
            // }
        });
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {});

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        });
    }

})();