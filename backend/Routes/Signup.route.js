const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const Student = require("../Models/Student.model");

router.post("/", async (req, res) => {
  try {
    const { sid, password, email, branch, name, semester } = req.body;
    const hashedPWD = await bcrypt.hash(password, 10);
    console.log(req.body);
    const newStudent = new Student({
      sid,
      email,
      name,
      branch,
      semester,
      password: hashedPWD,
      role: "student",
    });

    await newStudent.save();
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

module.exports = router;
