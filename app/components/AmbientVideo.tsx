import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { shouldUseStaticMedia } from "~/lib/scroll-scrub";

type AmbientVideoProps = {
  className?: string;
  src: string;
  poster: string;
};

export function AmbientVideo({ className = "", src, poster }: AmbientVideoProps) {
  const reducedMotion = useReducedMotion();
  const [staticMode, setStaticMode] = useState(true);

  useEffect(() => {
    const hints = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    setStaticMode(shouldUseStaticMedia({
      reducedMotion: Boolean(reducedMotion),
      saveData: Boolean(hints.connection?.saveData),
      hardwareConcurrency: hints.hardwareConcurrency,
      deviceMemory: hints.deviceMemory,
    }));
  }, [reducedMotion]);

  if (staticMode) {
    return (
      <div
        className={`${className} ambient-video-poster`}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}
