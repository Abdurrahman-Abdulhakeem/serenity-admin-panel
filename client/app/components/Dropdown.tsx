import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";

import { ChevronDown } from "lucide-react";
import { Appointment } from "@/types/appointment";

interface Props {
    form: Partial<Appointment>;
    setForm: "pending" | "approved" | "completed" | "cancelled";
}

// React.Dispatch<React.SetStateAction<Partial<Appointment>>>

export default function Dropdown({ form, setForm }: Props) {
  return (
    <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {form?.status.charAt(0).toUpperCase() +
                                form?.status.slice(1)}
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {[
                              "pending",
                              "approved",
                              "completed",
                              "cancelled",
                            ].map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() =>
                                  setForm((prev) => ({
                                    ...prev,
                                    status: status as
                                      | "pending"
                                      | "approved"
                                      | "completed"
                                      | "cancelled",
                                  }))
                                }
                              >
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
  )
}
