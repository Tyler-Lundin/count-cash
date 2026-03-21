# Countcash

Countcash is a local-first cash counter built with Next.js App Router and React 19. The current app is static-first and does not include backend APIs, accounts, or payment flows.

## Development

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Production

Build and start the production app with:

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` for metadata routes like `sitemap.xml` and `robots.txt`. `SITE_URL` may also be used in CI or managed hosting environments.

## Deployment Security

Countcash should be deployed on a managed frontend host or behind a hardened reverse proxy. Do not expose management services such as RDP (`3389`) or administrative login surfaces to the public internet for this site.

See `SECURITY.md` for the deployment baseline and incident response notes.
