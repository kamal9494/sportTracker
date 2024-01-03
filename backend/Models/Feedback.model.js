const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  sid: {
    type: String,
    reqired: true,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: Date,
});

const Feedback = mongoose.model("feedback", FeedbackSchema);

module.exports = Feedback;
