import { motion } from "motion/react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { AmbientVideo } from "~/components/AmbientVideo";
import { ContactActions } from "~/components/ContactActions";
import { siteConfig } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "About | PRATIMA AI" },
  { name: "description", content: "Why PRATIMA AI connects intelligence, software and learning as one practice." },
  { property: "og:title", content: "About | PRATIMA AI" },
  { property: "og:description", content: "Why PRATIMA AI connects intelligence, software and learning as one practice." },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/about` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/about` },
];

const principles = [
  ["Start with the work", "Technology is a response to a real operating or learning need, not the opening assumption."],
  ["Make the connection visible", "People should understand what a system uses, changes and returns to them."],
  ["Build for operation", "A release matters when the organisation can use, support and improve it."],
  ["Keep people responsible", "AI can assist decisions and work. Human judgement and accountability remain part of the system."],
] as const;

export default function AboutRoute() {
  return (
    <>
      <section className="about-cinema" aria-labelledby="about-heading">
        <AmbientVideo
          className="about-cinema__video"
          poster="/assets/hero-poster.png"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
        />
        <div className="about-cinema__wash" />
        <motion.div className="about-cinema__content" initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <p className="utility-label">About PRATIMA AI</p>
          <h1 id="about-heading"><span>Purpose.</span><span>Connected.</span></h1>
          <p>A central intelligence connects distinct fields without flattening what makes each one different.</p>
          <div className="about-cinema__actions">
            <Link className="soft-button" to="#principles">How we work</Link>
            <a className="dark-button" href={siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : "/contact"}>Start a conversation</a>
          </div>
        </motion.div>
      </section>

      <section className="about-statement">
        <div>
          <p className="utility-label">Connecting dots</p>
          <h2>The logo is an operating idea, not a decoration.</h2>
        </div>
        <div>
          <p>PRATIMA AI works across applied intelligence, software and education.</p>
          <p>The connection is a shared method: understand the people and work, define the system, build it clearly and remain available after release.</p>
        </div>
      </section>

      <section id="principles" className="principles" aria-labelledby="principles-heading">
        <div className="principles__heading"><p className="utility-label utility-label--light">Operating principles</p><h2 id="principles-heading">The discipline behind the connection.</h2></div>
        <div className="principles-list">
          {principles.map(([title, detail], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>
          ))}
        </div>
      </section>

      <section className="closing-contact">
        <div><p className="utility-label">Talk with us</p><h2>Start with a useful question.</h2></div>
        <div><p>We can help clarify whether the work needs AI, software, education technology or a connection between them.</p><ContactActions compact /></div>
      </section>
    </>
  );
}
