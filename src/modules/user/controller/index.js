(angular => {
  "use strict";

  angular.module("User")
    .controller("User.IndexCtrl", ["$timeout", "$mdDialog", "Loader", "Toast", "UserService", IndexCtrl]);

  function IndexCtrl($timeout, $mdDialog, Loader, Toast, UserService) {

    this.promise = null;

    this.query = {
      sort: "name",
      page: 1,
      limit: 25
    };

    this.loadData = () => {
      this.promise = UserService.list(this.query);
      this.promise.then((data) => {
        this.data = data;
        this.pages = Math.ceil(this.data.total / this.query.limit);
      });

    };

    $timeout(() => this.loadData());

    this.remove = ($event, user) => {
      Loader.add(UserService.remove(user)).then(() => {
        Toast.show("Usuário excluído com sucesso");
        return user;
      });
    };
  }

})(angular || {});
