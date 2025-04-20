"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserMd, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-background text-foreground shadow-md h-screen w-64 p-6 fixed">
      <h2 className="text-2xl tracking-tighter font-bold mb-10 text-blue-600">
        Serenity Admin
      </h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-600 ${
            pathname === "/dashboard" && "bg-blue-600 font-semibold"
          }`}
        >
          <FaClipboardList /> Dashboard
        </Link>
        <Link
          href="/dashboard/staff"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-600 ${
            pathname.startsWith("/dashboard/staff") &&
            "bg-blue-600 font-semibold"
          }`}
        >
          <FaUserMd /> Manage Staff
        </Link>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 text-red-600 mt-10">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
}
