"use client";

import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentStatusMutation,
} from "@/redux/features/appointmentApi";
import { Appointment } from "@/types/appointment";

interface Props {
  editData: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ editData, isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    patientName: editData?.patientName || "",
    reason: editData?.reason || "",
    date: editData?.date?.slice(0, 16) || "", // Format for datetime-local
    status: editData?.status || "pending",
  });

  const [createAppointment, { isLoading: creating }] =
    useCreateAppointmentMutation();
  const [updateStatus, { isLoading: updating }] =
    useUpdateAppointmentStatusMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editData) {
      await updateStatus({ id: editData._id, status: form.status });
    } else {
      await createAppointment(form);
    }

    onClose();
  };

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-bold">
                      {editData
                        ? "Update Appointment Status"
                        : "New Appointment"}
                    </Dialog.Title>
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer text-gray-500"
                      onClick={onClose}
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!editData && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Patient Name
                          </label>
                          <input
                            name="patientName"
                            value={form.patientName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded border px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Reason
                          </label>
                          <input
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded border px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <input
                            name="date"
                            type="datetime-local"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded border px-3 py-2"
                          />
                        </div>
                      </>
                    )}

                    {editData && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          className="mt-1 w-full rounded border px-3 py-2"
                        >
                          {[
                            "pending",
                            "approved",
                            "completed",
                            "cancelled",
                          ].map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={creating || updating}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                      >
                        {editData
                          ? updating
                            ? "Updating..."
                            : "Update"
                          : creating
                          ? "Creating..."
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
    </>
  );
}
