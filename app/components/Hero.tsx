import { AnimatePresence, motion } from "motion/react";
import { ArrowRightCircle, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getEmailHref, getWhatsAppHref, siteConfig } from "~/content/site";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

const PRATIMA_PRACTICES = [
  "AI Intelligence",
  "Software Solutions",
  "Schools & EdTech",
  "Custom Systems",
];

function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays smoothly on all devices
    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    playVideo();

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      if (prevXRef.current !== null) {
        const delta = e.clientX - prevXRef.current;
        const step = (delta / window.innerWidth) * 0.8 * duration;
        let nextTime = targetTimeRef.current + step;
        nextTime = Math.max(0, Math.min(nextTime, duration));
        targetTimeRef.current = nextTime;
        video.currentTime = nextTime;
      }
      prevXRef.current = e.clientX;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-[#e8e8e6]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-100 object-center lg:object-right-bottom"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      {/* Responsive soft edge gradient: text remains crystal clear while video animation shines brightly */}
      <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#e8e8e6]/90 via-[#e8e8e6]/50 via-40% to-transparent pointer-events-none" />
    </div>
  );
}

function ServicePills() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (option: string) => {
    setSelectedServices((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="w-full max-w-2xl mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-2xl font-medium tracking-tight mb-1 text-[#090909]">
        What sort of practice do you need?
      </h2>
      <p className="text-xs sm:text-sm text-[#555555] mb-4 sm:mb-5">Select all that apply</p>

      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
        {PRATIMA_PRACTICES.map((option) => {
          const isActive = selectedServices.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleService(option)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-[#ffbe4a] text-[#090909] font-semibold shadow-md shadow-amber-500/25"
                  : "bg-white/90 text-[#090909] border border-black/10 hover:bg-white"
              }`}
            >
              {isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check size={16} />
                </motion.span>
              )}
              <span>{option}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedServices.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="italic text-xs text-[#555555]"
          >
            Please click to select practices above.
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="overflow-hidden"
          >
            <div className="bg-white/90 backdrop-blur-md border border-black/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <span className="text-xs sm:text-sm font-medium text-[#090909]">
                Ready to discuss: <strong className="text-[#ff5d5b]">{selectedServices.join(", ")}</strong>
              </span>
              <a
                href="#closing-contact"
                className="inline-flex items-center gap-2 text-[#090909] uppercase text-xs font-semibold tracking-wider hover:text-[#ff5d5b] transition-colors"
              >
                Discuss with PRATIMA AI <ArrowRightCircle size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden text-[#090909] bg-[#e8e8e6] py-12 sm:py-20 lg:py-24">
      <BackgroundVideo />

      <div className="relative z-10 w-[var(--content)] mx-auto px-4 sm:px-6">
        {/* Top Header Row: Subtitle on Left, AI Intelligence / Software / EdTech pushed EXTREME RIGHT in the SAME LINE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="utility-label mb-1">PRATIMA AI / CONNECTING DOTS</p>
            <p className="text-[#444444] text-xs sm:text-sm max-w-lg">
              One team owns the whole picture — not four vendors pointing fingers.
            </p>
          </div>
          {/* Pushed Extreme Right in the same line */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-[#090909] sm:ml-auto shrink-0" aria-label="Three practices">
            <span className="inline-flex items-center gap-1.5"><i className="signal signal--coral" />AI Intelligence</span>
            <span className="inline-flex items-center gap-1.5"><i className="signal signal--blue" />Software</span>
            <span className="inline-flex items-center gap-1.5"><i className="signal signal--green" />EdTech</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main content column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Vertical Headline: Each word on its own line with 5% line spacing */}
              <h1 id="spade-hero" className="text-4xl sm:text-7xl lg:text-[96px] font-light tracking-tight leading-[1.08] mb-6 sm:mb-8 select-none flex flex-col gap-1.5 sm:gap-3">
                <span className="block text-[#ff5d5b]">Clear.</span>
                <span className="block text-[#2eb1ff]">Precise.</span>
                <span className="block text-[#ffbe4a]">Connected.</span>
              </h1>

              {/* Action Buttons using Logo Brand Colors */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
                {/* Primary WhatsApp Action in Logo Amber Brand Color */}
                <motion.a
                  href={getWhatsAppHref("a new project")}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    backgroundColor: "var(--amber)",
                    color: "#090909",
                    boxShadow: "0 4px 24px rgba(255, 190, 74, 0.4)",
                  }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-[50px] font-semibold text-sm sm:text-base transition-all cursor-pointer hover:bg-[#111111] hover:text-white"
                >
                  <span>Start on WhatsApp</span>
                  <ArrowRightCircle size={18} />
                </motion.a>

                {/* Secondary Email Action in Logo Dark Ink Brand Color */}
                <motion.a
                  href={getEmailHref()}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    backgroundColor: "#090909",
                    color: "#ffffff",
                    boxShadow: "0 4px 24px rgba(9, 9, 9, 0.15)",
                  }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-[50px] font-medium text-sm sm:text-base transition-all cursor-pointer hover:bg-[#2b2b2b]"
                >
                  <span>Email us ({siteConfig.email})</span>
                  <ArrowRightCircle size={18} className="text-[#ffbe4a]" />
                </motion.a>
              </div>

              <ServicePills />
            </motion.div>
          </div>

          {/* Glass Card Column */}
          <div className="lg:col-span-4 lg:justify-self-end">
            <motion.aside
              className="w-full sm:max-w-sm p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-black/10 shadow-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 mb-3 text-[10px] tracking-wider uppercase text-[#555555] font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                Live operating view
              </div>
              <strong className="block text-lg sm:text-xl font-medium mb-2 text-[#090909]">Connecting dots</strong>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                See the people, the work and the system as one picture — instead of three separate problems.
              </p>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}
