(function() {
  "use strict";

  angular.module("Common")
  .directive("compareTo", [compareTo]);

  function compareTo() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = (modelValue) => {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch("otherModelValue", () => {
          ngModel.$validate();
        });
      }
    };
  }

})();
