import Patient from "../models/Patient";
import * as factory from "./controllerFactory";

// @desc    Create department
// @route   POST /api/departments
export const createPatient = factory.createOne(Patient);
// @desc    Get all patients with search + pagination
// @route   GET /api/patients
export const getPatients = factory.getAll(Patient, ["name", "gender"]);
// @desc    Get patient
// @route   GET /api/patients/:id
export const getPatient = factory.getOne(Patient);
// @desc    Update patient
// @route   PUT /api/patients/:id
export const updatePatient = factory.updateOne(Patient);
// @desc    Delete patient
// @route   DELETE /api/patients/:id
export const deletePatient = factory.deleteOne(Patient);
