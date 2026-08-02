import type { MetaFunction } from "react-router";
import { ContactActions } from "~/components/ContactActions";
import { TeamCarouselHero } from "~/components/TeamCarouselHero";
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
      <TeamCarouselHero />

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
