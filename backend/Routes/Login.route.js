const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../Models/Student.model");
const Admin = require("../Models/Admin.model");
const router = express.Router();

const createToken = (userData) => {
  return jwt.sign(userData, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ username });

    if (!adminUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const pwdMatch = await bcrypt.compare(password, adminUser.password);

    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken({
      username: adminUser.username,
      role: adminUser.role,
      id: adminUser._id,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const studentUser = await Student.findOne({ email });

    if (!studentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const pwdMatch = await bcrypt.compare(password, studentUser.password);

    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const { name, sid, role, branch, semester } = studentUser;
    const token = createToken({
      name,
      sid,
      role,
      branch,
      semester,
      email: studentUser.email,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
};
router.post("/", async (req, res) => {
  const { role } = req.body;
  if (role === "admin") {
    return adminLogin(req, res);
  } else if (role === "student") {
    return studentLogin(req, res);
  }
});

module.exports = router;
