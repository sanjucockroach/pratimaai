import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ContactActions } from "~/components/ContactActions";
import { Hero } from "~/components/Hero";
import { NodeMotif } from "~/components/NodeMotif";
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
  { rel: "preload", as: "image", href: "/assets/hero-poster.png", fetchPriority: "high" },
];

export default function HomeRoute() {
  return (
    <>
      <Hero />

      <section className="manifesto section-shell" aria-labelledby="manifesto-heading">
        <Reveal>
          <p className="utility-label">Our point of view</p>
          <h2 id="manifesto-heading">
            Intelligence is useful when it connects to real work.
            <span>Software is useful when people can operate it.</span>
            <span>Learning is useful when technology stays human.</span>
          </h2>
        </Reveal>
      </section>

      <section className="practices section-shell" aria-labelledby="practices-heading">
        <div className="section-intro">
          <p className="utility-label">Three connected practices</p>
          <h2 id="practices-heading">Different fields. One system of thinking.</h2>
          <p>
            Each practice stands on its own. They connect when a project needs technology, intelligence and the people who will use both.
          </p>
        </div>
        <div className="practice-grid">
          {servicePillars.map((pillar, index) => (
            <Reveal key={pillar.id}>
              <article className={`practice practice--${pillar.colour} practice--${index + 1}`}>
                <div className="practice__copy">
                  <p className="utility-label">{pillar.shortName}</p>
                  <h3>{pillar.name}</h3>
                  <p>{pillar.summary}</p>
                  <Link to={`/services#${pillar.id}`}>Explore this practice <span aria-hidden="true">→</span></Link>
                </div>
                <NodeMotif colour={pillar.colour} className="practice__motif" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-heading">
        <div className="section-intro section-intro--compact">
          <p className="utility-label">How we work</p>
          <h2 id="process-heading">A clear route from question to working system.</h2>
        </div>
        <ol className="process-track">
          {processSteps.map((step) => (
            <li key={step.name}>
              <span className="process-track__node" aria-hidden="true" />
              <h3>{step.name}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="work-preview section-shell" aria-labelledby="work-heading">
        <div>
          <p className="utility-label">Work</p>
          <h2 id="work-heading">Evidence belongs with the real project.</h2>
        </div>
        <div>
          <p>
            Case studies are being prepared for publication. We will share only work we can explain accurately and responsibly.
          </p>
          <Link className="text-link" to="/work">Visit the work page <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="closing-contact section-shell" aria-labelledby="closing-heading">
        <div>
          <p className="utility-label">Start a conversation</p>
          <h2 id="closing-heading">Bring us the problem before you bring us the specification.</h2>
        </div>
        <div>
          <p>Tell us what needs to change, who it affects and what a useful result would look like.</p>
          <ContactActions compact />
        </div>
      </section>
    </>
  );
}
