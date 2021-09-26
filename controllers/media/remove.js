const mongoose = require("mongoose");
const { Err, Data } = require("../../helpers/response");
const Media = require("../../models/Media");
const deleteMedia = require("../../utils/deleteMedia");

const remove = async (req, res) => {
  try {
    let { data: filesId } = req.body;
    if (!filesId) return res.json(Err("231", "empty not allow"));
    if (!Array.isArray(filesId)) {
      filesId = [filesId];
    }
    if (
      filesId.every((fileId) => {
        return mongoose.Types.ObjectId.isValid(fileId);
      })
    )
      deleteMedia(filesId);

    return res.json(Data(""));
  } catch (error) {
    console.log(error);
    res.send(Err("021", "undefine"));
  }
};

module.exports = remove;
