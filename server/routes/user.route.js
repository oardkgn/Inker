import express from "express";
import { deleteUser, getUsers, update } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getUsers", verifyToken, verifyAdmin, getUsers);
router.put("/update/:email", verifyToken, update);
router.delete("/delete/:email", verifyToken, deleteUser);

export default router;
