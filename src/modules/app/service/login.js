(angular => {
  "use strict";

  angular.module("App")
    .factory("LoginService", ["$http", "$q", "$location", "$timeout", "$mdDialog", "API", "AuthService", LoginService]);

  function LoginService($http, $q, $location, $timeout, $mdDialog, API, AuthService) {

    const logout = () => {
      AuthService.removeToken();
      $location.path("/");

      $timeout(login, 100);
    };

    const login = ($event) => {

      const deferred = $q.defer();

      if (AuthService.isLoggedIn()) {
        deferred.resolve();
        return deferred.promise;
      }

      $timeout(() => {
        $mdDialog.show({
          templateUrl: `/app/view/login-modal.html`,
          controller: "App.LoginCtrl",
          clickOutsideToClose: false,
          escapeToClose: false,
          targetEvent: $event
        }).finally(() => {
          if (AuthService.isLoggedIn()) {
            deferred.resolve();
          } else {
            deferred.reject("Login cancelado");
          }
        });
      });

      return deferred.promise;
    };

    const resetPassword = (token) => {
      return $mdDialog.show({
        templateUrl: `/app/view/password-reset.html`,
        controller: "App.PasswordResetCtrl",
        clickOutsideToClose: true,
        escapeToClose: true,
        locals: {
          token
        }
      });
    };

    const recover = (email) => {
      return $http.post(`${API}/recover`, {email}).then(res => res.data);
    };

    const doLogin = (credentials) => {

      const promise = $http.post(`${API}/login`, credentials);
      promise.then((result) => {
        if (result.status === 200) {
          AuthService.setToken(result.data.token);
          $mdDialog.cancel();
        }
      });
      return promise;
    };

    const doReset = (data) => {
      const promise = $http.post(`${API}/reset-password`, data);
      promise.then((result) => {
        if (result.status === 200) {
          $mdDialog.cancel();
        }
      });
      return promise;
    };

    const cancel = () => $mdDialog.cancel();

    return {
      login,
      logout,
      recover,
      resetPassword,
      cancel,
      doLogin,
      doReset
    };

  }

})(angular);
