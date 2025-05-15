const express = require("express");
// const { registerUser, loginUser, } = require("../handlers/auth-handler");
const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  verifySecurityAnswer,
  resetPassword,
} = require("../handlers/auth-handler");
const router = express.Router();
const User = require('../db/user')
// router.post("/register", async (req, res) => {
//   let model = req.body;
//   if (model.name && model.email && model.password) {
//     await registerUser(model);
//     res.send({
//       message: "User registered",
//     });
//   } else {
//     res.status(400).json({
//       error: "Please provide name , email and password",
//     });
//   }
// });
router.post("/register", async (req, res) => {
  const model = req.body;

  if (
    model.name &&
    model.email &&
    model.password &&
    model.securityQuestion &&
    model.securityAnswer
  ) {
    await registerUser(model);
    res.send({ message: "User registered" });
  } else {
    res.status(400).json({
      error: "Please provide name, email, password, securityQuestion, and securityAnswer",
    });
  }
});
//updating the user profile by the user
router.post("/update",async (req, res) => 
{
  const { oldName, oldEmail, newName, newEmail } = req.body;
   console.log("receiving request",req.body);
   console.log("searching for user",oldEmail);
  const user = await User.findOne({ email: oldEmail }); 
  if (!user) {
    return res.status(404).json({ message: "User not found in database!" });
  }
  // Update user name and email if they are provided and different from the old values
  if (newName && newName !== oldName) {
    user.name = newName;
  }
  if (newEmail && newEmail !== oldEmail) {
    user.email = newEmail;
  }

  await user.save();
  res.json({ message: "Profile updated successfully!", user });
});
//users data deleteing by admin
router.delete("/users/:email", async (req, res) => {
  try {
    const  recieEmail = req.params;//ch
    const email=recieEmail.email;
    console.log(email);
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
});
//users data fetching by admin
router.get("/users", async (req, res) => {
  try {
    console.log("reached to get method");
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});
// GET SECURITY QUESTION
// ───────────────────────────────────────────
router.post("/get-security-question", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const question = await getSecurityQuestion(email);
  if (question) {
    res.send({ question });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
// VERIFY SECURITY ANSWER
// ───────────────────────────────────────────
router.post("/verify-security-answer", async (req, res) => {
  const { email, answer } = req.body;

  if (!email || !answer) {
    return res.status(400).json({ error: "Email and answer are required" });
  }

  const isValid = await verifySecurityAnswer(email, answer);
  res.send({ isValid });
});
//login
router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    const result = await loginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        error: "Email or password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide email and password",
    });
  }
});
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required" });
  }

  const isSuccess = await resetPassword(email, newPassword);
  if (isSuccess) {
    res.send({ message: "Password reset successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
