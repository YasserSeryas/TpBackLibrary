import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secretKey = 'secretcode'; // Replace with a secure secret key
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, secretKey, options);
};
export default generateToken;