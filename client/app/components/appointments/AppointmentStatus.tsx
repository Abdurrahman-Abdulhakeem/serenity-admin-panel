import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

import { Button } from "@/app/components/ui/button";

import { ChevronDown } from "lucide-react";

const options = ["", "pending", "approved", "completed", "cancelled"];

export default function AppointmentStatus({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (string: string) => void;
}) {
  const displayLabel = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "All Statuses";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-background px-3 py-[9px] flex items-center gap-2"
        >
          {displayLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {["", ...options.slice(1)].map((opt) => (
          <DropdownMenuItem key={opt || "all"} onClick={() => setStatus(opt)}>
            {opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : "All Statuses"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
