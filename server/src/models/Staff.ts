import mongoose from 'mongoose';

export interface IStaff extends mongoose.Document {
  name: string;
  email: string;
  role: "doctor" | "nurse" | "admin" | "lab" | "pharmacist";
  department: string;
  isActive: boolean;
  phone?: string;
  address?: string;
}

const staffSchema = new mongoose.Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['doctor', 'nurse', 'admin', 'lab', 'pharmacist'],
      default: 'nurse',
    },
    department: {
      type: String,
      required: true,
    },
    phone: String,
    address: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStaff>('Staff', staffSchema);
