import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController";
import { protect } from "../controllers/authController";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllStaff).post(createStaff);
router.route("/:id").put(updateStaff).delete(deleteStaff);

export default router;
