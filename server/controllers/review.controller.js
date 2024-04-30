import { db } from "../index.js";

export const createReview = async (req, res) => {
  const q =
    "INSERT INTO reviews (`comment`,`rating`,`product_id`,`user_email`,`comment_time`) VALUES (?, ?, ?, ?, NOW())";

  const values = [
    req.body.comment,
    req.body.rating,
    req.body.product_id,
    req.body.user_email,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};

export const getReviews = async (req, res) => {
  const q =
    "SELECT * FROM reviews WHERE product_id=? ORDER BY comment_time DESC";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserReviews = async (req, res) => {

  const q = `
  SELECT COUNT(*) AS total_reviews FROM reviews WHERE user_email=?;
    `;
  db.query(q,[req.params.email], (err, data) => {
    const total_reviews = data[0].total_reviews
    if (err) return res.status(403).json("Something went wrong when counting!");
    const q = `SELECT * FROM reviews WHERE user_email=? ORDER BY comment_time DESC LIMIT ? OFFSET ?`;
    db.query(q, [req.params.email, 10, req.body.page * 10 - 10], (err, data) => {
      if (err) return res.status(403).json({message:"Something went wrong!",err});
      return res.status(200).json({ data, total_reviews });
    });
  });
};

export const deleteUserReview = async (req, res) => {

  const revId = req.params.id;
  console.log(revId);
  const q = "DELETE FROM reviews WHERE `id` = ?";

  db.query(q, [revId], (err, data) => {
    if (err) return res.status(403).json({message:"Something went wrong when deleting review.",err});

    return res.json("Review has been deleted!");
  });
};

