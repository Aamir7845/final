// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   isAdmin: Boolean,
// });
// const User = mongoose.model("users", userSchema);
// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  securityQuestion: String,
  securityAnswer: String,
});

const User = mongoose.model("users", userSchema);
module.exports = User;