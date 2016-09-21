(angular => {
  "use strict";

  angular.module("App")
  .directive("logout", ["LoginService", Directive]);

  function Directive(LoginService) {
    return {
      restrict: "EA",
      scope: false,
      link: (scope, element) => {
        element.on("click", () => LoginService.logout());
      }
    };
  }

})(angular);
