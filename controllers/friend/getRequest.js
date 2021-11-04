const { Data } = require("../../helpers/response");
const mongoose = require("mongoose");
const Friend = require("../../models/Friend");
const User = require("../../models/User");

const getRequest = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const doc = {
      status: 1,
      requesterId: req.user.userData._id,
    };

    const list = await Friend.find(doc, ["receiverId"]).populate([
      "receiverId",
    ]);

    const mapList = list.map((item) => {
      return item.receiverId;
    });

    const listRequest = await User.find({ _id: { $in: mapList } }, [
      "avatar",
      "firstName",
      "lastName",
    ]).limit(limit);
    return res.json(Data(listRequest));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = getRequest;
