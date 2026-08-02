import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { shouldUseStaticMedia } from "~/lib/scroll-scrub";

type AmbientVideoProps = {
  className?: string;
  src: string;
  poster: string;
};

export function AmbientVideo({ className = "", src, poster }: AmbientVideoProps) {
  const reducedMotion = useReducedMotion();
  const [staticMode, setStaticMode] = useState(typeof window === "undefined");
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setStaticMode(shouldUseStaticMedia({
      reducedMotion: Boolean(reducedMotion),
      saveData: false,
    }));
  }, [reducedMotion]);

  if (staticMode || videoError) {
    return (
      <div
        className={`${className} ambient-video-poster`}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      onError={() => setVideoError(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

