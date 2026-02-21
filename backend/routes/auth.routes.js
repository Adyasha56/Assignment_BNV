import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", protect, logoutAdmin);

export default router;