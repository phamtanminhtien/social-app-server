const mongoose = require("mongoose");
const User = require("../../models/User");
const Friend = require("../../models/Friend");
const { Err, Data } = require("../../helpers/response");

const requestAddFriend = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receiverId))
      return res.json(Err("933", "id is not match the format"));

    if (receiverId === req.user.userData._id)
      return res.json(Err("533", "you can not request to yourself"));

    const user = await User.findById(receiverId, "username");
    if (!user) return res.json(Err("433", "user is not available"));

    const doc = {
      requesterId: { $in: [req.user.userData._id, receiverId] },
      receiverId: { $in: [req.user.userData._id, receiverId] },
      status: { $in: [1, 2] },
    };

    const queryRequest = await Friend.findOne(doc);
    if (queryRequest) return res.json(Err("243", "you can not request again"));

    const request = new Friend({
      requesterId: req.user.userData._id,
      receiverId: receiverId,
      status: 1,
    });
    const result = request.save();
    if (!result) return res.json(Err("234", "you can not send this request"));

    return res.json(Data(""));
  } catch (error) {
    console.log(error);
    res.send(Err("010", "undefine"));
  }
};

module.exports = requestAddFriend;
