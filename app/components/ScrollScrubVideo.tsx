import { useEffect, useRef, useState, type RefObject } from "react";
import { progressToTime, scrollProgress, shouldUseStaticMedia } from "~/lib/scroll-scrub";

interface ScrollScrubVideoProps {
  rootRef: RefObject<HTMLElement | null>;
  src: string;
  poster: string;
}


export function ScrollScrubVideo({ rootRef, src, poster }: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetTime = useRef(0);
  const frame = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(typeof window === "undefined");
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStaticMode(shouldUseStaticMedia({ reducedMotion: media.matches, saveData: false }));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMode) return;

    const easeToTarget = () => {
      const difference = targetTime.current - video.currentTime;
      if (Math.abs(difference) < 0.01) {
        video.currentTime = targetTime.current;
        frame.current = null;
        return;
      }
      video.currentTime += difference * 0.2;
      frame.current = window.requestAnimationFrame(easeToTarget);
    };

    const updateTarget = () => {
      const root = rootRef.current;
      if (!root || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const bounds = root.getBoundingClientRect();
      const progress = scrollProgress(bounds.top, bounds.height, window.innerHeight);
      targetTime.current = progressToTime(progress, video.duration);

      const progressBar = root.querySelector<HTMLSpanElement>(".home-film__progress span");
      if (progressBar) {
        progressBar.style.height = `${Math.round(progress * 100)}%`;
      }

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        if (canvas.width !== Math.round(width * pixelRatio) || canvas.height !== Math.round(height * pixelRatio)) {
          canvas.width = Math.round(width * pixelRatio);
          canvas.height = Math.round(height * pixelRatio);
        }
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;
        context.setLineDash([5, 9]);

        const originX = width * 0.68;
        const originY = height * 0.64;
        const traces = [
          { colour: "#ff5d5b", x: width * 0.84, y: height * 0.24 },
          { colour: "#2eb1ff", x: width * 0.92, y: height * 0.52 },
          { colour: "#9ae265", x: width * 0.8, y: height * 0.84 },
        ];

        traces.forEach((trace, index) => {
          context.beginPath();
          context.strokeStyle = trace.colour;
          context.globalAlpha = 0.16 + progress * 0.22;
          context.moveTo(originX, originY);
          context.bezierCurveTo(
            originX + width * (0.05 + index * 0.018),
            originY + (trace.y - originY) * 0.18,
            trace.x - width * 0.04,
            trace.y - (trace.y - originY) * 0.12,
            trace.x,
            trace.y,
          );
          context.stroke();
        });
        context.globalAlpha = 1;
        context.setLineDash([]);
      }

      if (frame.current === null) frame.current = window.requestAnimationFrame(easeToTarget);
    };

    const onReady = () => {
      setReady(true);
      updateTarget();
    };

    const onError = () => {
      setVideoError(true);
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onError);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    if (video.readyState >= 1) onReady();

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onError);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [rootRef, staticMode]);

  const showVideo = !staticMode && !videoError;

  return (
    <div className={`scroll-film-media${ready && showVideo ? " is-ready" : ""}`} aria-hidden="true">
      <img src={poster} alt="" />
      {showVideo ? (
        <video ref={videoRef} muted playsInline preload="auto" poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="scroll-film-grade" />
      {showVideo ? <canvas ref={canvasRef} className="scroll-film-canvas" /> : null}
    </div>
  );
}
