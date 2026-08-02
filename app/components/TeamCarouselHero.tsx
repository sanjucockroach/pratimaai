import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { carouselRoles, nextCarouselIndex, type CarouselDirection } from "~/lib/carousel";

export const TEAM_FIGURES = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", bg: "#F4845F", panel: "#F79B7F" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", bg: "#6BBF7A", panel: "#85CC92" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", bg: "#E882B4", panel: "#ED9DC4" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", bg: "#6EB5FF", panel: "#8DC4FF" },
] as const;

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

type FigureRole = "center" | "left" | "right" | "back";

function figureStyle(role: FigureRole, isMobile: boolean): CSSProperties {
  const side = role === "left" || role === "right";
  return {
    position: "absolute",
    aspectRatio: "0.6 / 1",
    left: role === "left" ? (isMobile ? "20%" : "30%") : role === "right" ? (isMobile ? "80%" : "70%") : "50%",
    height: role === "center" ? (isMobile ? "60%" : "92%") : role === "back" ? (isMobile ? "13%" : "22%") : (isMobile ? "16%" : "28%"),
    bottom: role === "center" ? (isMobile ? "22%" : "0") : (isMobile ? "32%" : "12%"),
    zIndex: role === "center" ? 20 : side ? 10 : 5,
    opacity: role === "center" ? 1 : side ? 0.85 : 1,
    filter: role === "center" ? "none" : side ? "blur(2px)" : "blur(4px)",
    transform: `translateX(-50%) scale(${role === "center" ? (isMobile ? 1.25 : 1.68) : 1})`,
    transition: "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
    willChange: "transform, filter, opacity",
  };
}

export function TeamCarouselHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const unlockTimer = useRef<number | null>(null);
  const roles = carouselRoles(activeIndex);
  const activeFigure = TEAM_FIGURES[activeIndex] ?? TEAM_FIGURES[0];

  useEffect(() => {
    TEAM_FIGURES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile, { passive: true });
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => () => {
    if (unlockTimer.current !== null) window.clearTimeout(unlockTimer.current);
  }, []);

  const navigate = (direction: CarouselDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((current) => nextCarouselIndex(current, direction, TEAM_FIGURES.length));
    unlockTimer.current = window.setTimeout(() => {
      setIsAnimating(false);
      unlockTimer.current = null;
    }, 650);
  };

  return (
    <section
      className="about-team-hero relative min-h-screen w-full overflow-hidden supports-[height:100svh]:min-h-[100svh]"
      style={{
        backgroundColor: activeFigure.bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "Inter, sans-serif",
      }}
      aria-labelledby="about-heading"
    >
      <div className="relative h-screen w-full overflow-hidden supports-[height:100svh]:h-[100svh]">
        <div
          className="pointer-events-none absolute inset-0 z-50 opacity-40"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px", backgroundRepeat: "repeat" }}
          aria-hidden="true"
        />

        <h1 id="about-heading" className="sr-only">Our team</h1>
        <div
          className="pointer-events-none absolute inset-x-0 top-[18%] z-[2] flex select-none items-center justify-center whitespace-nowrap uppercase text-white"
          style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(90px, 28vw, 380px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}
          aria-hidden="true"
        >
          3D Shape
        </div>

        <a href="/" className="absolute left-4 top-6 z-[60] text-xs font-semibold uppercase tracking-[0.18em] text-white opacity-90 no-underline sm:left-8" aria-label="PRATIMA AI home">
          PRATIMA AI
        </a>

        <div className="absolute inset-0 z-[3]" aria-live="polite">
          {TEAM_FIGURES.map((figure, index) => {
            const role: FigureRole = index === roles.center ? "center" : index === roles.left ? "left" : index === roles.right ? "right" : "back";
            return (
              <div key={figure.src} style={figureStyle(role, isMobile)} aria-hidden={role !== "center"}>
                <img
                  src={figure.src}
                  alt={role === "center" ? `Temporary PRATIMA AI team figurine ${index + 1}` : ""}
                  width="768"
                  height="1280"
                  className="h-full w-full object-contain object-bottom"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-4 z-[60] max-w-80 sm:bottom-20 sm:left-24">
          <p className="mb-2 text-base font-bold uppercase tracking-[0.02em] text-white opacity-95 sm:mb-3 sm:text-[22px]">
            People of PRATIMA
          </p>
          <p className="mb-5 hidden text-sm leading-[1.6] text-white opacity-85 sm:block">
            Temporary character studies stand in while individual team miniatures are prepared. The people, judgement and accountability behind the work remain central.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/[0.12] sm:h-16 sm:w-16"
              onClick={() => navigate("prev")}
              aria-label="Previous team figure"
              aria-disabled={isAnimating}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/[0.12] sm:h-16 sm:w-16"
              onClick={() => navigate("next")}
              aria-label="Next team figure"
              aria-disabled={isAnimating}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#principles"
          className="absolute bottom-6 right-4 z-[60] flex items-center gap-2 uppercase text-white opacity-95 no-underline transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10"
          style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(20px, 4vw, 56px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Discover it <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}
