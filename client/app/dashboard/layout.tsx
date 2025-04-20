import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6 bg-gray-300 text-background min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
