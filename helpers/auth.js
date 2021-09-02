const bcrypt = require("bcrypt");

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hash, verifyPassword };
