const { Data, Err } = require("../../helpers/response");
const { hash } = require("../../helpers/auth");
const {} = require("../../helpers/jwt");
const User = require("../../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.json(Err(001, "enter username and password, please!"));

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username: username, password: hash(password) });
      await user.save();
      res.json(Data({ username: username }));
    } else {
      res.json(Err("002", "username already exists"));
    }
  } catch (error) {
    res.send(Err("002", "undefine"));
  }
};

module.exports = register;
