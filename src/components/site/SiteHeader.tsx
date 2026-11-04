import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/story", label: "Our Story" },
  { to: "/menu", label: "Menu" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe",
          scrolled || open
            ? "border-b border-border bg-background/85 py-4 backdrop-blur-md"
            : "py-7",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <Link to="/" className="group flex flex-col leading-none" aria-label="Maison Étoile home">
            <span className="font-display text-2xl tracking-wide md:text-[1.7rem]">
              Maison <span className="italic text-gold">Étoile</span>
            </span>
            <span className="mt-1 text-[0.55rem] uppercase tracking-[0.5em] text-muted-foreground">
              Paris · Depuis 1998
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="link-underline text-[0.7rem] uppercase tracking-[0.3em] text-foreground/80 transition-colors hover:text-gold data-[status=active]:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="luxe" size="lg" className="h-11 px-7">
              <Link to="/reservations">Reserve</Link>
            </Button>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span
              className={cn(
                "h-px w-7 bg-foreground transition-transform duration-500 ease-luxe",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-7 bg-foreground transition-transform duration-500 ease-luxe",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 transition-all duration-700 ease-luxe md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex flex-col gap-8">
          {[{ to: "/", label: "Home" } as const, ...nav, { to: "/reservations", label: "Reservations" } as const].map(
            (item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "font-display text-5xl transition-all duration-700 ease-luxe hover:text-gold data-[status=active]:text-gold",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="mt-16 gold-rule" />
        <p className="mt-8 text-sm text-muted-foreground">+33 1 42 65 00 00</p>
      </div>
    </>
  );
}
