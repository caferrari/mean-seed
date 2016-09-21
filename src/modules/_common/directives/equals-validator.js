(angular => {
  "use strict";

  angular.module("Common")
  .directive("equals", [() => {
    return {
      restrict: "A",
      require: "ngModel",
      scope: {
        parent: "=equals"
      },
      link: (scope, elem, attrs, ngModel) => {

        ngModel.$validators.equals = (modelValue) => {
          return modelValue === scope.parent;
        };

        scope.$watch("parent", ngModel.$validate);
        scope.$watch(() => ngModel.$modelValue, () => {
          ngModel.$setTouched();
          ngModel.$validate();
        });
      }
    };
  }]);

})(angular);
