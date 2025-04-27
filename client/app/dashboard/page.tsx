'use client';

import { useGetStaffQuery } from "@/redux/features/staffApi"

export default function DashboardPage() {
  const { data: staff } = useGetStaffQuery({});
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Staff</h3>
            <p className="text-3xl font-bold">{staff?.docs.length || ""}</p>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Doctors</h3>
            <p className="text-3xl font-bold">14</p>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Nurses</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
      </div>
    );
  }
  