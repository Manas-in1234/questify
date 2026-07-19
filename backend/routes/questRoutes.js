import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createQuest,
  getQuests,
  getQuest,
  updateQuest,
  deleteQuest,
  completeQuest,
} from "../controllers/questController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createQuest);
router.get("/", getQuests);
router.get("/:id", getQuest);
router.put("/:id", updateQuest);
router.delete("/:id", deleteQuest);
router.patch("/:id/complete", completeQuest);

export default router;