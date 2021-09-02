const mongoose = require("mongoose");
const User = require("../../models/User");
const Friend = require("../../models/Friend");
const { Err, Data } = require("../../helpers/response");

const responseAddFriend = async (req, res) => {
  try {
    const { response, requesterId } = req.body;
    if (!response.toString()) return res.json(Err("153", "response id empty"));
    if (!mongoose.Types.ObjectId.isValid(requesterId))
      return res.json(Err("533", "id is not match the format"));

    const user = await User.findById(requesterId);

    if (!user)
      return res.json(Err("153", "the response user is not available"));

    const doc = {
      requesterId: requesterId,
      receiverId: req.user.userData._id,
      status: 1,
    };

    const request = await Friend.findOne(doc);

    if (!request) return res.json(Err("234", "the request is not available"));
    let result;
    if (response === 1) {
      result = await Friend.findOneAndUpdate(doc, { status: 2 });
    } else if (response === 0) {
      result = await Friend.findOneAndDelete(doc);
    } else {
      res.json(Err("152", "the response state is not valid"));
    }

    if (!result)
      return res.json(Err("237", "you can not response this request"));

    return res.json(Data(""));
  } catch (error) {
    console.log(error);
    res.send(Err("019", "undefine"));
  }
};

module.exports = responseAddFriend;
