import express from "express";
import { verifyAdmin, verifyToken } from "../utils.js";
import {createReview, getReviews} from "../controllers/review.controller.js"

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/:id", getReviews);

export default router;