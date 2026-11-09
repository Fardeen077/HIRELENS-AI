import { Router } from "express";
import {
    uploadResume,
    getMyResumes,
    deleteResume,
    getAllResumes,
    analysisResume,
    getResumeById
} from "../controllers/resume.controller.js"
import { protectRoute } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { roles } from "../middleware/role.middleware.js";

const router = Router();
router.post("/upload", protectRoute, upload.single("resume"), uploadResume);
router.post("/analysis", protectRoute, analysisResume);
router.get("/getresume/:userId", protectRoute, getMyResumes);
router.get("/getall", protectRoute, roles("ADMIN"), getAllResumes)
router.get("/getsingleresume/:id", protectRoute, getResumeById)
router.delete("/:resumeId", protectRoute, deleteResume)

export default router