import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      <div
        className={cn(
          "mt-8 h-px w-24 bg-gold/60",
          align === "center" ? "mx-auto" : "",
        )}
      />
    </Reveal>
  );
}
