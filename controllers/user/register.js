const { Data, Err } = require("../../helpers/response");
const { hash } = require("../../helpers/auth");
const {} = require("../../helpers/jwt");
const User = require("../../models/User");

const register = async (req, res) => {
  try {
    const { username, lastName, firstName, password } = req.body;
    if (!username || !password || !firstName || !lastName)
      return res.json(
        Err(001, "enter username, password, first name and last name please!")
      );

    const exists = await User.exists({ username });
    if (!exists) {
      const user = new User({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hash(password),
      });
      await user.save();
      res.json(
        Data()
      );
    } else {
      res.json(Err("902", "username already exists"));
    }
  } catch (error) {
    res.send(Err("002", "undefine"));
  }
};

module.exports = register;
