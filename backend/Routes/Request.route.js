const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const Request = require("../Models/Request.model");

router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }
    const results = await Request.find({}, { __v: 0, _id: 0 });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { sportName, quantity } = req.body;
    const sid = req.user.sid;
    const studentName = req.user.name;
    const request = new Request({
      sportName,
      quantity,
      sid,
      studentName,
      requestedDate: Date.now(),
    });
    const result = await request.save();
    if (result) res.status(200).json({ message: "Request Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
