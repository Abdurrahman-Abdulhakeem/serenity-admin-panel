"use client";

import DeleteModal from "@/app/components/modals/DeleteModal";
import EditStaffModal from "@/app/components/modals/EditStaffModal";
import {
  useAddStaffMutation,
  useGetStaffQuery,
} from "@/redux/features/staffApi";
import { Staff } from "@/redux/features/slices/staffSlice";
import { useState } from "react";

export default function StaffPage() {
  const { data: staff = [], isLoading } = useGetStaffQuery();
  const [addStaff] = useAddStaffMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "nurse",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Staff | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const itemsPerPage = 5;
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3 mr-4"
        />
      </div>

      <form onSubmit={handleAdd} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 mr-2 rounded"
        >
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="admin">Admin</option>
          <option value="lab">Lab</option>
        </select>
        <input
          type="submit"
          value="Add Staff"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        />
      </form>

      <table className="min-w-full bg-white rounded shadow-sm">
        <thead>
          <tr className="text-left bg-gray-100">
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
            paginated.map((person) => (
              <tr key={person._id} className="border-t border-t-black/25">
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
                    className="text-blue-600 hover:underline mr-4 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelected(person);
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:underline cursor-pointer"
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
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <EditStaffModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        staff={selected}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        staff={selected}
      />
    </div>
  );
}
