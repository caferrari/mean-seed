const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (() => {
  "use strict";

  return (req, res, next) => {

    if (!req.user || !req.user.exp) {
      return next();
    }

    const now = Math.floor(Date.now() / 1000);
    const diff = req.user.exp - now;

    if (diff <= (config.SESSION_TIMEOUT * 0.6)) {
      req.user.exp = now + config.SESSION_TIMEOUT;

      const token = jwt.sign(req.user, config.SECRET);

      res.header("Access-Control-Expose-Headers", "X-Token");
      res.setHeader("X-Token", token);
    }

    next();

  };
})();
