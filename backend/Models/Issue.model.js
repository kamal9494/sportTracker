const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  sid: {
    type: String,
    reqired: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  sportName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  issuedDate: Date,
});

const Issue = mongoose.model("issue", IssueSchema);

module.exports = Issue;
