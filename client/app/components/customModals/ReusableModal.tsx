"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Dropdown from "../Dropdown";
import { Staff } from "@/types/staff";
import { Appointment } from "@/types/appointment";

type ModalType = "staff" | "appointment";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  initialData: Staff | Appointment | null; // Staff | Appointment.....
  onSubmit: (data: Partial<Staff | Appointment>) => Promise<void>;
  loading?: boolean;
}

export default function ReusableModal({
  isOpen,
  onClose,
  type,
  initialData,
  onSubmit,
  loading = false,
}: ReusableModalProps) {
  const [form, setForm] = useState<Partial<Staff> | Partial<Appointment>>(
    initialData || {}
  );

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    onClose();
  };

  const isStaffForm = (
    form: Partial<Staff> | Partial<Appointment>
  ): form is Partial<Staff> => type === "staff";

  const staffFields = isStaffForm(form) && (
    <>
      <input
        name="name"
        placeholder="Name"
        value={form.name || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="department"
        placeholder="Department"
        value={form.department || ""}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <Dropdown
        label="Role"
        options={["admin", "doctor", "nurse", "lab"]}
        value={form.role}
        onChange={(role) => setForm((prev) => ({ ...prev, role }))}
      />
    </>
  );

  const isAppointmentForm = (
    form: Partial<Staff> | Partial<Appointment>
  ): form is Partial<Appointment> => type === "appointment";

  const appointmentFields = isAppointmentForm(form) && (
    <>
      {!initialData?._id && (
        <>
          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="reason"
            placeholder="Reason"
            value={form.reason || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="date"
            type="datetime-local"
            value={form.date || ""}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
        </>
      )}
      {initialData?._id && (
        <Dropdown
          label="Status"
          options={["pending", "approved", "completed", "cancelled"]}
          value={form.status}
          onChange={(status) => setForm((prev) => ({ ...prev, status }))}
        />
      )}
    </>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-card p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-bold">
                    {type === "staff"
                      ? "Edit Staff"
                      : initialData?._id
                      ? "Update Appointment Status"
                      : "New Appointment"}
                  </Dialog.Title>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer text-card-foreground"
                    onClick={onClose}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  {type === "staff" ? staffFields : appointmentFields}

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
                    >
                      {loading
                        ? "Saving..."
                        : initialData?._id
                        ? "Update"
                        : "Create"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
