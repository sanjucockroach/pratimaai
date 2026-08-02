import { describe, expect, it } from "vitest";
import { carouselRoles, nextCarouselIndex } from "~/lib/carousel";

describe("team carousel", () => {
  it("rotates forward and backward with wraparound", () => {
    expect(nextCarouselIndex(0, "next")).toBe(1);
    expect(nextCarouselIndex(3, "next")).toBe(0);
    expect(nextCarouselIndex(0, "prev")).toBe(3);
    expect(nextCarouselIndex(2, "prev")).toBe(1);
  });

  it("derives all four spatial roles from the active item", () => {
    expect(carouselRoles(0)).toEqual({ center: 0, left: 3, right: 1, back: 2 });
    expect(carouselRoles(2)).toEqual({ center: 2, left: 1, right: 3, back: 0 });
  });
});
