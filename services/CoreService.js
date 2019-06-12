(function(angular) {
    var CoreService = function($rootScope, CoreHttpRequest, $state, $http, $q, $timeout) {
        var service = this;

        service.createUser = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("signup", data)
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);

                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        }
        service.Login = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("login", data)
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        };

        service.SetCredentials = function(userToken) {
            localStorage["userToken"] = userToken;
            $rootScope.isLoggedIn = true;
        };
        service.ClearCredentials = function() {
            delete localStorage["userToken"];
            delete $rootScope.isLoggedIn;
        };
        service.getAllEvents = function() {
            var deferred = $q.defer();
            CoreHttpRequest.post("dashboard")
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);

                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        }
        service.getBusScheduleDetails = function() {
            var deferred = $q.defer();
            CoreHttpRequest.post("busschedule")
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);

                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        }
        service.getProgramDetails = function(id) {
            var deferred = $q.defer();
            CoreHttpRequest.post("programme_detail", { programmeid: id })
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        };
        service.getAllRegisteredProgrammes = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("registered_programmes", data)
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        };
        service.registerToProgram = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("register_programme", data)
                .then(function(response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                }, function(response) {
                    response.data = false;
                    deferred.reject(response.data);
                });
            return deferred.promise;
        };
        service.removeLoader = function(timeout) {
            if (timeout) {
                $timeout(function() {
                    $rootScope.isLoading = false;
                }, timeout);
            } else {
                $rootScope.isLoading = false;
            }
        };
        service.addLoader = function() {
            $rootScope.isLoading = true;
        };
        service.recall = function() {
            $timeout(function() {
                if (document.createEvent) { // W3C
                    var ev = document.createEvent('Event');
                    ev.initEvent('resize', true, true);
                    window.dispatchEvent(ev);
                } else { // IE
                    element = document.documentElement;
                    var event = document.createEventObject();
                    element.fireEvent("onresize", event);
                }
            }, 3000);
        };
        service.isAuthenticated = function(item, data) {
            var isUserNameOk, isPasswordOk;
            for (var i = 0; i < data.length; i++) {
                isUserNameOk = false;
                isPasswordOk = false;
                for (var key in data[i]) {
                    if (item[key] == data[i][key]) {
                        if (key == "username")
                            isUserNameOk = true;
                        else if (key == "password")
                            isPasswordOk = true;
                    }
                }
                if (isUserNameOk && isPasswordOk) {
                    return true;
                }
            }
            return false;
        };
        service.activateSplash = function() {
            $rootScope.isSplashScreen = true;
            $timeout(function() {
                $rootScope.isSplashScreen = false;
            }, 3000)
        };
        service.isStandalone = function() {
            return ((window.matchMedia('(display-mode: standalone)').matches) && platform.os.family.toUpperCase() == "ANDROID");
        }
        service.convert12to24 = function(time) {
            var hrs = Number(time.match(/^(\d+)/)[1]);
            var mnts = Number(time.match(/:(\d+)/)[1]);
            time = time.toUpperCase();
            var format = time.indexOf("PM") > 0 ? "PM" : "AM";
            if (format == "PM" && hrs < 12) hrs = hrs + 12;
            if (format == "AM" && hrs == 12) hrs = hrs - 12;
            var hours = hrs.toString();
            var minutes = mnts.toString();
            if (hrs < 10) hours = "0" + hours;
            if (mnts < 10) minutes = "0" + minutes;
            return hours + ":" + minutes;
        }
    };
    CoreService.$inject = ['$rootScope', 'CoreHttpRequest', '$state', '$http', '$q', '$timeout'];
    angular.module('RWMF')
        .service('CoreService', CoreService);
})(angular);