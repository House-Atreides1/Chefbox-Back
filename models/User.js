const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: { type: String, required: true },
});

userSchema.methods.hashPassword = function (password) {
  let salt = crypto.randomBytes(16).toString("hex");
  let hashedPassword = crypto.pbkdf2Sync(password, salt, 100, 512, "sha512");
  return hashedPassword.toString("hex");
};

module.exports = mongoose.model("User", userSchema);
