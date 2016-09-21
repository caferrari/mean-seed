(angular => {
  "use strict";

  angular.module("App")
  .factory("AuthService", ["$rootScope", "$timeout", "jwtHelper", "$window", authService]);

  function authService($rootScope, $timeout, jwtHelper, $window) {

    let user;

    const isValidToken = token => {
      try {
        return token && !jwtHelper.isTokenExpired(token);
      } catch(err) {
        return false;
      }
    };

    const getToken = () => $window.localStorage.getItem("token");

    const getTokenData = () => {

      if (!isLoggedIn()) {
        return null;
      }

      if (!user) {
        user = jwtHelper.decodeToken(getToken());
      }

      return user;
    };

    const setToken = token => {

      if (!isValidToken(token)) {
        return false;
      }

      $window.localStorage.setItem("token", token);

      $rootScope.$broadcast("login");
    };

    const removeToken = () => {
      $window.localStorage.clear();
      $rootScope.currentUser = false;

      $timeout(function() {
        $rootScope.$apply();
        $rootScope.$broadcast("logout");
      });

    };

    const isLoggedIn = () => isValidToken(getToken());

    const hasRole = (role) => {
      return getTokenData().role === role;
    };

    if (isLoggedIn()) {
      $timeout(() => $rootScope.$broadcast("login"));
    }

    return {
      getTokenData,
      setToken,
      removeToken,
      isLoggedIn,
      getToken,
      hasRole
    };
  }

})(angular);
