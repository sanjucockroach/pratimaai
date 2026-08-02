import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import type { ReactNode } from "react";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { siteConfig } from "~/content/site";
import "~/styles/main.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" },
  { rel: "icon", type: "image/svg+xml", href: "/assets/pratima-mark.svg" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.siteUrl,
              logo: `${siteConfig.siteUrl}/assets/pratima-mark.svg`,
              description: siteConfig.description,
              areaServed: { "@type": "Country", name: siteConfig.areaServed },
              knowsAbout: [
                "Applied artificial intelligence",
                "Custom software development",
                "Education technology",
              ],
              ...(siteConfig.email ? { email: siteConfig.email } : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <noscript><style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = status === 404 ? "This connection does not exist." : "The page could not be loaded.";
  return (
    <div className="error-page">
      <p className="utility-label">ERROR / {status}</p>
      <h1>{message}</h1>
      <a className="button button--primary" href="/">Return home →</a>
    </div>
  );
}
