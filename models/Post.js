const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  content: {
    type: String,
  },
  media: {
    type: [mongoose.Types.ObjectId],
    ref: "Media",
    default: [],
  },
  like: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
