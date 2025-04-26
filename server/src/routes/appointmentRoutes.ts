import { Router } from "express";
import { authorize, protect } from "../controllers/authController";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentController";

const router = Router();

router.use(protect);

router.post("/", createAppointment);

router.use(authorize("admin", "staff"));
router.get("/", getAppointments);
router.route("/:id").put(updateAppointment).delete(deleteAppointment);

export default router;
