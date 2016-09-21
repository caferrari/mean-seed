(angular => {
  "use strict";

  angular.module("App")
  .directive("login", ["LoginService", Directive]);

  function Directive(LoginService) {
    return {
      restrict: "EA",
      scope: false,
      link: (scope, element) => {
        element.on("click", (event) => LoginService.login(event));
      }
    };
  }

})(angular);
