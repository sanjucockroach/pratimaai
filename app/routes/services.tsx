import { motion } from "motion/react";
import type { MetaFunction } from "react-router";
import { AmbientVideo } from "~/components/AmbientVideo";
import { ContactActions } from "~/components/ContactActions";
import { servicePillars, siteConfig } from "~/content/site";
import type { PillarId } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "Services | PRATIMA AI" },
  { name: "description", content: "Applied AI support, custom software and education technology from one connected practice." },
  { property: "og:title", content: "Services | PRATIMA AI" },
  { property: "og:description", content: "Applied AI support, custom software and education technology from one connected practice." },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/services` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/services` },
];

/** Map each service practice to its ambient background video. */
const pillarVideo: Record<PillarId, string> = {
  "ai-support": "/video/connection.mp4",
  software: "/video/software.mp4",
  education: "/video/learning.mp4",
};

export default function ServicesRoute() {
  const serviceSchema = servicePillars.map((pillar) => ({
    "@type": "Service",
    name: pillar.name,
    description: pillar.summary,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
    areaServed: { "@type": "Country", name: siteConfig.areaServed },
    serviceType: pillar.name,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": serviceSchema }).replace(/</g, "\\u003c"),
        }}
      />

      <section className="services-cinema" aria-labelledby="services-heading">
        <motion.div
          className="services-cinema__media"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <AmbientVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            poster="/assets/services-hero-poster.png"
          />
        </motion.div>
        <motion.div
          className="services-cinema__footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <motion.p className="services-kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><span />Intelligence · Software · Learning</motion.p>
            <motion.h1 id="services-heading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><span>Three practices.</span><span>Zero silos.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>Choose one discipline or connect all three around the work that needs to change.</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><ContactActions compact /></motion.div>
          </div>
          <motion.div className="services-cinema__tags" aria-label="Service areas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span>AI intelligence</span><span>Software systems</span><span>EdTech</span>
          </motion.div>
        </motion.div>
      </section>

      <div className="service-detail-list">
        {servicePillars.map((pillar, index) => (
          <section key={pillar.id} id={pillar.id} className={`service-detail service-detail--${pillar.colour}`}>
            {/* Ambient background video for each practice */}
            <div className="service-detail__video" aria-hidden="true">
              <AmbientVideo
                src={pillarVideo[pillar.id]}
                poster="/assets/pratima-circuit-poster.png"
              />
            </div>
            <div className="service-detail__heading">
              <p className="utility-label">Practice {String(index + 1).padStart(2, "0")}</p>
              <h2>{pillar.name}</h2>
              <p>{pillar.summary}</p>
            </div>
            <div className="service-detail__columns">
              <div><h3>Suitable for</h3><ul>{pillar.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>What we can shape</h3><ul>{pillar.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>What remains</h3><ul>{pillar.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <ContactActions context={pillar.cta.toLowerCase()} compact />
          </section>
        ))}
      </div>
    </>
  );
}
