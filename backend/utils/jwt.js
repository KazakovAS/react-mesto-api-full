const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'DEV-SECRET' } = process.env;

const generateToken = (payload, lifetime) => jwt.sign(payload, JWT_SECRET, { expiresIn: lifetime });

const checkToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateToken,
  checkToken,
};
