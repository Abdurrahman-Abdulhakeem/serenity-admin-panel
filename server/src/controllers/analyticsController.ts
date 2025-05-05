import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Patient from '../models/Patient';
import Staff from '../models/Staff';
import { catchAsync } from '../utils/catchAsync';

export const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
 
    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const patientGenderStats = await Patient.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalDoctors = await Staff.countDocuments({ role: 'doctor' });

    const appointments = {
      total: appointmentStats.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0),
      breakdown: appointmentStats.reduce((acc: Record<string, number>, curr: { _id: string; count: number }) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {} as Record<string, number>)
    };

    const patients = {
      total: patientGenderStats.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0),
      breakdown: patientGenderStats.reduce((acc: Record<string, number>, curr: { _id: string; count: number }) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {} as Record<string, number>)
    };

    res.status(200).json({
      appointments,
      patients,
      doctors: {
        total: totalDoctors
      }
    });

});
