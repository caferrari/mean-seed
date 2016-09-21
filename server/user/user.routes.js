const express     = require("express");

module.exports = (() => {
  "use strict";

  const router = express.Router();

  router.get("/", require("./actions/list"));
  router.post("/", require("./actions/create"));
  router.post("/:id", require("./actions/save"));

  return router;
})();
