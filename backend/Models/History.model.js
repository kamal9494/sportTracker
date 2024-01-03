const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
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
  returnedDate: Date,
});

const History = mongoose.model("history", HistorySchema);

module.exports = History;
