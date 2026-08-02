export type CarouselDirection = "next" | "prev";

export function nextCarouselIndex(activeIndex: number, direction: CarouselDirection, total = 4) {
  const offset = direction === "next" ? 1 : total - 1;
  return (activeIndex + offset) % total;
}

export function carouselRoles(activeIndex: number, total = 4) {
  return {
    center: activeIndex,
    left: (activeIndex + total - 1) % total,
    right: (activeIndex + 1) % total,
    back: (activeIndex + 2) % total,
  } as const;
}
