(function(angular) {
    angular.module('RWMF')
        .factory('CoreHttpRequest', function($http, urlConfig) {
            var service = this;
            var getUrl = function(path) {
                return urlConfig.https + urlConfig.api_endpoint + path;
            };
            service.get = function(path) {
                return $http.get(getUrl(path));
            };
            service.post = function(path, jsonData) {
                return $http.post(getUrl(path), jsonData);
            };

            service.formPost = function(path, jsonData, id) {
                return $http.post(getUrl(path), jsonData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            };
            return service;
        });
})(angular);