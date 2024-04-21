import bcrypt from "bcrypt";
import { db } from "../index.js";
import jwt from "jsonwebtoken";

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
      const age = 1000 * 60 * 60 * 24 * 7;
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );

      const { hashedPassword, ...other } = values;
      return res
        .cookie("token", token, {
          httpOnly: true,
          // secure:true,
          maxAge: age,
        })
        .status(200)
        .json({ ...other, token });
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

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        email: data[0].email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password, ...other } = data[0];

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json({ ...other, token });
  });
};
