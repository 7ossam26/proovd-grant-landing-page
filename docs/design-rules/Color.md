# Brand Color Design System

This document tells you exactly what to do and what not to do when coloring anything for this brand. Every rule is absolute. Do not improvise, blend, or soften any rule. Do not invent new colors or new effects.



## The only colors that exist

This brand uses exactly nine colors. You may not use any color outside this list. You may not mix, tint, shade, blend, or derive new colors.

The nine colors are:

* **surface** is #FAFAFA. It is a workhorse color.
* **ink** is #09110C. It is a workhorse color.
* **brand-forest** is #1E4D2F. It is a workhorse color.
* **brand-lime** is #BCFCA1. It is a support color.
* **brand-sage** is #5AAA77. It is a support color.
* **text-whisper** is #DCE8CA. It is a support color.
* **brand-primary** is #3BED97. It is a peak accent.
* **brand-citrus** is #EAFF72. It is a peak accent.
* **brand-sky** is #C8FCFF. It is a peak accent.

You may not use pure black (#000000). The darkest color is ink.
You may not use pure white (#FFFFFF). The lightest color is surface.
You may not use any gray. There is no gray in this brand.
If a design need requires a color outside this palette, stop and ask the user. Do not invent a color.

\---

## Absolute prohibitions

You will never use any of the following, under any circumstance, in any element, in any state:

* No gradients of any kind. No linear gradients. No radial gradients. No conic gradients. No mesh gradients. No blends between two or more colors. Every fill is a single flat solid color.
* No drop shadows.
* No blur effects. No glassmorphism. No frosted glass. No backdrop blur.
* No glow effects. No outer glow. No neon edges. No halos.
* No mesh backgrounds, noise textures, grain, or speckle.
* No 3D effects, bevels, or embossing.
* No filters that alter color such as hue-rotate or duotone.
* No gradient text fills.

If the user asks for any of the above, refuse and explain that this brand does not use that effect. There is no "subtle" version of a forbidden effect. A subtle gradient is still a gradient. The rule is absolute.

\---

## How much of each tier to use

* Workhorse colors (surface, ink, brand-forest) fill approximately 70% of any page.
* Support colors (brand-lime, brand-sage, text-whisper) fill approximately 25% of any page.
* Peak accents (brand-primary, brand-citrus, brand-sky) fill approximately 5% of any page, combined.

If a peak accent is showing up more than two or three times on a single page, it is doing too much. Reduce it.

\---

## Peak accent rules

**brand-primary** (#3BED97) may appear in at most two places on any page: the logo mark dot, and one single CTA button. Nowhere else. Never as a card background. Never as a section background. Never as body text.

**brand-citrus** (#EAFF72) may appear in at most one section on any page. It is for urgency only — sales, promos, launches, limited-time badges, highlighter-style emphasis. Never in a hero badge. Never in navigation. Never as a default standing element.

**brand-sky** (#C8FCFF) may appear in at most one place on any page. Never as a full-width section background. Only as a small card, a pill, a banner, or a pull-quote block.

brand-primary and brand-citrus may not appear in the same section. They may appear on the same page only if separated by at least one other section between them.

\---

## Background stacking rules

You may not stack more than two consecutive colored-background sections. After two non-surface sections, the next section must return to surface, ink, or brand-forest.

You may not place a brand-lime section directly next to a brand-sage section. They blend.
You may not place a brand-citrus section directly next to a brand-lime section. They blend.
You may not place a brand-citrus section directly next to a brand-sky section. The contrast is chaotic.

\---

## Text color rules

Text on this brand uses solid hex colors only. Never rgba. Never opacity. Never transparency on text.

There are six levels of text importance:

* **Display** is the largest heading in a section.
* **Body** is the default paragraph text.
* **Eyebrow** is a small uppercase label above a heading.
* **Emphasis** is an inline highlight inside body text, used for a single word or short phrase.
* **Muted** is metadata, captions, timestamps, and bylines.
* **Link** is interactive text, always underlined.

### Text on surface (#FAFAFA)

* Display text is ink (#09110C).
* Body text is brand-forest (#1E4D2F).
* Eyebrow text is brand-sage (#5AAA77).
* Emphasis text is ink (#09110C) at weight 500.
* Muted text is brand-sage (#5AAA77).
* Link text is brand-forest (#1E4D2F), underlined.

### Text on ink (#09110C)

* Display text is surface (#FAFAFA).
* Body text is text-whisper (#DCE8CA). Never surface. Never brand-lime. Never rgba white.
* Eyebrow text is brand-lime (#BCFCA1).
* Emphasis text is brand-lime (#BCFCA1) at weight 500.
* Muted text is brand-sage (#5AAA77).
* Link text is brand-lime (#BCFCA1), underlined.

### Text on brand-forest (#1E4D2F)

* Display text is surface (#FAFAFA).
* Body text is text-whisper (#DCE8CA). Never surface. Never brand-lime. Never rgba white.
* Eyebrow text is brand-lime (#BCFCA1).
* Emphasis text is brand-lime (#BCFCA1) at weight 500.
* Muted text is brand-sage (#5AAA77).
* Link text is brand-lime (#BCFCA1), underlined.

### Text on brand-lime (#BCFCA1)

* Display text is ink (#09110C).
* Body text is brand-forest (#1E4D2F). Never ink for body on lime.
* Eyebrow text is brand-sage (#5AAA77).
* Emphasis text is ink (#09110C) at weight 500.
* Muted text is brand-sage (#5AAA77).
* Link text is brand-forest (#1E4D2F), underlined.

### Text on brand-sage (#5AAA77)

* Display text is surface (#FAFAFA). Never text-whisper on sage.
* Body text is surface (#FAFAFA).
* Eyebrow text is brand-forest (#1E4D2F).
* Emphasis text is brand-lime (#BCFCA1) at weight 500.
* Muted text is brand-forest (#1E4D2F). Never sage on sage.
* Link text is surface (#FAFAFA), underlined.

### Text on brand-citrus (#EAFF72)

* Display text is ink (#09110C).
* Body text is brand-forest (#1E4D2F).
* Eyebrow text is brand-forest (#1E4D2F).
* Emphasis text is ink (#09110C) at weight 500.
* Muted text is brand-forest (#1E4D2F). Never sage on citrus.
* Link text is ink (#09110C), underlined.

### Text on brand-sky (#C8FCFF)

* Display text is ink (#09110C).
* Body text is brand-forest (#1E4D2F).
* Eyebrow text is brand-sage (#5AAA77).
* Emphasis text is ink (#09110C) at weight 500.
* Muted text is brand-sage (#5AAA77).
* Link text is brand-forest (#1E4D2F), underlined.

### Critical text rules

* Brand-lime may never be used for body text on any surface. It is only for eyebrows, emphasis, and links on dark surfaces. If the text is longer than about six words, it must not be brand-lime.
* Text-whisper is only used on ink and brand-forest. Never on any light or colored surface.
* Display headings may only be ink, surface, or brand-forest. Never brand-sage, brand-lime, or text-whisper.
* Links are always underlined. Color alone is never enough to indicate a link.

\---

## Button rules

### Buttons on surface (#FAFAFA)

* Primary button: brand-forest background, surface text.
* Secondary button: brand-lime background, brand-forest text.
* Outline button: transparent background, brand-forest text, brand-forest border.
* Tertiary button: brand-sage background, surface text.
* Ghost link: no background, no border, brand-forest text, arrow suffix "→".

### Buttons on ink (#09110C)

* Primary button: surface background, ink text.
* Secondary button: brand-lime background, brand-forest text.
* Outline button: transparent background, brand-lime text, brand-lime border.
* Ghost link: no background, no border, brand-lime text, arrow suffix "→".
* There is no tertiary button on ink. Do not create one.

### Buttons on brand-forest (#1E4D2F)

* Primary button: surface background, brand-forest text.
* Secondary button: brand-lime background, brand-forest text.
* Outline button: transparent background, brand-lime text, brand-lime border.
* Ghost link: no background, no border, brand-lime text, arrow suffix "→".

### Buttons on brand-lime (#BCFCA1)

* Primary button: brand-forest background, surface text.
* Outline button: transparent background, brand-forest text, brand-forest border.
* Ghost link: no background, no border, brand-forest text, arrow suffix "→".
* There is no secondary or tertiary button on lime. Do not create them.

### Buttons on brand-sage (#5AAA77)

* Primary button: surface background, brand-forest text.

### Buttons on brand-citrus (#EAFF72)

* Primary button: ink background, brand-citrus text.
* This is the only button variant allowed on citrus. Do not create any other.

### Peak accent CTAs

If the single most important action on a page deserves extra attention, you may use one of these two recipes instead of the normal primary button. Use at most one per page. Never both on the same page.

* Mint CTA: brand-primary (#3BED97) background, ink (#09110C) text. For brand-defining moments, hero sign-ups, "start free trial."
* Citrus CTA: brand-citrus (#EAFF72) background, brand-forest (#1E4D2F) text. For urgency, promos, "claim 50% off."

### Button prohibitions

* Never use brand-sage as a button on any dark surface.
* Never use brand-primary as a regular repeating button. It is only for the one peak CTA.
* Never combine two accent colors on one button.
* Buttons are flat filled rectangles. Never a gradient fill on a button. Never a shadow under a button.

\---

## Section palettes

There are seven named section styles. Each one defines the background color, which text colors to use, and which buttons to use.

### Paper

* Background: surface (#FAFAFA).
* Use for: default reading surfaces, article content, most product UI.
* Text follows the "text on surface" rules above.
* Default button: brand-forest primary.

### Midnight

* Background: ink (#09110C).
* Use for: dramatic hero sections, dark full-bleed strips.
* Text follows the "text on ink" rules above. Body text is text-whisper. Never lime for body.
* Default button: surface primary.

### Forest

* Background: brand-forest (#1E4D2F).
* Use for: warmer dark sections, CTA strips, story sections.
* Text follows the "text on brand-forest" rules above. Body text is text-whisper. Never lime for body.
* Default button: surface primary or brand-lime secondary.

### Meadow

* Background: brand-lime (#BCFCA1).
* Use for: promo strips, testimonials, feature callouts, pricing highlights.
* Text follows the "text on brand-lime" rules above.
* Default button: brand-forest primary.

### Sage

* Background: brand-sage (#5AAA77).
* Use for: empty states, footers, quiet full-bleed transitions.
* Text follows the "text on brand-sage" rules above.
* Default button: surface primary.

### Zest

* Background: brand-citrus (#EAFF72).
* Use for: sales, launches, limited drops, time-sensitive promos.
* Text follows the "text on brand-citrus" rules above.
* Default button: ink primary with citrus text.
* This is never a full page. Only a single section strip.

### Breeze

* Background: brand-sky (#C8FCFF).
* Use for: one announcement banner, one pull-quote, one info pill per page.
* Text follows the "text on brand-sky" rules above.
* Default button: brand-forest primary.
* This is never a full-width section background. Only small accent moments.

\---

## Navigation rules

### Light navigation bar (on surface)

* Background is surface.
* Logo dot is brand-primary (#3BED97). This is one of the two allowed uses of brand-primary on a page.
* Logo wordmark text is ink.
* Navigation link text is brand-forest.
* Sign-in button is brand-forest background with surface text.
* No citrus anywhere in navigation. No lime in light navigation links.

### Dark navigation bar (on ink or brand-forest)

* Background is ink or brand-forest.
* Logo dot is brand-primary (#3BED97).
* Logo wordmark text is surface.
* Navigation link text is text-whisper (#DCE8CA). Never brand-lime for nav links. Navigation repeats on every page and lime at that frequency dilutes the accent.
* Sign-in button is surface background with ink text.
* No citrus anywhere in navigation. No sage anywhere in dark navigation.

\---

## Hero rules

### Dark hero (on ink)

* Badge above heading: brand-forest background with brand-lime text. Never citrus for hero badges.
* Heading: surface text. Inline emphasis word in the heading may use brand-lime.
* Body paragraph: text-whisper. Never lime. Never rgba white.
* Primary CTA may use the brand-primary peak accent (mint green button).
* Secondary CTA is an outline button with brand-lime border and text.

### Light hero (on surface)

* Badge above heading: brand-lime background with brand-forest text. Never citrus for hero badges.
* Heading: ink text. Inline emphasis word may use brand-forest.
* Body paragraph: brand-forest.
* Primary CTA: brand-forest background with surface text.
* Secondary CTA: outline button with brand-forest border and text.

\---

## Feature cards

* Outer container background: brand-lime (meadow section).
* Individual cards inside: surface background.
* One card in the grid may use brand-forest background to draw attention to a featured item.
* Card icon containers on surface cards: brand-forest background with brand-lime icon, or brand-sage background with surface icon.
* Card icon container on the dark featured card: brand-citrus background with brand-forest icon (this is one allowed use of citrus as an accent).
* Card title on surface: ink.
* Card description on surface: brand-forest.
* Card title on forest card: surface.
* Card description on forest card: text-whisper.

\---

## CTA strips

* Background: brand-forest.
* Eyebrow label: brand-lime, uppercase.
* Heading: surface.
* Body copy: text-whisper.
* Primary button: surface background with brand-forest text.
* Secondary button: outline with brand-lime border and text.

\---

## Pricing cards

* Card background: surface.
* "Most popular" badge: brand-lime background with brand-forest text.
* Plan name: ink.
* Plan subtitle: brand-sage.
* Price: ink.
* Price period suffix: brand-sage.
* CTA button: brand-forest background with surface text.
* Feature list checkmarks and text: brand-forest.

\---

## Newsletter and form blocks

* Background: brand-forest.
* Section label (eyebrow): brand-lime, uppercase.
* Heading: surface.
* Body description: text-whisper.
* Input field background: ink.
* Input field border: brand-lime.
* Input field text: surface.
* Submit button: brand-lime background with brand-forest text.

\---

## Peak accent moments — where each earns its keep

### brand-primary (#3BED97)

* The logo mark dot. Always.
* The single most important CTA on a landing page or marketing moment. Once, never more.
* Never for regular buttons, badges, backgrounds, body text, or anything repeating.

### brand-citrus (#EAFF72)

* "Limited time" badges on light surfaces.
* Sale and launch callouts.
* Highlighter-style inline emphasis where a short phrase needs to pop.
* One featured icon container inside a feature card grid.
* Never in heroes. Never in navigation. Never as a default element.

### brand-sky (#C8FCFF)

* A single announcement banner or pull-quote per page.
* A small info card with a side accent bar.
* Never as a full-width section background.

\---

## Forbidden pairings

These exact pairings are never allowed. If your output contains any of these, it is wrong.

* Brand-sage text on ink background. Reads muddy.
* Brand-sage text on brand-forest background. Reads muddy.
* Brand-sage background directly adjacent to ink section. Muddy transition.
* Brand-sage background directly adjacent to brand-forest section. Muddy transition.
* Brand-lime used as body paragraph text on any surface. Too loud for prose.
* Brand-lime text on brand-sage background. Too close in value.
* Brand-lime text on brand-citrus background. Too close in value.
* Brand-citrus text on brand-lime background. Too close in value.
* Brand-citrus text on brand-sky background. Awful contrast.
* Brand-primary as body text on any surface.
* Brand-primary as card or section background. Primary is only a button fill and a logo dot.
* Brand-sky as a full-width section background.
* Pure white (#FFFFFF) anywhere.
* Pure black (#000000) anywhere.
* Any gray anywhere. There is no gray in this brand.
* Any rgba or transparent version of surface for body text on dark. Use text-whisper (#DCE8CA) instead.
* Any gradient on any element.
* Any shadow on any element.
* Any glow on any element.
* Any blur on any element.
* Brand-citrus in any hero badge.
* Brand-citrus in any navigation bar.
* Brand-lime as navigation link text on dark backgrounds.
* Two peak accent colors in the same section.

\---

## Verified safe pairings

When in doubt, use these exact combinations. These are confirmed safe.

### Safe section sequences

* surface → brand-forest → surface.
* surface → ink → surface.
* surface → brand-lime → surface.
* surface → brand-sage → surface.
* surface → brand-forest → brand-lime → surface.
* ink → brand-forest → surface.
* surface → brand-citrus → surface (promo strip only).

### Safe text on background

* ink text on surface background.
* brand-forest text on surface background.
* brand-sage text on surface background (muted only).
* surface display text on ink background.
* text-whisper body text on ink background.
* brand-lime label text on ink background (short only, never body).
* surface display text on brand-forest background.
* text-whisper body text on brand-forest background.
* brand-lime label text on brand-forest background (short only, never body).
* ink text on brand-lime background.
* brand-forest text on brand-lime background.
* surface text on brand-sage background.
* brand-forest text on brand-sage background (muted only).
* ink text on brand-citrus background.
* brand-forest text on brand-citrus background.
* ink text on brand-sky background.
* brand-forest text on brand-sky background.
* brand-sage text on brand-sky background (muted only).

\---

## Fallback rule

If a situation is not covered by any rule above, follow this process:

1. Can it be solved with workhorse colors only (surface, ink, brand-forest)? If yes, do that.
2. Does it need a supporting accent? Use brand-lime, brand-sage, or text-whisper.
3. Does this moment genuinely require a peak accent? Use one, following the peak accent rules.
4. If none of the above fits, stop and ask the user. Do not invent a solution.

\---

## One-paragraph summary

No gradients, no shadows, no glow, no blur — ever. Only nine colors exist: #FAFAFA, #09110C, #1E4D2F, #BCFCA1, #5AAA77, #DCE8CA, #3BED97, #EAFF72, #C8FCFF. Workhorses fill 70% of the page, support fills 25%, peak accents fill 5%. Body text on dark surfaces is always #DCE8CA. Brand-sage never touches a dark background. Brand-primary is the logo and one CTA only. Brand-citrus is urgency only, never in heroes or navigation. Brand-sky is a rare cool accent, never a full section. Navigation text on dark is text-whisper, not lime. Lime is never body text. Links are underlined. When in doubt, use a workhorse color. When still in doubt, ask.
