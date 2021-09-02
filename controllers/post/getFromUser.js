const mongoose = require("mongoose");
const { Data, Err } = require("../../helpers/response");
const Post = require("../../models/Post");
const User = require("../../models/User");

const getFromUser = async (req, res, userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.json(Err("133", "id is not match the format"));

    const user = await User.findById(userId);
    if (!user) return res.json(Err("533", "user is not available"));

    const post = await Post.find({ userId }).populate("userId", "username");

    if (!post) return res.json(Err("133", "post is not available"));

    return res.json(Data(post));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getFromUser;
