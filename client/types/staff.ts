export interface Staff {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

export interface StaffResponse {
  docs: Staff[];
  status: string;
  result: number;
  totalPages: number;
}
