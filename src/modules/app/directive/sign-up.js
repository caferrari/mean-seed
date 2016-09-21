(angular => {
  "use strict";

  angular.module("App")
  .directive("signUp", ["SignUpService", Directive]);

  function Directive(SignUpService) {
    return {
      restrict: "EA",
      scope: false,
      link: (scope, element) => {
        element.on("click", (event) => SignUpService.signUp(event));
      }
    };
  }

})(angular);
