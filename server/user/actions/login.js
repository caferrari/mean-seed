const jwt         = require("jsonwebtoken"),
      config      = require("config"),
      userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    userService.findByEmail(req.body.email)
      .then(user => {
        if (!user) {
          return res.status(403).send({
            message: "User not found"
          });
        }

        if (!user.isActive) {
          return res.status(403).send({
            message: "Inactive account"
          });
        }

        user.verify(req.body.password).then(() => {
          const token = jwt.sign({
            name: user.name,
            id: user._id,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + config.SESSION_TIMEOUT
          }, config.SECRET);

          res.header("Access-Control-Expose-Headers", "X-Token");
          res.setHeader("X-Token", token);
          res.status(200).send({
            token: token
          });
        }).catch((err) => {
          res.status(403).send({
            message: err
          });
        });
    }).catch(next);
  };

})();
