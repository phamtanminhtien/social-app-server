const { Data } = require("../../helpers/response");
const mongoose = require("mongoose");
const Friend = require("../../models/Friend");
const User = require("../../models/User");

const getAllFriend = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const doc = {
      status: 2,
      $or: [
        { requesterId: { $eq: req.user.userData._id } },
        { receiverId: { $eq: req.user.userData._id } },
      ],
    };

    const list = await Friend.find(doc, ["requesterId", "receiverId"])
      .limit(6)
      .populate(["requesterId", "receiverId"]);
    const filteredList = list.map((item) => {
      if (item.receiverId._id.toString() === req.user.userData._id) {
        return item.requesterId._id;
      } else {
        return item.receiverId._id;
      }
    });

    const listFriend = await User.find({ _id: { $in: filteredList } }, [
      "avatar",
      "firstName",
      "lastName",
    ]).populate("avatar");

    return res.json(Data(listFriend));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getAllFriend;
