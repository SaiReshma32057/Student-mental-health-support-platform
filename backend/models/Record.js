const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  type: String,
  date: String,
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);
