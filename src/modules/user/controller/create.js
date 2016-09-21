(angular => {
  "use strict";

  angular.module("User")
    .controller("User.CreateCtrl", ["$mdDialog", "Loader", "Toast", "UserService", "user", CreateCtrl]);

  function CreateCtrl($mdDialog, Loader, Toast, UserService, user) {

    this.isEditing = !!user;
    this.user = user || {role: "user"};

    this.roles = [{id: "admin", name:"Admin"}, {id:"user", name:"User"}];

    this.save = () => {
      this.error = "";

      if (user) {
        return UserService.edit(this.user).then(() => {
          Toast.show("User edited");
          $mdDialog.hide(this.user);
        });
      }

      return UserService.save(this.user).then(() => {
        Toast.show("Usuário created");
        $mdDialog.hide(this.user);
      });

    };

    this.cancel = $mdDialog.cancel;
  }
})(angular || {});
