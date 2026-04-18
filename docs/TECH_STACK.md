# Tech Stack (locked)

## Framework & language
- Next.js 15+ App Router
- JavaScript — NOT TypeScript
- Node 20 LTS
- npm as package manager

## Styling
- Tailwind CSS v4 (use `@theme` directive in CSS, do NOT create `tailwind.config.js`)
- Satoshi font, self-hosted from Fontshare (weights 400, 500, 700, 900)

## Animation
- `motion` package (Framer Motion successor) — used sparingly
- Hover/click state changes only. NO scroll-triggered animations. NO `whileInView`. NO parallax.

## Testing
- Playwright for e2e
- One lean smoke spec per phase. Full suite in Phase 7.

## Deployment
- Docker (multi-stage, Node 20 alpine)
- Hostinger VPS via Dokploy
- Dokploy's native Git autodeploy on push to `main`
- No GitHub Actions

## Analytics
- Umami (self-hosted on Dokploy) — cookieless, always fires
- Microsoft Clarity (hosted) — heatmaps + session replay, only fires with cookie consent
- No other analytics (no GA, no Plausible, no PostHog, no Sentry on landing)

## Domains
- Primary: proovd.io (this landing)
- MVP later: app.proovd.io (separate repo, out of scope)

## Figma
- File key: `tv1Cd0ZXpXZCkCkrr8Qx82`
- Connect Figma MCP in Claude Code to inspect nodes
- The Figma uses `#45D891` for "primary green" — this is a drift from Color.md. Always use `#3BED97`.
