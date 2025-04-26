
interface StatusBadgeProps {
    status: 'pending' | 'approved' | 'completed' | 'cancelled' | string;
  }

  
const colors: Record<StatusBadgeProps['status'], string> = {
    pending: 'bg-yellow-200 text-yellow-800',
    approved: 'bg-blue-200 text-blue-800',
    completed: 'bg-green-200 text-green-800',
    cancelled: 'bg-red-200 text-red-800',
  };

export default function StatusBadge({ status }: StatusBadgeProps) {
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  }
  