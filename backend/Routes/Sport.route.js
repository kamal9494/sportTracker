const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Sport = require("../Models/Sport.model");

router.get("/", verifyToken, async (req, res) => {
  try {
    const results = await Sport.find({}, { __v: 0 });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/", verifyToken, async (req, res) => {
  const { sportItem, quantity } = req.body;
  try {
    if (req.user.role.toLowerCase() !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }
    const updatedItem = await Sport.findByIdAndUpdate(
      sportItem,
      { $inc: { quantity } },
      { new: true }
    );
    if (updatedItem) res.status(200).send({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized access, only for admins" });
    }

    const { sportName, quantity } = req.body;
    const item = new Sport({
      sportName,
      quantity,
    });

    const result = await item.save();

    if (result) res.status(200).send({ message: "Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
