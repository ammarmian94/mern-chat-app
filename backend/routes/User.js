import express from "express";
import { getAllUsers } from "../controllers/User.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", Protect, getAllUsers);

export default router;
