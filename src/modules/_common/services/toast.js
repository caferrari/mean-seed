(angular => {
  "use strict";

  angular.module("Common")
  .factory("Toast", ["$mdToast", service]);

  function service($mdToast) {
    const show = message => {
      const toast = $mdToast
        .simple()
        .textContent(message)
        .position("bottom right")
        .hideDelay(4000);

      return $mdToast.show(
        toast
      );
    };

    return {
      show
    };

  }

})(angular);
