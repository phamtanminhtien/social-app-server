const mongoose = require("mongoose");

// {
//     fieldname: 'photos',
//     originalname: 'logo.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'upload/photo',
//     filename: '1630665668202-438022912..png',
//     path: 'upload\\photo\\1630665668202-438022912..png',
//     size: 983
//   }

const mediaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  meta: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Media", mediaSchema);
