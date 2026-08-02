export type DeviceTier = "high" | "mid" | "low";

export interface DeviceSignals {
  width: number;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  saveData?: boolean;
  reducedMotion?: boolean;
  webgl?: boolean;
}

export function classifyDeviceTier(signals: DeviceSignals): DeviceTier {
  if (
    signals.reducedMotion ||
    signals.saveData ||
    signals.webgl === false ||
    signals.width < 768 ||
    (signals.hardwareConcurrency !== undefined && signals.hardwareConcurrency <= 4) ||
    (signals.deviceMemory !== undefined && signals.deviceMemory <= 4)
  ) {
    return "low";
  }

  if (
    signals.width < 1280 ||
    (signals.hardwareConcurrency !== undefined && signals.hardwareConcurrency <= 8) ||
    (signals.deviceMemory !== undefined && signals.deviceMemory <= 8)
  ) {
    return "mid";
  }

  return "high";
}

export function supportsWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
