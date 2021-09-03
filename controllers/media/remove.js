const mongoose = require("mongoose");
const { Err, Data } = require("../../helpers/response");
const Media = require("../../models/Media");
const deleteMedia = require("../../utils/deleteMedia");

const remove = async (req, res) => {
  try {
    const { data: filesId } = req.body;
    if (
      !filesId.every((fileId) => {
        return mongoose.Types.ObjectId.isValid(fileId);
      })
    )
      deleteMedia(filesId);

    return res.json(Data(""));
  } catch (error) {
    console.log(error);
    res.send(Err("022", "undefine"));
  }
};

module.exports = remove;
