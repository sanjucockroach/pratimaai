import type { MetaFunction } from "react-router";
import { ContactActions } from "~/components/ContactActions";
import { siteConfig } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "Work | PRATIMA AI" },
  { name: "description", content: "PRATIMA AI case studies are being prepared for responsible publication." },
  { property: "og:title", content: "Work | PRATIMA AI" },
  { property: "og:description", content: "PRATIMA AI case studies are being prepared for responsible publication." },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/work` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/work` },
];

export default function WorkRoute() {
  return (
    <section className="coming-soon-page">
      <div className="coming-soon-page__copy">
        <p className="utility-label">Work / Publication in progress</p>
        <h1>We will publish the work when we can tell the whole story.</h1>
        <p>
          Case studies need context: the original problem, the decisions made, the system delivered and what can be shared responsibly. Those records are being prepared.
        </p>
        <ContactActions context="a relevant project or private capability conversation" />
      </div>
      <div className="coming-soon-page__field" aria-hidden="true">
        <span>Context</span><span>Decision</span><span>System</span><span>Outcome</span>
      </div>
    </section>
  );
}
