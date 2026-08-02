import type { MetaFunction } from "react-router";
import { getEmailHref, getWhatsAppHref, siteConfig } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "Contact | PRATIMA AI" },
  { name: "description", content: "Start a direct conversation with PRATIMA AI about an AI, software or education project." },
  { property: "og:title", content: "Contact | PRATIMA AI" },
  { property: "og:description", content: "Start a direct conversation with PRATIMA AI about an AI, software or education project." },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/contact` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/contact` },
];

export default function ContactRoute() {
  const configured = Boolean(siteConfig.whatsappNumber && siteConfig.email);
  return (
    <section className="contact-page" id="contact-details">
      <div className="contact-page__intro">
        <p className="utility-label">Contact</p>
        <h1>Tell us what needs to change.</h1>
        <p>
          A useful first message names the organisation, the people affected, the current problem and the result you are trying to reach.
        </p>
      </div>
      <div className="contact-options">
        <a className="contact-option contact-option--primary" href={getWhatsAppHref("a new project")}>
          <span className="utility-label">Primary channel</span>
          <strong>WhatsApp</strong>
          <span>{siteConfig.whatsappNumber ? "Start a direct conversation" : "Number pending configuration"}</span>
          <i aria-hidden="true">↗</i>
        </a>
        <a className="contact-option" href={getEmailHref()}>
          <span className="utility-label">Alternative channel</span>
          <strong>Email</strong>
          <span>{siteConfig.email ?? "Address pending configuration"}</span>
          <i aria-hidden="true">→</i>
        </a>
      </div>
      {!configured ? (
        <p className="configuration-notice" role="status">
          Public contact details have not yet been supplied. They must be configured before this site is deployed.
        </p>
      ) : null}
      <aside className="contact-page__expectation">
        <p className="utility-label">What happens next</p>
        <p>We read the context, identify the most useful first question and continue the conversation directly. There is no automated sales sequence.</p>
      </aside>
    </section>
  );
}
