import { useEffect, useRef, useState, type RefObject } from "react";
import { progressToTime, scrollProgress, shouldUseStaticMedia } from "~/lib/scroll-scrub";

interface ScrollScrubVideoProps {
  rootRef: RefObject<HTMLElement | null>;
  src: string;
  poster: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

export function ScrollScrubVideo({ rootRef, src, poster }: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const frame = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navigatorHints = navigator as NavigatorWithConnection;
    setStaticMode(shouldUseStaticMedia({
      reducedMotion: media.matches,
      saveData: Boolean(navigatorHints.connection?.saveData),
      hardwareConcurrency: navigatorHints.hardwareConcurrency,
      deviceMemory: navigatorHints.deviceMemory,
    }));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMode) return;

    const easeToTarget = () => {
      const difference = targetTime.current - video.currentTime;
      if (Math.abs(difference) < 0.012) {
        video.currentTime = targetTime.current;
        frame.current = null;
        return;
      }
      video.currentTime += difference * 0.14;
      frame.current = window.requestAnimationFrame(easeToTarget);
    };

    const updateTarget = () => {
      const root = rootRef.current;
      if (!root || !Number.isFinite(video.duration)) return;
      const bounds = root.getBoundingClientRect();
      targetTime.current = progressToTime(
        scrollProgress(bounds.top, bounds.height, window.innerHeight),
        video.duration,
      );
      if (frame.current === null) frame.current = window.requestAnimationFrame(easeToTarget);
    };

    const onMetadata = () => {
      setReady(true);
      updateTarget();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    if (video.readyState >= 1) onMetadata();

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [rootRef, staticMode]);

  return (
    <div className={`scroll-film-media${ready && !staticMode ? " is-ready" : ""}`} aria-hidden="true">
      <img src={poster} alt="" />
      {!staticMode ? (
        <video ref={videoRef} muted playsInline preload="auto" poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="scroll-film-grade" />
    </div>
  );
}
