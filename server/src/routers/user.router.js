import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
} from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/user.middleware.js";
import { roles } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.get("/me", protectRoute, getUser);

export default router;
