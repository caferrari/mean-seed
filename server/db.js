
const mongoose    = require("mongoose"),
      config      = require("config"),
      UserModel   = require("user/user.model"),
      userService = require("user/user.service");

module.exports = (() => {
  "use strict";

  mongoose.Promise = Promise;
  mongoose.connect(config.MONGO_DSN).then(() => {
    console.log("MongoDB connected!");

    // seed the admin user
    userService.findByEmail(config.ADMIN_USER).then(result => {
      if (result) {
        return;
      }

      console.log("Creating the admin user");

      const user = new UserModel({
        name: "Administrator",
        email: config.ADMIN_USER,
        password: config.ADMIN_PASSWORD,
        role: "admin",
      });

      return user.save();
    });
  });

  return mongoose;
})();
