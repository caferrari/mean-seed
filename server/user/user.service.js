
const UserModel = require("./user.model");

module.exports = (() => {

  const findOne = (query) => {
    query = query || {};

    return UserModel.findOne(query);
  };

  const findByEmail = (email) => findOne({email});

  const list = (params) => {
    params = params || {};
    params.limit = params.limit * 1 || 25;

    return UserModel.paginate({}, params);
  };

  const create = (data) => (new UserModel(data)).save();

  const save = (_id, data) => {
    return findOne({
      _id
    }).then(user => {
      if (!user) {
        throw new Error("User not found");
      }

      user.email = data.email;
      user.name = data.name;
      user.role = data.role;
      if (data.password) {
        user.password = data.password;
      }

      return user.save();
    });
  };

  return {
    create,
    save,
    list,
    findOne,
    findByEmail
  };

})();
