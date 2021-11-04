const { Data, Err } = require("../../helpers/response");
const mongoose = require("mongoose");
const User = require("../../models/User");

const get = async (req, res, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.json(Err("133", "id is not match the format"));

    const user = await User.findById(id, [
      "username",
      "firstName",
      "lastName",
      "avatar",
    ]).populate("avatar");

    if (!user) return res.json(Err("133", "user is not available"));

    return res.json(Data(user));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = get;
