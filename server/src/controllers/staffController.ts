import Staff from "../models/Staff";
import * as factory from "./controllerFactory";

// @desc    Get all staffs with search + pagination
// @route   GET /api/staffs
export const getAllStaff = factory.getAll(Staff, [
  "name",
  "email",
  "role",
  "department",
]);
// @desc    Create staff
// @route   POST /api/staffs
export const createStaff = factory.createOne(Staff);
// @desc    Update staff
// @route   PUT /api/staffs/:id
export const updateStaff = factory.updateOne(Staff);
// @desc    Delete staff
// @route   DELETE /api/staffs/:id
export const deleteStaff = factory.deleteOne(Staff);
