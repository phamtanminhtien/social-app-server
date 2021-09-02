const { Err, Data } = require("../../helpers/response");
const Post = require("../../models/Post");

const post = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.json(Err("442"), "content is empty");

    const post = new Post({ userId: req.user.userData._id, content: content });
    const result = await post.save();

    if (!result) return res.json(Err("442"), "you can not save this post");
    return res.json(Data({ id: result._id }));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = post;
