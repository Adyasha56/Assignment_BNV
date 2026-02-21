import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  exportCSV
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.route("/")
  .post(protect, upload.single("profileImage"), createUser)
  .get(protect, getUsers);

router.get("/export", protect, exportCSV);

router.route("/:id")
  .put(protect, upload.single("profileImage"), updateUser)
  .get(protect, getUserById)
  .delete(protect, deleteUser);

export default router;