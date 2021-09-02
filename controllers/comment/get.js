const { Data, Err } = require("../../helpers/response");
const Comment = require("../../models/Comment");
const mongoose = require("mongoose");

const get = async (req, res, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.json(Err("133", "id is not match the format"));

    const comment = await Comment.findById(id).populate("userId", "username");

    if (!comment) return res.json(Err("133", "comment is not available"));

    return res.json(Data(comment));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = get;
