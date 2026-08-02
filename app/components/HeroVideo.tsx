import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { heroClips } from "~/content/site";
import { nextPlaylistIndex } from "~/lib/playlist";

interface HeroVideoProps {
  enabled: boolean;
}

export function HeroVideo({ enabled }: HeroVideoProps) {
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const refs = useMemo(() => [firstVideoRef, secondVideoRef] as const, []);
  const [slotIndexes, setSlotIndexes] = useState<readonly [number, number]>([0, 1]);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [failed, setFailed] = useState(false);
  const transitionLock = useRef(false);

  const advance = useCallback(() => {
    if (!enabled || failed || transitionLock.current) return;
    transitionLock.current = true;
    const outgoingSlot = activeSlot;
    const incomingSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;
    const incoming = refs[incomingSlot].current;
    incoming?.play().catch(() => setFailed(true));
    setActiveSlot(incomingSlot);

    window.setTimeout(() => {
      refs[outgoingSlot].current?.pause();
      setSlotIndexes((current) => {
        const next = [...current] as [number, number];
        next[outgoingSlot] = nextPlaylistIndex(current[incomingSlot], heroClips.length);
        return next;
      });
      transitionLock.current = false;
    }, 520);
  }, [activeSlot, enabled, failed, refs]);

  useEffect(() => {
    if (!enabled || failed) return;
    const activeClip = heroClips[slotIndexes[activeSlot]];
    if (!activeClip) return;
    const timer = window.setTimeout(advance, activeClip.durationCapSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [activeSlot, advance, enabled, failed, slotIndexes]);

  if (!enabled || failed) {
    return <div className="hero-poster" role="presentation" />;
  }

  return (
    <div className="hero-video" aria-hidden="true">
      {refs.map((ref, slot) => {
        const typedSlot = slot as 0 | 1;
        const clip = heroClips[slotIndexes[typedSlot]];
        if (!clip) return null;
        return (
          <video
            key={slot}
            ref={ref}
            className={typedSlot === activeSlot ? "is-active" : ""}
            muted
            playsInline
            autoPlay={slot === 0}
            preload={slot === activeSlot ? "auto" : "metadata"}
            poster={clip.poster}
            onEnded={() => typedSlot === activeSlot && advance()}
            onError={() => setFailed(true)}
          >
            {clip.srcWebm ? <source src={clip.srcWebm} type="video/webm" /> : null}
            <source src={clip.srcMp4} type="video/mp4" />
          </video>
        );
      })}
      <div className="hero-media-scrim" />
    </div>
  );
}
