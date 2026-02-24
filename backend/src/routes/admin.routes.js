import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { adminStats, getAdminData } from "../controllers/admin.controller.js";
import { listUsers } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/dashboard", protect, authorize("admin"), getAdminData)
router.get('/', protect, authorize("admin"), listUsers)

router.get('/stats', protect, authorize("admin"), adminStats)

export default router