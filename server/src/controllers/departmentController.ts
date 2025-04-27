import Department from "../models/Department";
import * as factory from "./controllerFactory";

// @desc    Create department
// @route   POST /api/departments
export const createDepartment = factory.createOne(Department);
// @desc    Get all departments with search + pagination
// @route   GET /api/departments
export const getDepartments = factory.getAll(Department, ["name"]);
// @desc    Update department
// @route   PUT /api/departments/:id
export const updateDepartment = factory.updateOne(Department);
// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment = factory.deleteOne(Department);
