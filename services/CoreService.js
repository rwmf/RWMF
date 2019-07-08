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
        service.removeProgram = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("remove_programme", data)
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
        service.fbLogin = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("fblogin", data)
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
            $rootScope.isLoggedIn = !!localStorage["userToken"];
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
        service.getSearchedEvents = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("programmes", data)
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
        service.getProfileData = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("userprofile", data)
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
        service.updateprofile = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("updateprofile", data)
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
            var data = {
                programmeid: id
            }
            if (localStorage["userToken"]) {
                data.utoken = localStorage["userToken"];
            }
            CoreHttpRequest.post("programme_detail", data)
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
        service.forgotPassword = function(data) {
            var deferred = $q.defer();
            CoreHttpRequest.post("forgotpassword", data)
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
        service.getVenueDetails = function() {
            var deferred = $q.defer();
            CoreHttpRequest.get("venues")
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
        service.getAdDetails = function() {
            var deferred = $q.defer();
            CoreHttpRequest.get("ads")
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
        service.setClientHeight = function(id) {
            var deferred = $q.defer();
            var calculatedHeight = (document.documentElement.clientHeight) - document.getElementsByClassName('event-header')[0].offsetHeight + "px";
            console.log(calculatedHeight)
            if (document.getElementById(id))
                document.getElementById(id).style.height = calculatedHeight;
            deferred.resolve(calculatedHeight);
            return deferred.promise;
        }
        service.activateSplash = function() {
            $rootScope.isSplashScreen = true;
            $timeout(function() {
                $rootScope.isSplashScreen = false;
            }, 3000)
        };
        service.isStandalone = function() {
            //return ((window.matchMedia('(display-mode: standalone)').matches));
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

        var clientId = '971257550676-94l84vfn2c96gq47mkqnqb8houuhd2p3.apps.googleusercontent.com',
            apiKey = 'AIzaSyAgSkVT1uTk7XBFToLLzS50JO7UJtMujTM',
            scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me';

        service.googleLogin = function () {
            var deferred = $q.defer();
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: false
            }, service.handleAuthResult);
            return deferred.promise;
        }
        service.handleClientLoad = function () {
            gapi.client.setApiKey(apiKey);
            gapi.auth.init(function () { });
            window.setTimeout(checkAuth, 1);
        };

        service.checkAuth = function() {
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: true, 
                hd: domain 
            }, service.handleAuthResult);
        };

        service.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                var data = {};
                gapi.client.load('oauth2', 'v2', function () {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function (resp) {
                        data.email = resp.email;
                        console.log(resp)
                    });
                });
                deferred.resolve(data);
            } else {
                deferred.reject('error');
            }
        };

        service.handleAuthClick = function(event) {
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: false, 
                hd: domain 
            }, service.handleAuthResult);
            return false;
        };

    };
    CoreService.$inject = ['$rootScope', 'CoreHttpRequest', '$state', '$http', '$q', '$timeout'];
    angular.module('RWMF')
        .service('CoreService', CoreService);
})(angular);