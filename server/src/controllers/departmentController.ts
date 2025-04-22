import { Request, Response, NextFunction } from "express";
import Department from "../models/Department";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

// @desc    Create department
// @route   POST /api/departments
export const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const department = await Department.create({ name });
    res.status(201).json(department);

});

// @desc    Get all departments with search + pagination
// @route   GET /api/departments
export const getDepartments = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const keyword = (req.query.keyword as string) || "";
    const pageSize = 5;

    const query = {
      name: { $regex: keyword, $options: "i" },
    };

    const count = await Department.countDocuments(query);
    const departments = await Department.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      departments,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });

});

// @desc    Update department
// @route   PUT /api/departments/:id
export const updateDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!department) {
      return next(new AppError("Department not found", 404));
    }

    res.status(200).json(department);

});

// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
        return next(new AppError('{ message: "Department not found" }', 404));
    }

    res.status(200).json({ message: "Department deleted" });

});
