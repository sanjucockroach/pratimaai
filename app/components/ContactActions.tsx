import { getEmailHref, getWhatsAppHref } from "~/content/site";

interface ContactActionsProps {
  context?: string;
  inverse?: boolean;
  compact?: boolean;
}

const externalProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

export function ContactActions({
  context = "a project with PRATIMA AI",
  inverse = false,
  compact = false,
}: ContactActionsProps) {
  const whatsappHref = getWhatsAppHref(context);
  const emailHref = getEmailHref(`PRATIMA AI: ${context}`);

  return (
    <div className={`contact-actions${compact ? " contact-actions--compact" : ""}`}>
      <a
        className={`button button--primary${inverse ? " button--inverse" : ""}`}
        href={whatsappHref}
        {...externalProps(whatsappHref)}
      >
        Start on WhatsApp <span aria-hidden="true">↗</span>
      </a>
      <a className={`button button--secondary${inverse ? " button--on-dark" : ""}`} href={emailHref}>
        Email us <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
