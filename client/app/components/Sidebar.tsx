"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaClipboardList,
  FaUserMd,
  FaSitemap,
  FaRegCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { CalendarHeart } from "lucide-react";
import { handleLogout } from "@/lib/axios";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <FaClipboardList />,
    exact: true,
  },
  { href: "/dashboard/staff", label: "Manage Staff", icon: <FaUserMd /> },
  {
    href: "/dashboard/departments",
    label: "Departments",
    icon: <FaSitemap />,
  },
  {
    href: "/dashboard/patients",
    label: "Patients",
    icon: <CalendarHeart />,
  },
  {
    href: "/dashboard/appointments",
    label: "Appointments",
    icon: <FaRegCalendarAlt />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar text-sidebar-foreground shadow-md h-screen w-64 p-6 fixed z-20">
      <h2 className="text-2xl font-extrabold tracking-tight mb-10 text-primary">
        Serenity Admin
      </h2>

      <nav className="space-y-2">
        {navLinks.map(({ href, label, icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 flex items-center gap-3 text-destructive px-4 py-2 hover:bg-red-100 rounded-lg transition-all"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
