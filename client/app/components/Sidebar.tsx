"use client";

import { handleLogout } from "@/lib/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUserMd,
  FaClipboardList,
  FaSignOutAlt,
  FaSitemap,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar text-sidebar-foreground shadow-md h-screen w-64 p-6 fixed">
      <h2 className="text-2xl tracking-tighter font-bold mb-10 text-primary">
        Serenity Admin
      </h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary ${
            pathname === "/dashboard" &&
            "bg-primary text-primary-foreground font-semibold"
          }`}
        >
          <FaClipboardList /> Dashboard
        </Link>
        <Link
          href="/dashboard/staff"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary ${
            pathname.startsWith("/dashboard/staff") &&
            "bg-primary text-primary-foreground font-semibold"
          }`}
        >
          <FaUserMd /> Manage Staff
        </Link>
        <Link
          href="/dashboard/departments"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary ${
            pathname.startsWith("/dashboard/departments") &&
            "bg-primary text-primary-foreground font-semibold"
          }`}
        >
          <FaSitemap /> Manage Departments
        </Link>
        <Link
          href="/dashboard/appointments"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary ${
            pathname.startsWith("/dashboard/appointments") &&
            "bg-primary text-primary-foreground font-semibold"
          }`}
        >
          <FaRegCalendarAlt /> Appointments
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 text-destructive mt-10"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
}
