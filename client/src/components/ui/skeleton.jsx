import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
