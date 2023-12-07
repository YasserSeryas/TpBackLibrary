const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secretKey = 'your-secret-key'; // Replace with a secure secret key
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, secretKey, options);
};

module.exports = { generateToken };