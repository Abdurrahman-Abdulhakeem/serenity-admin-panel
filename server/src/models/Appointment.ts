import mongoose, { Types } from "mongoose";

export interface IAppointment extends mongoose.Document {
    patientName: string;
    reason: string;
    date: Date;
    status: string;
    createdBy: Types.ObjectId;
}

const appointmentSchema = new mongoose.Schema<IAppointment>({
  patientName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "cancelled"],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},

{ timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema)