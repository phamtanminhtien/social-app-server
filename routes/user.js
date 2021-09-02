const router = require("express").Router();
const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const get = require("../controllers/user/get");
const isAuth = require("../middleware/AuthMiddleware");

router.post("/login", login);

router.post("/register", register);

router.get("/:id", async (req, res) => {
  return await get(req, res, req.params.id);
});
router.get("/", async (req, res) => {
  return await get(req, res, req.query.id);
});

module.exports = router;
