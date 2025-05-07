"use client";

import { useGetStaffQuery } from "@/redux/features/staffApi";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboardApi";

import { Users, CalendarHeart, HeartPulse } from "lucide-react";
import BreakdownCard from "../components/dashboard/Breakdown";
import StatCard from "../components/dashboard/StatCard";

const DashboardPage = () => {
  const { data: staff } = useGetStaffQuery({});
  const { data, isLoading } = useGetDashboardStatsQuery();

  const totalAppointments = data?.appointments.total;
  const totalPatients = data?.patients.total;
  const totalDoctors = data?.doctors.total;

  const appointmentBreakdown = data?.appointments.breakdown || {};
  const patientBreakdown = data?.patients.breakdown || {};
  const ageAnalytics = data?.ageAnalytics || {};

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
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
          <div>
            {" "}
            {/* Age Range here */}
            <h3 className="mb-3">Age Range</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(ageAnalytics).map(([range, count]) => (
                <StatusTag
                  key={range}
                  label={range}
                  count={count}
                  color="bg-muted text-muted-foreground"
                />
              ))}
            </div>
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
  <div className={`flex justify-between py-2 px-4 rounded-lg ${color}`}>
    <span className="capitalize font-medium mr-1">{label}</span>
    <span className="font-bold">{`(${count})`}</span>
  </div>
);
