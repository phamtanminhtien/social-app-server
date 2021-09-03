const mongoose = require("mongoose");
const { Err, Data } = require("../../helpers/response");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

const post = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.json(Err("442", "content is empty"));

    const comment = new Comment({
      userId: req.user.userData._id,
      content: content,
      postId: postId,
    });

    const result = await comment.save();

    if (result) return res.json(Data({ id: result._id }));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = post;
