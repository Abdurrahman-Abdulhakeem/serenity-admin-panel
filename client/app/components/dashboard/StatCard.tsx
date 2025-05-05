import { Skeleton } from "../ui/skeleton";

type StatCardProps = {
  label: string;
  value?: number;
  icon: React.ReactNode;
  change?: string;
  type?: "up" | "down";
};

const StatCard = ({ label, value, icon, change, type }: StatCardProps) => (
  <div className="bg-card text-card-foreground shadow-lg p-5 rounded-lg flex items-center gap-4">
    <div className="p-3 bg-muted rounded-full text-primary">{icon}</div>
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      {value !== undefined ? (
        <h3 className="text-2xl font-bold">{value}</h3>
      ) : (
        <Skeleton className="h-8 w-20" />
      )}
      {change && (
        <span
          className={`text-sm font-medium ${
            type === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "up" ? "▲" : "▼"} {change}
        </span>
      )}
    </div>
  </div>
);

export default StatCard;
