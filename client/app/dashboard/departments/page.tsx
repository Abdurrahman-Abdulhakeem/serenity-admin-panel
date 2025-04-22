'use client';

import DepartmentList from "@/app/components/departments/DepartmentList";


export default function DepartmentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>
      <DepartmentList />
    </main>
  );
}
