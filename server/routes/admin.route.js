import express from "express";
import {deleteUser, getUsers, searchUsers} from "../controllers/admin.controller.js";
import { verifyAdmin, verifyToken } from "../utils.js";

const router = express.Router();

router.post("/getUsers", verifyToken, verifyAdmin, getUsers);

router.post("/user/search/:text", verifyToken, verifyAdmin, searchUsers);
router.delete("/user/delete/:email", verifyToken, verifyAdmin, deleteUser);

export default router;