const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  sid: {
    type: String,
    required: true,
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
    // required: true,
  },
  requestedDate: Date
});

const Request = mongoose.model("request", RequestSchema);

module.exports = Request;
