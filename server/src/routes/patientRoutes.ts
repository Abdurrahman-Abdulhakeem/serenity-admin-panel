import express from "express";
import { authorize, protect } from "../controllers/authController";
import {
  createPatient,
  deletePatient,
  getPatients,
  getPatient,
  updatePatient,
} from "../controllers/patientController";

const router = express.Router();

// All routes below require authentication
router.use(protect);

router.route("/").post(authorize("admin"), createPatient).get(getPatients);

router
  .route("/:id")
  .get(getPatient)
  .put(authorize("admin"), updatePatient)
  .delete(authorize("admin"), deletePatient);

export default router;
