(angular => {
  "use strict";

  angular.module("Common")
  .factory("Loader", ["$rootScope", service]);

  function service($rootScope) {

    let loaders = 0;

    const add = promise => {

      if (++loaders === 1) {
        $rootScope.$broadcast("loading-started");
      }

      promise.finally(() => {
        if (--loaders === 0) {
          $rootScope.$broadcast("loading-finished");
        }
      });

      return promise;
    };

    return {
      add
    };

  }

})(angular);
