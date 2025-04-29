import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

import { Button } from "@/app/components/ui/button";

import { ChevronDown } from "lucide-react";
import { Staff } from "@/types/staff";

interface Props {
    form: Staff;
    setForm: React.Dispatch<React.SetStateAction<Staff>>;
}

export default function StaffRolesDropdown({ form, setForm }: Props) {
  return (
    
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      className="mr-2 px-5 py-[20px] border border-ring dark:border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent dark:text-foreground  gap-4"
    >
      {form.role.charAt(0).toUpperCase() + form.role.slice(1)}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="start">
    {["doctor", "nurse", "admin", "lab"].map((role) => (
      <DropdownMenuItem
        key={role}
        onClick={() => setForm((prev) => ({ ...prev, role }))}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

  )
}
