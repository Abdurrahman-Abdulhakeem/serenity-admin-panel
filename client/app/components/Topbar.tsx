export default function Topbar() {
    return (
      <div className="bg-background text-foreground h-16 shadow-md flex items-center px-6 justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <span className="text-sm opacity-90">Welcome, Admin</span>
      </div>
    );
  }
  