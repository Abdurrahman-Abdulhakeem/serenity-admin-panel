import mongoose from 'mongoose';

export interface IPatient extends mongoose.Document {
    name: string;
    gender: 'male' | 'female' | 'other';
    dob: Date;
    phone: string;
    email: string;
    address: string;
    emergencyContact: {
        name: string;
        phone: string;
    };
    status: 'active' | 'discharged' | 'deceased';
}

const patientSchema = new mongoose.Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    address: {
        type: String,
        required: true,
      },
      emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
      },
    status: {
      type: String,
      enum: ['active', 'discharged', 'deceased'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPatient>('Patient', patientSchema);
