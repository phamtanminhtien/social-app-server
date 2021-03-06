const router = require("express").Router();
const get = require("../controllers/post/get");
const getFromUser = require("../controllers/post/getFromUser");
const getLike = require("../controllers/post/getLike");
const getRelate = require("../controllers/post/getRelate");
const like = require("../controllers/post/like");
const post = require("../controllers/post/post");
const isAuth = require("../middleware/AuthMiddleware");

router.get("/relate", isAuth, getRelate);

router.get("/:id", async (req, res) => {
  return await get(req, res, req.params.id);
});
router.get("/", async (req, res) => {
  return await get(req, res, req.query.id);
});

router.get("/user/:id", async (req, res) => {
  return await getFromUser(req, res, req.params.id);
});
router.get("/user/", async (req, res) => {
  return await getFromUser(req, res, req.query.id);
});

router.get("/get-like/:id", async (req, res) => {
  return await getLike(req, res, req.params.id);
});

router.get("/get-like/", async (req, res) => {
  return await getLike(req, res, req.query.id);
});

router.post("/like", isAuth, like);

router.post("/", isAuth, post);

module.exports = router;
