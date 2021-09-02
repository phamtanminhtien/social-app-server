const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Number,
    enum: [1, 2],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Friend", userSchema);
