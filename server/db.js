
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
    userService.findByEmail("admin@admin.com").then(result => {
      if (result) {
        return;
      }

      console.log("admin@admin.com");

      const user = new UserModel({
        name: "Administrator",
        email: "admin@admin.com",
        password: "123456",
        role: "admin",
      });

      return user.save();
    });
  });

  return mongoose;
})();
