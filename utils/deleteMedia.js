const mongoose = require("mongoose");
const Media = require("../models/Media");
const fs = require("fs");

const deleteOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const media = await Media.findById(id);
      if (!media) return reject(new Error("id is not available"));
      if (fs.existsSync(media.meta.path)) {
        fs.rmSync(media.meta.path);
        await Media.findByIdAndRemove(id);
      }
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

const deleteMedia = (id) => {
  return new Promise((resolve, reject) => {
    try {
      if (Array.isArray(id)) {
        for (item in id) {
          deleteOne(id[item]);
        }
      } else {
        deleteOne(id);
      }
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = deleteMedia;
