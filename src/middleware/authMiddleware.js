// authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticate = async (ctx, next) => {
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
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid token' };
  }
};

export default authenticate;
