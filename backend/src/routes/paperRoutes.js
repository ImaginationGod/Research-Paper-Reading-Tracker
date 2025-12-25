import { Router } from "express";
import {
    createPaper,
    getPapers,
    getAnalytics,
} from "../controllers/paperController.js";

const router = Router();

router.post("/", createPaper);
router.get("/", getPapers);
router.get("/analytics", getAnalytics);

export default router;
