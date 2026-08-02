export function nextPlaylistIndex(activeIndex: number, length: number) {
  if (!Number.isInteger(activeIndex) || activeIndex < 0) {
    throw new Error("activeIndex must be a non-negative integer");
  }
  if (!Number.isInteger(length) || length < 1) {
    throw new Error("playlist length must be a positive integer");
  }
  return (activeIndex + 1) % length;
}

export function playlistWindow(activeIndex: number, length: number): readonly [number, number] {
  return [activeIndex, nextPlaylistIndex(activeIndex, length)];
}
