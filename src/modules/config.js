(angular => {
  "use strict";

  angular.module("Config", [
    "Common",
    "lodash",
    "ngMaterial",
    "ngMessages",
    "ngMdIcons",
    "mdFormValidator",
    "md.data.table",
    "mdPickers",
    "ngRoute",
    "angular-jwt",
    "ui.utils.masks"
  ])
    .constant("API", "/api")
    .config(["$routeProvider",configRouter])
    .config(["$httpProvider", configInterceptor])
    .config(["$mdIconProvider", configIcons])
    .run(["$rootScope", "$location", "$timeout", "AuthService", "LoginService", run]);

  function configRouter($routeProvider) {
    $routeProvider
      .otherwise({ redirectTo: "/" });
  }

  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
    $httpProvider.interceptors.push("authInterceptor");
  }

  function run($rootScope, $location, $timeout, AuthService, LoginService) {

    if (!AuthService.isLoggedIn()) {
      LoginService.login();
    }

    $rootScope.$on("$routeChangeStart", ($event, next) => {

      if (!next.$$route || !next.$$route.role) {
        return true;
      }

      if (!AuthService.hasRole(next.$$route.role)) {
        $event.preventDefault();
        return;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => LoginService.login($event);
    });

    $rootScope.$on("$routeChangeError", LoginService.logout);
  }

  function configIcons($mdIconProvider) {
    $mdIconProvider.defaultIconSet("/svg/mdi.svg");
  }

})(angular);
