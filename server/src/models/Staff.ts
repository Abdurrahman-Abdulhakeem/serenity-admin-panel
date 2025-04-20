import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
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

export default mongoose.model('Staff', staffSchema);
