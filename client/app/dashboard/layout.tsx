"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { getAuthState } from "@/redux/features/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = useSelector(getAuthState);
  const router = useRouter();
  const pathname = usePathname();

  // Use hydration for async,,.....because user is null on refresh
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!userData) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [userData, isHydrated, router, pathname]);

  if (!isHydrated || !userData) return null;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6 bg-secondary text-foreground min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
