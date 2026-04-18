# Project Conventions

## File structure

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── robots.js
│   ├── sitemap.js              (Phase 7)
│   └── opengraph-image.js      (Phase 7)
├── components/
│   ├── ui/                     Button, Section, typography
│   ├── layout/                 Nav, Footer, CookieBanner
│   └── sections/               Hero, FeaturePitch, FeatureMatch, FeatureProof, LongScroll, CtaStrip
└── lib/
    ├── analytics.js
    ├── consent.js              (Phase 6)
    └── useSectionInView.js     (Phase 6)
```

## CTA env var pattern

Every CTA reads its href from env vars. The user flips the destination by changing env in Dokploy — no code changes.

- `NEXT_PUBLIC_CTA_PRIMARY_URL` → default `"#"` (Create account / primary)
- `NEXT_PUBLIC_CTA_SECONDARY_URL` → default `"#"` (Contact sales / secondary)
- `NEXT_PUBLIC_SITE_URL` → default `"http://localhost:3000"`

Phase 6 adds:
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`

All analytics env vars are optional — if unset, scripts don't load and the page still works.

## Analytics events (wired in Phase 6, stubbed before)

| Event | Payload | Trigger |
|---|---|---|
| `cta_primary_click` | `{location}` | primary CTA clicked |
| `cta_secondary_click` | `{location}` | secondary CTA clicked |
| `nav_click` | `{target}` | top-nav link clicked |
| `footer_link_click` | `{column, label}` | footer link clicked |
| `section_scroll_reached` | `{section_id}` | section enters viewport (IntersectionObserver 30%) |
| `external_link_click` | `{href}` | outbound link clicked |
| `outbound_cta_redirect` | `{destination}` | CTA redirects to env-var URL |
| `time_on_page_bucket` | `{seconds}` | 30, 60, 180, 300s thresholds |
| `page_exit_scroll_depth` | `{percent}` | `pagehide` event |

Umami fires always. Clarity fires only after user consent.

## Assets placeholder protocol

Assets will be delivered by the user later. Until then:

- Placeholder: `bg-[#D9D9D9]` div sized to Figma spec
- Every placeholder has an HTML comment: `<!-- TODO(assets): <description> — see /docs/assets-needed.md -->`
- `/docs/assets-needed.md` is the single running checklist — update it whenever you add a placeholder

## Git

- Branch: `main` only
- Commit message: `Phase N: <short summary>`
- Push to main = auto-deploy via Dokploy
- No PR workflow — solo dev, fast iteration

## Section tones (per Color.md)

Section component accepts a `tone` prop that maps to background color:
- `paper` (surface #FAFAFA)
- `midnight` (ink #09110C)
- `forest` (brand-forest #1E4D2F)
- `meadow` (brand-lime #BCFCA1)
- `sage` (brand-sage #5AAA77)
- `zest` (brand-citrus #EAFF72) — rare, urgency only
- `breeze` (brand-sky #C8FCFF) — rare, small accents only

Never stack two non-surface sections of the same tone adjacently. Never stack lime+sage or citrus+lime or citrus+sky.
