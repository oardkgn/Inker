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
    if (err)
      return res
        .status(403)
        .json({ message: "Something went wrong when deleting user.", err });

    return res.json("User has been deleted!");
  });
};

export const getReviews = async (req, res) => {
  const q = `
  SELECT COUNT(*) AS total_reviews FROM reviews;
    `;
  db.query(q, (err, data) => {
    const total_reviews = data[0].total_reviews;
    if (err) return res.status(403).json("Something went wrong when counting!");
    const q = `
      SELECT * 
      FROM reviews
      ORDER BY comment_time DESC
      LIMIT ? OFFSET ?
    `;
    db.query(q, [10, req.body.page * 10 - 10], (err, data) => {
      if (err) return res.status(403).json("Something went wrong!");
      return res.status(200).json({ data, total_reviews });
    });
  });
};

export const deleteReview = async (req, res) => {
  const revId = req.params.id;
  console.log(revId);
  const q = "DELETE FROM reviews WHERE `id` = ?";

  db.query(q, [revId], (err, data) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Something went wrong when deleting review.", err });

    return res.json("Review has been deleted!");
  });
};

export const searchReviews = async (req, res) => {
  const q = `
    SELECT COUNT(*) AS total_reviews
      FROM reviews
      WHERE user_email LIKE ?
    `;
  db.query(q, [`%${req.params.text}%`], (err, data) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Something went wrong when counting reviews!", err });
    const total_reviews = data[0].total_reviews;
    const q = `
      SELECT *
      FROM reviews
      WHERE user_email LIKE ?
      LIMIT ? OFFSET ?
    `;
    db.query(
      q,
      [`%${req.params.text}%`, 10, req.body.page * 10 - 10],
      (err, data) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Something went wrong when searching!" });
        return res.status(200).json({ data, total_reviews });
      }
    );
  });
};

export const getOrders = async (req, res) => {
  const q = `
  SELECT order_id,amount,images,name,order_time,o.price,total_price
  FROM products p
  JOIN orders o ON p.id = o.product_id
  ORDER BY order_time DESC;
 `;
  db.query(q, [req.params.email], (err, data) => {
    if (err)
      return res.status(403).json({ message: "Something went wrong!", err });
    return res.status(200).json({ data });
  });
};

export const searchOrders = async (req, res) => {
  const q = `
    SELECT order_id,amount,images,name,order_time,o.price,total_price
    FROM products p
    JOIN orders o ON p.id = o.product_id
    WHERE user_email LIKE ?
    ORDER BY order_time DESC;
    `;
  db.query(
    q,
    [`%${req.params.text}%`],
    (err, data) => {
      if (err)
      return res.status(403).json({ message: "Something went wrong!", err });
    return res.status(200).json({ data });
    }
  );
};
