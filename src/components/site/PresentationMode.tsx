import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BOTTOM_WAIT_MS,
  SECTION_PAUSE_MS,
  buildStops,
  easeInOut,
  returnDuration,
  travelDuration,
} from "@/lib/presentation";
import { cn } from "@/lib/utils";

type WakeLock = { release: () => Promise<void> };

function scroller() {
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

function collectStops(): number[] {
  const el = scroller();
  const maxScroll = Math.max(0, el.scrollHeight - window.innerHeight);
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
    (s) => !s.parentElement?.closest("main section"),
  );
  const footer = document.querySelector<HTMLElement>("footer");
  const nodes = footer ? [...sections, footer] : sections;
  const y = window.scrollY;
  const offsets = nodes.map((n) => n.getBoundingClientRect().top + y);
  return buildStops(offsets, maxScroll);
}

export function PresentationMode() {
  const [active, setActive] = useState(false);
  const runId = useRef(0);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wake = useRef<WakeLock | null>(null);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const cleanup = useCallback(() => {
    runId.current++;
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    if (timer.current !== null) clearTimeout(timer.current);
    raf.current = null;
    timer.current = null;
    document.documentElement.style.scrollBehavior = "";
    wake.current?.release().catch(() => {});
    wake.current = null;
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setActive(false);
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  const run = useCallback(async () => {
    cleanup();
    const id = runId.current;
    const alive = () => id === runId.current;

    // Per-frame positioning must be instant; the site uses CSS smooth scrolling.
    document.documentElement.style.scrollBehavior = "auto";

    try {
      const nav = navigator as Navigator & {
        wakeLock?: { request: (t: "screen") => Promise<WakeLock> };
      };
      wake.current = (await nav.wakeLock?.request("screen")) ?? null;
    } catch {
      /* keeping the screen awake is optional */
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer.current = setTimeout(resolve, ms);
      });

    const glide = (to: number, duration: number) =>
      new Promise<void>((resolve) => {
        const from = window.scrollY;
        const start = performance.now();
        const step = (now: number) => {
          if (!alive()) return resolve();
          const t = Math.min(1, (now - start) / duration);
          window.scrollTo(0, from + (to - from) * easeInOut(t));
          if (t < 1) raf.current = requestAnimationFrame(step);
          else resolve();
        };
        raf.current = requestAnimationFrame(step);
      });

    // Begin at the hero.
    if (window.scrollY > 4) {
      await glide(0, returnDuration(window.scrollY));
      if (!alive()) return;
    }
    await wait(SECTION_PAUSE_MS);

    let i = 1;
    while (alive()) {
      // Re-measure each time: lazy images and reveals can change page height.
      const stops = collectStops();
      const next = stops.find((s) => s > window.scrollY + 4);
      if (next === undefined || i > 40) break;
      await glide(next, travelDuration(next - window.scrollY));
      if (!alive()) return;
      const isBottom = next >= (stops[stops.length - 1] ?? next);
      await wait(isBottom ? BOTTOM_WAIT_MS : SECTION_PAUSE_MS);
      if (!alive()) return;
      if (isBottom) break;
      i++;
    }
    if (!alive()) return;

    await glide(0, returnDuration(window.scrollY));
    if (!alive()) return;
    stop();
  }, [cleanup, stop]);

  const start = useCallback(async () => {
    setActive(true);
    if (pathname !== "/") {
      await navigate({ to: "/" });
      await new Promise((r) => setTimeout(r, 400));
    }
    run();
  }, [navigate, pathname, run]);

  // Escape key stops the presentation.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && stop();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, stop]);

  return (
    <div
      className="fixed z-[60]"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <button
        type="button"
        onClick={active ? stop : start}
        aria-pressed={active}
        className={cn(
          "presentation-pill group flex items-center gap-3 rounded-full px-5 py-3 text-[0.62rem] uppercase tracking-[0.32em] backdrop-blur-md",
          "transition-all duration-500 ease-luxe touch-manipulation select-none",
          active && "presentation-pill-active",
        )}
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          {active && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
          )}
          <span
            className={cn(
              "relative inline-flex h-2 w-2 bg-gold transition-all duration-500",
              active ? "rounded-[1px]" : "rounded-full",
            )}
          />
        </span>
        {active ? "Stop Presentation" : "Start Presentation"}
      </button>
    </div>
  );
}
