import express from "express";
import { createProduct, deleteProduct, getProducts, searchProducts } from "../controllers/products.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getProducts", getProducts);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);
router.post("/search/:text", searchProducts);
router.post("/create",verifyToken,verifyAdmin, createProduct);

export default router;
