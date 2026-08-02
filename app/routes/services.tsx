import type { MetaFunction } from "react-router";
import { ContactActions } from "~/components/ContactActions";
import { NodeMotif } from "~/components/NodeMotif";
import { servicePillars, siteConfig } from "~/content/site";

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
      <header className="page-hero page-hero--services">
        <p className="utility-label">Services</p>
        <h1>Three practices. Equal weight. Connected when useful.</h1>
        <p>Start with the work that needs to change. We will help define the right system around it.</p>
      </header>
      <div className="service-detail-list">
        {servicePillars.map((pillar, index) => (
          <section key={pillar.id} id={pillar.id} className={`service-detail service-detail--${pillar.colour}`}>
            <div className="service-detail__heading">
              <p className="utility-label">{pillar.shortName}</p>
              <h2>{pillar.name}</h2>
              <p>{pillar.summary}</p>
            </div>
            <NodeMotif colour={pillar.colour} className="service-detail__motif" />
            <div className="service-detail__columns">
              <div>
                <h3>Suitable for</h3>
                <ul>{pillar.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>What we can shape</h3>
                <ul>{pillar.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>What the engagement should leave behind</h3>
                <ul>{pillar.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <ContactActions context={pillar.cta.toLowerCase()} compact />
            {index < servicePillars.length - 1 ? <div className="service-connector" aria-hidden="true" /> : null}
          </section>
        ))}
      </div>
    </>
  );
}
