interface StatusBadgeProps {
  status: "pending" | "approved" | "completed" | "cancelled" | string;
}

export const colors: Record<
  StatusBadgeProps["status"],
  { backgroundColor: string; color: string }
> = {
  pending: { backgroundColor: "#fef9c3", color: "#854d0e" }, // yellow bg, dark yellow text
  approved: { backgroundColor: "#bfdbfe", color: "#1e3a8a" }, // blue bg, dark blue text
  completed: { backgroundColor: "#bbf7d0", color: "#166534" }, // green bg, dark green text
  cancelled: { backgroundColor: "#fecaca", color: "#991b1b" }, // red bg, dark red text
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = colors[status as keyof typeof colors];

  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium" style={style}>
      {status}
    </span>
  );
}
