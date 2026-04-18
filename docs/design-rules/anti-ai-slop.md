# Anti-AI-Slop Design Rules

**Read this entire document before writing a single line of code. Every rule is absolute. No exceptions. No loopholes. If a rule says "do not," it means never, not "find a creative way to do it anyway."**

---

## Primary directives (read first)

1. **Do not use cards to present features.** Not default cards, not customized cards, not "different style" cards. No container with an icon, a heading, and a description stacked inside it. Present features as prose, horizontal rows of text, numbered typography, or magazine-style layouts instead.
2. **Do not put icons inside any container shape** — no square, no circle, no rounded rectangle, no tinted blob, no colored background behind an icon. Icons appear inline with text or at full size next to content, never inside a decorative wrapper.
3. **Do not use the shadcn/Tailwind defaults in any form.** Not the class strings, not the component structures, not the colors, not the spacing rhythm. If shadcn ships it as a template, do not output it.
4. **Do not default to "grid of equal-sized things."** Not 3-col features, not 2x2 bento, not 4-col anything. Use asymmetric layouts, full-width rows, or single-column prose.
5. **Do not use decorative elements to communicate value.** Icons, badges, gradients, animations, device frames, and avatar circles are banned unless they contain actual information the user needs.

---

## Feature presentation (the rule most often violated)

- Do not put features in cards of any kind
- Do not create a grid where each cell has an icon + heading + description
- Do not use a bento grid for features
- Do not use the "one highlighted dark card among light cards" pattern (this is the classic bento tell)
- Present features using one of these patterns instead:
  - Long-form prose with feature names as inline bold text
  - Horizontal full-width rows with left-aligned text and no container
  - A numbered list with large numerals and no boxes
  - Magazine-style spread: one featured item gets 60% of the space, others get small text treatments
  - Single-column list where each feature is separated only by whitespace, no borders
- No feature section may contain repeating identical containers

## Icons

- No emoji anywhere on the page, for any reason, in any location
- No icons inside colored containers, tinted backgrounds, squares, circles, or rounded rectangles
- No icon-top placement in any layout
- No Lucide icons at default `h-4 w-4` / `h-6 w-6` / `h-10 w-10` sizing
- No Lucide icon blob pattern (`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10`)
- No reliance on these Lucide icons as visual shorthand: Zap, Sparkles, ArrowRight, Check, Star, Shield, Globe, Lock, Rocket, ChevronRight, Code, Layers, Cpu, TrendingUp, Users, DollarSign
- If you use icons at all, use them inline with text at text-size, with a non-default strokeWidth (1.25 or 1.75, not 1.5 or 2)
- Prefer real photography, illustrations, screenshots, or no visual over generic icons

## Cards (general, not just features)

