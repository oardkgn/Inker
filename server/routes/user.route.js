import express from "express";
import { addToCart, deleteUser, dislikeProduct, getCartItems, getUserLikes, isLiked, likeProduct, update } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";
import { deleteUserReview, getUserReviews } from "../controllers/review.controller.js";

const router = express.Router();


router.put("/update/:email", verifyToken, update);
router.delete("/delete/:email", verifyToken, deleteUser);
router.post("/getUserReviews/:email", verifyToken, getUserReviews);
router.delete("/review/delete/:id", verifyToken, deleteUserReview);
router.post("/like", verifyToken, likeProduct);
router.delete("/dislike/:id,:email", verifyToken, dislikeProduct);
router.get("/findLiked/:id,:email", verifyToken, isLiked);
router.post("/getUserLikes/:email", verifyToken, getUserLikes);
router.post("/addToCart", verifyToken, addToCart);
router.get("/getCartItems/:email", verifyToken, getCartItems);


export default router;
