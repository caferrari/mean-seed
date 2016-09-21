(angular => {
  "use strict";

  angular.module("App")
    .controller("App.HomeCtrl", ["$scope", "$location", "$routeParams", "LoginService", HomeCtrl]);

  function HomeCtrl($scope, $location, $routeParams, LoginService) {
    $scope.$on("login", () => {
      $location.path("/dashboard");
    });

    if ($routeParams.token) {
      LoginService.resetPassword($routeParams.token);
    }
  }

})(angular);
