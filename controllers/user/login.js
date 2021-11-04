const { Data, Err } = require("../../helpers/response");
const { verifyPassword } = require("../../helpers/auth");
const { generateToken } = require("../../helpers/jwt");
const User = require("../../models/User");

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  "wehf79diukvafdugw e98yfuysdvksjdbfugfhoigfuyw98HCISDGFOQ78";
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || "2h";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      //check password empty
      return res.json(Err(001, "enter username and password, please!"));

    const user = await User.findOne({ username }); //check username
    if (!user) return res.json(Err("004", "username is wrong"));

    if (!verifyPassword(password, user.password))
      //check password
      return res.json(Err("005", "password is wrong"));

    const _token = await generateToken(
      user,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_LIFE
    );
    const getInfo = await User.findById(user._id, [
      "firstName",
      "lastName",
      "username",
      "avatar",
    ]).populate("avatar");
    return res.json(
      Data({
        token: _token,
        user: getInfo,
      })
    );
  } catch (error) {
    res.send(Err("002", "undefine"));
  }
};

module.exports = login;
