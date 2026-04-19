# Pre-Launch Checklist

User action items before going live at proovd.io.

## Assets (user provides)
- [ ] Favicon replaced (not the #3BED97 placeholder)
- [ ] Hero panel image at /public/assets/hero.[webp|png|jpg]
- [ ] Feature Pitch visual at /public/assets/feature-pitch.*
- [ ] Feature Match visual at /public/assets/feature-match.*
- [ ] Feature Proof visual at /public/assets/feature-proof.*
- [ ] Envelope graphic at /public/assets/envelope.*
- [ ] 5 ecosystem illustrations at /public/assets/ecosystem-[1-5].svg
- [ ] CTA strip side graphics (optional, hidden on mobile anyway)
- [ ] Optional: static /public/og.png if replacing dynamic generator

## Dokploy env vars
- [ ] NEXT_PUBLIC_SITE_URL=https://proovd.io
- [ ] NEXT_PUBLIC_SITE_DESCRIPTION
- [ ] NEXT_PUBLIC_CTA_PRIMARY_URL (decide: waitlist / Tally / Cal.com / app.proovd.io/signup)
- [ ] NEXT_PUBLIC_CTA_SECONDARY_URL
- [ ] NEXT_PUBLIC_UMAMI_SCRIPT_URL
- [ ] NEXT_PUBLIC_UMAMI_WEBSITE_ID
- [ ] NEXT_PUBLIC_CLARITY_PROJECT_ID

## Infra
- [ ] Umami deployed on Dokploy
- [ ] Umami website entry created
- [ ] Clarity project created at clarity.microsoft.com
- [ ] A record for proovd.io → VPS IP
- [ ] SSL cert auto-provisioned via Dokploy/Traefik
- [ ] proovd.tech 301-redirects to proovd.io (if owned)
- [ ] Dokploy auto-deploy verified at least once

## Functional verification (post-deploy)
- [ ] Desktop Chrome / Safari / Firefox render correctly
- [ ] Mobile iOS Safari + Android Chrome render correctly
- [ ] No prod console errors
- [ ] Umami receives a pageview
- [ ] Accept cookies → Clarity shows a session in the dashboard
- [ ] Lighthouse prod audit ≥ 90 all four metrics
- [ ] OG image renders when URL shared to Slack/Twitter
- [ ] SSL Labs test ≥ A grade (ssllabs.com/ssltest/)

## Investor reporting
- [ ] Umami dashboard credentials saved securely
- [ ] Clarity project access shared with stakeholders
- [ ] Weekly/monthly export template prepared
