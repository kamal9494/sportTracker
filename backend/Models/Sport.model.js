const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SportSchema = new Schema({
  sportName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Sport = mongoose.model("sport", SportSchema);

module.exports = Sport;
