export interface Appointment {
  _id: string;
  patientName: string;
  reason: string;
  createdAt?: string;
  updatedAt?: string;
  date: string;
  status: "pending" | "approved" | "completed" | "cancelled";
}

export interface AppointmentResponse {
  docs: Appointment[];
  status: string;
  result: number;
  totalPages: number;
}
