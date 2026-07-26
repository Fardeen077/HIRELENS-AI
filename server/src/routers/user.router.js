import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    updateProfile,
} from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/user.middleware.js";
import { roles } from "../middleware/role.middleware.js";
import { uploadImage } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.get("/me", protectRoute, getUser);
router.patch("/update-profile", protectRoute, uploadImage.single("profilePic"), updateProfile)

export default router;
