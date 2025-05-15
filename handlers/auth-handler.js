// const { model } = require("mongoose");
// const User = require("./../db/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// async function registerUser(model) {
//   const hashPassword = await bcrypt.hash(model.password, 10);
//   let user = new User({
//     name: model.name,
//     email: model.email,
//     password: hashPassword,
//   });
//   await user.save();
// }

// async function loginUser(model) {
//   const user = await User.findOne({ email: model.email });
//   if (!user) {
//     return null;
//   }
//   console.log(user, model.password, user.password);
//   const isMatched = await bcrypt.compare(model.password, user.password);
//   if (isMatched) {
//     //login
//     const token = jwt.sign(
//       {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       },
//       "seceret",
//       {
//         expiresIn: "50h",
//       }
//     );
//     return { token, user };
//   } else {
//     return null;
//   }
// }

// module.exports = { registerUser, loginUser };


const User = require("./../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ───────────────────────────────────────────
// REGISTER USER
// ───────────────────────────────────────────
async function registerUser(model) {
  const hashPassword = await bcrypt.hash(model.password, 10);

  const user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword,
    isAdmin: model.isAdmin || false,
    securityQuestion: model.securityQuestion,
    securityAnswer: model.securityAnswer, // Optional: hash this for extra security
  });

  await user.save();
}

// ───────────────────────────────────────────
// LOGIN USER
// ───────────────────────────────────────────
async function loginUser(model) {
  const user = await User.findOne({ email: model.email });
  if (!user) return null;

  const isMatched = await bcrypt.compare(model.password, user.password);
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "seceret",
      { expiresIn: "50h" }
    );
    return { token, user };
  } else {
    return null;
  }
}

// ───────────────────────────────────────────
// GET SECURITY QUESTION
// ───────────────────────────────────────────
async function getSecurityQuestion(email) {
  const user = await User.findOne({ email });
  return user ? user.securityQuestion : null;
}

// ───────────────────────────────────────────
// VERIFY SECURITY ANSWER
// ───────────────────────────────────────────
async function verifySecurityAnswer(email, answer) {
  const user = await User.findOne({ email });
  if (!user) return false;

  return user.securityAnswer === answer;
}

// ───────────────────────────────────────────
// RESET PASSWORD
// ───────────────────────────────────────────
async function resetPassword(email, newPassword) {
  const user = await User.findOne({ email });
  if (!user) return false;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return true;
}

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityAnswer,
  resetPassword
};