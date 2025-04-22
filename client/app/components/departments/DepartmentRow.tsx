'use client';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/department';

interface Props {
    department: Department;
    onEdit: (data: Department) => void;
    onDelete: (id: string) => void;

}

export default function DepartmentRow({ department, onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-between items-center border-b py-2 px-4">
      <div>{department.name}</div>
      <div className="space-x-2">
        <Button variant="outline" onClick={() => onEdit(department)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(department._id)}>Delete</Button>
      </div>
    </div>
  );
}
