(angular => {
  "use strict";

  angular.module("User")
  .directive("userPasswordReset", ["$mdDialog", "Toast", "UserService", UserCreate]);

  function UserCreate($mdDialog, Toast, UserService) {
    return {
      restrict: "A",
      scope: {
        user: "=userPasswordReset"
      },
      link: (scope, element) => {
        element.on("click", ($event) => {
          const confirm = $mdDialog.confirm()
            .title("Password recover")
            .textContent("The password will be send by email")
            .ariaLabel("Sim")
            .targetEvent($event)
            .ok("Sim")
            .cancel("Não");
          $mdDialog.show(confirm).then(() => {
            UserService.resetPassword(scope.user).then(() => {
              Toast.show(`The password has been sent to ${scope.user.email}`);
            });
          });
        });
      }
    };
  }

})(angular);
