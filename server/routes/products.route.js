import express from "express";
import {
  createProduct,
  deleteProduct,
  getNewProducts,
  getProduct,
  getProducts,
  getTopRatedProducts,
  getTopSellerProducts,
  searchProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.get("/getTopSellerProducts", getTopSellerProducts);
router.get("/getTopRatedProducts", getTopRatedProducts);
router.get("/getNewProducts", getNewProducts);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);
router.post("/search/:text", searchProducts);
router.post("/create", verifyToken, verifyAdmin, createProduct);
router.put("/update/:id", verifyToken, verifyAdmin, updateProduct);

export default router;
