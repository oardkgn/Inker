import { db } from "../index.js";


export const getProducts = async (req, res) => {
    console.log(1);
    const q = `
      SELECT COUNT(*) AS total_products FROM products;
      `;
    db.query(q, (err, data) => {
      if (err) return res.status(403).json("Something went wrong when fetching all products!");
      const totalProducts = data[0].total_products;
      const q = `
        SELECT * 
        FROM products
        ORDER BY CONCAT(name, ' ', type)
        LIMIT ? OFFSET ?
      `;
      db.query(q, [4, req.body.page * 4 - 4], (err, data) => {
        if (err) return res.status(403).json("Something went wrong when fetching page product!");
        return res.status(200).json({ products: data, totalProducts });
      });
    });
  };

  export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const q = "DELETE FROM products WHERE `id` = ?";
  
    db.query(q, [productId], (err, data) => {
      if (err) return res.status(403).json("Something went wrong when deleting product!");
      return res.json("Product has been deleted!");
    });
  };


  export const searchProducts = async (req, res) => {
    const q = `
      SELECT COUNT(*) AS total_products
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtype, ' ', brand) LIKE ?
      `;
    db.query(q, [`%${req.params.text}%`], (err, data) => {
      if (err) return res.status(403).json("Something went wrong when counting!");
      const totalProducts = data[0].total_products;
      const q = `
        SELECT *
        FROM products
        WHERE CONCAT(name, ' ', type, ' ', subtype, ' ', brand) LIKE ?
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