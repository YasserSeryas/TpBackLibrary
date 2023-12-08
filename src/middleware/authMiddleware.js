// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const authenticate = async (ctx, next) => {
  const token = ctx.header.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - No token provided' };
    return;
  }

  try {
    const secretKey = 'secretcode';
   
    // Replace with the same secret key used for token generation
    const decoded = jwt.verify(token.split(' ')[1], secretKey);

    ctx.state.user = decoded;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid token' };
  }

};
export const resolveRole = async (ctx, next) => {
  const { userId } = ctx.state.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      // L'utilisateur n'a pas été trouvé
      ctx.status = 404;
      ctx.body = { error: 'Not Found', message: 'User not found' };
      return;
    }

   

    if (user.role !== 'librarian') {
      ctx.status = 403;
      ctx.body = { error: 'Forbidden', message: 'You are not allowed to perform this action', role: user.role };
      return;
    }

    await next();
  } catch (error) {
    // Gérer les erreurs liées à la recherche de l'utilisateur
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error', message: 'An error occurred while processing your request' };
  }
};



