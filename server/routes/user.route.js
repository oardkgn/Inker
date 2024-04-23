import express from "express";
import { update } from "../controllers/user.controller.js";
import { verifyToken } from "../utils.js";


const router = express.Router();

router.put("/update/:id", verifyToken, update);

export default router;