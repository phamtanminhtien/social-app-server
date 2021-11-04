const { Data, Err } = require("../../helpers/response");
const Post = require("../../models/Post");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Media = require("../../models/Media");

const postAvatar = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json(Err("143", "id is required"));

    const image = await Media.findById(id);
    if (!image) return res.json(Err("145", "id is not valid"));

    const result = await User.updateOne(
      { _id: req.user.userData._id },
      {
        avatar: id,
      }
    );
    if (result) return res.json(Data(image));

    return res.json(Err("234", "cant set new avatar"));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = postAvatar;
