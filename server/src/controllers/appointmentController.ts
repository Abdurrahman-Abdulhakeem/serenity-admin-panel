import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import Appointment from "../models/Appointment";
import { AppError } from "../utils/appError";

// @desc    Create appointment
// @route   POST /api/appointments
export const createAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const { patientName, reason, date } = req.body;

    const appointment = await Appointment.create({
      patientName,
      reason,
      date,
      createdBy: req.user?._id,
    });

    res.status(201).json(appointment);
  }
);

// @desc    get all appointments with search + pagination
// @route   GET /api/appointments
export const getAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const keyword = (req.query.keyword as string) || "";
    const status = req.query.status || "";
    const pageSize = 10;

    const query = {
      patientName: { $regex: keyword, $options: "i" },
      ...(status ? { status } : {}),
    };

    const count = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("createdBy", "name email role");

    res.status(200).json({
      appointments,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });
  }
);

export const updateAppointment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return next(new AppError("Appointment not found", 404));
    }

    res.status(200).json(appointment);
  }
);

export const deleteAppointment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted" });
  }
);
