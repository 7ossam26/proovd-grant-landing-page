# AURA-Proovd — Project Design System

> The single source of truth for design decisions on the Proovd landing page.
> Replaces the prior generic anti-template ruleset and the generic AURA prompt.
> Pairs with `CLAUDE.md` (technical rules) and `Color.md` (palette rules).

---

## 1. The Real Goal

Build a landing page that **does not look AI-generated**. AI-generated sites have a recognizable signature — bento grid features, identical floating cards, "Ship faster" headlines, generic 4-column footers, shadcn shadow-sm + rounded-xl combos. Users have learned to spot this in 2 seconds and bounce. Trust dies on first impression.

This document exists to prevent that signature. It is not a technical straitjacket. The designer has full creative freedom on tools, libraries, and animation techniques. What is NOT free is the visual outcome — the page must feel built by a human who cared, not assembled from a template.

When in doubt: would a senior designer at Apple, Stripe, Linear, or Vercel ship this? If the answer is "this looks like every other AI landing page," redesign it.

---

## 2. Design Philosophy (AURA Principles, Adapted)

### Don't make the user think
Every screen self-evident. If a user wonders "what is this, what do I do, where am I?" — the design failed.

### Hierarchy is everything
Each screen has one unmistakable primary action. Secondary actions clearly secondary. Tertiary content visibly de-emphasized. Build hierarchy from size + weight + color + spacing, not from one of these alone.

### De-emphasize to emphasize
To make the hero pop, dim everything around it. Loud everywhere = loud nowhere.

### Beauty + usability are the same thing
Aesthetic-Usability Effect: beautiful interfaces feel more usable, are trusted faster, are forgiven for minor flaws. Polish is not optional.

### The details are the design
Empty states, loading states, error states, hover states, transitions — these ARE the product, not decoration. Design every state, not just the happy path.

### Move complexity from user to system
Tesler's Law. The user should never carry cognitive load that the system could absorb.

### Conventions matter (Jakob's Law)
Match what users know from other products. Innovate only when the gain justifies the learning cost. Logo top-left, primary CTA loudest, X closes.

### Peak-End rule
Users judge an experience by its emotional peak and how it ends. Engineer a peak. Nail the ending.

---

## 3. Locked Technical Decisions (DO NOT NEGOTIATE)

These are project-specific and override anything AURA's generic prompt says.

### Color
- **9 brand colors only.** See `Color.md` for the full palette and pairing rules.
- No grays, no `#000000`, no `#FFFFFF`, no rgba on text, no opacity on text.
- No gradients ever. No CSS shadows. No CSS blur. No CSS glow. No glassmorphism in CSS. (Effects baked into PNG/WEBP assets are fine.)

### Type
- **Satoshi only**, self-hosted from Fontshare. Globally set.
- Type scale uses `clamp(min-rem, vw-or-cqi, max-rem)` for fluid sizing across breakpoints.
- Body text minimum: 1rem (16px). Headings up to 3.625rem.

### Spacing
- Use `clamp()` with `vw`, `rem`, or `cqi`/`cqb` for scalable spacing.
- Common ladder: 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem, 12rem.
- Container queries on `containerType: inline-size` for layered visual columns.

### Stack
- Next.js 15 App Router, JavaScript only (not TypeScript).
- Tailwind v4 with `@theme` in CSS. No `tailwind.config.js`.
- Node 20, npm.
- Single-file components. No component libraries (no shadcn, no Headless UI).

### Animation (CREATIVE FREEDOM)
The designer chooses tools and techniques. Both of these are valid:
- Pure CSS keyframes for marquees, conveyors, autoplay loops
- Framer Motion / Motion One / GSAP for scroll-triggered, gesture-driven, or choreographed sequences

**The constraint is purpose, not tool.** Motion must orient, explain causality, draw attention, or express personality. Decorative-only motion is banned. Reduced-motion support is mandatory regardless of which tool ships it.

Easing: avoid linear. Ease-out for entering, ease-in for leaving, ease-in-out for transforms.
Duration: 150-300ms for most UI; longer for hero/signature moments.

### Components
- No `useState` unless the component has actual user-driven state
- No `useEffect` unless something must run on mount or react to prefs
- Static sections stay static — no inventing state to "make it dynamic"

### Assets
- Images: WebP preferred, PNG fallback for transparency
- Videos: WebM (VP9) source first, MP4 (H.264) fallback. `autoPlay muted loop playsInline`. No audio track.
- All decorative effects (blur, glow, glassmorphism) baked into the asset, not applied via CSS

### Env vars
- All CTA hrefs come from `NEXT_PUBLIC_CTA_PRIMARY_URL` / `NEXT_PUBLIC_CTA_SECONDARY_URL`, defaulting to `"#"`.

---

## 4. Anti-Generic Patterns (The Real Rules)

These are the patterns that scream "AI built this." Avoid them. The list is descriptive of what users have learned to spot, not prescriptive about what tools to use.

### Avoid: the bento grid feature section
3 or 4 cards in a grid, each with icon + heading + description stacked inside. Replace with: prose-led explanation, full-width alternating rows, asymmetric layouts, or a magazine-style spread where one feature gets 60% of the space and others get small treatments.

