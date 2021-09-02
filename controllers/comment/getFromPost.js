const Comment = require("../../models/Comment");
const mongoose = require("mongoose");
const { Err, Data } = require("../../helpers/response");

const getFromPost = async (req, res, postId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.json(Err("133", "id is not match the format"));

    const comment = await Comment.find({ postId }).populate(
      "userId",
      "username"
    );
    console.log(comment);
    if (!comment) return res.json(Err("133", "comment is not available"));

    return res.json(Data(comment));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getFromPost;
