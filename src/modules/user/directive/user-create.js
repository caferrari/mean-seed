(angular => {
  "use strict";

  angular.module("User")
  .directive("userCreate", ["$mdDialog", UserCreate]);

  function UserCreate($mdDialog) {
    return {
      restrict: "A",
      scope: {
        user: "=userCreate",
        onDone: "&onDone"
      },
      link: (scope, element) => {
        element.on("click", ($event) => {
          $mdDialog.show({
            templateUrl: `/user/view/create-modal.html`,
            controller: "User.CreateCtrl",
            controllerAs: "$ctrl",
            clickOutsideToClose: true,
            escapeToClose: true,
            locals: {
              user: angular.copy(scope.user)
            },
            targetEvent: $event
          }).then(() => {
            const callback = scope.onDone();
            if (callback) {
              callback();
            }
          });

        });
      }
    };
  }

})(angular);
