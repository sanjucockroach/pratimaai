import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ContactActions } from "~/components/ContactActions";
import { HeroVideo } from "~/components/HeroVideo";
import { NodeMotif } from "~/components/NodeMotif";
import { useExperienceTier } from "~/components/useExperienceTier";

const LivingConstellation = lazy(() => import("~/components/LivingConstellation"));

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const { tier, reducedMotion } = useExperienceTier();
  const enhanced = tier !== "low" && !reducedMotion && visible;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { rootMargin: "120px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-heading">
      <HeroVideo enabled={enhanced} />
      <div className="hero-constellation" aria-hidden="true">
        {enhanced ? (
          <Suspense fallback={<NodeMotif className="hero-static-motif" />}>
            <LivingConstellation tier={tier} />
          </Suspense>
        ) : (
          <NodeMotif className="hero-static-motif" />
        )}
      </div>
      <div className="hero-copy">
        <p className="utility-label">PRATIMA AI / CONNECTING DOTS</p>
        <h1 id="hero-heading">
          AI, SOFTWARE AND LEARNING.
          <span>BUILT TO CONNECT.</span>
        </h1>
        <p className="hero-lead">
          One connected practice for business intelligence, custom software and education platforms.
        </p>
        <ContactActions />
      </div>
      <div className="hero-practice-key" aria-label="Three connected practices">
        <span><i className="node-dot node-dot--coral" />AI support</span>
        <span><i className="node-dot node-dot--blue" />Software</span>
        <span><i className="node-dot node-dot--green" />Education</span>
      </div>
    </section>
  );
}
