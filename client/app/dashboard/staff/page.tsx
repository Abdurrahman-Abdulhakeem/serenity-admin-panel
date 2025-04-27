"use client";

import DeleteModal from "@/app/components/customModals/DeleteModal";
import EditStaffModal from "@/app/components/customModals/EditStaffModal";
import Pagination from "@/app/components/Pagination";
import {
  useAddStaffMutation,
  useDeleteStaffMutation,
  useGetStaffQuery,
} from "@/redux/features/staffApi";
import { Staff } from "@/types/staff";
import { useState } from "react";

export default function StaffPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<Staff | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { data: staff, isLoading } = useGetStaffQuery({ page, keyword });
  const [addStaff] = useAddStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "nurse",
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addStaff(form);
    setForm({ name: "", email: "", department: "", role: "nurse" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Staff Management</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search staff..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-ring dark:border-border focus:outline-none  focus:ring-2 focus:ring-ring focus:border-transparent p-2 rounded w-1/3 mr-4 "
        />
      </div>

      <form onSubmit={handleAdd} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-ring dark:border-border p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-ring dark:border-border p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border border-ring dark:border-border p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border border-ring dark:border-border mr-2 rounded px-5 py-[9px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent dark:text-foreground"
        >
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="admin">Admin</option>
          <option value="lab">Lab</option>
        </select>
        <input
          type="submit"
          value="Add Staff"
          className="bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer"
        />
      </form>

      <table className="min-w-full bg-card rounded shadow-sm">
        <thead>
          <tr className="text-left bg-accent text-accent-foreground">
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            staff?.docs.map((person) => (
              <tr key={person._id} className="border-t border-border">
                <td className="p-4">{person.name}</td>
                <td>{person.email}</td>
                <td>{person.department}</td>
                <td>{person.role}</td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setSelected(person);
                      setEditModalOpen(true);
                    }}
                    className="text-primary hover:underline mr-4 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelected(person);
                      setDeleteModalOpen(true);
                    }}
                    className="text-destructive hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <Pagination
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalPages={staff?.totalPages ?? 1}
        />
      </div>

      <EditStaffModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        staff={selected}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        data={selected}
        onDelete={(id) => deleteStaff(id).unwrap()}
      />
    </div>
  );
}
