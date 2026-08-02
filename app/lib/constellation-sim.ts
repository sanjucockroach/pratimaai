export interface Point3 {
  x: number;
  y: number;
  z: number;
}

export interface SimulationNode {
  position: Point3;
  velocity: Point3;
  home: Point3;
  stiffness: number;
  damping: number;
  maxDisplacement: number;
}

export interface SimulationInput {
  pointer?: Point3;
  pointerRadius: number;
  pointerForce: number;
  delta: number;
}

const clampMagnitude = (value: Point3, max: number): Point3 => {
  const magnitude = Math.hypot(value.x, value.y, value.z);
  if (magnitude <= max || magnitude === 0) return value;
  const scale = max / magnitude;
  return { x: value.x * scale, y: value.y * scale, z: value.z * scale };
};

export function integrateNode(node: SimulationNode, input: SimulationInput): SimulationNode {
  const dt = Math.min(Math.max(input.delta, 0), 1 / 30);
  const displacement = {
    x: node.home.x - node.position.x,
    y: node.home.y - node.position.y,
    z: node.home.z - node.position.z,
  };

  let force = {
    x: displacement.x * node.stiffness - node.velocity.x * node.damping,
    y: displacement.y * node.stiffness - node.velocity.y * node.damping,
    z: displacement.z * node.stiffness - node.velocity.z * node.damping,
  };

  if (input.pointer) {
    const away = {
      x: node.position.x - input.pointer.x,
      y: node.position.y - input.pointer.y,
      z: node.position.z - input.pointer.z,
    };
    const distance = Math.max(Math.hypot(away.x, away.y, away.z), 0.08);
    if (distance < input.pointerRadius) {
      const strength = input.pointerForce * (1 - distance / input.pointerRadius) ** 2;
      force = {
        x: force.x + (away.x / distance) * strength,
        y: force.y + (away.y / distance) * strength,
        z: force.z + (away.z / distance) * strength,
      };
    }
  }

  const velocity = {
    x: node.velocity.x + force.x * dt,
    y: node.velocity.y + force.y * dt,
    z: node.velocity.z + force.z * dt,
  };
  const nextOffset = clampMagnitude(
    {
      x: node.position.x + velocity.x * dt - node.home.x,
      y: node.position.y + velocity.y * dt - node.home.y,
      z: node.position.z + velocity.z * dt - node.home.z,
    },
    node.maxDisplacement,
  );

  return {
    ...node,
    velocity,
    position: {
      x: node.home.x + nextOffset.x,
      y: node.home.y + nextOffset.y,
      z: node.home.z + nextOffset.z,
    },
  };
}
