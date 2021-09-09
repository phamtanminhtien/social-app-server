const { Data, Err } = require("../../helpers/response");
const Post = require("../../models/Post");
const Friend = require("../../models/Friend");
const mongoose = require("mongoose");

const getRelate = async (req, res) => {
  const id = req.user.userData._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.json(Err("133", "id is not match the format"));
    const friendAndFollow = await Friend.find(
      {
        $or: [
          { requesterId: { $eq: req.user.userData._id }, status: { $eq: 1 } },
          {
            status: 2,
            $or: [
              { requesterId: { $eq: req.user.userData._id } },
              { receiverId: { $eq: req.user.userData._id } },
            ],
          },
        ],
      },
      ["requesterId", "receiverId"]
    );
    const filteredList = friendAndFollow.map((item) => {
      if (item.receiverId._id.toString() === id) {
        return item.requesterId._id;
      } else {
        return item.receiverId._id;
      }
    });

    const posts = await Post.find({ userId: { $in: filteredList } }).sort({
      createdAt: -1,
    });

    return res.json(Data(posts));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getRelate;
