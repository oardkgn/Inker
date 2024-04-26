import { db } from "../index.js";

export const getUsers = async (req, res) => {
  const q = `
    SELECT COUNT(*) AS total_users FROM users WHERE admin = 0;
    `;
  db.query(q, (err, data) => {
    if (err) return res.status(403).json("Something went wrong!");
    const totalUsers = data[0].total_users;
    const q = `
      SELECT * 
      FROM users
      WHERE admin = 0
      ORDER BY CONCAT(name, ' ', surname)
      LIMIT ? OFFSET ?
    `;
    db.query(q, [5, req.body.page * 5 - 5], (err, data) => {
      if (err) return res.status(403).json("Something went wrong!");
      return res.status(200).json({ users: data, totalUsers });
    });
  });
};

export const searchUsers = async (req, res) => {
  const q = `
    SELECT COUNT(*) AS total_users
      FROM users
      WHERE admin = 0 AND CONCAT(name, ' ', surname, ' ', email) LIKE ?
    `;
  db.query(q, [`%${req.params.text}%`], (err, data) => {
    if (err) return res.status(403).json("Something went wrong when counting!");
    const totalUsers = data[0].total_users;
    const q = `
      SELECT *
      FROM users
      WHERE admin = 0 AND CONCAT(name, ' ', surname, ' ', email) LIKE ?
      LIMIT ? OFFSET ?
    `;
    db.query(
      q,
      [`%${req.params.text}%`, 5, req.body.page * 5 - 5],
      (err, data) => {
        if (err)
          return res.status(403).json("Something went wrong when searching!");
        return res.status(200).json({ users: data, totalUsers });
      }
    );
  });
};



export const deleteUser = async (req, res) => {
  const userEmail = req.params.email;
  const q = "DELETE FROM users WHERE `email` = ?";

  db.query(q, [userEmail], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
};