### Avoid: icons inside colored container shapes
No square/circle/rounded-rectangle/tinted-blob behind an icon. Icons appear inline with text or at full size next to content, never in a decorative wrapper.

### Avoid: the shadcn fingerprint
- `rounded-xl border bg-card text-card-foreground shadow-sm` cards
- `text-muted-foreground` for descriptions
- The `Card > CardHeader > CardTitle + CardDescription > CardContent` cascade
- `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2` buttons
- `bg-primary text-primary-foreground hover:bg-primary/90` button styling

### Avoid: the standard SaaS section ladder
Hero → logo marquee → 3-col features → "How it works" 3 steps → alternating screenshots → stats counter → testimonial wall → pricing → FAQ → CTA banner → footer. Choose what the page actually needs. Skip what it doesn't.

### Avoid: the generic 4-column footer
"Product / Company / Resources / Legal" with copyright-left + social-icons-right. If the design calls for a footer with 4 columns and bullet links (like Proovd's does), make sure the surrounding treatment — the logomark, the background tint, the spacing — is doing visible work to make it feel deliberate.

### Avoid: the AI hero stack
Eyebrow pill ("Introducing", "Now in beta") + gradient H1 + muted subtext + ghost+primary button pair + device-framed mockup + "Trusted by" grayscale logo marquee.

### Avoid: AI tells in copy
- Phrases: "ship faster," "build beautiful," "the future of," "the modern way to," "supercharge," "unlock the power of," "everything you need to," "10x your X," "AI-powered"
- Words: seamless, leverage (verb), elevate, empower, robust, cutting-edge, streamline, delve, harness, navigate (metaphorical), revolutionize, world-class
- The "not just X, but Y" contrastive construction
- The "No X. No Y. Just Z." rhythm

### Avoid: stock-photography energy
Generic stock photos signal corporate. Real photography, real screenshots, custom illustration, or no visual is better than a stock photo.

### Avoid: shadcn fingerprints in marketing pages
Even if shadcn is installed, marketing/landing surfaces should not look like shadcn. Reach past the defaults.

---

## 5. Hierarchy & Layout

- One primary action per screen. Make it unmistakable.
- Vary container widths between sections. `max-w-7xl` on every section is an AI tell.
- Vary vertical rhythm. Alternate tight (py-12) and spacious (py-32) sections.
- At least one section should break the centered container — full-bleed, asymmetric columns, or edge-to-edge visual.
- Different sections should have different visual treatments. If section 2 looks like section 4, redesign one.
- Don't divide with lines when whitespace alone works. Borders are a last resort.

---

## 6. Forms, States, Microinteractions

Every meaningful interaction has four parts (Saffer): trigger, rules, feedback, loops/modes.

- Forms: one column, top-aligned labels, ruthless field minimization, smart defaults
- Inline validation: confirm right as user types, show errors after they leave the field
- Error messages: what's wrong, why, how to fix. Never blame the user.
- Empty states: never blank. Illustrate, explain, offer the next action.
- Loading states: skeleton screens or progress over 400ms; show explicit progress over 1s
- Hover/focus states: visible and beautiful. Never `outline: none` without replacement.

---

## 7. Accessibility (Non-Negotiable)

- WCAG AA minimum, AAA where reasonable
- Semantic HTML + ARIA where needed
- Visible focus states, keyboard reachable
- Touch targets ≥ 44×44pt
- Respect `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`
- Color contrast tested
- Color is never the only signal of meaning
- Real `<ul>/<li>/<a>` for navigation, not `<div>` masquerades

---

## 8. Writing & Microcopy

- Replace "Submit" with action-specific labels ("Send invite," "Create account")
- Specific, human, short. Frame positively ("10 left" beats "Almost out")
- Empty/error/success/confirmation states are designed copy, not afterthoughts
- Voice and tone consistent across the page. Pick a personality and commit.

---

## 9. Final Self-Check (Run Silently Before Finishing Any Section)

Before considering work done:

- [ ] Could a new visitor identify what Proovd does and who it's for in under 5 seconds?
- [ ] Is the one most important action on the screen unmistakable?
- [ ] Do type, spacing, radius, and motion follow a coherent system?
- [ ] Have empty/loading/error/success/disabled/hover/focus states been designed?
- [ ] Mobile + keyboard + screen-reader friendly?
- [ ] Does at least one section have a signature moment (delight, surprise, polish)?
- [ ] Is the microcopy human, specific, and short?
- [ ] Would a thoughtful user feel respected, not manipulated?
- [ ] Could this section appear on any other AI-built site without modification? If yes, it's not Proovd-specific enough — redesign.

---

## 10. What This File Is NOT

- Not a list of banned tools. Framer Motion, GSAP, Motion One, scroll-triggered animation, parallax, CSS Houdini — all permitted when they serve the design.
- Not a generic AI-detection ruleset. The point isn't to pass a "fooled-a-detector" test. The point is to feel handcrafted to the user.
- Not a substitute for `Color.md` or `CLAUDE.md`. Read those first. This file complements them.
- Not static. When a new pattern emerges that screams AI, add it to Section 4. When a constraint blocks creative work without earning trust, soften it.

The discipline is in the visual outcome. Tools are free.
