"use client";

import Modal from "./BaseModal";
import { Staff } from "@/types/staff";
import { Department } from "@/types/department";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Department | Staff | null;
  onDelete: (id: string) => Promise<void>;
}

export default function DeleteModal({ isOpen, onClose, data, onDelete }: Props) {

  const handleDelete = async () => {
    if(!data || !data._id) return;
    await onDelete(data._id);
    onClose();
  };

  if (!isOpen || !data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold pb-4">
        Are you sure you want to delete <span className="font-bold"> {data.name} </span>
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
