(angular => {

  angular.module("User")

  .filter("userRole", [UserRoleFilter]);

  function UserRoleFilter() {

    const roles = {
      admin: "Administrador",
      user: "Usuário"
    };

    function filter(role) {
      return roles[role] || "-";
    }

    return filter;
  }

})(angular);
