(angular => {
  "use strict";

  angular.module("App")
  .factory("authInterceptor", ["API", "AuthService", AuthServiceInterceptor]);

  function AuthServiceInterceptor(API, AuthService) {
    return {
      request: function(config) {
        if (config.url.indexOf(API) === 0) {
          config.headers.Accept = "application/json";
          if (AuthService.isLoggedIn()) {
            config.headers.Authorization = "Bearer " + AuthService.getToken();
          }
        }

        return config;
      },

      response: function(res) {
        var token = res.headers("X-Token");

        if (token && token !== AuthService.getToken()) {
          AuthService.setToken(token);
        }
        return res;
      },
    };
  }

})(angular);
