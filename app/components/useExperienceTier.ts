import { useEffect, useState } from "react";
import { classifyDeviceTier, supportsWebGL, type DeviceTier } from "~/lib/device";

interface NetworkInformationLike {
  saveData?: boolean;
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: NetworkInformationLike;
}

export function useExperienceTier() {
  const [tier, setTier] = useState<DeviceTier>("low");
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const navigatorHints = navigator as NavigatorWithHints;
      setReducedMotion(media.matches);
      setTier(
        classifyDeviceTier({
          width: window.innerWidth,
          hardwareConcurrency: navigator.hardwareConcurrency,
          deviceMemory: navigatorHints.deviceMemory,
          saveData: navigatorHints.connection?.saveData,
          reducedMotion: media.matches,
          webgl: supportsWebGL(),
        }),
      );
    };
    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { tier, reducedMotion };
}
