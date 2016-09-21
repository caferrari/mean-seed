((angular, _) => {
  "use strict";

  angular.module("lodash", []).constant("_", _);

  angular.module("App", [
    "Config",
    "User"
  ]);

})(angular, window._);
