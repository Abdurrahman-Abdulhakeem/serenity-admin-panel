"use client";

import { useDeleteStaffMutation } from "@/redux/features/staffApi";
import Modal from "./BaseModal";
import { Staff } from "@/redux/features/slices/staffSlice";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

export default function DeleteModal({ isOpen, onClose, staff }: Props) {
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDelete = async (id: string) => {
    await deleteStaff(id);
    onClose();
  };

  if (!isOpen || !staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold pb-4">
        Are you sure you want to delete {staff.name}
      </h2>

      <div className="flex justify-between">
        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
        <button
          onClick={() => handleDelete(staff._id)}
          className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
