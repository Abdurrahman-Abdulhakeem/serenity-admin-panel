import * as React from "react";
import { cn } from "@/lib/utils";

export const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full bg-muted rounded-full", className)}
    {...props}
  >
    <div
      className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = "Progress";
