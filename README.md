# Portfolio

Bilingual (Indonesian / English) personal portfolio built with the Next.js 16 App Router.

## Stack

- Next.js 16.4.6, App Router, Turbopack
- React 19, TypeScript
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- `next-themes` for light/dark/system
- `lucide-react` for icons

Two Next 16 features shape how this app is written, and both are on in `next.config.ts`:

- **Cache Components** (`cacheComponents: true`) — Partial Prerendering is the default. Anything reading the current time, randomness, or request data has to be explicitly cached (`"use cache"`) or streamed behind `<Suspense>`. `src/components/footer.tsx` caches the current year this way.
- **Partial Prefetching** (`partialPrefetching: true`) — links prefetch each route's App Shell by default.

## Requirements

Node **20.9 or newer** (`engines.node`). CI and the Docker image pin Node 22.

A previous note here claimed `next start` answered 500 on every route under
pre-release Node builds while the build still succeeded. That did not reproduce
on v26.10.0: `/id` and `/en` served 200, `/` returned the 308 to `/id`, an
unknown path 404'd, and `POST /api/contact` 405'd. The pin at 22 is kept because
that is the version CI actually exercises, not because newer versions are known
broken.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 -> redirects to /id
npm run build
npm start
```

The root `/` redirects to `/id` (see `next.config.ts`).

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | in production | Where `POST /api/contact` forwards submissions. Without it the endpoint returns **503** in production rather than silently discarding the message; in development it logs and returns 200 so the form stays testable. |

The webhook receives `{ name, email, message }` as JSON.

## Deploy

Two containers, and Caddy handles TLS for `proxi.cc.cd` on its own:

```bash
cp .env.example .env      # fill in CONTACT_WEBHOOK_URL
docker compose up -d --build
```

`app` is not published to the host — only Caddy reaches it, over the compose
network, by service name. `compose.yaml` and `deploy/Caddyfile` hold the
details, including how to drop Caddy and point an existing nginx at the app
instead.

DNS for the domain has to point at the host before the first start; Caddy
validates over HTTP, so it cannot get a certificate otherwise.

To smoke-test the stack before DNS is live, serve it over plain HTTP instead:

```bash
SITE_ADDRESS=:80 docker compose up -d --build
curl -sI http://127.0.0.1/id | head -1
```

`SITE_ADDRESS` feeds the site address in `deploy/Caddyfile` and defaults to
`proxi.cc.cd`, so the same config serves both cases without edits.

To survive reboots, install the unit:

```bash
sudo cp deploy/portfolio.service /etc/systemd/system/
sudo systemctl enable --now portfolio
```

Its `WorkingDirectory` is `/opt/portfolio` — change it if the repo lives
elsewhere. Because the unit passes `--build`, `git pull` followed by
`systemctl restart portfolio` is a complete deploy.

The image runs the traced server from `.next/standalone` rather than
`next start`, so the runtime it ships is the one the build was verified against.

## Editing the content

All copy is in two typed dictionaries that must stay in sync — `en.ts` defines the shape, `id.ts` is annotated with it:

```
src/lib/i18n/dictionaries/en.ts
src/lib/i18n/dictionaries/id.ts
```

Identity used outside the copy — site URL, contact email, social links — lives in `src/lib/site.ts`. `siteConfig.url` feeds `metadataBase`, canonical and hreflang tags, `sitemap.ts`, `robots.ts`, and the JSON-LD `@id`s, so changing it there changes all of them.

## Structure

```
src/app/
  [lang]/                 locale segment: layout, page, error, not-found
    [...rest]/            routes unmatched paths through notFound() so they
                          render the localized 404 inside the layout
    opengraph-image.tsx   per-locale social card
  api/contact/route.ts    contact endpoint (validation, rate limit, honeypot)
  global-not-found.tsx    last-resort 404; bypasses the layout, so it applies
                          the theme itself
  icon.tsx, apple-icon     generated from the name's first letter
  manifest.ts, robots.ts, sitemap.ts
src/components/           navbar, mobile nav, theme + language switchers, form
src/components/sections/  hero, about, projects, contact
src/lib/i18n/             locales, dictionaries, useLocaleFromPathname
```

Deployment lives outside `src/`: `Dockerfile`, `compose.yaml`, and `deploy/`
(Caddyfile + systemd unit).

## Accessibility

Verified against WCAG AA, not assumed:

- Text pairings computed, not eyeballed. `--muted` is 4.76:1 on white and 7.86:1 on the dark background; status text uses `red-600`/`emerald-700` in light mode and the lighter `-400` steps in dark, because `red-500` (3.76:1) and `emerald-500` (2.54:1) fail on white.
- Form fields use `--input-border` (4.76:1 on white) rather than `--border` (1.23:1). A field's background matches the page, so its edge is the only thing identifying it — the decorative border is fine for dividers, not for control boundaries.
- Visible `:focus-visible` ring on every focusable element, via the base layer.
- Skip-to-content link, `<main>` landmark, one `<h1>` per page, `<html lang>` per locale.
- Popovers close on Escape and return focus to their trigger; `cursor: pointer` is restored in the base layer because Tailwind's preflight resets it.
- `prefers-reduced-motion` disables smooth scrolling.

## License

Private personal project.