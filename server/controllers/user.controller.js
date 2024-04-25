import { db } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "./auth.controller.js";

export const update = async (req, res) => {
  if (req.user.email !== req.params.email)
    return res.status(401).json("You can only update your own account!");
  try {
    const q = "SELECT * FROM users WHERE email = ?";
    let hashedPassword = await bcrypt.hash(req.body.newPsw, 10);

    if (req.body.newPsw.length < 6) {
      hashedPassword = await bcrypt.hash(req.body.prePsw, 10);
    }

    db.query(q, [req.user.email], (err, data) => {
      const foundedUser = data[0];

      let isPasswordCorrect = bcrypt.compareSync(
        req.body.prePsw,
        data[0].password
      );

      if (foundedUser.googleacc) {
        isPasswordCorrect = true;
      }

      if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

      const q =
        "UPDATE users SET `email`=?,`name`=?,`surname`=?,`password`=? WHERE `email` = ?";

      const values = [
        req.body.email,
        req.body.name,
        req.body.surname,
        hashedPassword,
        req.params.email,
      ];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign(
          {
            email: req.body.email,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: age }
        );

        const newUser = {
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          admin: foundedUser.admin,
          googleacc: foundedUser.googleacc,
        };

        if (req.body.email != req.user.email) {
          return res
            .cookie("access_token", token, {
              httpOnly: true,
              // secure:true,
              maxAge: age,
              withCredentials: true,
            })
            .status(200)
            .json(newUser);
        } else {
          return res.status(200).json(newUser);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong.");
  }
};

export const deleteUser = async (req, res) => {
  const userEmail = req.params.email;
  const q = "DELETE FROM users WHERE `email` = ?";

  db.query(q, [userEmail], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
};

export const getUsers = async (req, res) => {
  const q = `
  SELECT COUNT(*) AS total_users FROM users
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(403).json("Something went wrong!");
    const totalUsers = data[0].total_users
    const q = `
    SELECT * 
    FROM users
    ORDER BY CONCAT(name, ' ', surname)
    LIMIT ? OFFSET ?
  `;
    db.query(q, [5, req.body.page * 5 - 5], (err, data) => {
      if (err) return res.status(403).json("Something went wrong!");
      return res.status(200).json({ users:data,totalUsers});
    });
  });
};

export const searchUsers = async (req, res) => {
  console.log(1);
  const q = `
  SELECT COUNT(*) AS total_users
    FROM users
    WHERE CONCAT(name, ' ', surname, ' ', email) LIKE ?
  `;
  db.query(q,[`%${req.params.text}%`], (err, data) => {
    if (err) return res.status(403).json("Something went wrong when counting!");
    const totalUsers = data[0].total_users
    const q = `
    SELECT *
    FROM users
    WHERE CONCAT(name, ' ', surname, ' ', email) LIKE ?
    LIMIT ? OFFSET ?
  `;
    db.query(q, [`%${req.params.text}%`,5, req.body.page * 5 - 5], (err, data) => {
      if (err) return res.status(403).json("Something went wrong when searching!");
      return res.status(200).json({ users:data,totalUsers});
    });
  });
};
