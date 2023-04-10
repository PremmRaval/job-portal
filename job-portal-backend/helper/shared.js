const jwt = require("jsonwebtoken");

generateAccessToken = (payload) => {
  let secret = process.env.JWT_SECRET;
  let expiresIn = parseInt(process.env.SESSION_EXPIRY) || 1800;
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
  generateAccessToken,
};
