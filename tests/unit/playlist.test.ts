import { describe, expect, it } from "vitest";
import { nextPlaylistIndex, playlistWindow } from "~/lib/playlist";

describe("hero playlist", () => {
  it("wraps without creating more than one prepared successor", () => {
    expect(nextPlaylistIndex(0, 3)).toBe(1);
    expect(nextPlaylistIndex(2, 3)).toBe(0);
    expect(playlistWindow(1, 3)).toEqual([1, 2]);
  });

  it("rejects invalid state instead of violating the one-active-clip invariant", () => {
    expect(() => nextPlaylistIndex(-1, 3)).toThrow();
    expect(() => nextPlaylistIndex(0, 0)).toThrow();
  });
});
