import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { getWhatsAppHref } from "~/content/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="PRATIMA AI home">
        <img src="/assets/pratima-mark.svg" alt="" width="42" height="34" />
        <span>PRATIMA-AI</span>
      </NavLink>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className="menu-toggle__glyph" aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Primary">
        {links.map((link) => (
          <NavLink key={link.href} to={link.href} className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            {link.label}
          </NavLink>
        ))}
        <a className="nav-contact" href={getWhatsAppHref()}>
          Start a project <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
