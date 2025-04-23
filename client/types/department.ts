export interface Department {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentResponse {
  departments: Department[];
  currentPage: number;
  totalPages: number;
};