const jwt = require('jsonwebtoken');

const generateTokenByLogin = (login, secretKey, expTime) => {
  const payload = {
    login: login,
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: expTime,
  });
};

module.exports = generateTokenByLogin;
