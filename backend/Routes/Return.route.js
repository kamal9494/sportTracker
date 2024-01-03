const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const History = require("../Models/History.model");
const Issue = require("../Models/Issue.model");
const Sport = require("../Models/Sport.model");

router.post("/", verifyToken, async (req, res) => {
  const { sid } = req.user;
  try {
    const results = await Issue.find({ sid: sid }, { __v: 0 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.delete("/:id", verifyToken ,async (req, res) => {
  try {
    const { id } = req.params;
    const issuedItem = await Issue.findByIdAndDelete(id);
    if (issuedItem) {
      const updatedSportItem = await updateSportItem(issuedItem);
      const historyRequest = createHistoryRequest(issuedItem);
      await saveToHistory(historyRequest);
      res.status(200).json(historyRequest);
    } else {
      res.status(404).json({ error: 404, message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 500, message: "Internal Server Error" });
  }
});

async function updateSportItem(issuedItem) {
  return await Sport.findOneAndUpdate(
    { sportName: issuedItem.sportName },
    { $inc: { quantity: issuedItem.quantity } },
    { new: true }
  );
}

function createHistoryRequest(issuedItem) {
  return new History({
    sid: issuedItem.sid,
    studentName: issuedItem.studentName,
    sportName: issuedItem.sportName,
    quantity: issuedItem.quantity,
    issuedDate: issuedItem.issuedDate,
    returnedDate: Date.now(),
  });
}

async function saveToHistory(historyRequest) {
  try {
    return await historyRequest.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = router;
