const { Data, Err } = require("../../helpers/response");
const Post = require("../../models/Post");
const mongoose = require("mongoose");
const get = async (req, res, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.json(Err("133", "id is not match the format"));

    const post = await Post.findById(id)
      .populate("userId", "username")
      .populate("media");

    if (!post) return res.json(Err("133", "post is not available"));

    return res.json(Data(post));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = get;
