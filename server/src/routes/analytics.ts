import { Router } from "express";
import { getDashboardStats } from "../controllers/analyticsController";

const router = Router();

router.get("/dashboard", getDashboardStats);

export default router;
