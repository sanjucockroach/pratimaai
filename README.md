# PRATIMA AI Website

A statically rendered, India-first website for PRATIMA AI's connected practices in applied intelligence, custom software, and education technology. Its new editorial-cinematic direction uses a scroll-controlled homepage film and distinct full-screen compositions for Services and About.

## Run locally

```bash
npm install
npm run dev
```

## Public configuration

The repository includes public defaults for the confirmed contact details and site URL. Copy `.env.example` to `.env` only when an environment needs to override them:

- `VITE_PUBLIC_SITE_URL` — confirmed production origin, without a trailing slash.
- `VITE_PUBLIC_WHATSAPP_NUMBER` — international digits only, including country code.
- `VITE_PUBLIC_CONTACT_EMAIL` — public enquiry address.

## Quality gate

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

The production build prerenders `/`, `/services`, `/work`, `/about`, and `/contact` into `build/client`.

## Vercel

The repository includes `vercel.json` with:

- `npm run build` as the production build command.
- `build/client` as the static output directory.
- Clean, extension-free public URLs.

The three `VITE_PUBLIC_*` values may be overridden in Vercel. Because they are embedded at build time, redeploy after changing them.

## Assets and security

- PRATIMA AI identity artwork is derived from the supplied business logo.
- The homepage uses the supplied `hf_20260601_110537…` CloudFront video asset with its matching poster; Services uses the supplied `hf_20260508_215831…` film and its own route-matched poster.
- About uses the four supplied remote figurine images as a temporary team carousel until PRATIMA AI team miniatures are available.
- Inter Variable and IBM Plex Mono are self-hosted under the SIL Open Font License 1.1.
- React Router 7.18.2 reports an advisory affecting React Server Components action handling. This site does not enable RSC, has no route actions, builds with `ssr: false`, and publishes no server bundle. Do not add RSC or a persistent React Router server without repeating the security review.

The committed defaults are `https://pratimaai.com`, WhatsApp `+91 70268 11812`, and `infopratimaai@gmail.com`.
