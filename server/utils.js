import jwt from "jsonwebtoken";
import { db } from "./index.js";
export const verifyToken = (req, res, next) => { 
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({message:"Unauthorized"});
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({message:"Forbidden"});
    req.user = user;
    next();
  });
};
export const verifyAdmin = (req, res, next) => { 
  const userEmail = req.user.email;
  const q = "SELECT * FROM users WHERE `email` = ?";

  db.query(q, [userEmail], (err, data) => {
    if (err) return res.status(403).json("Something went wrong!");
    if (data[0].admin) {
      next()
    }else{
      return res.status(403).json("You cant list all users!");
    }
  });
};
