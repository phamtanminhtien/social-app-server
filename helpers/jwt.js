const jwt = require("jsonwebtoken");

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = { _id: user._id, username: user.username };
    jwt.sign(
      { userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyToken = (token, secretSignature) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, (error, decoded) => {
      if (error) {
        return reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
