import ModeToggle from "./ModeToggle";

export default function Topbar() {
  return (
    <div className="bg-background text-foreground h-16 shadow-md flex items-center px-6 justify-between fixed right-0 left-64 z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <span className="text-sm opacity-90">Welcome, Admin</span>
      </div>
    </div>
  );
}
