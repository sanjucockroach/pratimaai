# PRATIMA AI Website

A statically rendered, India-first website for PRATIMA AI's connected practices in applied intelligence, custom software, and education technology.

## Run locally

```bash
npm install
npm run dev
```

## Public configuration

Copy `.env.example` to `.env` and provide the launch values:

- `VITE_PUBLIC_SITE_URL` — confirmed production origin, without a trailing slash.
- `VITE_PUBLIC_WHATSAPP_NUMBER` — international digits only, including country code.
- `VITE_PUBLIC_CONTACT_EMAIL` — public enquiry address.

Until the WhatsApp number and email are present, contact actions route to the honest configuration notice on `/contact`. Do not deploy that state.

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

Configure all three `VITE_PUBLIC_*` variables in the Vercel project before the production deployment. Because these values are embedded at build time, redeploy after changing them.

## Assets and security

- PRATIMA AI identity artwork is derived from the supplied business logo.
- The three locally served hero clips were downloaded from Mixkit under the Mixkit Stock Video Free License.
- Archivo Variable, IBM Plex Sans, and IBM Plex Mono are self-hosted under the SIL Open Font License 1.1.
- React Router 7.18.2 reports an advisory affecting React Server Components action handling. This site does not enable RSC, has no route actions, builds with `ssr: false`, and publishes no server bundle. Do not add RSC or a persistent React Router server without repeating the security review.

Production deployment should wait until the contact values and public site origin are confirmed.
