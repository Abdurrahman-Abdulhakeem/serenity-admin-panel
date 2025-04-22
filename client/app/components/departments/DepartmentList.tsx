import { useCreateDepartmentMutation, useDeleteDepartmentMutation, useGetDepartmentsQuery, useUpdateDepartmentMutation } from "@/redux/features/departmentApi"
import { Department } from "@/types/department";
import { useState } from "react";
import DepartmentModal from "./DepartmentModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DepartmentRow from "./DepartmentRow";

export default function DepartmentList() {
    const [ page, setPage ] = useState<number>(1);
    const [ keyword, setKeyword ] = useState<string>('');
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ selected, setSelected ] = useState<Department | null>(null);

    const { data, isLoading } = useGetDepartmentsQuery({ page, keyword });
    const [ createDepartment ] = useCreateDepartmentMutation();
    const [ updateDepartment ] = useUpdateDepartmentMutation();
    const [ deleteDepartment ] = useDeleteDepartmentMutation();
    
    const handleSave = async (values:{ name: string }) => {
        if (selected) {
            await updateDepartment({ id: selected._id, data: values });
        }else {
            await createDepartment(values);
        }
        setModalOpen(false);
        setSelected(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you wat to delete this department?")) {
            await deleteDepartment(id)
        }
    };


  return (
    <div className="p-4 space-y-4">
    <div className="flex justify-between gap-4 items-center">
      <Input placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button onClick={() => setModalOpen(true)}>Add Department</Button>
    </div>

    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="bg-card rounded shadow-md divide-y">
        {data?.departments?.map((dep) => (
          <DepartmentRow
            key={dep._id}
            department={dep}
            onEdit={(d) => {
              setSelected(d);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    )}

    <div className="flex justify-center items-center space-x-2">
      <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</Button>
      <span>Page {page}</span>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>

    <DepartmentModal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setSelected(null);
      }}
      onSave={handleSave}
      initialData={selected}
    />
  </div>
  )
}
