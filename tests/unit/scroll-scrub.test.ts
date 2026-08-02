import { describe, expect, it } from "vitest";
import { progressToTime, scrollProgress, shouldUseStaticMedia } from "~/lib/scroll-scrub";

describe("scroll scrub mapping", () => {
  it("maps the section travel to a clamped zero-to-one progress", () => {
    expect(scrollProgress(0, 3000, 1000)).toBe(0);
    expect(scrollProgress(-1000, 3000, 1000)).toBe(0.5);
    expect(scrollProgress(-2000, 3000, 1000)).toBe(1);
    expect(scrollProgress(-5000, 3000, 1000)).toBe(1);
  });

  it("maps progress to a safe video time without seeking beyond duration", () => {
    expect(progressToTime(0, 10)).toBe(0);
    expect(progressToTime(1, 10)).toBeCloseTo(9.96);
    expect(progressToTime(2, 10)).toBeCloseTo(9.96);
    expect(progressToTime(0.5, Number.NaN)).toBe(0);
  });

  it("selects a static poster for explicit preferences", () => {
    expect(shouldUseStaticMedia({ reducedMotion: true, saveData: false })).toBe(true);
    expect(shouldUseStaticMedia({ reducedMotion: false, saveData: true })).toBe(true);
    expect(shouldUseStaticMedia({ reducedMotion: false, saveData: false })).toBe(false);
  });
});
