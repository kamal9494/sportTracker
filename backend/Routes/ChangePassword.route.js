const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../Models/Student.model");
const Admin = require("../Models/Admin.model");
const verifyToken = require("./verifyToken");
const router = express.Router();

const adminPasswordChange = async (req, res) => {
  const { updatedPassword, currentPassword } = req.body;
  const username = req.user.username;
  try {
    const adminUser = await Admin.findOne({ username });

    if (!adminUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const pwdMatch = await bcrypt.compare(currentPassword, adminUser.password);
    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const hashedPWD = await bcrypt.hash(updatedPassword, 10);
    const updatePassword = await Admin.findOneAndUpdate(
      { username },
      { password: hashedPWD }
    );

    res.status(200).json({ message: "Password Updated"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const studentPasswordChange = async (req, res) => {
  const { updatedPassword, currentPassword } = req.body;
  const { email } = req.user;
  try {
    const studentUser = await Student.findOne({ email });

    if (!studentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const pwdMatch = await bcrypt.compare(currentPassword, studentUser.password);

    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const hashedPWD = await bcrypt.hash(updatedPassword, 10);
    const updatePassword = await Student.findOneAndUpdate(
      { email },
      { password: hashedPWD }
    );

    res.status(200).json({ message: "Password Updated"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
router.post("/", verifyToken, async (req, res) => {
  const { role } = req.user;
  if (role === "admin") {
    return adminPasswordChange(req, res);
  } else if (role === "student") {
    return studentPasswordChange(req, res);
  }
});

module.exports = router;
