export interface Department {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentResponse {
  docs: Department[];
  status: string;
  result: number;
  totalPages: number;
}
