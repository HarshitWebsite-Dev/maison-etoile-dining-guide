import { describe, expect, it } from "vitest";
import {
  BOTTOM_WAIT_MS,
  SECTION_PAUSE_MS,
  buildStops,
  easeInOut,
  travelDuration,
} from "@/lib/presentation";

describe("presentation mode timing", () => {
  it("pauses about 3 seconds at each section", () => {
    expect(SECTION_PAUSE_MS).toBe(3000);
  });

  it("waits 3 seconds at the bottom before returning to the top", () => {
    expect(BOTTOM_WAIT_MS).toBe(3000);
  });

  it("never rushes a short hop between sections", () => {
    expect(travelDuration(50)).toBe(1600);
  });

  it("eases from start to finish", () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(1)).toBe(1);
  });

  it("starts at the top and ends at the very bottom", () => {
    expect(buildStops([900, 2000, 5000], 4200)).toEqual([0, 900, 2000, 4200]);
  });
});
