import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import Patient from "../models/Patient";
import Staff from "../models/Staff";
import { catchAsync } from "../utils/catchAsync";

export const getDashboardStats = catchAsync(
  async (req: Request, res: Response) => {
    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const patientGenderStats = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalDoctors = await Staff.countDocuments({ role: "doctor" });

    const appointments = {
      total: appointmentStats.reduce(
        (acc: number, curr: { count: number }) => acc + curr.count,
        0
      ),
      breakdown: appointmentStats.reduce(
        (acc: Record<string, number>, curr: { _id: string; count: number }) => {
          acc[curr._id] = curr.count;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    const patients = {
      total: patientGenderStats.reduce(
        (acc: number, curr: { count: number }) => acc + curr.count,
        0
      ),
      breakdown: patientGenderStats.reduce(
        (acc: Record<string, number>, curr: { _id: string; count: number }) => {
          acc[curr._id] = curr.count;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    // Age Range....
    const now = new Date();

    // Age range buckets (in years)
    const ageRangeStats = await Patient.aggregate([
      {
        $addFields: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [now, "$dob"] },
                1000 * 60 * 60 * 24 * 365, // Convert milliseconds to years
              ],
            },
          },
        },
      },
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [0, 13, 20, 36, 61, 200],
          default: "Unknown",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    const ageRanges: Record<string | number, string> = {
      0: "0-12",
      13: "13-19",
      20: "20-35",
      36: "36-60",
      61: "60+",
      Unknown: "Unknown",
    };

    const ageAnalytics = ageRangeStats.reduce(
      (
        acc: Record<string, number>,
        curr: { _id: number | string; count: number }
      ) => {
        const label = ageRanges[curr._id] || "Unknown";
        acc[label] = curr.count;
        return acc;
      },
      {}
    );

    res.status(200).json({
      appointments,
      patients,
      doctors: {
        total: totalDoctors,
      },
      ageAnalytics,
    });
  }
);
