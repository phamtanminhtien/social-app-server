const { Data } = require("../../helpers/response");
const mongoose = require("mongoose");
const Friend = require("../../models/Friend");
const User = require("../../models/User");

const getNoFriend = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const doc = {
      status: { $in: [1, 2] },
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
        return item.requesterId._id;
      } else {
        return item.receiverId._id;
      }
    });

    filteredList.push(req.user.userData._id);

    const listNoFriend = await User.find({ _id: { $nin: filteredList } }, [
      "avatar",
      "firstName",
      "lastName",
    ]).limit(limit);
    return res.json(Data(listNoFriend));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getNoFriend;
