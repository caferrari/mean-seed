const mongoose         = require("mongoose"),
      bcrypt           = require("bcrypt-nodejs"),
      jwt              = require("jsonwebtoken"),
      paginate         = require("mongoose-paginate"),
      SECRET           = process.env.SECRET || __dirname,
      SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 11;

module.exports = (() => {

  const UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, required: true, index: { unique: true } },
    name: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    password:  { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  }, { timestamps: true });

  UserSchema.plugin(paginate);

  UserSchema.pre("save", function(next) {

    if (!this.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  });

  UserSchema.post("save", function() {
    if (this.createdAt !== this.updatedAt) {
      return;
    }

    const user = this.toObject();

    user.token = jwt.sign({
      email: this.email,
      exp: Math.floor(Date.now() / 1000) + 86400
    }, SECRET);

  });

  UserSchema.methods.verify = function(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err || !isMatch) reject("Senha inválida");
        resolve();
      });
    });
  };

  UserSchema.methods.toJSON = function() {
    const obj = this.toObject();

    obj.id = obj._id;

    delete obj.__v;
    delete obj._id;
    delete obj.updatedAt;
    delete obj.createdAt;
    delete obj.password;
    delete obj.enabled;

    return obj;
  };

  return mongoose.model("User", UserSchema);
})();
