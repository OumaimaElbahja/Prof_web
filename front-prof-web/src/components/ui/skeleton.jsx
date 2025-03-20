import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD

    (<div
      data-slot="skeleton"
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props} />)
=======
    <div
      data-slot="skeleton"
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props} />
>>>>>>> origin/main
  );
}

export { Skeleton }
