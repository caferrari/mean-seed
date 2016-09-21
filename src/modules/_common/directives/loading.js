(function() {
  "use strict";

  angular.module("Common")
    .directive("loading", [directive]);

  function directive() {

    return {
      restrict: "E",
      scope: true,
      template: `<div id="loading" ng-show="loading">
                  <md-progress-circular class="md-accent" md-diameter="100" md-mode="indeterminate"></md-progress-circular>
                </div>`,
      link: (scope) => {
        scope.$on("loading-started", () => scope.loading = true);
        scope.$on("loading-finished", () => scope.loading = false);
      }
    };

  }

})();
