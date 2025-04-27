import Appointment from "../models/Appointment";
import * as factory from "./controllerFactory";

// @desc    Create appointment
// @route   POST /api/appointments
export const createAppointment = factory.createOne(Appointment, {
  createdBy: true,
});
// @desc    get all appointments with search + pagination
// @route   GET /api/appointments
export const getAppointments = factory.getAll(Appointment, ["patientName"], {
  path: "createdBy",
  select: "name email role",
});
// @desc    Update appointments
// @route   PUT /api/appointments/:id
export const updateAppointment = factory.updateOne(Appointment);
// @desc    Delete appointments
// @route   DELETE /api/appointments/:id
export const deleteAppointment = factory.deleteOne(Appointment);
