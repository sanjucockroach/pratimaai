import { Link } from "react-router";
import { getEmailHref, getWhatsAppHref, siteConfig } from "~/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__statement">
        <div className="site-footer__logo">
          <img
            src="/assets/pratima-lockup-transparent.png"
            alt="PRATIMA AI — Connecting Dots"
            width="967"
            height="512"
          />
        </div>
        <p>Connecting intelligence, software and learning.</p>
      </div>
      <div className="site-footer__grid">
        <div>
          <p className="utility-label">Explore</p>
          <Link to="/services">Services</Link>
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <p className="utility-label">Contact</p>
          <a href={getWhatsAppHref()}>WhatsApp</a>
          <a href={getEmailHref()}>{siteConfig.email}</a>
          <Link to="/contact">Contact details</Link>
        </div>
        <div>
          <p className="utility-label">Based in</p>
          <p>India</p>
          <p>Working across sectors.</p>
        </div>
      </div>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} PRATIMA AI</span>
        <span>CONNECTING DOTS</span>
      </div>
    </footer>
  );
}
