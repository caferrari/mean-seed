
const userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    userService.list(req.query).then(result => {
      res.status(200).send(result);
    }).catch(next);
  };

})();
