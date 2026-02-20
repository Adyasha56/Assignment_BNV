import { protect } from "../middlewares/auth.middleware.js";

router.post("/logout", protect, logoutAdmin);