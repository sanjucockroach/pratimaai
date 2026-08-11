import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { getWhatsAppHref } from "~/content/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
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
    <header className={`site-header${location.pathname === "/about" ? " site-header--team" : ""}`}>
      <div className="nav-cluster nav-cluster--left">
        <Link to="/" className="brand-pill" aria-label="PRATIMA AI home">
          <img src="/assets/pratima-mark.svg" alt="" width="32" height="26" />
          <span>PRATIMA AI</span>
        </Link>
        <button
          className="menu-pill"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-pill__icon" aria-hidden="true">
            {open ? <X size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
          </span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <div className="discipline-pill" aria-label="PRATIMA AI disciplines">
          <span>AI intelligence</span>
          <span>Software</span>
          <span>Learning</span>
        </div>
      </div>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink key={link.href} to={link.href} className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <a className="project-pill" href={getWhatsAppHref()} target="_blank" rel="noreferrer">
        <span className="project-pill__grid" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span>Start a project</span>
      </a>

      <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Mobile navigation">
        <p>Explore PRATIMA AI</p>
        {links.map((link) => (
          <NavLink key={link.href} to={link.href} className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            <span>{link.label}</span><span aria-hidden="true">↗</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
