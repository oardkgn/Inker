import bcrypt from "bcrypt";
import { db } from "../index.js";

export const register = async (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    
    const q =
      "INSERT INTO users (`email`,`password`,`name`,`surname`,`admin`) VALUES (?)";
    const values = [
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.surname,
      0,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = async (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const { password, ...other } = data[0];
  
      res
        .status(200)
        .json(other);
    });
  };
