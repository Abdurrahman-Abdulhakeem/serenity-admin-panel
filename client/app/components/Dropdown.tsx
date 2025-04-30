import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";

import { ChevronDown } from "lucide-react";

interface DropdownProps<T extends string> {
  label?: string;
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  className,
}: DropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={` ${className || "w-full"} justify-between`}
        >
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : ""}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onChange(option)}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
