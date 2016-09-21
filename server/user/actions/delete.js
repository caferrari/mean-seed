const userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    userService.remove(req.params.id).then(() => {
      res.status(200).send();
    }).catch(next);
  };

})();
