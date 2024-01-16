const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Issue = require("../Models/Issue.model");
const Sport = require("../Models/Sport.model");

router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }
    const results = await Issue.find({}, { __v: 0, _id: 0 });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/count", verifyToken, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }
    const results = await Issue.find({}, { __v: 0, _id: 0 });
    res.status(200).send({pending: results.length});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/", verifyToken, async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const { sid } = req.user;
    const studentName = req.user.name;
    const updatedItem = await Sport.findOneAndUpdate(
      { _id: id, quantity: { $gte: quantity } },
      { $inc: { quantity: -quantity } },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(400).json({ message: "Insufficient Quantity" });
    }
    const issueRequest = new Issue({
      sid: sid,
      studentName: studentName,
      sportName: updatedItem.sportName,
      quantity: quantity,
      issuedDate: Date.now(),
    });

    const result = await issueRequest.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
