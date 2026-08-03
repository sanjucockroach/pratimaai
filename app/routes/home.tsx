import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ContactActions } from "~/components/ContactActions";
import { Hero } from "~/components/Hero";
import { Reveal } from "~/components/Reveal";
import { processSteps, servicePillars, siteConfig } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "PRATIMA AI | Intelligence, Software and Learning" },
  { name: "description", content: siteConfig.description },
  { property: "og:title", content: "PRATIMA AI | Connecting Dots" },
  { property: "og:description", content: siteConfig.description },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: siteConfig.siteUrl },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: siteConfig.siteUrl },
];

export const links = () => [
  { rel: "preload", as: "image", href: "/assets/pratima-circuit-poster.png", fetchPriority: "high" },
];

const insightCapabilities = [
  {
    index: "01",
    title: "Real-time vision",
    body: "Reads context as it happens and surfaces what matters before you ask.",
  },
  {
    index: "02",
    title: "Layered insight",
    body: "Moves from rough outline to sharp output without losing the thread.",
  },
  {
    index: "03",
    title: "Adaptive speed",
    body: "Learns your cadence and tightens every pass as you work.",
  },
] as const;

export default function HomeRoute() {
  const filmRef = useRef<HTMLElement>(null);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PRATIMA AI",
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/assets/og-pratima.png`,
    "description": siteConfig.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.whatsappNumber,
      "contactType": "customer service",
      "email": siteConfig.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <section ref={filmRef} className="home-film" aria-labelledby="spade-hero">
        <Hero />
        <div className="home-film-spacer" aria-hidden="true" />
        <div className="insight-stage" aria-labelledby="insight-heading">
          <div className="insight-stage__copy">
            <Reveal>
              <p className="utility-label utility-label--light">Insight on demand</p>
              <h2 id="insight-heading">Learn to see clearly.</h2>
              <p>
                Most teams aren&apos;t short on information — they&apos;re buried in it. We turn what&apos;s scattered into one useful view, then build the software and learning systems that act on it.
              </p>
              <ContactActions compact />
            </Reveal>
          </div>
          <div className="capability-panel">
            {insightCapabilities.map((capability, index) => (
              <Reveal key={capability.index} delay={300 + index * 110}>
                <Link className="capability-row" to="/services#ai-support">
                  <span className="capability-row__index">{capability.index}</span>
                  <span className="capability-row__copy">
                    <strong>{capability.title}<ChevronRight size={16} aria-hidden="true" /></strong>
                    <span>{capability.body}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="practice-ledger" aria-labelledby="practices-heading">
        <div className="practice-ledger__intro">
          <p className="utility-label">Three connected practices</p>
          <h2 id="practices-heading">One operating view. Three ways to make it real.</h2>
        </div>
        <div className="practice-ledger__rows">
          {servicePillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 90}>
              <Link className={`practice-ledger__row practice-ledger__row--${pillar.colour}`} to={`/services#${pillar.id}`}>
                <span className="practice-ledger__signal" aria-hidden="true" />
                <span className="practice-ledger__name">{pillar.name}</span>
                <span className="practice-ledger__summary">{pillar.summary}</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="method-stage" aria-labelledby="method-heading">
        <div className="method-stage__heading">
          <p className="utility-label">How we work</p>
          <h2 id="method-heading">From unclear question to working system.</h2>
        </div>
        <ol className="method-stage__steps">
          {processSteps.map((step, index) => (
            <li key={step.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.name}</h3><p>{step.detail}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="work-preview" aria-labelledby="work-heading">
        <div>
          <p className="utility-label utility-label--light">Work / Publication in progress</p>
          <h2 id="work-heading">Evidence belongs with the real project.</h2>
        </div>
        <div>
          <p>Case studies are being prepared. We will publish only work we can explain accurately and responsibly.</p>
          <Link className="text-link text-link--light" to="/work">Visit the work page <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="closing-contact" aria-labelledby="closing-heading">
        <div><p className="utility-label">Start a conversation</p><h2 id="closing-heading">Bring us the problem before the specification.</h2></div>
        <div><p>Tell us what needs to change, who it affects and what a useful result would look like.</p><ContactActions compact /></div>
      </section>
    </>
  );
}

