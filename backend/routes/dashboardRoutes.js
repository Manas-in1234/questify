import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

// Protect dashboard route
router.use(authMiddleware);

// GET /api/dashboard
router.get("/", getDashboard);

export default router;