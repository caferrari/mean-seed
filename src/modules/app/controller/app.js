(angular => {
  "use strict";

  angular.module("App")
  .controller("AppCtrl", ["$rootScope", "$scope", "$mdSidenav", "$mdMedia", "AuthService", AppCtrl]);

  function AppCtrl($rootScope, $scope, $mdSidenav, $mdMedia, AuthService) {

    const updateLoginStatus = () => {
      this.isAuthenticated = AuthService.isLoggedIn();
      this.user = AuthService.getTokenData();
    };

    $scope.$on("login", updateLoginStatus);

    $scope.$on("logout", updateLoginStatus);

    this.toggleSidenav = (menuId) => $mdSidenav(menuId).toggle();
    this.hideSidebar = () => $mdMedia("min-width: 768px");

  }

})(angular);
