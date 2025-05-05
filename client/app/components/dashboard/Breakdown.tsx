import { Skeleton } from "../ui/skeleton";
import { Progress } from "../ui/progress";

type BreakdownCardProps = {
  title: string;
  data: Record<string, number>;
  total: number;
  colors: string[];
  loading: boolean;
  order?: string[];
  children?: React.ReactNode;
};

export default function BreakdownCard({
  title,
  data,
  total,
  colors,
  loading,
  order,
  children,
}: BreakdownCardProps) {
  const orderedKeys = order || Object.keys(data);

  return (
    <div className="bg-card text-card-foreground shadow-md p-6 rounded-xl space-y-4">
      <h4 className="font-semibold text-lg">{title}</h4>
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      ) : (
        orderedKeys.map((key, index) => {
          const value = data[key] || 0;
          const percentage = total ? Math.round((value / total) * 100) : 0;
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="capitalize text-sm font-medium">{key}</span>
                <span className="text-sm text-muted-foreground">{value}</span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 rounded-full ${colors[index % colors.length]}`}
              />
            </div>
          );
        })
      )}

      <div className="flex gap-4">
        {children && loading
          ? [...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-25" />
            ))
          : children}
      </div>
    </div>
  );
}
