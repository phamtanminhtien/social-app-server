const router = require("express").Router();
const isAuth = require("../middleware/AuthMiddleware");
const requestAddFriend = require("../controllers/friend/requestAddFriend");
const responseAddFriend = require("../controllers/friend/responseAddFriend");
const getAllFriend = require("../controllers/friend/getAllFriend");
const getNoFriend = require("../controllers/friend/getNoFriend");
const getFollow = require("../controllers/friend/getFollow");
const getRequest = require("../controllers/friend/getRequest");
const cancelRequestAddFriend = require("../controllers/friend/cancelRequestAddFriend");

router.post("/request-friend", isAuth, requestAddFriend);
router.post("/cancel-request-friend", isAuth, cancelRequestAddFriend);
router.post("/response-friend", isAuth, responseAddFriend);

router.get("/all-friend", isAuth, getAllFriend);
router.get("/no-friend", isAuth, getNoFriend);
router.get("/no-friend", isAuth, getNoFriend);

router.get("/follow", isAuth, getFollow);
router.get("/request", isAuth, getRequest);

module.exports = router;
