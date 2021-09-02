const router = require("express").Router();
const isAuth = require("../middleware/AuthMiddleware");
const requestAddFriend = require("../controllers/friend/requestAddFriend");
const responseAddFriend = require("../controllers/friend/responseAddFriend");
const getAllFriend = require("../controllers/friend/getAllFriend");

router.post("/request-friend", isAuth, requestAddFriend);
router.post("/response-friend", isAuth, responseAddFriend);

router.get("/all-friend", isAuth, getAllFriend);

module.exports = router;
