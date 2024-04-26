import express from "express";
import { deleteProduct, getProducts, searchProducts } from "../controllers/products.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getProducts", getProducts);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);
router.post("/search/:text", searchProducts);

export default router;
