
module.exports = (() => {
  "use strict";

  const express = require("express");

  const router = express.Router();

  router.get("/", (req, res) => {
    res.status(200).json("Hello!");
  });

  router.use("/user", require("user/user.routes"));

  router.post("/login", require("user/actions/login"));

  return router;
})();
