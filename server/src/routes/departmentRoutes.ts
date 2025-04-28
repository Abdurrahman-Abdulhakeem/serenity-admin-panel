import express from "express";
import { authorize, protect } from "../controllers/authController";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../controllers/departmentController";

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Admin only routes
router
  .route("/")
  .post(authorize("admin"), createDepartment)
  .get(getDepartments);

router
  .route("/:id")
  .put(authorize("admin"), updateDepartment)
  .delete(authorize("admin"), deleteDepartment);

export default router;
