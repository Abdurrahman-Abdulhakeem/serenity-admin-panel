import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "@/redux/features/departmentApi";
import { Department } from "@/types/department";
import { useState } from "react";
import DepartmentModal from "./DepartmentModal";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import DepartmentRow from "./DepartmentRow";
import DeleteModal from "../customModals/DeleteModal";
import Pagination from "../Pagination";

export default function DepartmentList() {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Department | null>(null);

  const { data, isLoading } = useGetDepartmentsQuery({ page, keyword });
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleSave = async (values: { name: string }) => {
    if (selected) {
      await updateDepartment({ id: selected._id, data: values });
    } else {
      await createDepartment(values);
    }
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between gap-4 items-center">
        <Input
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={() => setModalOpen(true)}>Add Department</Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-card rounded shadow-md divide-y">
          {data?.docs.map((dep) => (
            <DepartmentRow
              key={dep._id}
              department={dep}
              onEdit={(d) => {
                setSelected(d);
                setModalOpen(true);
              }}
              onConfirmDelete={(d) => {
                setSelected(d);
                setDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <Pagination
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages ?? 1}
      />

      <DepartmentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        onSave={handleSave}
        initialData={selected}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelected(null);
        }}
        data={selected}
        onDelete={(id) => deleteDepartment(id).unwrap()}
      />
    </div>
  );
}
