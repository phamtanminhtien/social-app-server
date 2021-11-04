const mongoose = require("mongoose");
const { Data, Err } = require("../../helpers/response");
const Friend = require("../../models/Friend");

const cancelRequestAddFriend = async (req, res) => {
  try {
    const { receiverId } = req.body;
    if (!receiverId) return res.json(Err("163", "receiverId is required"));
    if (!mongoose.Types.ObjectId.isValid(receiverId))
      return res.json(Err("533", "id is not match the format"));

    const doc = {
      status: 1,
      requesterId: req.user.userData._id,
      receiverId: receiverId,
    };

    const exists = await Friend.exists(doc);

    if (!exists) return res.json(Err("963", "request is not exists"));

    const deleteRequest = await Friend.deleteOne(doc);

    if (deleteRequest) return res.json(Data("deleted"));

    return res.json(Err("deletion is not finish"));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = cancelRequestAddFriend;
