import { useState } from "react";
import { menu } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

export function MenuBoard() {
  const [active, setActive] = useState(menu[0].id);
  const course = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <div>
      <div role="tablist" className="flex justify-center gap-6 border-b border-border md:gap-14">
        {menu.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={c.id === active}
            onClick={() => setActive(c.id)}
            className={cn(
              "relative pb-5 font-display text-2xl transition-colors duration-500 md:text-3xl",
              c.id === active ? "text-gold" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {c.title}
            <span
              className={cn(
                "absolute inset-x-0 -bottom-px h-px origin-center bg-gold transition-transform duration-700 ease-luxe",
                c.id === active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div key={course.id} className="mx-auto mt-14 max-w-3xl">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground animate-rise">
          {course.subtitle}
        </p>
        <ul className="mt-10 space-y-10">
          {course.items.map((item, i) => (
            <li
              key={item.name}
              className="group animate-rise"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl transition-colors duration-500 group-hover:text-gold md:text-[1.7rem]">
                  {item.name}
                </h3>
                <span className="mb-1.5 flex-1 border-b border-dotted border-gold/40" />
                <span className="font-display text-xl text-gold md:text-2xl">{item.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
