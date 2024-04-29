import { db } from "../index.js";

export const getProducts = async (req, res) => {
  const q = `
      SELECT COUNT(*) AS total_products FROM products;
      `;
  db.query(q, (err, data) => {
    if (err)
      return res
        .status(403)
        .json("Something went wrong when fetching all products!");
    const totalProducts = data[0].total_products;
    const q = `
        SELECT * 
        FROM products
        ORDER BY CONCAT(name, ' ', type)
        LIMIT ? OFFSET ?
      `;
    db.query(q, [4, req.body.page * 4 - 4], (err, data) => {
      if (err)
        return res
          .status(403)
          .json("Something went wrong when fetching page product!");
      return res.status(200).json({ products: data, totalProducts });
    });
  });
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;
    const q = `
        SELECT * 
        FROM products
        WHERE id=?
      `;
    db.query(q, [productId], (err, data) => {

      if (err)
        return res
          .status(403)
          .json("Something went wrong when fetching page product!");
      return res.status(200).json(data[0]);
    });

};
export const getTopSellerProducts = async (req, res) => {
    const q = `
        SELECT * 
        FROM products
        ORDER BY sells DESC
        LIMIT 15
      `;
    db.query(q, (err, data) => {
      if (err)
        return res
          .status(403)
          .json("Something went wrong when fetching page product!");
      return res.status(200).json({ products: data });
    });

};
export const getTopRatedProducts = async (req, res) => {
    const q = `
        SELECT * 
        FROM products
        ORDER BY rating DESC
        LIMIT 15
      `;
    db.query(q, (err, data) => {
      if (err)
        return res
          .status(403)
          .json("Something went wrong when fetching rated page product!");
      return res.status(200).json({ products: data });
    });

};
export const getNewProducts = async (req, res) => {
    const q = `
        SELECT * 
        FROM products
        ORDER BY created_at ASC
        LIMIT 15
      `;
    db.query(q, (err, data) => {
      if (err)
        return res
          .status(403)
          .json("Something went wrong when fetching new product page product!");
      return res.status(200).json({ products: data });
    });

};


export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const q = "DELETE FROM products WHERE `id` = ?";

  db.query(q, [productId], (err, data) => {
    if (err)
      return res
        .status(403)
        .json("Something went wrong when deleting product!");
    return res.json("Product has been deleted!");
  });
};

export const searchProducts = async (req, res) => {
  const q = `
      SELECT COUNT(*) AS total_products
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtypes, ' ', brand) LIKE ?
      `;
  db.query(q, [`%${req.params.text}%`], (err, data) => {
    if (err) return res.status(403).json("Something went wrong when counting!");
    const totalProducts = data[0].total_products;
    const q = `
        SELECT *
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtypes, ' ', brand) LIKE ?
        LIMIT ? OFFSET ?
      `;
    db.query(
      q,
      [`%${req.params.text}%`, 4, req.body.page * 4 - 4],
      (err, data) => {
        if (err)
          return res.status(403).json("Something went wrong when searching!");
        return res.status(200).json({ products: data, totalProducts });
      }
    );
  });
};

export const createProduct = async (req, res) => {
  const q = "SELECT * FROM products WHERE name = ?";

  db.query(q, [req.body.name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res
        .status(409)
        .json("Product already exists try changing the name!");

    let subtypes = "";
    if (req.body.subtypes.length == 1) {
      subtypes = req.body.subtypes[0];
    } else {
      subtypes = req.body.subtypes.join(" ");
    }
    let images = "";
    if (req.body.images.length == 1) {
      images = req.body.images[0];
    } else {
      images = req.body.images.join(" ");
    }

    const q =
      "INSERT INTO products (`name`,`type`,`subtypes`,`description`,`price`,`stock`,`brand`,`images`) VALUES (?)";

    const values = [
      req.body.name,
      req.body.type,
      subtypes,
      req.body.desc,
      req.body.price,
      req.body.stock,
      req.body.brand,
      images,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ data });
    });
  });
};

export const updateProduct = async (req, res) => {
  try {
    const q = "SELECT * FROM products WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Searched product couldn't found." });
      const foundedProduct = data[0];

      let subtypes = "";
      if (req.body.subtypes.length == 1) {
        subtypes = req.body.subtypes[0];
      } else {
        subtypes = req.body.subtypes.join(" ");
      }
      let images = "";
      if (req.body.images.length == 1) {
        images = req.body.images[0];
      } else {
        images = req.body.images.join(" ");
      }

      const q = `
      UPDATE products 
      SET 
        name = ?, 
        type = ?, 
        subtypes = ?, 
        description = ?, 
        price = ?, 
        stock = ?, 
        brand = ?, 
        images = ? 
      WHERE id = ?;
    `;

      const values = [
        req.body.name,
        req.body.type,
        subtypes,
        req.body.desc,
        req.body.price,
        req.body.stock,
        req.body.brand,
        images,
        req.params.id
      ];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
      });
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
