(angular => {
  "use strict";

  angular.module("App")
  .controller("App.PasswordResetCtrl", ["$mdDialog", "$scope", "$location", "Loader", "LoginService", "token", PasswordResetCtrl]);

  function PasswordResetCtrl($mdDialog, $scope, $location, Loader, LoginService, token) {

    $scope.data = {
      token
    };

    $scope.reset = () => {
      Loader.add(LoginService.doReset($scope.data)).then(() => {
        $location.path("/dashboard");
      });
    };

    $scope.cancel = $mdDialog.cancel;
  }

})(angular);
