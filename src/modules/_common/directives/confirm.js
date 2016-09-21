(angular => {

  angular.module("Common")

  .directive("confirm", ["$mdDialog", ($mdDialog) => {
    return {
      restrict: "A",
      priority: 100,
      scope: false,
      link: {
        pre: (scope, element, attr) => {
          const title = attr.confirm || "Tem certeza?";
          const msg = attr.message || "";

          element.on("click", ($event) => {
            $event.stopImmediatePropagation();
            $event.preventDefault();

            const confirm = $mdDialog.confirm()
              .title(title)
              .textContent(msg)
              .ariaLabel("Sim")
              .targetEvent($event)
              .ok("Sim")
              .cancel("Não");
            $mdDialog.show(confirm).then(() => {
              scope.$eval(attr.ngClick);
            });
          });
        }
      }
    };
  }]);

})(angular);
