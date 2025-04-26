"use client";

import Modal from "./BaseModal";
import { Staff } from "@/types/staff";
import { Department } from "@/types/department";
import { Appointment } from "@/types/appointment";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Department | Staff | Appointment | null;
  onDelete: (id: string) => Promise<void>;
}

export default function DeleteModal({
  isOpen,
  onClose,
  data,
  onDelete,
}: Props) {
  const handleDelete = async () => {
    if (!data || !data._id) return;
    await onDelete(data._id);
    onClose();
  };

  const getDisplayName = () => {
    if (!data) return "";
    if ("name" in data && data.name) return data.name;
    if ("patientName" in data && data.patientName)
      return `${data.patientName}'s appointment`;
    return "";
  };

  if (!isOpen || !data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold pb-4">
        Are you sure you want to delete{" "}
        <span className="font-bold">{getDisplayName()}</span>
      </h2>

      <div className="flex justify-between">
        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-destructive text-white px-4 py-2 rounded cursor-pointer hover:bg-destructive/70"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
