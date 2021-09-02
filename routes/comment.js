const router = require("express").Router();
const get = require("../controllers/comment/get");
const getFromPost = require("../controllers/comment/getFromPost");
const post = require("../controllers/comment/post");
const isAuth = require("../middleware/AuthMiddleware");

router.post("/", isAuth, post);

router.get("/:id", async (req, res) => {
  return await get(req, res, req.params.id);
});
router.get("/", async (req, res) => {
  return await get(req, res, req.query.id);
});

router.get("/post/:id", async (req, res) => {
  return await getFromPost(req, res, req.params.id);
});
router.get("/post", async (req, res) => {
  return await getFromPost(req, res, req.query.id);
});

module.exports = router;
