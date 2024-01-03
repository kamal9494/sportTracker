const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const History = require("../Models/History.model");

router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }
    const results = await History.find({}, { __v: 0, _id: 0 });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
