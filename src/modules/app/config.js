(angular => {

  angular.module("App")

  .config(["$routeProvider", configRouter]);

  function configRouter($routeProvider) {

    $routeProvider
      .when("/", {
        controller: "App.HomeCtrl",
        controllerAs: "$ctrl",
        templateUrl: `/app/view/home.html`
      })
      .when("/dashboard", {
        controller: "App.DashboardCtrl",
        controllerAs: "$ctrl",
        templateUrl: `/app/view/dashboard.html`
      })
      .when("/recover/:token", {
        controller: "App.HomeCtrl",
        controllerAs: "$ctrl",
        templateUrl: `/app/view/home.html`
      });
  }

})(angular);
