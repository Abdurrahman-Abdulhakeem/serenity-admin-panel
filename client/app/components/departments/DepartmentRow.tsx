"use client";

import { Button } from "@/app/components/ui/button";
import { Department } from "@/types/department";

interface Props {
  department: Department;
  onEdit: (data: Department) => void;
  onConfirmDelete: (data: Department) => void;
}

export default function DepartmentRow({
  department,
  onEdit,
  onConfirmDelete,
}: Props) {
  return (
    <div className="flex justify-between items-center border-b py-2 px-4">
      <div>{department.name}</div>
      <div className="space-x-2">
        <Button variant="outline" onClick={() => onEdit(department)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onConfirmDelete(department)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
