const { verifyToken } = require("../helpers/jwt");
const { Err } = require("../helpers/response");

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  "wehf79diukvafdugw e98yfuysdvksjdbfugfhoigfuyw98HCISDGFOQ78";

const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const type = authHeader.split(" ")[0];

  if (!type || type !== "Bearer") {
    return res.json(Err("203", "access denied."));
  }

  try {
    const decoded = await verifyToken(token, ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.json(Err("203", "access denied."));
    } else {
      res.user = decoded;
      return next();
    }
  } catch (error) {
    console.log(error);
    res.json(Err("0123", "undefine"));
  }
};

module.exports = { isAuth };
