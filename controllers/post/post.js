const { Err, Data } = require("../../helpers/response");
const Post = require("../../models/Post");
const mongoose = require("mongoose");
const Media = require("../../models/Media");

const post = async (req, res) => {
  try {
    const { content, media } = req.body;
    const _media = [];
    if (!content && media?.length == 0)
      return res.json(Err("442", "must have at least media or content"));
    if (Array.isArray(_media)) {
      for (item in media) {
        if (!mongoose.Types.ObjectId.isValid(media[item])) continue;
        const temp = await Media.exists({ _id: media[item] });
        if (!temp) continue;
        _media.push(media[item]);
      }
    }

    const post = new Post({
      userId: req.user.userData._id,
      content: content,
      media: _media,
    });
    const result = await post.save();

    if (!result) return res.json(Err("442"), "you can not save this post");
    return res.json(Data({ id: result._id }));
  } catch (error) {
    console.log(error);
    res.send(Err("012", "undefine"));
  }
};

module.exports = post;
