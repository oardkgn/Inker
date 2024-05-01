import { db } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const likeProduct = async (req, res) => {
  const q = "INSERT INTO likes (`user_email`, `product_id`) VALUES (?, ?)";

  const values = [req.body.email, req.body.id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};

export const dislikeProduct = async (req, res) => {
  const q = "DELETE FROM likes WHERE `user_email` = ? AND `product_id` = ?";
  const values = [req.params.email, req.params.id];
  db.query(q, values, (err, data) => {
    if (err) return res.status(403).json("You can delete only your likes!");

    return res.json("Like has been deleted!");
  });
};

export const isLiked = async (req, res) => {
  const q = "SELECT * FROM likes WHERE `user_email` = ? AND `product_id` = ?";

  const values = [req.params.email, req.params.id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserLikes = async (req, res) => {
  const q = `
  SELECT COUNT(*) as total_likes
  FROM products p
  JOIN likes l ON p.id = l.product_id
  WHERE l.user_email = ?;
`;
  db.query(q, [req.params.email], (err, data) => {
    const total_likes = data[0].total_likes;
    if (err) return res.status(403).json("Something went wrong when counting!");
    const q = `
    SELECT p.*
    FROM products p
    JOIN likes l ON p.id = l.product_id
    WHERE l.user_email = ?
    LIMIT ? OFFSET ?;`;
    db.query(q, [req.params.email, 8, req.body.page * 8 - 8], (err, data) => {
      if (err)
        return res.status(403).json({ message: "Something went wrong!", err });
      return res.status(200).json({ data, total_likes: total_likes });
    });
  });
};

export const addToCart = async (req, res) => {
  const q = "INSERT INTO carts (`cart_owner`, `product_id`) VALUES (?, ?)";

  const values = [req.body.email, req.body.id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};

export const delCart = async (req, res) => {
  const q = "DELETE FROM carts WHERE `cart_owner` = ?";
  console.log(req.params.email);
  db.query(q, [req.params.email], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCartItems = async (req, res) => {
  const q = `
  SELECT p.*
  FROM products p
  JOIN carts c ON p.id = c.product_id
  WHERE c.cart_owner = ?;
`;
  db.query(q, [req.params.email], (err, data) => {
    if (err)
      return res.status(403).json({ message: "Something went wrong!", err });
    return res.status(200).json(data);
  });
};

export const makeOrder = async (req, res) => {
  const orders = req.body.orders;
  orders.forEach((order) => {
    try {
      const q =
        "INSERT INTO orders (`order_id`, `user_email`, `product_id`, `amount`, `price`, `total_price`, `order_time`) VALUES (?, ?, ?, ?, ?, ?, NOW());";
    
      const values = [
        order.order_id,
        req.user.email,
        order.product_id,
        order.amount,
        order.price,
        order.totalPrice,
      ];
      
        db.query(q, values, (err, data) => {
          console.log(data);
          if (err) throw err;
        });
      } catch (error) {
        res.status(401).json(err)
      }
    });
    return res.status(200).json({ message: "Order created successfully." });
};

export const getUserOrders = async (req, res) => {
  const q = `
    SELECT order_id,amount,images,name,order_time,o.price,total_price
    FROM products p
    JOIN orders o ON p.id = o.product_id
    WHERE o.user_email = ?
    ORDER BY order_time DESC;
   `;
  db.query(q, [req.params.email], (err, data) => {
    if (err)
      return res.status(403).json({ message: "Something went wrong!", err });
    return res.status(200).json({ data });
  });
};

export const searchProducts = async (req, res) => {
  console.log(req.params.text);
  const q = `
      SELECT COUNT(*) AS total_products
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtypes) LIKE ?
      `;
  db.query(q, [`%${req.params.text}%`], (err, data) => {
    if (err) return res.status(403).json("Something went wrong when counting!");
    const totalProducts = data[0].total_products;
    const q = `
        SELECT *
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtypes) LIKE ?
        LIMIT ? OFFSET ?
      `;
    db.query(
      q,
      [`%${req.params.text}%`, 10, req.body.page * 10 - 10],
      (err, data) => {
        if (err)
          return res.status(403).json("Something went wrong when searching!");
        return res.status(200).json({ products: data, totalProducts });
      }
    );
  });
};
