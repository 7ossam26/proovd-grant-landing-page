# Analytics Events

All events are fired via `trackEvent(name, payload)` in `src/lib/analytics.js`.
Events are sent to Umami through `window.umami.track` when the Umami script is loaded.
Clarity captures heatmaps / session replay separately and only when the user consents.

## Transports

- **Umami** — cookieless, always fires when `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are set. No consent required.
- **Microsoft Clarity** — cookie-based, only loads after the user clicks **Accept** in the cookie banner and `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set. Implemented in `src/components/ClarityScript.js`.
- If any env var is missing, the corresponding script silently does not load. The page works unchanged.

## The nine events

| Event | Payload | Trigger location |
|---|---|---|
| `cta_primary_click` | `{ location }` | Primary CTA buttons — FeaturePitch, FeatureMatch, FeatureProof, CtaStrip (Create account). `location` identifies the section. |
| `cta_secondary_click` | `{ location }` | Secondary CTA button — CtaStrip (Contact sales). |
| `nav_click` | `{ target }` | Top-nav links — Features, Contact, Sign up. `target` is the link identifier. |
| `footer_link_click` | `{ column, label }` | Any of the 4-column footer link grid. |
| `section_scroll_reached` | `{ section_id }` | Each of the 6 page sections when 30% of it enters viewport (IntersectionObserver). Fires once per section. |
| `external_link_click` | `{ href }` | Any footer link whose `href` matches `^https?://`. Fires alongside `footer_link_click`. |
| `outbound_cta_redirect` | `{ destination }` | CTA click whose `href` is an absolute URL. Fires alongside `cta_primary_click` / `cta_secondary_click`. |
| `time_on_page_bucket` | `{ seconds }` | 30 / 60 / 180 / 300 s thresholds. Registered by `AnalyticsLifecycle`. |
| `page_exit_scroll_depth` | `{ percent }` | `pagehide` event. Max depth observed during the visit. |

## Consent

- Consent state is managed by `ConsentProvider` in `src/lib/consent.js`.
- Stored under `localStorage["proovd_consent_v1"]` with values `accepted`, `declined`, or absent.
- `CookieBanner` renders only when the value is absent. After the user chooses, the banner hides for future visits.
- Clarity only injects its snippet once consent is `accepted`. It never loads in `declined` or initial states.

## Adding new events

1. Add the row to this table with payload and trigger.
2. Fire it from the component via `trackEvent("event_name", { ... })`.
3. Extend `tests/e2e/phase-6-analytics.spec.js` with a trigger test using the `window.umami` stub helper.
