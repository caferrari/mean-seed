(angular => {
  "use strict";

  angular.module("Common")
  .factory("ConfirmService", ["$mdDialog", service]);

  function service($mdDialog) {

    return ($event, task, options) => {

      options = angular.extend({
        title: "Atenção",
        message: "Tem certeza?",
        ok: "Sim",
        cancel: "Não"
      }, options || {});

      const confirm = $mdDialog.confirm()
        .title(options.title)
        .textContent(options.message)
        .targetEvent($event)
        .ok(options.ok)
        .cancel(options.cancel);

      return $mdDialog.show(confirm).then(task);
    };

  }

})(angular);
