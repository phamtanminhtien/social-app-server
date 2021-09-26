const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  avatar: {
    type: mongoose.Types.ObjectId,
    ref: "Media",
  },
  lastName: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
