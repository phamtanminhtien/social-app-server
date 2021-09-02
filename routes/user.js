const router = require("express").Router();
const login = require("../controllers/user/login");
const register = require("../controllers/user/register");

router.post("/login", login);

router.post("/register", register);

module.exports = router;
