import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
   //const token = req.header("Authorization")?.replace("Bearer ", "");
  //const token = req.header('x-auth-token');
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Token:', token);
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('Going to Decoded');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded user:', decoded); // Add this line to log the decoded user
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
