(angular => {
  "use strict";

  angular.module("User")

  .factory("UserService", ["$q", "$http", "API", UserService]);

  function UserService($q, $http, API) {

    this.companies = [];
    const users = {
      total: 0,
      docs: []
    };

    this.params = {};

    const list = (params) => {

      if (params) {
        this.params = params;
      }

      return $http({
        method: "GET",
        url: `${API}/user`,
        params: angular.copy(this.params)
      }).then(res => {
        users.docs.splice(0, users.docs.length);
        users.docs.push(...res.data.docs);
        users.total = res.data.total;
        return users;
      });
    };

    const save = (user) => {
      return $http.post(`${API}/user`, user).then(list);
    };

    const edit = (user) => {
      return $http.post(`${API}/user/${user.id}`, user)
        .then(() => user);
    };

    const remove = (user) => {
      return $http.delete(`${API}/user/${user.id}`).then(list).then(() => user);
    };

    return {
      list,
      remove,
      save,
      edit
    };
  }
})(angular);
