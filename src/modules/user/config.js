(angular => {

  angular.module("User", [
    "Config"
  ])

  .config(["$routeProvider", configRouter]);

  function configRouter($routeProvider) {
    $routeProvider
      .when("/user", {
        controller: "User.IndexCtrl",
        controllerAs: "$ctrl",
        templateUrl: `/user/view/index.html`,
        role: "admin"
      });
  }

})(angular);
