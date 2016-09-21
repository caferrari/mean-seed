const userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    userService.save(req.params.id, req.body).then(result => {
      res.status(200).send(result);
    }).catch(next);
  };

})();
