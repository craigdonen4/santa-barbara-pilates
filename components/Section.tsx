import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  surface,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: "bg" | "surface" | "surface-2" | "sage-light";
}) {
  const bg = {
    bg: "bg-bg",
    surface: "bg-surface",
    "surface-2": "bg-surface-2",
    "sage-light": "bg-sage-light",
  };
  return (
    <section
      className={cn(
        "py-20 lg:py-28",
        surface ? bg[surface] : undefined,
        className
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display font-semibold mt-3 text-4xl leading-[1.1] text-text md:text-5xl">
        {title}
      </h2>
    </header>
  );
}
