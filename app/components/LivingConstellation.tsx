import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { DeviceTier } from "~/lib/device";
import { integrateNode, type SimulationNode } from "~/lib/constellation-sim";

interface LivingConstellationProps {
  tier: DeviceTier;
}

interface NodeDefinition {
  home: [number, number, number];
  start: [number, number, number];
  colour: string;
  scale: number;
  stiffness: number;
  damping: number;
  maxDisplacement: number;
}

const AMBER = "#FFBE4A";
const GREEN = "#9AE265";
const BLUE = "#2EB1FF";
const CORAL = "#FF5D5B";
const GREY = "#B8B8B8";

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createDefinitions(tier: DeviceTier): NodeDefinition[] {
  const ambientCount = tier === "high" ? 50 : 28;
  const definitions: NodeDefinition[] = [
    {
      home: [1.15, 0.25, 0.1], start: [4.8, 2.8, -2], colour: AMBER, scale: 0.58,
      stiffness: 6.8, damping: 4.9, maxDisplacement: 0.34,
    },
    {
      home: [0.1, 1.35, -0.1], start: [-4.2, 3.4, 1], colour: GREEN, scale: 0.33,
      stiffness: 5.8, damping: 4.2, maxDisplacement: 0.5,
    },
    {
      home: [2.55, 0.85, 0], start: [5.2, -2.2, 1.4], colour: BLUE, scale: 0.26,
      stiffness: 5.8, damping: 4.2, maxDisplacement: 0.5,
    },
    {
      home: [1.55, -1.25, 0.05], start: [-4.6, -3.1, -1], colour: CORAL, scale: 0.29,
      stiffness: 5.8, damping: 4.2, maxDisplacement: 0.5,
    },
  ];

  const random = mulberry32(7341);
  for (let index = 0; index < ambientCount; index += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 1.6 + random() * 3.2;
    const home: [number, number, number] = [
      Math.cos(angle) * radius + 0.8,
      Math.sin(angle) * radius * 0.58,
      (random() - 0.5) * 1.6,
    ];
    definitions.push({
      home,
      start: [home[0] + (random() - 0.5) * 8, home[1] + (random() - 0.5) * 6, home[2] - 2],
      colour: index % 7 === 0 ? [CORAL, BLUE, GREEN][index % 3] ?? GREY : GREY,
      scale: 0.055 + random() * 0.085,
      stiffness: 3.4 + random() * 1.2,
      damping: 2.9 + random() * 0.7,
      maxDisplacement: 0.72 + random() * 0.35,
    });
  }
  return definitions;
}

function buildEdges(definitions: NodeDefinition[]) {
  const edges: Array<[number, number]> = [[0, 1], [0, 2], [0, 3]];
  for (let index = 4; index < definitions.length; index += 1) {
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let candidate = 0; candidate < index; candidate += 1) {
      const a = definitions[index]?.home;
      const b = definitions[candidate]?.home;
      if (!a || !b) continue;
      const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = candidate;
      }
    }
    if (nearestDistance < 2.25) edges.push([index, nearest]);
  }
  return edges;
}

function Scene({ tier }: LivingConstellationProps) {
  const definitions = useMemo(() => createDefinitions(tier), [tier]);
  const edges = useMemo(() => buildEdges(definitions), [definitions]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const startTime = useRef<number | null>(null);
  const pointerActive = useRef(false);
  const simulations = useRef<SimulationNode[]>(
    definitions.map((node) => ({
      home: { x: node.home[0], y: node.home[1], z: node.home[2] },
      position: { x: node.start[0], y: node.start[1], z: node.start[2] },
      velocity: { x: 0, y: 0, z: 0 },
      stiffness: node.stiffness,
      damping: node.damping,
      maxDisplacement: node.maxDisplacement,
    })),
  );
  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const colour = useMemo(() => new THREE.Color(), []);
  const { gl, pointer, viewport } = useThree();

  useEffect(() => {
    const element = gl.domElement;
    const activate = () => { pointerActive.current = true; };
    const deactivate = () => { pointerActive.current = false; };
    element.addEventListener("pointermove", activate, { passive: true });
    element.addEventListener("pointerleave", deactivate, { passive: true });
    return () => {
      element.removeEventListener("pointermove", activate);
      element.removeEventListener("pointerleave", deactivate);
    };
  }, [gl]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    definitions.forEach((definition, index) => {
      mesh.setColorAt(index, colour.set(definition.colour));
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [colour, definitions]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;
    const assembly = Math.min(elapsed / 1.8, 1);
    const easedAssembly = 1 - (1 - assembly) ** 4;
    const pointerWorld = pointerActive.current && assembly >= 1
      ? { x: pointer.x * viewport.width * 0.35, y: pointer.y * viewport.height * 0.42, z: 0 }
      : undefined;

    definitions.forEach((definition, index) => {
      const simulation = simulations.current[index];
      if (!simulation) return;
      if (assembly < 1) {
        simulation.position = {
          x: THREE.MathUtils.lerp(definition.start[0], definition.home[0], easedAssembly),
          y: THREE.MathUtils.lerp(definition.start[1], definition.home[1], easedAssembly),
          z: THREE.MathUtils.lerp(definition.start[2], definition.home[2], easedAssembly),
        };
      } else {
        const drift = index < 4 ? 0.012 : 0.035;
        simulation.home = {
          x: definition.home[0] + Math.sin(state.clock.elapsedTime * 0.35 + index) * drift,
          y: definition.home[1] + Math.cos(state.clock.elapsedTime * 0.28 + index * 0.7) * drift,
          z: definition.home[2],
        };
        simulations.current[index] = integrateNode(simulation, {
          pointer: pointerWorld,
          pointerRadius: 1.85,
          pointerForce: index === 0 ? 2.2 : index < 4 ? 3.2 : 5.5,
          delta,
        });
      }
      const position = simulations.current[index]?.position ?? simulation.position;
      matrix.compose(
        new THREE.Vector3(position.x, position.y, position.z),
        new THREE.Quaternion(),
        new THREE.Vector3(definition.scale, definition.scale, definition.scale),
      );
      mesh.setMatrixAt(index, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={2.2} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} color="#fff8e8" />
      <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#e8f5ff" />
      <instancedMesh ref={meshRef} args={[undefined, undefined, definitions.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial roughness={0.52} metalness={0.04} vertexColors />
      </instancedMesh>
      {edges.slice(0, tier === "high" ? 46 : 26).map(([from, to], index) => {
        const fromPoint = definitions[from]?.home;
        const toPoint = definitions[to]?.home;
        if (!fromPoint || !toPoint) return null;
        return (
          <Line
            key={`${from}-${to}`}
            points={[fromPoint, toPoint]}
            color={index < 3 ? "#949494" : "#C9C9C9"}
            lineWidth={index < 3 ? 1.2 : 0.6}
            transparent
            opacity={index < 3 ? 0.78 : 0.38}
          />
        );
      })}
    </>
  );
}

export default function LivingConstellation({ tier }: LivingConstellationProps) {
  return (
    <Canvas
      camera={{ position: [0.8, 0, 7], fov: 48 }}
      dpr={tier === "high" ? [1, 1.5] : [1, 1.25]}
      gl={{ alpha: true, antialias: tier === "high", powerPreference: "high-performance" }}
    >
      <Scene tier={tier} />
    </Canvas>
  );
}
