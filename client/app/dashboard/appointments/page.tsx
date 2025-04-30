"use client";

import { useState } from "react";

import {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "@/redux/features/appointmentApi";

import { Appointment } from "@/types/appointment";

import StatusBadge from "@/app/components/appointments/StatusBadge";
import Pagination from "@/app/components/Pagination";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import DeleteModal from "@/app/components/customModals/DeleteModal";
import CalendarView from "@/app/components/appointments/CalendarView";
import AppointmentStatus from "@/app/components/appointments/AppointmentStatus";
import ReusableModal from "@/app/components/customModals/ReusableModal";

export default function AppointmentsPage() {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDelModal, setOpenDelModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const { data, isLoading } = useGetAppointmentsQuery({
    page,
    keyword,
    status,
  });

  const [createAppointment, { isLoading: creating }] =
    useCreateAppointmentMutation();
  const [updateStatus, { isLoading: updating }] =
    useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Button onClick={() => setOpenModal(true)} className="rounded">
          + New Appointment
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-full max-w-xs"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <AppointmentStatus status={status} setStatus={setStatus} />
      </div>

      <div className="bg-card rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-left">
              <th className="px-4 py-2">Patient</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data?.docs.map((appt: Appointment) => (
                <tr key={appt._id} className="border-t">
                  <td className="px-4 py-2">{appt.patientName}</td>
                  <td>{appt.reason}</td>
                  <td>{new Date(appt.date).toLocaleString()}</td>
                  <td>
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="flex items-center space-x-2 py-2">
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setOpenModal(true);
                        setSelected(appt);
                      }}
                      className={"text-primary underline"}
                    >
                      Edit Status
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setOpenDelModal(true);
                        setSelected(appt);
                      }}
                      className={"text-destructive underline"}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data && (
        <Pagination
          isLoading={isLoading}
          page={page}
          totalPages={data.totalPages || 1}
          setPage={setPage}
        />
      )}

      {openModal && (
        <ReusableModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelected(null);
          }}
          type="appointment"
          initialData={selected}
          onSubmit={async (data) => {
            if (selected?._id) {
              if ("status" in data && data.status) {
                await updateStatus({ id: selected._id, status: data.status });
              }
            } else {
              await createAppointment(data);
            }
          }}
          loading={creating || updating}
        />
      )}

      <DeleteModal
        isOpen={openDelModal}
        onClose={() => setOpenDelModal(false)}
        data={selected}
        onDelete={(id) => deleteAppointment(id).unwrap()}
      />

      <CalendarView />
    </div>
  );
}
