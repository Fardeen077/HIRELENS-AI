import { Router } from "express";
import {
    uploadResume,
    getMyResumes,
    deleteResume,
} from "../controllers/resume.controller.js"
import { protectRoute } from "../middleware/user.middleware";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.post("/upload", protectRoute, upload.single("resume"), uploadResume);
router.get("/getresume", protectRoute, getMyResumes);
router.delete("/:resumeId", protectRoute, deleteResume)
export default router