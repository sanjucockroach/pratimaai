export function scrollProgress(top: number, sectionHeight: number, viewportHeight: number) {
  const travel = Math.max(sectionHeight - viewportHeight, 1);
  return Math.min(Math.max(-top / travel, 0), 1);
}

export function progressToTime(progress: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return Math.min(Math.max(progress, 0), 1) * Math.max(duration - 0.04, 0);
}

export interface MediaHints {
  reducedMotion: boolean;
  saveData: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
}

export function shouldUseStaticMedia({
  reducedMotion,
}: MediaHints) {
  return reducedMotion;
}

