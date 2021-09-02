const { Data } = require("../../helpers/response");
const mongoose = require("mongoose");
const Friend = require("../../models/Friend");

const requestAddFriend = async (req, res) => {
  try {
    const doc = {
      status: 2,
      $or: [
        { requesterId: { $eq: req.user.userData._id } },
        { receiverId: { $eq: req.user.userData._id } },
      ],
    };

    const list = await Friend.find(doc, ["requesterId", "receiverId"]).populate(
      ["requesterId", "receiverId"]
    );
    const filteredList = list.map((item) => {
      if (item.receiverId._id.toString() === req.user.userData._id) {
        return {
          _id: item.requesterId._id,
          username: item.requesterId.username,
        };
      } else {
        return {
          _id: item.receiverId._id,
          username: item.receiverId.username,
        };
      }
    });
    return res.json(Data(filteredList));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = requestAddFriend;
