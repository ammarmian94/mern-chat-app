import express from "express";
import {
  accessChats,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/Chat.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", Protect, accessChats);
router.get("/", Protect, fetchChats);
router.post("/group", Protect, createGroupChat);
router.put("/rename", Protect, renameGroupChat);
router.put("/groupAdd", Protect, addToGroup);
router.put("/groupRemove", Protect, removeFromGroup);

export default router;
