import { motion } from "motion/react";
import { useRef } from "react";
import { ContactActions } from "~/components/ContactActions";
import { ScrollScrubVideo } from "~/components/ScrollScrubVideo";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      <section ref={heroRef} className="home-film" aria-labelledby="hero-heading">
        <div className="home-film__sticky">
          <ScrollScrubVideo
            rootRef={heroRef}
            src="/video/pratima-circuit.mp4"
            poster="/assets/pratima-circuit-poster.png"
          />
          <div className="home-film__content">
            <motion.div
              className="home-film__intro"
              initial={{ opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="utility-label utility-label--light">PRATIMA AI / CONNECTING DOTS</p>
              <p>One practice connecting business intelligence, custom software and learning systems.</p>
            </motion.div>

            <div className="home-film__services" aria-label="Three practices">
              <span><i className="signal signal--coral" />AI Intelligence</span>
              <span><i className="signal signal--blue" />Software Solutions</span>
              <span><i className="signal signal--green" />Schools &amp; EdTech</span>
            </div>

            <motion.div
              className="home-film__headline"
              initial={{ opacity: 1, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 id="hero-heading"><span>Clear.</span><span>Precise.</span><span>Automated.</span></h1>
              <ContactActions inverse />
            </motion.div>

            <motion.aside
              className="home-film__glass-card"
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div><span className="glass-card__status" />Live operating view</div>
              <strong>Connecting dots</strong>
              <p>See the work, the system and the people it serves as one connected picture.</p>
            </motion.aside>
          </div>
          <div className="home-film__progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <div className="home-film-spacer" aria-hidden="true" />
    </>
  );
}
