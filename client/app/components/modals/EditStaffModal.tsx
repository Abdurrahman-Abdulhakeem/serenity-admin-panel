"use client";

import { useUpdateStaffMutation } from "@/redux/features/staffApi";
import { Staff } from "@/redux/features/slices/staffSlice";
import { useEffect, useState } from "react";
import Modal from "./BaseModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

export default function EditStaffModal({ isOpen, onClose, staff }: Props) {
  const [updateStaff] = useUpdateStaffMutation();
  const [form, setForm] = useState<Partial<Staff>>(staff || {});

  // Update the form state when staff data changes
  useEffect(() => {
    if (staff) {
      setForm(staff);
    }
  }, [staff]);

  const handleUpdate = async () => {
    if (staff?._id) {
      await updateStaff({ id: staff._id, data: form });
      onClose();
    }
  };

  if (!isOpen || !staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Edit Staff</h3>

      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Email"
        value={form.email || ""}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Department"
        value={form.department || ""}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <select
        className="w-full mb-4 p-2 border rounded"
        value={form.role || "nurse"}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="doctor">Doctor</option>
        <option value="nurse">Nurse</option>
        <option value="admin">Admin</option>
        <option value="lab">Lab</option>
      </select>

      <div className="flex justify-between">
        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </Modal>
  );
}
