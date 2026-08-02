import { describe, expect, it } from "vitest";
import { integrateNode, type SimulationNode } from "~/lib/constellation-sim";

const node = (): SimulationNode => ({
  home: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 0, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  stiffness: 4,
  damping: 3,
  maxDisplacement: 0.5,
});

describe("constellation force limits", () => {
  it("never allows pointer force to move a node beyond its displacement limit", () => {
    let current = node();
    for (let frame = 0; frame < 240; frame += 1) {
      current = integrateNode(current, {
        pointer: { x: 0.01, y: 0, z: 0 },
        pointerRadius: 2,
        pointerForce: 100,
        delta: 1 / 60,
      });
      expect(Math.hypot(current.position.x, current.position.y, current.position.z)).toBeLessThanOrEqual(0.500001);
    }
  });

  it("clamps long frames and returns toward the home position", () => {
    const displaced = { ...node(), position: { x: 0.4, y: 0, z: 0 } };
    const next = integrateNode(displaced, { pointerRadius: 2, pointerForce: 0, delta: 2 });
    expect(next.position.x).toBeLessThan(displaced.position.x);
  });
});
