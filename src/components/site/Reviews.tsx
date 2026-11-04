import { useEffect, useState } from "react";
import { reviews } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [i]);

  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="font-display text-7xl leading-none text-gold md:text-8xl" aria-hidden>
        “
      </div>
      <div className="relative mt-2 grid">
        {reviews.map((r, idx) => (
          <figure
            key={r.author}
            aria-hidden={idx !== i}
            className={cn(
              "col-start-1 row-start-1 transition-all duration-1000 ease-luxe",
              idx === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
            )}
          >
            <blockquote className="font-display text-2xl italic leading-snug md:text-4xl">
              {r.quote}
            </blockquote>
            <figcaption className="mt-10">
              <p className="text-xs uppercase tracking-[0.35em]">{r.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{r.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-12 flex justify-center gap-3">
        {reviews.map((r, idx) => (
          <button
            key={r.author}
            aria-label={`Show review ${idx + 1}`}
            onClick={() => setI(idx)}
            className="group py-3"
          >
            <span
              className={cn(
                "block h-px transition-all duration-700 ease-luxe",
                idx === i ? "w-12 bg-current" : "w-6 bg-current opacity-30 group-hover:opacity-60",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