- No card uses `rounded-xl border bg-card text-card-foreground shadow-sm` or any variation of this class string
- No card uses any shadow (no `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, or custom box-shadow)
- No card uses hover effects (no scale, no translate, no border glow, no gradient border, no backdrop-blur)
- No card uses the shadcn cascade: Card > CardHeader > CardTitle + CardDescription > CardContent > CardFooter
- No card uses `text-muted-foreground` for descriptions
- No card uses `p-6` uniform padding
- No card uses `font-semibold leading-none tracking-tight` titles
- If cards appear anywhere on the page (for testimonials, blog posts, team members, etc.), they must have no border OR no background OR no shadow — they cannot have all three

## Section order & structure

- Do not output: announcement bar → glass nav → hero → logo marquee → feature grid → "how it works" → left/right showcases → stats → testimonials → pricing → FAQ → CTA → footer
- Do not output the dev-tool variant: hero+terminal → GitHub stars → features → orbit diagram → code comparison → stats → pricing → footer
- Do not include a "How it works" section with 3 numbered steps
- Do not include alternating left/right feature showcases with device-framed screenshots
- Do not include a stats counter strip
- Do not include a competitor comparison table
- Do not include a team member grid unless the entire page is an About page
- Do not include a vertical timeline / tracing beam
- Do not include an integration orbit diagram
- Do not include a full-bleed CTA banner before the footer
- Do not include an FAQ accordion
- Do not include a testimonial wall
- Pre-launch pages must contain only: hero → features-as-prose → email capture → footer
- Every section must directly serve the single action this page exists to drive

## Layout & spacing

- Do not center-align every section in `max-w-7xl`
- Do not use `grid md:grid-cols-3 gap-6` for features
- Do not use `container mx-auto px-4 max-w-7xl` + `py-16 md:py-24` on every section
- Do not use uniform `py-24` or `py-20` section rhythm — alternate between tight (py-12) and spacious (py-32)
- Vary container widths across sections: use `max-w-4xl` for text-heavy sections, `max-w-2xl` for forms, full-bleed for visual sections
- At least one section must be asymmetric (40/60 or 30/70 columns, offset content, or edge-to-edge)
- At least one section must break the container entirely (full-bleed)

## Borders, shadows & effects (global)

- No `shadow-sm` anywhere on the page
- No decorative shadows on any element — shadows only appear on elements that are functionally elevated (open dropdowns, active modals)
- No `rounded-xl` as the default radius — mix radius values deliberately, including zero
- No gradient borders (`p-[1px] bg-gradient-to-r` trick, Magic UI BorderBeam, animated conic gradients)
- No backdrop-blur on more than one element on the page
- No noise/grain texture overlays
- No `hover:scale-[1.02]`, `hover:scale-105`, `hover:-translate-y-1`, or any hover transform
- No 3D tilt, Spotlight cursor follower, or Glare sweep hover effects
- Hover effects must be background color OR border color transitions only

## Navigation

- Do not output `sticky top-0 z-50 border-b bg-background/95 backdrop-blur` at `h-16`
- Do not use "Features / Pricing / Docs / Blog" as nav links — match the actual product's information architecture
- Do not use a floating pill nav (Aceternity FloatingNavbar)
- Do not include an announcement bar above the nav
- Do not pair "Sign in" (ghost) + "Get Started" (primary) buttons in the nav without adapting labels to the actual product
- Do not include a ⌘K command palette trigger unless the product has real search
- Do not include a dark mode toggle unless dark mode serves a real user need
- Do not include a GitHub stars badge unless it's a real open-source project
- Do not use the shadcn Sheet for mobile menu

## Footer

- Do not use a four-column footer titled Product / Company / Resources / Legal
- Do not use copyright-left + social-icons-right in a `border-t pt-8` bar
- Do not include "Built with Next.js / Deployed on Vercel" attribution
- Do not include a newsletter signup unless it's a real newsletter
- Do not include a language + theme switcher pair

## Hero

- Do not combine all of these in a hero: eyebrow pill + gradient H1 + muted subtext + primary/ghost button pair + device-framed mockup
- Do not place a "Trusted by" grayscale logo marquee directly below the hero
- Do not include an eyebrow pill saying "Introducing" / "Now in beta" / "New:" / "We just raised"
- Do not include Product Hunt / YC / "As seen in" badges unless real
- Do not include a fake AI chat preview
- Do not include a terminal/code block with typewriter effect
- Do not place product screenshots in Mac, Safari, or iPhone device frames

## Buttons

- Do not use the shadcn default: `bg-primary text-primary-foreground hover:bg-primary/90`
- Do not append an ArrowRight icon to any CTA button — max one button with an arrow on the entire page, and preferably zero
- Do not pair a ghost + primary button as the default CTA arrangement — use one prominent CTA per section
- Do not use the shadcn button class string: `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2`
- Do not use the shadcn focus ring: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

## Social proof

- Do not use a grayscale logo marquee with infinite scroll and mask-fade
- Do not present testimonials as 3 cards with avatar + quote + "Name, Title at Company"
- Do not use an auto-scrolling testimonial wall (Magic UI Marquee / Aceternity InfiniteMovingCards)
- Do not fabricate testimonial names, companies, or review counts
- Do not use stacked overlapping avatar circles with "Loved by 10,000+" text
- Do not include star ratings unless they link to a real, verifiable review source

## Stats

- Do not use a stats counter strip with large numbers and uppercase monospace labels
- Do not use NumberTicker count-up animations
- Do not fabricate any statistic — every number on the page must be real and auditable
- Integrate real numbers into prose, not into dedicated stats sections

## Pricing

- Do not use 3 tiers with the middle one highlighted via `border-primary + shadow-lg + scale-105 + "Most Popular" badge`
- Do not use Lucide Check / X for feature comparison lists
- Do not include a monthly/annual toggle with "Save 20%" unless prices are real

## FAQ

- Do not include a generic FAQ section with questions like "Is there a free trial?" / "Can I cancel anytime?" / "Is my data secure?"
- If an FAQ is genuinely needed, questions must be product-specific and cannot be copy-pasted onto any other site
- Do not use the shadcn Accordion component unchanged

## Miscellaneous banned elements

- No pulsing green dot with "Live" / "Online" label
- No gradient pill badges ("New", "Beta", "Pro", "AI-Powered")
- No world map or globe with animated arcs
- No floating AI chat FAB
- No cookie consent banner unless GDPR-required
- No scroll-to-top button
- No Recharts dashboard mockup in the hero
- No editorial serif accent word (one serif word inside a sans-serif headline)
- No App Store + Google Play badges unless the product has real mobile apps
- No "Most Popular" / "Recommended" badges on anything

## Animations

- No Framer Motion fade-up on scroll applied to multiple sections
- No `staggerChildren` on more than one section
- No parallax
- No word-by-word text reveals (TextReveal)
- No infinite logo/testimonial marquee
- No scroll-velocity marquee
- No typewriter effects
- No Flip Words cycling
- No letter-scramble (HyperText), shimmer text, Aurora Text, or TextGenerateEffect
- No Aurora, Meteor, Particle, Flickering Grid, Lamp Effect, or BackgroundBeams backgrounds
- No `animate-ping` status dots
- No canvas-confetti
- No `animate-in fade-in-0 zoom-in-95` for modals
- No `animate-pulse` skeleton states on marketing pages
- If any motion appears on the page, it must be on user interaction (click, hover, focus), not on scroll or page load

## Copy & content

- Do not use these headlines or any variant: "Ship/Build/Move faster", "Build beautiful [X]", "The future of [X]", "The modern way to [X]", "Supercharge your [X]", "Unlock the power of [X]", "Everything you need to [X]", "[X] without [Y]", "Your all-in-one platform", "10x your [X]", "Powered by AI", "Built for teams who..."
- Do not use these subheadings: "Built for teams who want to move fast", "The easiest way to [X]", "From idea to production in minutes", "Join 5,000+ builders"
- Do not use these CTAs verbatim: "Get started free", "Start for free", "Book a demo", "No credit card required", "Get started in minutes"
- Do not use these pill labels: "Introducing", "Now in beta", "New:", "We just raised", "Announcing", "AI-powered"
- Do not use these social proof phrases: "Loved by 10,000+ developers", "Trusted by teams at", "Join 5,000+ builders"
- Do not use these words: seamless, leverage (verb), elevate, empower, robust, cutting-edge, streamline, delve, landscape (metaphorical), tapestry, harness, game-changer, revolutionize, best-in-class, holistic, unparalleled, navigate (metaphorical), world-class, next-generation, state-of-the-art, synergy
- Maximum 2 em dashes per section
- No three-word value props in "Adjective + Adjective + Noun" format ("Lightning Fast Deployment", "Enterprise Grade Security")
- Every feature description must be specific enough that it cannot be copied to any other product's site
- Every headline must describe what the product specifically does — if the headline works for any SaaS, rewrite it
- Copy must have a distinct voice: pick one of wry, direct, technical, warm, irreverent, or formal, and commit to it for the entire page

## shadcn CSS fingerprints (absolute bans)

- No `rounded-xl border bg-card text-card-foreground shadow-sm` anywhere
- No `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2` anywhere
- No `rounded-full px-2.5 py-0.5 text-xs font-semibold` anywhere
- No `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm` anywhere
- No `animate-pulse rounded-md bg-muted` anywhere
- No Card > CardHeader > CardTitle + CardDescription > CardContent > CardFooter cascade with `p-6`
- No FormField > FormItem > FormLabel > FormControl > FormMessage cascade unchanged
- No unchanged Switch, Progress, or Sonner Toast
- No `text-muted-foreground` as a default body or description color

---

## Self-check before shipping

Before outputting final code, verify every item:

- [ ] Zero feature cards with icon + heading + description stacked inside a container
- [ ] Zero icons inside colored container shapes
- [ ] Zero emoji
- [ ] Zero `shadow-sm` or other decorative shadows
- [ ] Zero `hover:scale` or `hover:translate` effects
- [ ] Zero `text-muted-foreground`
- [ ] Zero `max-w-7xl` on every section (at least 2 different max-widths used)
- [ ] Zero `py-24` / `py-20` on every section (at least 3 different paddings used)
- [ ] Zero `grid-cols-3` equal-column feature layouts
- [ ] Zero ArrowRight icons on CTAs (maximum one on the entire page)
- [ ] Zero "Introducing" / "Ship faster" / "Build beautiful" / any banned headline
- [ ] Zero banned vocabulary words
- [ ] Zero fabricated stats, logos, testimonials, or review counts
- [ ] Every section has a different visual treatment from the one above it
- [ ] At least one section breaks the centered container pattern
- [ ] At least one section uses asymmetric column widths

**If any checkbox fails, regenerate that section before outputting.**

---

## Note on how to use this document

This is a negative specification. It tells the AI what not to do, but "don't do X" leaves "default Y" as the output, and default Y is often just as recognizable. For best results, pair this document with:

1. **A positive brief:** what the brand is, who it's for, what feeling the page should evoke, what 2-3 specific reference sites inspire the desired aesthetic
2. **A color palette:** specific hex values derived from the brand, not from Tailwind defaults
3. **A typographic choice:** specific font families, not "modern sans-serif"
4. **A single page-defining visual concept:** "this site should feel like a printed magazine spread" or "this site should feel like a hand-drawn zine" or "this site should feel like a terminal from 1983"

Without a positive brief, even the strongest negative ruleset produces averaged-out output.
