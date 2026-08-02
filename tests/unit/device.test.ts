import { describe, expect, it } from "vitest";
import { classifyDeviceTier } from "~/lib/device";

describe("classifyDeviceTier", () => {
  it("always chooses the static fallback for reduced motion", () => {
    expect(classifyDeviceTier({ width: 1440, reducedMotion: true, webgl: true })).toBe("low");
  });

  it("always chooses the static fallback for data saver or unavailable WebGL", () => {
    expect(classifyDeviceTier({ width: 1440, saveData: true, webgl: true })).toBe("low");
    expect(classifyDeviceTier({ width: 1440, webgl: false })).toBe("low");
  });

  it("keeps mobile devices on the static experience", () => {
    expect(classifyDeviceTier({ width: 390, webgl: true, hardwareConcurrency: 12 })).toBe("low");
  });

  it("distinguishes capable intermediate and high-tier devices", () => {
    expect(classifyDeviceTier({ width: 1024, webgl: true, hardwareConcurrency: 12, deviceMemory: 12 })).toBe("mid");
    expect(classifyDeviceTier({ width: 1440, webgl: true, hardwareConcurrency: 12, deviceMemory: 12 })).toBe("high");
  });
});
