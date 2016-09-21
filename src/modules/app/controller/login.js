(angular => {
  "use strict";

  angular.module("App")
  .controller("App.LoginCtrl", ["$scope", "$location", "Toast", "Loader", "LoginService", LoginCtrl]);

  function LoginCtrl($scope, $location, Toast, Loader, LoginService) {
    $scope.user = {};

    $scope.state = "login";

    $scope.setState = (state) => {
      $scope.state = state;
    };

    $scope.recover = () => {
      Loader.add(LoginService.recover($scope.user.email)).then(() => {

        Toast.show("E-mail de validação enviado");

        $scope.cancel();

      }).catch((err) => {
        $scope.error = err.data.message || "E-mail não encontrado";
      });
    };

    $scope.login = () => {

      if ($scope.state === "recover") {
        return $scope.recover();
      }

      $scope.error = "";

      Loader.add(LoginService.doLogin($scope.user)).then(() => {
        $location.path("/dashboard");
      }).catch((err) => {
        $scope.error = err.data.message || "Falha ao efetuar login";
      });
    };
    $scope.cancel = LoginService.cancel;
  }

})(angular);
