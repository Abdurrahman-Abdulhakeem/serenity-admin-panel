import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>("Department", departmentSchema);
