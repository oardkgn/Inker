import { db } from "../index.js";

export const createReview = async (req, res) => {

  const q =
    "INSERT INTO reviews (`comment`,`rating`,`product_id`,`user_email`,`comment_time`) VALUES (?, ?, ?, ?, NOW())";

  const values = [
    req.body.comment,
    req.body.rating,
    req.body.product_id,
    req.body.user_email
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
