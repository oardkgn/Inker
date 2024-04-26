import express from "express";
import { deleteUser, update } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();


router.put("/update/:email", verifyToken, update);
router.delete("/delete/:email", verifyToken, deleteUser);


export default router;
