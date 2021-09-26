const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const remove = require("../controllers/media/remove");
const upload = require("../controllers/media/upload");

const isAuth = require("../middleware/AuthMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + path.extname(file.originalname));
  },
});
const multerUpload = multer({ storage: storage });

router.post("/", isAuth, multerUpload.array("photos", 20), upload);
router.delete("/remove", isAuth, remove);

module.exports = router;
