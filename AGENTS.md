# Proovd — Agent Instructions

You are working on the Proovd landing page. Before writing any code, read these files in order:

1. `/docs/PROJECT_CONTEXT.md` — what Proovd is
2. `/docs/TECH_STACK.md` — locked tech decisions
3. `/docs/CONVENTIONS.md` — file structure, env vars, analytics events, git conventions
4. `/docs/design-rules/Color.md` — every color rule is absolute
5. `/docs/design-rules/anti-ai-slop.md` — every negative rule is absolute
6. `/EXECUTION_PLAN.md` — which phase you're in and what ships

## Hard rules (repeated here for emphasis)

- Only the 9 brand colors. No grays, no pure black, no pure white.
- Brand-primary (#3BED97) appears on the page exactly TWICE: logo dot + one mint CTA in the final CTA strip. Nowhere else.
- No shadows, gradients, glow, blur anywhere. Ever.
- No feature cards (icon + heading + desc stacked in container). No icons inside container shapes.
- No Lucide icons. Inline SVG only.
- Figma drift warning: the Figma file uses #45D891 / #41ED98 for "primary green" — that is wrong. Always use #3BED97 per Color.md.
- Satoshi is the only font. Self-hosted from Fontshare.
- JavaScript, not TypeScript. Tailwind v4 with @theme (no tailwind.config.js).
- Every CTA href comes from env vars, default "#".
- Every placeholder asset has a `<!-- TODO(assets): ... -->` comment and an entry in `/docs/assets-needed.md`.

## Before you finish a session

- Run `npm run build` and verify clean build
- Run `npm run test:e2e` and verify all prior + current phase tests pass
- Update `/docs/assets-needed.md` with any new placeholders
- Commit with message `Phase N: <short summary>` and push to main
