const { Data } = require("../../helpers/response");
const mongoose = require("mongoose");
const Friend = require("../../models/Friend");
const User = require("../../models/User");

const getFollow = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const doc = {
      status: 1,
      receiverId: req.user.userData._id,
    };

    const list = await Friend.find(doc, ["requesterId"]).populate([
      "requesterId",
    ]);

    const mapList = list.map((item) => {
      return item.requesterId;
    });

    const listFollow = await User.find({ _id: { $in: mapList } }, [
      "avatar",
      "firstName",
      "lastName",
    ]).limit(limit);
    return res.json(Data(listFollow));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getFollow;
