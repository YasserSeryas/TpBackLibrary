
const jwt = require('jsonwebtoken');

const authenticate = (ctx, next) => {
  const token = ctx.header.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - No token provided' };
    return;
  }

  try {
    const secretKey = 'your-secret-key'; // Replace with the same secret key used for token generation
    const decoded = jwt.verify(token, secretKey);
    ctx.state.user = decoded;
    return next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid token' };
  }
};

module.exports = { authenticate };
