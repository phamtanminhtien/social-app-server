const { Data, Err } = require("../../helpers/response");
const Media = require("../../models/Media");

const upload = async (req, res) => {
  try {
    const files = [];

    for (index in req.files) {
      const file = new Media({
        userId: req.user.userData._id,
        meta: req.files[index],
      });
      const result = await file.save();
      files.push(result._id.toString());
    }

    res.json(Data(files));
  } catch (error) {
    res.send(Err("032", "undefine"));
  }
};

module.exports = upload;
