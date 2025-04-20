import { Request, Response } from 'express';
import Staff from '../models/Staff';
import { catchAsync } from '../utils/catchAsync';

export const getAllStaff = catchAsync(async (req: Request, res: Response) => {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);

});

export const createStaff = catchAsync(async (req: Request, res: Response) => {

    const { name, email, role, department, phone, address } = req.body;
    const newStaff = new Staff({ name, email, role, department, phone, address });
    await newStaff.save();
    res.status(201).json(newStaff);

});

export const updateStaff =catchAsync(async (req: Request, res: Response) => {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);

});

export const deleteStaff = catchAsync(async (req: Request, res: Response) => {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff deleted' });

});
