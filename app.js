(function() {
    'use strict';

    angular
        .module('RWMF', ['ui.router', 'ngCookies', 'ngSanitize'])
        .config(config)
        .filter('filterWithDay', ['CoreService', function(CoreService) {
            return function(items, day, type) {
                console.log(day, type)
                if (items.length > 0) {
                    var filtered = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (((type && items[i].type == type) && items[i].day == day) ||  (!type && items[i].day == day)) {
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
        }]).filter('stripExpiry', ['CoreService', function(CoreService) {
            return function(item) {
                return item = item && item.split("?")[0] ? item.split("?")[0] : item;
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
            }).state('homeSearch', {
                url: '/home/:searchKey',
                views: {
                    'innerPages': {
                        controller: 'HomeSearchController',
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
            })
            .state('login', {
                url: '/login',
                views: {
                    'login@': {
                        controller: 'LoginController',
                        templateUrl: 'components/user/login.html',
                        controllerAs: 'loginCtrl'
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
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
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
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
                    },
                    'header': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    'innerPages@': {
                        controller: 'StaticController',
                        templateUrl: 'components/static/about.html'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                views: {
                    'innerPages@': {
                        controller: 'StaticController',
                        templateUrl: 'components/static/profile.html',
                        controllerAs: 'statCtrl'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('contactDetails', {
                url: '/contactDetails',
                views: {
                    'innerPages@': {
                        controller: 'StaticController',
                        templateUrl: 'components/static/contactDetails.html'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'vm'
                    }
                }
            }).state('venueLocator', {
                url: '/venueLocator',
                views: {
                    'mapPage@': {
                        templateUrl: 'components/static/venueLocator.html'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                }
            })
            .state('venue', {
                url: '/venue',
                views: {
                    'mapPage@': {
                        controller: 'VenueController',
                        templateUrl: 'components/static/venue.html',
                        controllerAs: 'venCtrl'
                    },
                    'header@': {
                        controller: 'HeaderController',
                        templateUrl: 'components/header/header.html',
                        controllerAs: 'headerctrl'
                    }
                },
                params: {
                    venueDetails: null
                }
            })
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'CoreService', 'stateHeaders'];

    function run($rootScope, $location, $cookieStore, $http, CoreService, stateHeaders) {
        $rootScope.isLoggedIn = !!localStorage["userToken"];
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
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.mainHeader = stateHeaders[toState.name];
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        });
    }

})();