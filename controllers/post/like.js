const { Err, Data } = require("../../helpers/response");
const Post = require("../../models/Post");

const like = async (req, res) => {
  try {
    const userId = req.user.userData._id;
    const { postId, status } = req.body;
    if (!postId) res.json(Err("847", "post id is required"));
    if (!status) res.json(Err("247", "status id is required"));

    const check = await Post.findOne({
      _id: postId,
      like: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
    if (status === "unlike") {
      const result = await Post.updateOne(
        { _id: postId },
        {
          $pull: {
            like: userId,
          },
        }
      );
      return res.json(Data("0"));
    } else {
      const result = await Post.updateOne(
        { _id: postId },
        {
          $push: {
            like: userId,
          },
        }
      );

      return res.json(Data("1"));
    }
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = like;
