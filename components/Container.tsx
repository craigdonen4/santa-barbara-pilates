import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "page",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "page" | "prose" | "wide";
}) {
  const max = {
    page: "max-w-[76rem]",
    prose: "max-w-[42rem]",
    wide: "max-w-[88rem]",
  }[size];
  return (
    <div className={cn("mx-auto px-6 lg:px-10", max, className)}>
      {children}
    </div>
  );
}
