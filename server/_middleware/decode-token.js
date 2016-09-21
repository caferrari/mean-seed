const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {
    var token = req.get("Authorization");

    if (!token) {
      return next();
    }

    token = token.split(" ")[1];

    jwt.verify(token, config.SECRET, (err, decoded) => {

      if (!err && decoded) {
        req.user = decoded;
      }

      next();
    });

  };
})();
