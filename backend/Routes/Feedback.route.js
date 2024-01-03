const express = require("express");
const router = express.Router();

const Feedback = require("../Models/Feedback.model");

router.post("/", (req, res) => {
  const request = new Feedback({
    sid: req.body.sid,
    title: req.body.title,
    subject: req.body.subject,
    date: Date.now(),
  });
  request
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
