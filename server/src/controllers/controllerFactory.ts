import { NextFunction, Request, Response } from "express";
import { Model, Document, PopulateOptions } from "mongoose";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

type DocType = Document & { _id: any };

export const deleteOne = <T extends DocType>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No Document found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Document deleted!",
    });
  });

export const createOne = <T extends DocType>(
  Model: Model<T>,
  options?: { createdBy: boolean }
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let data = { ...req.body };

    if (options?.createdBy) {
      data = { ...req.body, createdBy: req.user?._id };
    }

    const doc = await Model.create(data);

    res.status(201).json({
      status: "success",
      message: "New Document Created!",
      doc,
    });
  });

export const updateOne = <T extends DocType>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No Document found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Document updated!",
    });
  });

export const getOne = <T extends DocType>(
  Model: Model<T>,
  popOptions?: PopulateOptions
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No Document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Document updated!",
    });
  });

export const getAll = <T extends DocType>(
  Model: Model<T>,
  searchFields?: string[],
  PopulateOptions?:
    | { path: string; select?: string }
    | { path: string; select?: string }[]
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const keyword = (req.query.keyword as string) || "";
    const status = (req.query.status as string) || "";
    const limit = parseInt(req.query.limit as string) || 10;

    // Build query dynamically
    const query: any = {};

    if (keyword) {
      if (searchFields && searchFields.length > 1) {
        // If multiple search fields
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: keyword, $options: "i" },
        }));
      } else if (searchFields && searchFields.length === 1) {
        // If only one search fields
        query[searchFields[0]] = { $regex: keyword, $options: "i" };
      }
    }

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    const count = await Model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    let mongoQuery = Model.find(query);

    // If populate options provided
    if (PopulateOptions) {
      mongoQuery = mongoQuery.populate(PopulateOptions);
    }

    const features = new APIFeatures(mongoQuery, req.query)
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: "success",
      result: docs.length,
      totalPages,
      docs,
    });
  });
