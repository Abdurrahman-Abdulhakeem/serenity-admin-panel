"use client";

import { useGetStaffQuery } from "@/redux/features/staffApi";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboardApi";

import {
  // TrendingUp,
  // TrendingDown,
  Users,
  CalendarHeart,
  HeartPulse,
} from "lucide-react";
import BreakdownCard from "../components/dashboard/Breakdown";
import StatCard from "../components/dashboard/StatCard";

const DashboardPage = () => {
  const { data: staff } = useGetStaffQuery({});
  const { data, isLoading } = useGetDashboardStatsQuery();

  const totalAppointments = data?.appointments.total;
  const totalPatients = data?.patients.total;
  const totalDoctors = data?.doctors.total;
  // const nursesCount = staff?.docs.filter((s) => s.role === 'nurse').length;

  const appointmentBreakdown = data?.appointments.breakdown || {};
  const patientBreakdown = data?.patients.breakdown || {};

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Staff"
          value={staff?.docs.length}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Doctors"
          value={totalDoctors}
          icon={<HeartPulse className="w-5 h-5" />}
        />
        <StatCard
          label="Patients"
          value={totalPatients}
          icon={<CalendarHeart className="w-5 h-5" />}
        />
        <StatCard
          label="Appointments"
          value={totalAppointments}
          icon={<CalendarHeart className="w-5 h-5" />}
          change="↑ 12%"
          type="up"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BreakdownCard
          title="Appointments Status"
          data={appointmentBreakdown}
          total={totalAppointments || 0}
          colors={[
            "bg-yellow-600",
            "bg-red-500",
            "bg-blue-600",
            "bg-green-600",
          ]}
          loading={isLoading}
          order={["pending", "cancelled", "approved", "completed"]}
        />
        <BreakdownCard
          title="Patients by Gender"
          data={patientBreakdown}
          total={totalPatients || 0}
          colors={["bg-blue-600", "bg-pink-500", "bg-pink-300"]}
          loading={isLoading}
          order={["male", "female"]}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {" "}
            {/* Age Range here */}
            {Object.entries(appointmentBreakdown).map(([status, count]) => (
              <StatusTag
                key={status}
                label={status}
                count={count}
                color={
                  appointmentStatusColors[status] || "text-gray-600 bg-gray-100"
                }
              />
            ))}
            {Object.entries(appointmentBreakdown).map(([status, count]) => (
              <StatusTag
                key={status}
                label={status}
                count={count}
                color={
                  appointmentStatusColors[status] || "text-gray-600 bg-gray-100"
                }
              />
            ))}
          </div>
        </BreakdownCard>
      </div>
    </div>
  );
};

export default DashboardPage;

const StatusTag = ({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) => (
  <div
    className={`flex justify-between py-2 px-4 rounded-lg ${color} bg-opacity-10`}
  >
    <span className="capitalize font-medium">{label}</span>
    <span className="font-bold">{count}</span>
  </div>
);

const appointmentStatusColors: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-100",
  completed: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100",
  approved: "text-blue-600 bg-blue-100",
};
