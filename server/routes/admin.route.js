import express from "express";
import {deleteReview, deleteUser, getOrders, getReviews, getUsers, searchOrders, searchReviews, searchUsers} from "../controllers/admin.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getUsers", verifyToken, verifyAdmin, getUsers);

router.post("/user/search/:text", verifyToken, verifyAdmin, searchUsers);
router.delete("/user/delete/:email", verifyToken, verifyAdmin, deleteUser);
router.post("/getReviews", verifyToken, verifyAdmin, getReviews);
router.delete("/review/delete/:id", verifyToken, verifyAdmin, deleteReview);
router.post("/review/search/:text", verifyToken, verifyAdmin, searchReviews);

router.get("/getOrders", verifyToken, verifyAdmin, getOrders);
router.get("/orders/search/:text", verifyToken, verifyAdmin, searchOrders);

export default router;