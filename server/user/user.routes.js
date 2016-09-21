const express     = require("express");

module.exports = (() => {
  "use strict";

  const router = express.Router();

  router.get("/", require("./actions/list"));
  router.post("/", require("./actions/create"));
  router.post("/:id", require("./actions/save"));
  router.delete("/:id", require("./actions/delete"));

  return router;
})();
