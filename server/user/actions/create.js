
const userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    userService.create(req.body).then(result => {
      res.status(201).send(result);
    }).catch(next);
  };

})();
