# DOCS.md — ProNurtureSphere Component & Configuration Documentation

> **Last updated:** 2026-06-07  
> **Status:** All pages complete — Homepage, Employers, Professionals, About, Blog all wired to Sanity CMS; Navbar and Footer wired to siteSettings  
> This is the living technical reference for the ProNurtureSphere codebase.  
> Update this file after every new component, page, or config change.

---

## Table of Contents

1. [Configuration Files](#1-configuration-files)
   - [globals.css](#11-appglobalscss)
   - [tailwind.config.ts](#12-tailwindconfigts--tailwind-v4-note)
   - [next.config.ts](#13-nextconfigts)
   - [layout.tsx](#14-applayouttsx)
2. [Design System Reference](#2-design-system-reference)
3. [Component Documentation](#3-component-documentation)
   - [Navbar](#31-componentsnavbartsx)
   - [Footer](#32-componentsfootertsx)
   - [HeroSection](#33-componentsherosectiontsx)
   - [SocialProofBar](#34-componentssocialproofbartsx)
   - [ProblemSection](#35-componentsproblmsectiontsx)
   - [FeaturesSection](#36-componentsfeaturessectiontsx)
   - [AudienceSection](#37-componentsaudiencesectiontsx)
   - [TestimonialsSection](#38-componentstestimonialsectiontsx)
   - [StatsSection](#39-componentsstatssectiontsx)
   - [BlogPreviewSection](#310-componentsblogpreviewsectiontsx)
   - [WaitlistSection](#311-componentswaitlistsectiontsx)
4. [Employers Page Components](#4-employers-page-components)
   - [EmployersHero](#41-componentsemployersemployersherotsx)
   - [EmployersPainPoints](#42-componentsemployersemployerspainpointstsx)
   - [EmployersTransformation](#43-componentsemployersemployerstransformationtsx)
   - [EmployersFeatures](#44-componentsemployersemployersfeaturestsx)
   - [EmployersHowItWorks](#45-componentsemployersemployershow-it-workstsx)
   - [EmployersTestimonials](#46-componentsemployersemployerstestimonialtsx)
   - [EmployersFAQ](#47-componentsemployersemployersfaqtsx)
   - [EmployersCTA](#48-componentsemployersemployersctатsx)
5. [Pages](#5-pages)
6. [Sanity CMS Schemas](#6-sanity-cms-schemas)
7. [Environment Variables](#7-environment-variables)
8. [TODOs & Next Steps](#8-todos--next-steps)
11. [API Routes](#11-api-routes)
    - [POST /api/waitlist](#111-appapiwaitlestroutets)
12. [SEO & Metadata](#12-seo--metadata)
    - [Root metadata (layout.tsx)](#121-root-metadata-applayouttsx)
    - [Per-page metadata](#122-per-page-metadata)
    - [app/opengraph-image.tsx](#123-appopengraph-imagetsx)
    - [app/robots.ts](#124-approbotsTs)
    - [app/sitemap.ts](#125-appsitemaptts)

---

## 1. Configuration Files

---

### 1.1 `app/globals.css`

**Purpose:** Global stylesheet. Defines the ProNurtureSphere design token system using Tailwind CSS v4's `@theme` directive, sets body/HTML base styles, and enables smooth scrolling for anchor navigation.

**Key changes from default:**

| What | Why |
|------|-----|
| Added `@theme` block with `--color-brand-*` tokens | Tailwind v4 reads these and auto-generates all utility classes: `bg-brand-dark`, `text-brand-gold`, `border-brand-green`, etc. |
| Added `--font-sans: var(--font-dm-sans)` in `@theme` | Applies DM Sans site-wide via the `font-sans` Tailwind utility, referencing the CSS variable injected by `next/font/google` in `layout.tsx` |
| `html { scroll-behavior: smooth; }` | Enables smooth anchor scrolling so the "See How It Works" CTA in the hero glides to `#features` |
| Removed dark-mode `@media prefers-color-scheme` | This is a marketing site — dark mode is not in scope and would undermine the brand palette |

**Brand tokens defined:**

```css
@theme {
  --color-brand-dark:  #103613;  /* Deep Green  — authority, trust, primary brand */
  --color-brand-green: #7a853e;  /* Yellow Green — energy, approachability, eyebrow labels */
  --color-brand-gold:  #c09e5a;  /* Gold/Warm    — ALL primary CTAs, icon accents */
  --color-brand-white: #ffffff;  /* White        — card backgrounds, Navbar scrolled state */
  --color-brand-light: #f5f5f0;  /* Off-white    — alternating section backgrounds */
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
}
```

**Usage in Tailwind classes:**
- `bg-brand-dark` → `background-color: #103613`
- `text-brand-gold` → `color: #c09e5a`
- `border-brand-green` → `border-color: #7a853e`
- `hover:bg-brand-light` → hover state for off-white backgrounds

---

### 1.2 `tailwind.config.ts` — Tailwind v4 Note

**This file does not exist in the project** — and that is correct.

Tailwind CSS v4 eliminated `tailwind.config.ts`. All theme customisation is done directly in CSS via the `@theme` directive in `app/globals.css`. There is no separate config file to maintain. Do not create one.

---

### 1.3 `next.config.ts`

**File:** `next.config.ts`  
**Purpose:** Next.js project configuration.

**Changes made:**

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",    // Dev placeholder images
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",   // All images uploaded via Sanity Studio
      },
    ],
  },
};
```

**`placehold.co`:** Used for placeholder images during development, before real photography is sourced.

**`cdn.sanity.io`:** Required for `next/image` to serve real images uploaded via Sanity Studio. Any `post.mainImage` uploaded in the CMS goes through this CDN. Without this entry, `next/image` would throw a configuration error when a real image is present.

---

### 1.4 `app/layout.tsx`

**File:** `app/layout.tsx`  
**Type:** Server Component (Next.js Root Layout)  
**Purpose:** The outermost shell rendered on every page. Provides the font, metadata, Navbar, and Footer that wrap all page content.

**Props:** `{ children: React.ReactNode }` — the page-specific content rendered between Navbar and Footer.

**Key decisions:**

| Decision | Why |
|----------|-----|
| `DM_Sans` from `next/font/google` with `variable: '--font-dm-sans'` | `next/font` self-hosts the font, eliminates the network round-trip to Google Fonts, and prevents layout shift. We load it as a CSS variable so `globals.css` can reference it in `--font-sans` for the entire site. |
| Weights `400`, `500`, `700` | Covers Regular (body), Medium (nav links, labels), and Bold (headings, CTAs) — all weights used in the design system. |
| `display: "swap"` | Prevents invisible text (FOIT) during font load — critical for LCP score. |
| `<main className="flex-1">` | Pushes Footer to the bottom on short pages using CSS flexbox. Without this, the Footer floats mid-page on stub pages. |
| `<Navbar />` above `{children}` | Navbar is `position: fixed` — it renders outside the normal document flow, so order here doesn't affect visual layout. It's above `children` semantically/logically. |
| `antialiased` on `<body>` | Enables sub-pixel font rendering on macOS/retina screens — standard practice for premium-looking text. |

**SEO metadata configured (see Section 12 for full SEO documentation):**
- `metadataBase`: `https://pronurture.vercel.app` — required for Next.js to resolve absolute URLs in OG/Twitter image paths
- Title template: `{ default: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform", template: "%s | ProNurtureSphere" }` — pages set a short title like `"About Us"`, the template appends " | ProNurtureSphere" automatically
- Description: Platform summary for Google snippets
- Keywords: healthcare staffing, locum shifts, CPD, medical workforce, hospital staffing
- OpenGraph: `type: "website"`, `siteName`, title, description, and `/og-image.png` (1200×630, dynamically generated)
- Twitter card: `summary_large_image` with same title, description, and image
- Icons: `Green Mono.svg` from `public/brand-assets/` used as SVG favicon

---

## 2. Design System Reference

### Colour Usage Rules

| Colour | Class | When to Use |
|--------|-------|-------------|
| Deep Green `#103613` | `brand-dark` | Section backgrounds (hero, stats, waitlist, footer), dark text on light backgrounds |
| Yellow Green `#7a853e` | `brand-green` | Section eyebrow labels, hover states, second-level accents |
| Gold `#c09e5a` | `brand-gold` | **Every primary CTA button**, icon highlights, number emphasis |
| White `#ffffff` | `brand-white` | Card backgrounds, Navbar after scroll, body text on dark backgrounds |
| Off-white `#f5f5f0` | `brand-light` | Alternating section backgrounds (ProofBar, Features, Blog) |

### Section Background Alternation Pattern

The homepage alternates backgrounds deliberately to create visual rhythm and prevent monotony:

```
Hero          → bg-brand-dark   (deep green)
SocialProof   → bg-brand-light  (off-white)
Problem       → bg-brand-white  (white)
Features      → bg-brand-light  (off-white)
Audience      → split: brand-dark / brand-green
Testimonials  → bg-brand-white  (white)
Stats         → bg-brand-dark   (deep green)
Blog          → bg-brand-light  (off-white)
Waitlist      → bg-brand-dark   (deep green)
```

### Typography Hierarchy

| Element | Tailwind Classes | Context |
|---------|-----------------|---------|
| H1 | `text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight` | Hero headline only — one per page |
| H2 | `text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight` | Section headings |
| H3 | `text-xl font-bold` or `text-3xl sm:text-4xl font-bold` | Card titles or Audience section headings |
| Body | `text-base leading-relaxed` | Paragraphs, descriptions |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` | Section labels above H2 |
| CTA | `text-base font-bold` or `text-sm font-bold` | Button text |

---

## 3. Component Documentation

---

### 3.1 `components/Navbar.tsx`

**Type:** `'use client'` (Client Component)  
**Renders in:** `app/(site)/layout.tsx` — appears on every public page  
**File:** `components/Navbar.tsx`

#### Purpose
Sticky top navigation bar. Always white with the full-colour logo and a `shadow-sm` border. Accepts optional `settings` prop from Sanity `siteSettings` — nav links, logo URLs, and site name editable from Studio.

#### Sanity wiring
Accepts `settings?: SanitySettings | null` passed from `app/(site)/layout.tsx`. Falls back to hardcoded nav links and logo paths when null. Fields used: `settings.fullColorLogoUrl`, `settings.navLinks[]`, `settings.siteName`.

#### Props
None. This component manages its own state internally.

#### State

| State Variable | Type | Default | Description |
|----------------|------|---------|-------------|
| `scrolled` | `boolean` | `false` | `true` when `window.scrollY > 20`. Triggers the transparent → white transition. |
| `mobileOpen` | `boolean` | `false` | `true` when the mobile hamburger menu is open. |

#### Side Effects (`useEffect`)

1. **Scroll listener:** Adds a passive `scroll` event listener on mount. Updates `scrolled` when the user scrolls past 20px. Cleaned up on unmount to prevent memory leaks.
2. **Resize listener:** Closes the mobile menu (`setMobileOpen(false)`) if the viewport grows past 1024px (lg breakpoint). Prevents a stuck open state when resizing.

#### Logo Strategy
Both logos are rendered simultaneously using `position: absolute` inside a relative container. They crossfade via `opacity` transitions:

```tsx
{/* Full Color Logo — visible when scrolled */}
<Image ... className={scrolled ? "opacity-100" : "opacity-0"} />

{/* White Mono Logo — visible when at top */}
<Image ... className={scrolled ? "opacity-0" : "opacity-100"} />
```

This avoids a flash/jump that would occur from conditional rendering. Both images load on mount (`priority`), so the transition is instant.

#### Navigation Links
Defined in the `navLinks` constant array at the top of the file:

```ts
const navLinks = [
  { label: "Home",                   href: "/" },
  { label: "For Employers",          href: "/employers" },
  { label: "For Professionals",      href: "/professionals" },
  { label: "About",                  href: "/about" },
  { label: "Blog",                   href: "/blog" },
]
```

To add or remove links, edit this array — changes propagate to both desktop and mobile menus automatically.

#### CTA Button
- Label: "Get Early Access"
- Destination: `/waitlist`
- Style: `bg-brand-gold text-brand-dark rounded-full font-bold`
- On mobile: renders full-width inside the dropdown panel

#### Hamburger Animation
Three `<span>` bars animate into an X using `rotate-45`, `opacity-0`, and `-rotate-45` Tailwind transforms when `mobileOpen` is `true`.

#### Accessibility
- `aria-expanded` reflects `mobileOpen` state on the hamburger `<button>`
- `aria-controls="mobile-menu"` links button to the panel
- `aria-hidden={!mobileOpen}` hides collapsed panel from screen readers
- `sr-only` text announces "Open menu" / "Close menu" to screen readers
- Focus ring on the hamburger button and all interactive elements

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `position: fixed` not `sticky` | `sticky` only works if a parent doesn't have `overflow: hidden`. Fixed is reliable across all page layouts. |
| Transparent at top, white on scroll | The hero is deep green — a white navbar would create a jarring bar across it. Transparency makes the Navbar feel integrated with the hero. Once the user scrolls, white provides readable contrast over lighter sections. |
| `z-50` | Ensures the Navbar always sits above all page content, including floating cards in the hero image. |
| Scroll threshold at `20px` not `0px` | Prevents a micro-flash of white background caused by momentum scrolling slightly past 0 on iOS. |

---

### 3.2 `components/Footer.tsx`

**Type:** Server Component  
**Renders in:** `app/(site)/layout.tsx` — appears on every public page  
**File:** `components/Footer.tsx`

#### Purpose
Site-wide footer providing navigation, social links, legal notice, and brand closure on a deep green background. Accepts optional `settings` prop from Sanity `siteSettings`.

#### Sanity wiring
Accepts `settings?: SanitySettings | null` passed from `app/(site)/layout.tsx`. Falls back to hardcoded values when null. Fields used: `settings.whiteMonoLogoUrl`, `settings.footerTagline`, `settings.socialLinks[]` (label, url, platform), `settings.copyrightText`.

#### Props
None.

#### Structure

```
Footer (bg-brand-dark)
├── Main grid (4 columns)
│   ├── Brand column
│   │   ├── White Mono.svg logo (Link → /)
│   │   ├── Tagline paragraph
│   │   └── Social icons (LinkedIn, X/Twitter)
│   ├── Platform column (links)
│   ├── Company column (links)
│   └── Resources column (links)
└── Bottom bar
    ├── Copyright line (left)
    └── Tagline (right)
```

#### Data
Navigation columns are defined in the `footerColumns` array. Each entry has a `heading` and `links` array of `{ label, href }` objects. To update footer navigation, edit this array.

Social links are in the `socialLinks` array, each with a `label`, `href`, and inline SVG `icon`.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `White Mono.svg` logo | The footer background is deep green. The full-colour logo has a dark green wordmark that would be near-invisible. White Mono provides maximum contrast. |
| `text-white/60` for link text | 60% opacity white reads comfortably on dark green without the harshness of pure white. It also creates a visual hierarchy where the column headings (pure white) stand out. |
| `hover:text-brand-gold` on links | Consistent hover state across the site — gold is the interactive accent colour in the ProNurtureSphere palette. |
| `border-t border-white/10` before bottom bar | A very subtle separator — dark enough to be visible, light enough to not interrupt the flow. |
| `rel="noopener noreferrer"` on social links | Security best practice for all external `target="_blank"` links. Prevents the opened page from accessing `window.opener`. |

---

### 3.3 `components/HeroSection.tsx`

**Type:** Server Component  
**File:** `components/HeroSection.tsx`

#### Purpose
The above-the-fold section of the homepage. Must answer three questions in under 3 seconds: **What is this? Who is it for? Why should I care?** Drives two conversion paths: direct signup (waitlist) and soft conversion (explore features).

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `hero` | `HomepageHero \| null \| undefined` | Sanity `homePage.hero` data. Optional — component falls back to hardcoded content when null. |

**Sanity data used:** `hero.headline` (H1 text), `hero.subheadline`, `hero.ctaText`, `hero.ctaLink`, `hero.image` (via `urlFor()` for desktop + mobile variants). Hardcoded multi-line H1 with `<br>` breaks renders when `hero.headline` is null.

#### Layout
Two-column grid on desktop (lg+), stacked vertically on mobile:
- **Left:** All text content — eyebrow, H1, subheadline, CTAs, trust indicators
- **Right:** Hero image with a floating product-preview card

#### Content Elements

| Element | Content | Purpose |
|---------|---------|---------|
| Eyebrow badge | "Built for Nigerian Healthcare" | Immediately signals Nigeria-specific context — key differentiator |
| H1 | "Smarter Staffing. Faster Hiring. Better Healthcare Operations." | Three punchy lines, each a distinct benefit. Gold highlight on the third line draws the eye to the biggest payoff. |
| Subheadline | Platform description | Adds context, mentions both employer and professional features, targets both personas |
| Primary CTA | "Join the Waitlist" → `/waitlist` | Gold background, arrow icon — highest visual weight on the page |
| Secondary CTA | "See How It Works" → `#features` | White outline — lower weight, for users who need more convincing |
| Trust indicators | No credit card / Nigeria-built / Free early access | Removes friction for hesitant visitors |
| Hero image | `placehold.co/600x500/1a4a1e/c09e5a` | Placeholder — replace with real Nigerian healthcare team photography |
| Floating card | "Shift Filled Successfully — Dr. Adaeze" | Product preview pattern: makes the platform feel real and already working |
| Scroll indicator | "Scroll to explore" + bouncing dot | Visual cue for users who don't know there's more below |

#### Background Decoration
A dot-grid pattern at 5% opacity is applied via `background-image: radial-gradient(circle, #ffffff 1px, transparent 1px)` with `backgroundSize: '32px 32px'`. This adds depth and texture to the flat deep green without distracting from content. The same pattern is reused in `StatsSection` and `WaitlistSection` for visual consistency.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `min-h-screen` + `flex items-center` | Forces the hero to fill the full viewport height and vertically centre the content — this is the "full screen hero" design pattern. |
| `pt-20 lg:pt-24` | Compensates for the fixed Navbar height (64px mobile / 80px desktop) so content isn't hidden beneath it. |
| Gold highlight on third H1 line | Per visual hierarchy rules: the entire H1 is dominant, but the most important idea (the payoff) gets the strongest accent. |
| `priority` on hero image | Hero image is above the fold. Next.js `priority` pre-fetches it before the page renders, improving LCP (Largest Contentful Paint) — a Core Web Vitals metric. |
| `shadow-brand-gold/20` on primary CTA | The subtle gold glow shadow increases the button's perceived clickability (a premium landing page pattern). |
| `focus:ring-offset-brand-dark` | Ensures the keyboard focus ring is visible against the dark green background, not lost in it. |

---

### 3.4 `components/SocialProofBar.tsx`

**Type:** Server Component  
**File:** `components/SocialProofBar.tsx`

#### Purpose
Establishes immediate credibility in the first scroll position after the hero. Uses key metrics instead of client logos (product is pre-launch, so logos aren't yet available).

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `stats` | `HomepageStat[] \| null \| undefined` | Sanity `homePage.stats[]`. Optional — falls back to `FALLBACK_STATS` when null. |

#### Data Structure

```ts
interface HomepageStat {
  _key: string;  // Sanity key (used as React key instead of index)
  value: string; // "500+"
  label: string; // "Healthcare Professionals"
}
```

`FALLBACK_STATS` is defined in the component. When Sanity stats are present, they replace the fallback; when absent (null or empty array), the hardcoded fallback renders unchanged.

#### Current Stats

| Value | Label |
|-------|-------|
| 500+ | Healthcare Professionals |
| 50+ | Partner Facilities |
| 10,000+ | Shifts Managed |
| 98% | Compliance Rate |

#### Layout
- 2-column grid on mobile (2×2)
- 4-column grid on md+ (1×4)
- Vertical `border-r border-brand-dark/10` dividers between columns on md+ (not after the last column — controlled by `index < stats.length - 1`)

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `bg-brand-light` (off-white) | Creates a visual "exhale" after the deep green hero — softer than pure white, warmer than grey. |
| "Platform Impact" micro-label above stats | Contextualises the numbers without making them feel boastful. |
| Numbers at `text-4xl sm:text-5xl` | Large enough to be the first thing the eye lands on when scrolling into this section — per visual hierarchy principles. |
| `text-brand-dark/60` for labels | 60% opacity creates a clear hierarchy: number dominates, label supports. |

---

### 3.5 `components/ProblemSection.tsx`

**Type:** Server Component  
**File:** `components/ProblemSection.tsx`

#### Purpose
Agitates the pain points that ProNurtureSphere solves. Placed before the Features section deliberately — good marketing acknowledges the problem first, creating empathy and making the solution feel necessary rather than optional.

#### Props
None.

#### Data Structure

```ts
interface ProblemCard {
  title: string;
  description: string;
  icon: React.ReactNode;  // Inline SVG
}
```

#### Three Problem Cards

| Card | Icon | Addresses Persona |
|------|------|-------------------|
| Manual & Fragmented Processes | Clipboard/warning | Both (employer: chaos; professional: poor experience) |
| Unverified Locum Staff | Shield with X | Employer primarily (risk/compliance) |
| Disconnected Payroll & CPD | Broken link/chain | Both (employer: finance pain; professional: CPD tracking) |

#### Icon Colour Strategy
Icons use amber/warning tones (`bg-amber-50 text-amber-600`) by default — amber signals "problem/broken." On hover, they transition to `bg-brand-dark text-brand-gold` — the brand palette — subtly suggesting the brand is the answer to these problems.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `bg-brand-white` (pure white) | Contrast after the off-white SocialProofBar. White + amber icons = clinical problem-identification tone. |
| Transition teaser at the bottom | "ProNurtureSphere was built specifically to solve every one of these problems." — a bridge sentence into FeaturesSection. Keeps the narrative flowing. |
| Specific, vivid descriptions | Vague problem descriptions don't resonate. "WhatsApp groups, paper rosters, 10 messages, 3 phone calls" creates recognition for people who live this reality. |
| H2 with emotionally loaded words | "Understaffed and Overworked" — these words mirror how the target persona describes their own experience, creating immediate resonance. |

---

### 3.6 `components/FeaturesSection.tsx`

**Type:** Server Component  
**File:** `components/FeaturesSection.tsx`

#### Purpose
The solution reveal — presents the 6 core ProNurtureSphere platform features that solve the problems shown above. Anchored at `id="features"` so the hero's "See How It Works" CTA can scroll-link here.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `featuredServices` | `SanityService[] \| null \| undefined` | Dereferenced service documents from Sanity `homePage.featuredServices[]->`. Optional — falls back to `FALLBACK_FEATURES` when null. |

#### Data Structure

```ts
interface SanityService {
  _id: string;               // Used for icon lookup in ICON_BY_SERVICE_ID map
  title: string;
  slug?: { current: string };
  shortDescription?: string;
}

interface FeatureCard {    // Internal render shape
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;   // Looked up by _id from ICON_BY_SERVICE_ID
}
```

**Icon mapping:** `ICON_BY_SERVICE_ID` is a `Record<string, React.ReactNode>` keyed by the known seeded `_id` values (e.g. `'service-smart-staff-rostering'`). A `<CalendarIcon />` default handles any unknown ID. This avoids storing SVG data in Sanity.

#### Six Feature Cards

| # | Title | Icon | Maps to Problem |
|---|-------|------|-----------------|
| 1 | Shift Posting & Booking | Calendar | Manual rostering |
| 2 | Credential Verification | Shield check | Unverified staff |
| 3 | Payroll Management | ₦ circle | Disconnected payroll |
| 4 | Attendance & Timesheets | Clock | Manual timesheets |
| 5 | CPD Training | Graduation cap | Disconnected CPD |
| 6 | Workforce Analytics | Bar chart | No data visibility |

#### Icon Style
- Container: `bg-brand-dark` (deep green square, rounded-xl)
- Icon: `text-brand-gold` (gold SVG stroke)
- Hover: container scales up `group-hover:scale-110`

This maintains brand palette consistency — every icon uses the same brand-dark/gold combination.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `id="features"` anchor | The hero CTA "See How It Works" links to `#features` — they must be connected. Anchor navigation is better UX than a separate page. |
| `bg-brand-light` (off-white) | Alternates from the white ProblemSection. Feature cards on white would blend in. |
| White card backgrounds inside off-white section | Cards `bg-brand-white` pop against the `bg-brand-light` section — layered depth. |
| `hover:-translate-y-1` on cards | Subtle lift on hover makes cards feel interactive and pressable — a premium SaaS design pattern. |
| Benefit-focused descriptions | Each description ends with a concrete outcome ("Hire with confidence", "No more manual reconciliation") not just feature descriptions. |
| Bottom CTA → `/waitlist` | After seeing all 6 features, an interested user should have an easy next step. Uses `bg-brand-dark` not gold — the gold CTAs are reserved for the strongest conversion moments. |

---

### 3.7 `components/AudienceSection.tsx`

**Type:** Server Component  
**File:** `components/AudienceSection.tsx`

#### Purpose
A full-width two-column split that speaks directly to each buyer persona in their own voice and tone. Allows visitors to self-identify and navigate deeper into the relevant section of the site.

#### Props
None.

#### Data Structure

```ts
interface AudienceColumn {
  eyebrow: string;
  heading: string;
  subheading: string;
  benefits: { text: string }[];
  ctaText: string;
  ctaHref: string;
  bgClass: string;
  textClass: string;
  subtextClass: string;
  ctaClass: string;
  checkClass: string;
}
```

#### Two Columns

| Column | Background | Audience | CTA | Tone |
|--------|------------|----------|-----|------|
| Left | `bg-brand-dark` | Healthcare Employers | "Explore Employer Features" → `/employers` | Formal, ROI-focused, data-driven |
| Right | `bg-brand-green` | Healthcare Professionals | "Find Locum Shifts" → `/professionals` | Warm, opportunity-focused, mobile-first |

**Employer benefits (left):**
1. Post shifts and fill gaps in under 30 minutes
2. Hire only verified, credentialed professionals
3. Automate PAYE payroll and pension deductions
4. Generate compliance reports for NHIA and regulators

**Professional benefits (right):**
1. Browse verified locum shifts near you
2. Get paid quickly — no payment delays
3. Complete accredited CPD to renew your licence
4. Build a verified digital professional profile

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Full-width (`w-full`) with NO max-width container | The split columns should bleed edge-to-edge. A centered container would shrink both columns and lose the visual impact of the split. |
| `bg-brand-dark` vs `bg-brand-green` | Dark green = employer authority/formality. Yellow-green = professional energy/approachability. Both in the brand palette, different psychological signals. |
| Gold CTA on dark column | Gold pops hardest against deep green — maximum contrast for the employer CTA. |
| White CTA on green column | A gold button would clash with yellow-green. White provides clean contrast and keeps the tone lighter/friendlier for professionals. |
| 4 bullet benefits per column | Enough to be convincing, few enough to be scannable. Per visual hierarchy rules: don't enumerate everything — only the most compelling. |
| Checkmark icons in column's accent colour | Employer column: `text-brand-gold` checks. Professional column: `text-white` checks. Maintains intra-column colour harmony. |

---

### 3.8 `components/TestimonialsSection.tsx`

**Type:** Server Component  
**File:** `components/TestimonialsSection.tsx`

#### Purpose
Social proof from real users. Per CLAUDE.md: "People buy from businesses that other people trust." Placed after the Audience split to reinforce each persona's decision with peer validation.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `testimonials` | `SanityTestimonial[] \| null \| undefined` | Dereferenced testimonial documents from Sanity `homePage.testimonials[]->`. Optional — falls back to `FALLBACK_TESTIMONIALS` when null. |

#### Data Structure

```ts
interface SanityTestimonial {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  organisation?: string;
}

interface TestimonialDisplay extends SanityTestimonial {
  initials: string;    // Derived via getInitials() — strips "Dr./Nurse/Prof." prefix
  avatarBg: string;    // Cycled by index: bg-brand-dark → bg-brand-green → bg-brand-gold
}
```

`toDisplay(t, index)` maps `SanityTestimonial` → `TestimonialDisplay`. `getInitials("Dr. Amaka Okonkwo")` → `"AO"`.

**Seeded testimonials:** 3 documents in Sanity — Dr. Amaka Okonkwo (Medical Director, Lagos), Blessing Adeyemi (Nurse, Abuja), Dr. Emeka Nwosu (GP, Port Harcourt).

#### Three Testimonials (Placeholder — Replace Post-Launch)

| Name | Role | Organisation | Persona | Avatar BG |
|------|------|--------------|---------|-----------|
| Dr. Chidinma Eze | Medical Director | Sterling Health Hospital, Lagos | Employer | `bg-brand-dark` |
| Dr. Emeka Okonkwo | General Practitioner | Locum Professional, Abuja | Professional | `bg-brand-green` |
| Nurse Funmilayo Adeyemi | Head of Nursing Services | Meridian Maternity Centre, Port Harcourt | Professional (nursing) | `bg-brand-gold` |

Three testimonials cover three distinct user archetypes — hospital administrator, doctor, and nurse — maximising relatability across the target audience.

#### Card Anatomy (top to bottom)
1. Five gold star rating
2. Large decorative quotation mark SVG (20% opacity green)
3. Quote text in `blockquote` element
4. Separator line
5. Initials avatar + name, role, organisation

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Initials avatars not photos | No verified headshots yet. Initials look intentional and professional rather than "missing image." Each uses a different brand colour to add visual variety. |
| `line-clamp-3` NOT used on quotes | Unlike blog excerpts, testimonials should be read in full — they're short enough. Truncating them would reduce their persuasive impact. |
| `<blockquote>` semantic element | Correct HTML for quoted speech — improves accessibility and SEO (Google can recognise quote markup). |
| `&ldquo;` and `&rdquo;` | Proper typographic curly quotes, not straight ASCII quotes. Contributes to the premium feel. |
| `flex flex-col` + `flex-1` on quote | Makes all three cards the same height even if quote lengths differ. The quote stretches to fill available space, keeping the attribution row pinned to the bottom of each card. |
| Hover: `border-brand-green/20 shadow-lg` | Subtle interactive feedback — cards lift slightly to acknowledge user hover without being distracting. |

> ⚠️ **IMPORTANT:** Replace placeholder testimonials with real, verified quotes from actual ProNurtureSphere users after the beta launch. Fake testimonials damage credibility if discovered. The Sanity `testimonial` collection schema is ready for real content.

---

### 3.9 `components/StatsSection.tsx`

**Type:** Server Component  
**File:** `components/StatsSection.tsx`

#### Purpose
Reinforces the social proof from TestimonialsSection with hard numbers. Large, bold figures on a deep green background create a dramatic, high-confidence visual moment.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `stats` | `HomepageStat[] \| null \| undefined` | Same Sanity `homePage.stats[]` data passed from page.tsx — shared with SocialProofBar. Optional — falls back to `FALLBACK_STATS` when null. |

#### Data Structure

```ts
interface StatDisplay extends HomepageStat {
  sublabel?: string;  // Present in FALLBACK_STATS, absent in Sanity data (renders nothing)
}
```

Sanity stats don't carry sublabels — the field is omitted and the sublabel row simply doesn't render. The `FALLBACK_STATS` include sublabels (e.g. "Verified on platform") for richer context when Sanity is unpopulated.

#### Four Stats

| Value | Label | Sublabel |
|-------|-------|---------|
| 500+ | Healthcare Professionals | Verified on platform |
| 50+ | Partner Facilities | Hospitals, clinics & agencies |
| 10,000+ | Shifts Managed | Across Nigeria |
| 98% | Compliance Rate | Regulatory adherence |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `text-brand-gold` on numbers | Gold numbers on deep green = the highest contrast ratio in the ProNurtureSphere palette. The numbers must jump off the screen. |
| `text-5xl sm:text-6xl lg:text-7xl` | Deliberately enormous. These numbers are meant to impress — small type defeats the purpose. |
| Same background as hero and waitlist | Deep green in three positions (hero, stats, waitlist) creates a rhythmic brand-colour anchoring throughout the scroll journey. |
| `lg:border-r lg:border-white/10` dividers | Subtle separators only on desktop — on mobile the 2-column grid provides natural separation. Avoids cluttered dividers on small screens. |
| Dot-grid background decoration | Same pattern as hero and waitlist — visual motif that ties the deep-green sections together as one design language. |

---

### 3.10 `components/BlogPreviewSection.tsx`

**Type:** Server Component  
**File:** `components/BlogPreviewSection.tsx`

#### Purpose
Demonstrates thought leadership, provides SEO value through internal links, and educates visitors who aren't yet ready to sign up. The "educate before selling" tactic.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `posts` | `SanityPost[] \| null \| undefined` | 3 most recent posts from `recentPostsQuery`, fetched in page.tsx. Optional — falls back to `FALLBACK_POSTS` when null. |

#### Data Structure

```ts
interface BlogDisplayPost {
  id: string;
  slug: string;
  categorySlug?: string;  // e.g. "for-employers" (Sanity slug value)
  title: string;
  excerpt?: string;
  date: string;           // Formatted via formatDate(iso) → "8 May 2026"
  mainImage?: SanityImage | null;
  imageAlt: string;
}
```

**Image handling:** `next/image` via `urlFor()` at 400×250 when `post.mainImage` exists; `BlogImagePlaceholder` gradient otherwise. **Category display:** `CATEGORY_LABEL` maps slug → badge text; `CATEGORY_STYLE` maps badge text → Tailwind classes.

#### Category Tag Colour Map

```ts
const categoryStyles: Record<string, string> = {
  "For Employers":      "bg-brand-dark text-white",
  "For Professionals":  "bg-brand-green text-white",
  "Industry Insights":  "bg-brand-gold text-brand-dark",
}
```

Tags use brand colours that match the audience they address — employers get dark green, professionals get yellow-green, insights get gold.

#### Three Placeholder Articles

| Category | Title | Targets |
|----------|-------|---------|
| For Employers | How Nigerian Hospitals Can Fill Locum Shifts 5x Faster | Dr. Adaeze persona |
| For Professionals | MDCN CPD Requirements for 2026 | Dr. Amarachi persona |
| Industry Insights | Nigeria's Healthcare Workforce Crisis | Both personas |

#### Card Anatomy (top to bottom)
1. Image (600×340) with category tag overlay
2. Date + read time (meta)
3. Article title (H3)
4. Excerpt (`line-clamp-3`)
5. "Read More →" link

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `line-clamp-3` on excerpt | Cards must be the same height regardless of excerpt length. Clipping at 3 lines keeps layout predictable. Users should click through to read the full article. |
| `group-hover:scale-105` on image | Image zoom on hover is a standard pattern for media cards — signals clickability and adds tactile pleasure. |
| `group-hover:text-brand-green` on title | Reinforces that the entire card is clickable, not just the "Read More" link. |
| "View All Articles →" top-right link | Provides an escape path for users who want to explore more without clicking a specific article — but placed subtly so it doesn't compete with the cards. |
| Three topics covering both personas | Each article targets a specific audience (employers, professionals, or both). A visitor to this section should always find at least one article relevant to them. |

> ⚠️ **TODO:** Replace static `blogPosts` array with a live Sanity GROQ query once real articles are written. See [Section 8](#8-how-to-extend) for the query pattern.

---

## 7. Blog Page Components

All components live in `components/blog/`. The page assembler is `app/blog/page.tsx`.

**Target audience:** Both buyer personas + SEO-driven organic traffic  
**Tone:** Educational, authoritative, locally grounded — thought leadership  
**Section framework:** Content-discovery flow (Orientation → Editorial → Retention)

---

### 7.1 `components/blog/BlogHero.tsx`

**Type:** Server Component

#### Purpose
Compact page-identity section (~50vh) for the `/blog` route. Unlike full-page heroes, this is intentionally lean — the articles below are the content, and the hero exists to orient the visitor, not to hold their attention.

#### Key Content

| Element | Content |
|---------|---------|
| Badge | "Resources & Insights" with gold dot |
| H1 | "Insights for Nigeria's Healthcare Workforce." |
| Subheadline | Describes scope — practical guides, industry analysis, career resources, both personas |
| Decorative rule | Brand-dark + brand-gold + brand-green colour trio |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `minHeight: "50vh"` (not `min-h-screen`) | Blog listing is a content page — visitors scrolled here to read articles, not to admire a hero. Half-viewport keeps the featured post visible above the fold on most screens. |
| No CTA buttons | The page's CTAs are the article cards themselves and the newsletter at the bottom. Adding CTA buttons in the hero would confuse the hierarchy. |
| Centred text layout (no two-column) | Article cards provide all the visual richness below. The hero is a clean headline + subheadline — no competing imagery needed. |

---

### 7.2 `components/blog/BlogFilters.tsx`

**Type:** Server Component

#### Purpose
Horizontal row of category filter pills below the hero. Helps visitors self-identify and navigate to the content category most relevant to them.

#### Five Categories

| Label | Audience |
|-------|----------|
| All | Default — shows all articles |
| For Professionals | Dr. Amarachi persona |
| For Employers | Dr. Adaeze persona |
| Industry Insights | Both personas, broader ecosystem context |
| CPD & Compliance | Professionals seeking licence/renewal content |

#### States

| State | Classes |
|-------|---------|
| Active | `bg-brand-dark text-white border-brand-dark` |
| Inactive | `bg-transparent text-brand-dark/70 border-brand-dark/30 hover:border-brand-dark` |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `overflow-x-auto` on wrapper | 5 pills risk wrapping on narrow screens. Horizontal scroll keeps them on one row without shrinking. |
| Filter maps display label → Sanity slug | `BLOG_CATEGORIES` uses display labels ("For Professionals") but `post.category` stores slugs ("for-professionals"). `BlogGrid` uses a `CATEGORY_SLUG` lookup map to align both sides before comparing. |
| `aria-pressed` on buttons | Communicates the active state to screen readers correctly, even before real filtering is implemented. |

---

### 7.3 `components/blog/BlogFeaturedPost.tsx`

**Type:** Server Component

#### Purpose
A single premium full-width article card above the 3-column grid. The larger format signals editorial priority and drives click-through on the most strategically valuable piece.

#### Featured Article

| Field | Content |
|-------|---------|
| Category | Industry Insights |
| Title | Nigeria's Doctor Shortage by the Numbers — and What It Means for Your Facility |
| Excerpt | Doctor-to-patient ratio framing, WHo recommendation comparison, response strategies |
| Date | June 2, 2026 |
| Read time | 8 min read |
| Slug | `nigeria-doctor-shortage-numbers` |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| "Featured" gold badge on image | Visual grammar: this badge communicates editorial curation — increases perceived value and click-through. |
| Two-column (image left, text right) | Horizontal layout maximises use of the full container width — more impactful than a vertical card. |
| `group-hover:scale-105` on image | Reinforces that the entire card is clickable — a standard interactive media card pattern. |
| `group-hover:text-brand-green` on title | Consistent hover behaviour with BlogGrid cards — the entire card registers as a single clickable unit. |

---

### 7.4 `components/blog/BlogGrid.tsx`

**Type:** Server Component

#### Purpose
The main content section of the blog page. Nine articles across all content categories presented in a responsive card grid. The article mix covers all buyer personas so every visitor finds relevant content.

#### Nine Articles

| # | Category | Title |
|---|----------|-------|
| 1 | For Professionals | MDCN & NMCN Licence Renewal 2026 |
| 2 | For Professionals | Japa or Stay? Locum Work as a Middle Path |
| 3 | For Professionals | How to Spot a Fake Locum Listing |
| 4 | For Employers | Real Cost of an Empty Shift |
| 5 | For Employers | Credential Verification Compliance Guide |
| 6 | For Employers | Retention Over Recruitment |
| 7 | CPD & Compliance | 5 Affordable Ways Nurses Can Meet MCPDP Requirements |
| 8 | For Professionals | Building a Professional Profile |
| 9 | Industry Insights | Why Nigeria Needs a Healthcare Workforce Ecosystem |

#### Card Data Structure

```ts
interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;       // Display format: "May 28, 2026"
  dateTime: string;   // ISO 8601 for <time> accessibility: "2026-05-28"
  readTime: string;
  imageAlt: string;
}
```

#### Category Tag Style
All tags use `bg-brand-gold/20 text-brand-dark` — a unified gold-tint pill style per CLAUDE.md spec. This differs from `BlogPreviewSection.tsx` on the homepage (which uses colour-coded category tags) — the blog page uses a single consistent tag style for visual cohesion.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `line-clamp-3` on excerpt | Card heights must be consistent across the grid regardless of excerpt length. `flex-1` on the excerpt div + `flex flex-col` on the card pushes the "Read More" link to the card bottom. |
| `flex flex-col flex-1` card structure | Makes all cards in a row the same height — required for a clean grid with bottom-aligned CTAs. |
| 1-col → 2-col → 3-col breakpoints | Mobile-first; 2-col tablet avoids very wide cards before switching to the full 3-column desktop layout. |
| `CATEGORY_SLUG` map for filter | `activeCategory` is a display label ("For Professionals"). Sanity stores the slug value ("for-professionals"). The map converts at comparison time so the GROQ query and the UI can each use their natural format. |

**Sanity wiring (complete):** Static `blogPosts` array removed. `BlogGrid` now accepts `posts: SanityPost[]` passed from the server-side `postsQuery` fetch. Card image: renders `next/image` via `urlFor()` when `post.mainImage` present; falls back to `BlogImagePlaceholder` gradient.

---

### 7.5 `components/blog/BlogNewsletterCTA.tsx`

**Type:** `'use client'` (Client Component)

#### Purpose
Newsletter email capture at the bottom of the blog page. Retains readers who found value in an article but aren't ready to join the platform waitlist yet. Lower-commitment than the waitlist — builds the email audience for ongoing content marketing.

#### State Machine

```
idle → (submit) → loading → success
                           ↘ error → (user types) → idle
```

| State | UI Behaviour |
|-------|-------------|
| idle | Form renders normally |
| loading | Button shows spinner + "Subscribing…" text. Input + button both disabled. |
| success | Form replaced by gold checkmark + confirmation message |
| error | Error message below form. Resets to idle when user types |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Deep green (`#103613`) background | Consistent with all conversion sections site-wide — WaitlistSection, EmployersCTA, ProfessionalsCTA. Visual language signals: "this is where we ask you for something." |
| Email-only form | Per CLAUDE.md: "Keep forms short." Name field would reduce conversion rate for minimal benefit. |
| `source: 'blog'` tag in TODO comment | When the real API is connected, tagging the source helps segment newsletter subscribers from waitlist subscribers for targeted campaigns. |
| Privacy note below form | "No spam, ever. Unsubscribe any time." — addresses the #1 objection to giving an email address. Short and specific. |

---

### `/blog` Page

**File:** `app/(site)/blog/page.tsx`  
**Type:** Server Component (async — fetches from Sanity)  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 60` (ISR — refetches from Sanity within 60s)

**SEO metadata:**
- Title: "Resources & Insights — ProNurtureSphere"
- Description: Platform description targeting both personas + SEO keywords

**Data flow:**
```ts
const posts: SanityPost[] = await serverClient.fetch(postsQuery)
// → BlogFeaturedPost receives posts[0]
// → BlogFilteredContent receives all posts (passes to BlogGrid)
```

**Section order:**

```
1. BlogHero              → Compact orientation (~50vh)
2. BlogFilters           → Category pills (via BlogFilteredContent client wrapper)
3. BlogFeaturedPost      → Most recent post from Sanity — real image or gradient
4. BlogGrid              → All posts from Sanity — filterable by category
5. BlogNewsletterCTA     → Newsletter email capture
```

---

### 3.11 `components/WaitlistSection.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/WaitlistSection.tsx`

#### Purpose
The final, highest-urgency conversion section on the page. Every visitor who made it this far (full scroll) is high-intent. This section captures their email before they leave.

#### Props
None. All state is internal.

#### State

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `email` | `string` | `""` | Controlled input value for the email field. |
| `status` | `"idle" \| "loading" \| "success" \| "error"` | `"idle"` | Form submission state machine. Drives the UI rendering logic. |
| `errorMessage` | `string` | `""` | Error text displayed below the form on validation failure or API error. |

#### State Machine

```
idle → (submit) → loading → success
                          ↘ error → (user types) → idle
```

- **idle:** Default. Form renders normally.
- **loading:** Button shows spinner + "Joining…" text. Input and button both `disabled`.
- **success:** Entire form is replaced with a confirmation message + gold checkmark icon. Email field is cleared.
- **error:** Error message appears below the form. Status resets to `idle` when the user starts typing again.

#### Form Validation
Client-side only (for now): checks that `email` is truthy and contains `@`. Server-side validation should be added in the API route.

#### API Integration
POSTs `{ email }` to `/api/waitlist` — the Next.js route handler validates server-side and forwards to Make.com. Returns `{ success: true }` on delivery; shows inline error on failure without a reload.

```ts
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
const data = await response.json();
if (!data.success) throw new Error(data.error ?? 'Server error');
```

See `app/api/waitlist/route.ts` (Section 11.1) for full route documentation.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `'use client'` | The controlled input and submission state machine require React state + event handlers — not available in Server Components. |
| Email-only form (no name field) | Per CLAUDE.md: "Keep forms short — name + email only for waitlist." Every additional field reduces conversion rates. |
| Full form replaced on success | Hiding the form on success prevents double-submissions and gives clear, satisfying feedback. A confetti or green checkmark moment rewards the action. |
| Privacy note below the form | "No spam, ever." — directly addresses the #1 objection to giving an email address. Specific language outperforms vague "we respect your privacy." |
| Three trust signals below privacy note | Free access + priority onboarding + early adopter pricing — each is a concrete benefit for signing up now vs. later. Creates urgency without manufactured scarcity. |
| `aria-busy`, `aria-invalid`, `aria-live` | Full accessibility for the form's dynamic states. Screen readers announce loading, errors, and success in real time. |
| `noValidate` on `<form>` | Disables the browser's native validation UI so we can use our own styled error states that match the brand. |

---

---

## 4. Employers Page Components

All components live in `components/employers/`. The page assembler is `app/employers/page.tsx`.

**Target persona:** Dr. Adaeze Okafor — Hospital Administrator / Medical Director / HR Manager  
**Tone:** Formal, data-driven, ROI-focused, compliance-aware  
**Section framework:** AIDA (Attention → Interest → Desire → Action)

---

### 4.1 `components/employers/EmployersHero.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersHero.tsx`

#### Purpose
Above-the-fold hero for the `/employers` page. White background, two-column layout (text left, dashboard panel right). Answers what/who/why in under 3 seconds for the employer persona specifically.

#### Key Content

| Element | Content |
|---------|---------|
| Badge | "For Healthcare Facilities" |
| H1 | "Build a Stronger Healthcare Team. Starting Today." |
| Subheadline | ProNurtureSphere value prop — hire verified professionals, CPD compliance, workforce growth |
| Primary CTA | "Get Early Access" → `/waitlist` (`bg-brand-dark text-white`) |
| Secondary CTA | "See How It Works" → `#how-it-works` (outlined) |
| Stat card overlay | "98% Compliance Rate" — immediate ROI signal for compliance-focused administrator |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| White (not brand-light) background | The employer persona is formal — white feels cleaner and more corporate than off-white. Contrast with the homepage hero's brand-light. |
| `h-screen overflow-hidden` | Forces full-viewport height so the hero content fits above the fold with no scroll required. |
| "98% Compliance Rate" stat card | Speaks directly to Dr. Adaeze's #1 concern: regulatory compliance. Numbers are more persuasive than words for this persona. |
| `#how-it-works` secondary CTA target | Addresses Dr. Adaeze's implementation fear ("how complex is this?") by linking straight to the 3-step process. |

---

### 4.2 `components/employers/EmployersPainPoints.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersPainPoints.tsx`

#### Purpose
Empathy section. Resonates with the employer's known frustrations before presenting any solution. Empathy earns trust; trust enables conversion.

#### Three Pain Points

| Title | Icon | Addresses |
|-------|------|-----------|
| Managing shifts on WhatsApp, still getting gaps | Chat bubble | Scheduling chaos (Dr. Adaeze primary pain) |
| Can't verify if locum staff are actually qualified | Warning triangle | Compliance and patient-safety risk |
| Payroll, compliance, and training in three places | Stacked layers | Admin fragmentation / month-end chaos |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Red-tinted icon backgrounds (`bg-red-50 text-red-500`) | Red signals "pain/problem." Unlike solution sections where icons use brand-dark/gold, pain-point icons are intentionally red to signal "this is what we're fixing." |
| Transition teaser at the bottom | "ProNurtureSphere was built specifically to solve every one of these problems." — a bridge sentence into the transformation/solution sections. |

---

### 4.3 `components/employers/EmployersTransformation.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersTransformation.tsx`

#### Purpose
The pivot from problem to solution using Before → After framing. Deep green background signals we've entered the "answer" phase of the page narrative.

#### Three Transformations

| Before | After | Icon |
|--------|-------|------|
| Reactive staffing | Proactive workforce control | Trending up |
| Unverified hires | Credentialed, CPD-trained professionals only | Shield check |
| Manual admin chaos | One dashboard for everything | Grid/dashboard |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Strikethrough on "Before" text | Visual grammar: strikethrough = "leaving this behind." Emotionally separates the bad old state from the good new state. |
| Arrow SVG between before/after | Arrow icon between the strikethrough and the after-text reinforces directionality — moving forward, not backward. |
| Gold button on deep green | Maximum contrast — the primary conversion action at the bottom of the most persuasive section. |

---

### 4.4 `components/employers/EmployersFeatures.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersFeatures.tsx`

#### Purpose
Detailed platform capabilities, presented benefit-first. Every card title is the *outcome* (benefit), with the feature category shown smaller beneath as secondary context.

#### Six Feature Cards

| Benefit Title | Feature Category | Key Copy Element |
|---------------|-----------------|-----------------|
| Fill Shifts in Minutes, Not Hours | Shift Posting & Booking | "No phone calls. No WhatsApp groups." |
| Only Hire Who You Can Trust | Credential Verification | MDCN/NMCN + CPD certificates |
| Payroll That Runs Itself | Payroll Management | ₦ currency, PAYE tax, pension |
| Know Who's Working, Always | Attendance & Timesheets | Real-time visibility, no paper |
| Keep Your Team Compliant | CPD Training | Licence renewals, inspection-ready |
| See Your Workforce Clearly | Workforce Analytics | Gaps, fill rates, cost-per-hire |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Benefit title + feature subtitle hierarchy | Users care about outcomes first, features second. "Fill Shifts in Minutes" sells the promise; "Shift Posting & Booking" labels the mechanism. |
| `id="features"` anchor | Kept consistent with homepage pattern — enables anchor-linking from hero CTAs. |
| `brand-light` card background inside white section | Cards on white would blend. Off-white cards on a white section create a subtle layered depth. |

---

### 4.5 `components/employers/EmployersHowItWorks.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersHowItWorks.tsx`

#### Purpose
Reduces the implementation complexity to 3 named steps, directly countering Dr. Adaeze's "Implementation cost / staff adoption concerns" barrier (CLAUDE.md Section 3).

#### Three Steps

| # | Title | Key Message |
|---|-------|-------------|
| 01 | Create facility profile and post first shift | Same-day live, no technical training |
| 02 | Browse verified professionals and hire | Credentials pre-checked, one-click confirm |
| 03 | Manage shifts, payroll, compliance from one dashboard | Fully automated after onboarding |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `id="how-it-works"` anchor | The hero secondary CTA "See How It Works" links here. Must be connected. |
| Brand-dark step number containers with gold text | Large, prominent, high-contrast step indicators give the section immediate visual structure. The eye naturally reads 01 → 02 → 03. |
| "Post their first shift within an hour" in subheadline | Concrete timeframe is more persuasive than vague "quick setup." Specificity = credibility. |

---

### 4.6 `components/employers/EmployersTestimonials.tsx`

**Type:** Server Component  
**File:** `components/employers/EmployersTestimonials.tsx`

#### Purpose
Employer-specific social proof. Unlike the homepage testimonials (mixed audiences), these are exclusively from hospital administrators and HR officers — exactly the peer group Dr. Adaeze respects.

#### Two Placeholder Testimonials

| Name | Role | Organisation | Key Claim |
|------|------|--------------|-----------|
| Dr. Ngozi Anyanwu | Medical Director | Bright Future Specialist Hospital, Abuja | WhatsApp → one dashboard in under a week |
| Mrs. Adaeze Obiechina | Chief HR Officer | Crestview Diagnostics & Maternity, Lagos | Month-end payroll reconciliation eliminated |

> ⚠️ Replace with verified quotes post-beta. The Sanity `testimonial` collection schema is ready.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| 2-column layout (not 3) | Longer, richer employer testimonials need more horizontal space than the homepage 3-column layout. |
| HEFAMAA mentioned in second testimonial | Regulatory specificity (a real Nigerian health body) increases authenticity and resonates with compliance-focused administrators. |

---

### 4.7 `components/employers/EmployersFAQ.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/employers/EmployersFAQ.tsx`

#### Purpose
Handles final objections before the conversion CTA. Each question is mapped to a specific barrier from the Dr. Adaeze persona.

#### State

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `openIndex` | `number \| null` | `null` | Index of the currently expanded FAQ item. `null` = all closed. |

#### State Logic
```ts
const toggle = (index: number) => {
  setOpenIndex((prev) => (prev === index ? null : index));
};
```
Clicking the open item closes it (toggle). Clicking a different item opens it and closes the previous one.

#### Five FAQs and Their Barrier Mapping

| Question | Addresses |
|----------|-----------|
| How long does onboarding take? | Implementation cost / complexity fear |
| Can I manage permanent staff AND locums? | Scope/flexibility concern |
| How does credential verification work? | Trust in the verification process |
| Is it compliant with Nigerian regulations? | Regulatory compliance concern |
| What does early access include? | Value clarity for sign-up decision |

#### Accordion Animation
Uses `max-h` CSS transition (`max-h-0 opacity-0` → `max-h-96 opacity-100`) rather than JavaScript-measured heights. This avoids layout reflow and works without `useRef` measuring.

#### Accessibility
- `aria-expanded` on the trigger button
- `aria-controls` links button to answer panel
- `role="region"` + `aria-labelledby` on answer panel
- Focus ring on trigger button (`:focus` visible state)

---

### 4.8 `components/employers/EmployersCTA.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/employers/EmployersCTA.tsx`

#### Purpose
Final email capture for employer visitors. Identical pattern to `WaitlistSection.tsx` — deep green background, gold CTA, trust badges — for consistent conversion UX across the site.

#### State
Same state machine as `WaitlistSection.tsx`:

```
idle → loading → success
                ↘ error → (user types) → idle
```

#### Three Trust Badges
- "Free to join" — removes cost barrier
- "No credit card required" — removes financial commitment barrier
- "Nigeria-built platform" — local fit/relevance signal

#### API Integration
Uses a 1-second simulated delay (same as WaitlistSection). **TODO:** Replace with real API call including `source: 'employers'` tag to distinguish employer signups from general waitlist signups.

---

## 5. Pages

### `/` — Homepage

**File:** `app/(site)/page.tsx`  
**Type:** Async Server Component — fetches from Sanity  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 60` (ISR — refreshes from Sanity within 60s)

**Data fetching:**
```ts
const [homePage, recentPosts] = await Promise.all([
  serverClient.fetch<HomePageData | null>(homePageQuery),
  serverClient.fetch<SanityPost[]>(recentPostsQuery),
])
```
Uses `serverClient` (`useCdn: false`) to bypass Sanity CDN cache and always serve the latest published content.

**Props threading:**
| Component | Prop | Source |
|-----------|------|--------|
| `HeroSection` | `hero` | `homePage?.hero` |
| `SocialProofBar` | `stats` | `homePage?.stats` |
| `FeaturesSection` | `featuredServices` | `homePage?.featuredServices` |
| `TestimonialsSection` | `testimonials` | `homePage?.testimonials` |
| `StatsSection` | `stats` | `homePage?.stats` |
| `BlogPreviewSection` | `posts` | `recentPosts` |
| `ProblemSection` | — | Hardcoded (no Sanity data) |
| `AudienceSection` | — | Hardcoded (no Sanity data) |
| `WaitlistSection` | — | Hardcoded (no Sanity data) |

**Section order (conversion-funnel logic):**

```
1. HeroSection         → Attention + primary value prop + dual CTA
2. SocialProofBar      → Immediate credibility after the pitch
3. ProblemSection      → Empathy + urgency (agitate the pain)
4. FeaturesSection     → Solution reveal (answer to the pain)
5. AudienceSection     → Self-segmentation (which persona are you?)
6. TestimonialsSection → Peer social proof
7. StatsSection        → Scale and reliability with numbers
8. BlogPreviewSection  → Thought leadership (educate the hesitant)
9. WaitlistSection     → Final conversion CTA
```

This order follows the **Problem → Solution → Proof → Action** persuasion framework.

---

### `/employers` — For Healthcare Employers

**File:** `app/(site)/employers/page.tsx`  
**Type:** Async Server Component — fetches from Sanity  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 60`

**Data fetching:**
```ts
const data = await serverClient.fetch<EmployersPageData | null>(employersPageQuery)
```

**Props threading:**
| Component | Prop | Source |
|-----------|------|--------|
| `EmployersHero` | `hero` | `data?.hero` |
| `EmployersFeatures` | `features` | `data?.features` |
| `EmployersTestimonials` | `testimonials` | `data?.testimonials` |
| `EmployersCTA` | `cta` | `data?.cta` |
| `EmployersPainPoints` | — | Hardcoded |
| `EmployersTransformation` | — | Hardcoded |
| `EmployersHowItWorks` | — | Hardcoded |
| `EmployersFAQ` | — | Hardcoded |

**Section order (AIDA framework):**

```
1. EmployersHero           → Attention — above the fold, "For Healthcare Facilities"
2. EmployersPainPoints     → Interest  — empathy with Dr. Adaeze's daily frustrations (static)
3. EmployersTransformation → Desire    — Before/After narrative pivot (static)
4. EmployersFeatures       → Desire    — 6 benefit-led platform capability cards (Sanity)
5. EmployersHowItWorks     → Desire    — 3 steps to remove implementation fear (static)
6. EmployersTestimonials   → Desire    — social proof from hospital administrators (Sanity)
7. EmployersFAQ            → Action    — resolves final objections (static, client component)
8. EmployersCTA            → Action    — email capture POSTs to /api/waitlist with source:'employers' (Sanity)
```

**Icon strategy:** `ICON_BY_FEATURE_KEY` in `EmployersFeatures.tsx` maps Sanity feature `_key` values (feat-1..feat-6) to inline SVG `ReactNode`s. Icons never stored in Sanity CMS.

---

### `/professionals` — For Healthcare Professionals

**File:** `app/(site)/professionals/page.tsx`  
**Type:** Async Server Component — fetches from Sanity  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 60`

**Target persona:** Dr. Amarachi Bello — Doctor / Nurse / Pharmacist / Allied Health Professional  
**Tone:** Warm, opportunity-focused, encouraging, mobile-first. Uses "you" language throughout.  
**Section framework:** AIDA (Attention → Interest → Desire → Action)

**Data fetching:**
```ts
const data = await serverClient.fetch<ProfessionalsPageData | null>(professionalsPageQuery)
```

**Props threading:**
| Component | Prop | Source |
|-----------|------|--------|
| `ProfessionalsHero` | `hero` | `data?.hero` |
| `ProfessionalsFeatures` | `features` | `data?.features` |
| `ProfessionalsTestimonials` | `testimonials` | `data?.testimonials` |
| `ProfessionalsCTA` | `cta` | `data?.cta` |
| `ProfessionalsPainPoints` | — | Hardcoded |
| `ProfessionalsTransformation` | — | Hardcoded |
| `ProfessionalsHowItWorks` | — | Hardcoded |
| `ProfessionalsFAQ` | — | Hardcoded |

**Section order:**

```
1. ProfessionalsHero           → Attention — above the fold, "For Healthcare Professionals"
2. ProfessionalsPainPoints     → Interest  — empathy with Dr. Amarachi's daily frustrations (static)
3. ProfessionalsTransformation → Desire    — Before/After narrative pivot (static)
4. ProfessionalsFeatures       → Desire    — 6 benefit-led platform capability cards (Sanity)
5. ProfessionalsHowItWorks     → Desire    — 3 steps to remove complexity and trust barriers (static)
6. ProfessionalsTestimonials   → Desire    — social proof from Nigerian doctors and nurses (Sanity)
7. ProfessionalsFAQ            → Action    — resolves final hesitations (static, client component)
8. ProfessionalsCTA            → Action    — email capture POSTs to /api/waitlist with source:'professionals' (Sanity)
```

**Icon strategy:** Same `ICON_BY_FEATURE_KEY` pattern as Employers — SVGs in component keyed by Sanity `_key`.

---

### `/about` — About ProNurtureSphere

**File:** `app/(site)/about/page.tsx`  
**Type:** Async Server Component — fetches from Sanity  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 60`

**Target audience:** Both personas + partners, media, stakeholders  
**Tone:** Mission-driven, institutional, authentic. Story page — NOT a conversion page.  
**Section framework:** Narrative arc (Who → Why → What → How → Who We Serve → People → Operations → Action)

**Data fetching:**
```ts
const data = await serverClient.fetch<AboutPageData | null>(aboutPageQuery)
```

**Props threading:**
| Component | Prop | Source |
|-----------|------|--------|
| `AboutMission` | `mission` | `data?.mission` (`body` blocks + `vision` string) |
| `AboutStory` | `story` | `data?.story` (`headline`, `body` blocks, `image`) |
| `AboutValues` | `values` | `data?.values` (7 objects with `_key`, `title`, `description`) |
| `AboutTeam` | `team` | `data?.team` (`team[0]` → founder card) |
| `AboutHero`, `AboutEcosystem`, `AboutLifecycle`, `AboutWhoWeServe`, `AboutPSLArms`, `AboutCTA` | — | Hardcoded (structural content) |

**Section order:**

```
1. AboutHero          → Above the fold — page identity, H1, founding photograph (static)
2. AboutMission       → Mission PortableText (green panel) + Vision string (light panel) (Sanity)
3. AboutStory         → PortableText body + optional image; pull quote + stats always static (Sanity)
4. AboutValues        → 7 values from Sanity; ICON_BY_VALUE_KEY maps _key val-1..val-7 → SVG (Sanity)
5. AboutEcosystem     → 4-pillar ecosystem model (static)
6. AboutLifecycle     → 7-stage professional lifecycle model (static)
7. AboutWhoWeServe    → 3 audience groups (static)
8. AboutTeam          → team[0] as founder card (name, role, bio, LinkedIn, photo via urlFor); 6 director role cards always static (Sanity for founder)
9. AboutPSLArms       → 6 operating arms of PSL (static)
10. AboutCTA          → Dual CTA: "Get Early Access" + "Contact Us" (static)
```

---

### `/studio` — Sanity Studio

**File:** `app/studio/[[...tool]]/page.tsx`  
**Status:** ✅ Complete (initial setup)

---

## 5. Professionals Page Components

All components live in `components/professionals/`. The page assembler is `app/professionals/page.tsx`.

**Target persona:** Dr. Amarachi Bello — Doctor / Nurse / Pharmacist / Allied Health Professional  
**Tone:** Warm, opportunity-focused, encouraging, mobile-first  
**Section framework:** AIDA (Attention → Interest → Desire → Action)

---

### 5.1 `components/professionals/ProfessionalsHero.tsx`

**Type:** Server Component

#### Purpose
Above-the-fold hero for the `/professionals` page. Off-white background, two-column layout (text left, platform panel right). Answers what/who/why in under 3 seconds for the professional persona.

#### Key Content

| Element | Content |
|---------|---------|
| Badge | "For Healthcare Professionals" |
| H1 | "Your Skills Are in Demand. We Make Sure You Get Paid for Them." |
| Subheadline | Names all professional types; mentions verified employers, locum shifts, and CPD |
| Primary CTA | "Get Early Access" → `/waitlist` (`bg-brand-dark text-white`) |
| Secondary CTA | "See Available Shifts" → `#how-it-works` (outlined) |
| Stat card overlay | "500+ Verified Professionals" — social proof / safety-in-numbers trust signal |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `style={{ backgroundColor: '#f5f5f0' }}` inline | Guarantees correct rendering regardless of Tailwind class resolution — consistent with homepage and employers hero |
| Stat card: "Growing" green badge | Signals the community is active and growing — reduces Dr. Amarachi's trust barrier ("am I the first?") |
| Secondary CTA: "See Available Shifts" | More specific than "See How It Works" — speaks to Dr. Amarachi's primary goal (finding shifts) |

---

### 5.2 `components/professionals/ProfessionalsPainPoints.tsx`

**Type:** Server Component

#### Purpose
Empathy section. Resonates with the professional's known frustrations before presenting any solution. Placed before the transformation to earn trust first.

#### Three Pain Cards

| Title | Icon | Addresses |
|-------|------|-----------|
| Chasing employers who don't respond or pay late | Warning circle | Payment reliability (primary pain) |
| CPD is expensive, hard to find, and not always relevant | Graduation cap | CPD accessibility and cost |
| Don't know if the job posting is real | Sad face | Fake listings / trust in employers |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Amber icon backgrounds (`bg-amber-50 text-amber-600`) | Red/amber = pain/broken signal. Consistent with ProblemSection on homepage. |
| "you" language throughout | Direct address increases emotional resonance with Dr. Amarachi — she feels seen and understood. |
| Transition teaser at bottom | "ProNurtureSphere was built specifically to fix every one of these problems — by clinicians who lived them." Bridges into the solution section. |

---

### 5.3 `components/professionals/ProfessionalsTransformation.tsx`

**Type:** Server Component

#### Purpose
The narrative pivot from problem to solution using Before → After framing. Deep green background signals the "answer" phase. Strikethrough on "Before" text visually separates the old state from the new.

#### Three Transformations

| Before (strikethrough) | After | Icon |
|------------------------|-------|------|
| Chasing payments | Get paid on time, every time | Wallet |
| Expensive, irrelevant CPD | Accredited courses built for Nigerian clinicians | Graduation cap |
| Fake job listings | Verified employers only, no wasted applications | Shield check |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Strikethrough + arrow + after text | Clear visual grammar: leaving old state behind, moving forward to new state. Proven direct-response copywriting pattern. |
| Gold CTA on deep green at bottom | Maximum contrast — the primary action after the most persuasive section on the page. |

---

### 5.4 `components/professionals/ProfessionalsFeatures.tsx`

**Type:** Server Component

#### Purpose
Presents 6 platform features benefit-first for the professional persona. Anchored at `id="features"`.

#### Six Feature Cards

| Benefit Title | Category | Key Outcome |
|---------------|----------|-------------|
| Find Shifts That Fit Your Life | Locum Shift Marketplace | Apply in minutes, no phone calls |
| Get Paid Without the Chase | Fast, Reliable Payments | Rate agreed upfront, payment on schedule |
| CPD That Actually Counts | Accredited CPD Courses | MDCN/NMCN recognised, affordable |
| Build Your Professional Profile | Verified Digital Profile | Trust-at-a-glance for employers |
| Track Your Licences & Renewals | Credential Tracking | Automatic renewal reminders |
| Learn From Nigeria's Best Clinicians | Webinars & Live Events | Practical learning + CPD credits |

---

### 5.5 `components/professionals/ProfessionalsHowItWorks.tsx`

**Type:** Server Component

#### Purpose
Reduces signup anxiety to 3 clear steps. Concrete timeframes ("less than 10 minutes", "one tap") add credibility. Counters the "bad UX" barrier from Dr. Amarachi persona.

#### Three Steps

| # | Title | Key Message |
|---|-------|-------------|
| 01 | Create your verified professional profile | Under 48 hours verification, 10 minutes to set up |
| 02 | Browse and apply for locum shifts near you | One tap, no CV, profile speaks for you |
| 03 | Complete shifts, earn CPD credits, get paid on time | Automatic logs, record grows with every shift |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `id="how-it-works"` anchor | Hero secondary CTA "See Available Shifts" links here — they must stay connected. |
| Connector line between steps (desktop) | Positioned on right edge of step containers to visually show sequential journey. |
| "Create Your Profile Today" bottom CTA | Bridges directly from understanding the process to taking the first action. |

---

### 5.6 `components/professionals/ProfessionalsTestimonials.tsx`

**Type:** Server Component

#### Purpose
Professional-specific social proof. Both testimonials are from healthcare professionals (not employers) — peer validation is highest for Dr. Amarachi.

#### Two Placeholder Testimonials

| Name | Role | Location | Key Claim |
|------|------|----------|-----------|
| Dr. Emeka Okonkwo | General Practitioner | Lagos | Three verified shifts, paid exactly on time |
| Nurse Amaka Chukwu | Registered Nurse | Abuja | CPD accepted by Nursing Council, found 2 locum shifts |

> ⚠️ Replace with verified quotes from real users after beta launch. Sanity `testimonial` schema is ready.

---

### 5.7 `components/professionals/ProfessionalsFAQ.tsx`

**Type:** `'use client'` (Client Component)

#### Purpose
Handles final hesitations from Dr. Amarachi before she signs up. Each question maps to a real barrier from the professional persona.

#### Five FAQs and Their Barrier Mapping

| Question | Addresses |
|----------|-----------|
| How do I verify my credentials? | Trust in the verification process |
| Are CPD courses accredited by Nigerian bodies? | CPD value / regulatory acceptance fear |
| How quickly will I get paid? | Payment reliability concern |
| Can I work locum while keeping my permanent job? | Flexibility / conflict-of-interest concern |
| What types of professionals can join? | Eligibility clarity for non-doctor professionals |

#### State Logic
Identical to `EmployersFAQ.tsx` — `openIndex: number | null`, toggle function closes open item on re-click.

---

### 5.8 `components/professionals/ProfessionalsCTA.tsx`

**Type:** `'use client'` (Client Component)

#### Purpose
Final email capture for professional visitors. Deep green background, gold button, same state machine as `EmployersCTA.tsx`.

#### Three Trust Badges

| Badge | Barrier It Overcomes |
|-------|----------------------|
| "Free to join" | Cost barrier |
| "Accredited CPD" | CPD value / relevance concern |
| "Verified employers only" | Trust in employer legitimacy |

#### API Integration
Uses 1-second simulated delay. **TODO:** Replace with real API call including `source: 'professionals'` tag.

---

## 6. About Page Components

All components live in `components/about/`. The page assembler is `app/about/page.tsx`.

**Target audience:** Both buyer personas + partners, media, institutional stakeholders  
**Tone:** Mission-driven, institutional, warm, authentic — story page not conversion page  
**Section framework:** Narrative arc (identity → mission → story → values → how we work → who we serve → people → operations → action)

---

### 6.1 `components/about/AboutHero.tsx`

**Type:** Server Component

#### Purpose
Above-the-fold hero for the `/about` page. Establishes organisational identity from first glance. Unlike the employers/professionals heroes, there are no CTA buttons — the goal is to draw the visitor into the story, not convert them immediately.

#### Key Content

| Element | Content |
|---------|---------|
| Badge | "About ProNurtureSphere" with green pulse dot |
| H1 | "Building the Healthcare Workforce Africa Deserves." |
| Subheadline | Full brand positioning statement — education, technology, healthcare delivery |
| Decorative divider | Brand-dark + brand-gold + brand-green colour dots |
| Right panel | Deep green container with placeholder image + "Est. 2024" founding badge |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| No CTA buttons | This is a story page. Buttons in the hero would signal "sell" when the tone should be "tell." The CTA at the bottom of the page serves the conversion need. |
| `min-h-screen` (not `h-screen`) | About page hero doesn't need strict viewport locking — content-first layout. |
| "Est. 2024" founding badge | Anchors the organisation in time. Stakeholders and partners look for this. |
| Decorative bar (dark + gold + green) | Uses all three primary brand colours as a visual punctuation mark below the text. |

---

### 6.2 `components/about/AboutMission.tsx`

**Type:** Server Component

#### Purpose
Presents mission and vision as two equal, visually contrasted statements. Placed immediately after the hero so the organisational north star is established before the story begins.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `mission` | `AboutMissionData \| null \| undefined` | Sanity `aboutPage.mission`. Optional — falls back to hardcoded blockquotes. |

**Sanity data used:**
- `mission.body` — rendered via `PortableText` from `next-sanity` with custom `missionBodyComponents` (white text, `text-lg md:text-xl leading-relaxed font-light`, left deep-green panel)
- `mission.vision` — plain string rendered as `<blockquote>` in the right off-white panel

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Deep green left / off-white right | Green = roots/foundation (mission). Light = aspiration/future (vision). Colour carries meaning. |
| PortableText on left, plain string on right | Mission is long-form prose; vision is a single focused statement. Different types suit their content. |
| `<blockquote>` element for vision | Semantic HTML — vision is a quotation from the organisation's founding charter. |

---

### 6.3 `components/about/AboutStory.tsx`

**Type:** Server Component

#### Purpose
The origin narrative. Answers "why does this organisation exist?" with prose from Sanity. A pull quote isolates the central founding insight. Two stat cards give the story institutional weight.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `story` | `AboutStoryData \| null \| undefined` | Sanity `aboutPage.story`. Optional — falls back to 5 hardcoded paragraphs. |

**Sanity data used:**
- `story.headline` → H2 (fallback: "Why We Built ProNurtureSphere.")
- `story.body` → rendered via `PortableText` with `storyBodyComponents` (`text-brand-dark/70 text-base md:text-lg leading-relaxed`)
- `story.image` → if present, rendered via `next/image` + `urlFor()` at top of right column before the pull quote

**Always static (not in Sanity):** Pull quote ("Healthcare professionals are trained but not nurtured..."), stat cards (72k+, 1:8k). These are foundational brand statements and don't need Studio editing.

#### Key Content

| Element | Detail | Source |
|---------|--------|--------|
| H2 | "Why We Built ProNurtureSphere." | Sanity `story.headline` |
| Narrative | 3 blocks: Nigeria talent/systems gap → PSL founding question → what became the product | Sanity `story.body` PortableText |
| Pull quote | "Healthcare professionals are trained but not nurtured into sustainable excellence." | Always static |
| Stat card 1 | 72k+ nurses with lapsed licences annually | Always static |
| Stat card 2 | 1:8,000 doctor-to-patient ratio vs 1:600 WHO recommendation | Always static |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| 3:2 column split (prose left, quote right) | Prose gets the majority space — it is the content. The pull quote is accent, not equal weight. |
| Stats and pull quote always static | These are founding-brand statements not subject to editorial update — removing them from Sanity avoids accidental edits that would undermine the brand narrative. |
| Pull quote on `bg-brand-dark` with gold left border | Isolates the most important insight on the About page — must stand apart from prose. |

---

### 6.4 `components/about/AboutValues.tsx`

**Type:** Server Component

#### Purpose
Makes organisational character concrete and scannable. Seven values in a card grid — each with an icon, title, and 1–2 sentence description.

#### Seven Values (Seeded in Sanity — _key val-1..val-7)

| _key | Title | Core Message |
|------|-------|-------------|
| val-1 | Built for Nigeria | MDCN/NHIS/PAYE structures — every feature fits Nigerian healthcare realities |
| val-2 | Trust Through Verification | No shortcuts on credentials — every professional verified before accepting shifts |
| val-3 | Professional Dignity | Reliable pay, clear contracts, career development — not WhatsApp negotiations |
| val-4 | Transparency | Facilities see who they're hiring; professionals see exactly what they'll earn |
| val-5 | Continuous Growth | CPD integrated into workflow — not a checkbox |
| val-6 | System Thinking | Staffing, payroll, compliance, training as one system — not four problems |
| val-7 | Patient-Centred Outcomes | Every product decision traces back to better patient care in Nigeria |

**Sanity wiring:** `ICON_BY_VALUE_KEY: Record<string, ReactNode>` in `AboutValues.tsx` maps each `_key` (val-1..val-7) to an inline SVG icon. The `values?` prop accepts `AboutValue[] | null`; `FALLBACK_VALUES` mirrors the seeded content. `import type { ReactNode } from "react"` — React.ReactNode TypeScript bug fixed.

---

### 6.5 `components/about/AboutEcosystem.tsx`

**Type:** Server Component

#### Purpose
Repositions PSL from "training company" to "healthcare ecosystem builder." The 4-pillar connected flow communicates that the four stages are sequential and interdependent — not four separate products.

#### Four Pillars

| Stage | Outcome | Description |
|-------|---------|-------------|
| Training | Competence | PSL Learning Academy programmes |
| Mentorship | Confidence | Cohort-based mentorship |
| Deployment | Experience | Verified workforce placement |
| Leadership | Sustainability | Advanced leadership pathways |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `bg-brand-dark` section | Dark green after the light values section — visual rhythm and authority |
| Arrow connectors between pillars (desktop) | Shows sequential flow. Pillars are stages, not silos. |
| Gold insight bar at the bottom | Closes the section with a unified statement — "PSL integrates all four." |

---

### 6.6 `components/about/AboutLifecycle.tsx`

**Type:** Server Component

#### Purpose
Makes the ecosystem model tangible via 7 named career stages. Each stage includes a programme title, description, and numbered step circle. Visitors can identify where they currently are in the lifecycle.

#### Seven Stages

| # | Stage | Subtitle |
|---|-------|----------|
| 01 | Awareness | Career guidance & community outreach |
| 02 | Training | PSL Learning Academy programmes |
| 03 | Mentorship | Structured mentorship cohorts |
| 04 | Certification & Competence | Clinical readiness validation |
| 05 | Deployment | Staffing & workforce placement |
| 06 | Practice Support | Continuous education & supervision |
| 07 | Leadership Development | Advanced leadership & consultancy pathways |

---

### 6.7 `components/about/AboutWhoWeServe.tsx`

**Type:** Server Component

#### Purpose
Names all three audiences explicitly so each visitor can identify themselves. Three equal columns with audience lists and green checkmark bullets.

#### Three Audience Groups

| Group | Key Audiences |
|-------|--------------|
| Healthcare Professionals | Doctors, nurses, pharmacists, allied health, students |
| Healthcare Institutions | Hospitals, clinics, NGOs, universities, agencies |
| Communities | Elderly, chronic disease patients, underserved communities |

---

### 6.8 `components/about/AboutTeam.tsx`

**Type:** Server Component

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `team` | `AboutTeamMember[] \| null \| undefined` | Sanity `aboutPage.team[]`. `team[0]` is used as the founder card. Optional — falls back to hardcoded constants. |

#### Purpose
Establishes human credibility with a prominent founder card and 6 director role cards. Names for director roles are intentionally absent — will be added when leadership is publicly confirmed.

#### Founder Card

| Element | Source | Content |
|---------|--------|---------|
| Name | Sanity `team[0].name` | Iziegbe Asemota |
| Title | Sanity `team[0].role` | Founder & CEO, ProNurtureSphere Limited |
| Bio | Sanity `team[0].bio` | Founder narrative |
| Avatar | `urlFor(team[0].image)` if set, else `placehold.co` with derived initials | Real photo or `IA` placeholder |
| LinkedIn | Sanity `team[0].linkedin` — rendered as link only when truthy | `https://linkedin.com/company/psl25` |

**LinkedIn link:** Rendered with LinkedIn SVG icon below the role label when `founder.linkedin` is present in Sanity. Uses `rel="noopener noreferrer"` and `aria-label` for accessibility.

**Avatar fallback:** `placehold.co/160x160/103613/c09e5a?text={initials}` — initials derived from name by splitting on spaces (strips Dr./Nurse/Prof. prefix).

#### Six Director Roles (names TBC — always static)

Director of Clinical Services · Director of Education & Training · Director of Workforce & Staffing Solutions · Director of Operations & Compliance · Director of Partnerships & Global Development · Director of Homecare & Wellness Services

> ⚠️ Replace placeholder avatar with real founder photograph before launch. Upload via Sanity Studio → aboutPage → team → image field. Add director names when confirmed.

---

### 6.9 `components/about/AboutPSLArms.tsx`

**Type:** Server Component

#### Purpose
Documents all six operating divisions of PSL. Each card has a colour-accented top border (brand-dark / brand-green / brand-gold alternating) to visually differentiate the arms while maintaining brand cohesion.

#### Six Arms

| Arm | Tagline | Top Border |
|-----|---------|------------|
| PSL Learning Academy | Education & Professional Development | brand-dark |
| PSL Workforce Solutions | Staffing & Global Deployment | brand-green |
| PSL Homecare & Wellness | Community & Domiciliary Care | brand-gold |
| PSL Clinical Services | Healthcare Delivery Programmes | brand-dark |
| PSL Global Health Consulting | Health Systems Strengthening | brand-green |
| PSL Foundation | Outreach, Scholarships & Humanitarian | brand-gold |

---

### 6.10 `components/about/AboutCTA.tsx`

**Type:** Server Component (no form state — uses `<Link>` not email input)

#### Purpose
Final dual-action CTA. Serves both audiences explicitly named in the subtext. Deep green background consistent with all CTA sections site-wide.

#### Two CTAs

| Button | Destination | Style |
|--------|-------------|-------|
| "Get Early Access" | `/waitlist` | Gold `bg-brand-gold text-brand-dark` |
| "Contact Us" | `/contact` | Outlined white `border-white/40 text-white` |

---

## 5. Sanity Architecture Patterns

These patterns are used consistently across all wired pages. Follow them exactly when adding new Sanity-backed sections.

### 5.1 Two Clients

| Client | File | `useCdn` | When to use |
|--------|------|----------|-------------|
| `client` | `sanity/lib/client.ts` | `true` | Client-side reads; non-critical; tolerates brief staleness |
| `serverClient` | `sanity/lib/client.ts` | `false` | All `page.tsx` server components — always serves latest published content |

**Rule:** Always use `serverClient` in `page.tsx`. The CDN client can serve stale responses that don't match what was just published in Studio.

### 5.2 ISR Revalidation

```ts
export const revalidate = 60  // at top of page.tsx
```

All wired pages revalidate every 60 seconds. Content published in Studio propagates to Vercel within ~60s.

### 5.3 Optional Props + FALLBACK_* Constants

Every wired component accepts `prop?: SanityType | null`. A `FALLBACK_*` constant mirrors the seeded content and renders when Sanity returns null. This means:
- The page renders identically if Sanity is unreachable
- Hard reloads during Studio maintenance don't break the live site
- Developing without internet access still works

```ts
const FALLBACK_HEADLINE = "Fill Shifts in Minutes, Not Hours"
const EmployersHero = ({ hero }: { hero?: HeroData | null }) => {
  const headline = hero?.headline ?? FALLBACK_HEADLINE
  // ...
}
```

### 5.4 ICON_BY_KEY Pattern

Icons (SVG `ReactNode`s) are never stored in Sanity CMS. Instead, a `Record<string, ReactNode>` in the component maps Sanity `_key` values to inline SVGs:

```ts
const ICON_BY_VALUE_KEY: Record<string, ReactNode> = {
  'val-1': <svg>...</svg>,  // Built for Nigeria
  'val-2': <svg>...</svg>,  // Trust Through Verification
  // ...
}
// Usage:
const icon = ICON_BY_VALUE_KEY[value._key] ?? <DefaultIcon />
```

This pattern is used in: `FeaturesSection`, `EmployersFeatures`, `ProfessionalsFeatures`, `AboutValues`.

### 5.5 urlFor() for Images

```ts
import { urlFor } from "@/sanity/lib/image"
// ...
const src = urlFor(post.mainImage).width(400).height(250).fit("crop").url()
```

Always provide `.width().height().fit("crop")` for predictable layout. Pass the full `SanityImage` object (not just the URL) — it contains asset reference + hotspot data. Only render `<Image>` when the field is non-null; otherwise show the `BlogImagePlaceholder` gradient or `placehold.co` fallback.

### 5.6 PortableText

All rich-text fields (blog body, homepage mission body, story body) use `PortableText` from `next-sanity`:

```ts
import { PortableText } from "next-sanity"
import type { ComponentProps } from "react"
type PortableTextValue = ComponentProps<typeof PortableText>["value"]

const myComponents: ComponentProps<typeof PortableText>["components"] = {
  block: {
    normal: ({ children }) => <p className="text-brand-dark/70 leading-relaxed">{children}</p>,
  },
}
// ...
<PortableText value={body as PortableTextValue} components={myComponents} />
```

Import from `next-sanity`, not `@portabletext/react` (the latter is a transitive dep, not in `package.json`).

---

## 6. Sanity CMS Schemas

All schemas in `sanity/schemaTypes/`. Studio at `http://localhost:3000/studio` (local) or `/studio` (production).

| Schema | Type | Purpose |
|--------|------|---------|
| `homePage` | Singleton | Homepage content fields |
| `employersPage` | Singleton | Employers page content |
| `professionalsPage` | Singleton | Professionals page content |
| `aboutPage` | Singleton | About page content |
| `siteSettings` | Singleton | Global config (logo, nav, contact) |
| `post` | Collection | Blog articles — `title`, `slug`, `author` (ref→author), `mainImage` (image+hotspot+alt), `publishedAt`, `excerpt`, `category` (string: for-professionals / for-employers / industry-insights / cpd-compliance), `body` (blocks+images) |
| `author` | Collection | Team/author profiles |
| `service` | Collection | Platform feature entries |
| `testimonial` | Collection | User testimonials |
| `faq` | Collection | FAQ entries |
| `partner` | Collection | Partner/client logos |

See previous DOCS.md entries for full field-level documentation of each schema.

---

## 6. Environment Variables

| Variable | Value | Used In |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `cfu3qevi` | Sanity client, `sanity.config.ts` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity client, `sanity.config.ts` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-05-26` | Sanity client |
| `SANITY_API_WRITE_TOKEN` | (secret — Editor level) | `scripts/seed-blog.ts`, `scripts/update-post-categories.ts` |

All `NEXT_PUBLIC_*` variables are safe to expose to the browser. `SANITY_API_WRITE_TOKEN` is server/script-only — never prefix it with `NEXT_PUBLIC_` and never import it in frontend code. Generate in Sanity manage console → API → Tokens, choose **Editor** permission level.

---

## 7. TODOs & Next Steps

### Immediate (before launch)

- [ ] **Replace placeholder hero image** — source real photography of Nigerian healthcare professionals. Upload via Sanity Studio → homePage → hero → image. `HeroSection.tsx` is wired and will render it automatically.
- [ ] **Replace placeholder testimonials with real quotes** — edit the 3 seeded `testimonial` documents in Sanity Studio with verified quotes from actual beta users. Fake testimonials damage credibility.
- [ ] **Upload real blog post images in Sanity Studio** — `post.mainImage` is wired. Any image uploaded renders automatically via `next/image` instead of the gradient placeholder.
- [ ] **Update stats with real numbers** — edit `homePage` singleton in Studio → stats array. Both `SocialProofBar` and `StatsSection` will reflect changes within 60 seconds.
- [ ] **Update `sitemap.ts`** — fetch and include live blog post slugs from Sanity (see Section 12.5).
- [ ] **Upload founder photo** — Sanity Studio → aboutPage → team → team-1 → image. `AboutTeam.tsx` renders it via `urlFor()` automatically.
- [ ] **Add director names** — add to director role cards in `AboutTeam.tsx` when leadership is confirmed.
- [ ] **Update `metadataBase`** — change from `pronurture.vercel.app` to `pronurture.com.ng` when custom domain is live (also update `app/sitemap.ts` and `app/robots.ts`).

### Completed ✅
- [x] All 10 pages built and deployed
- [x] All pages moved into `app/(site)/` route group with shared Navbar + Footer layout
- [x] Homepage (`/`) fully wired to Sanity CMS — HeroSection, SocialProofBar, FeaturesSection, TestimonialsSection, StatsSection, BlogPreviewSection all read from Sanity with hardcoded fallbacks; `revalidate=60`
- [x] Employers page (`/employers`) fully wired to Sanity CMS — EmployersHero, EmployersFeatures, EmployersTestimonials, EmployersCTA; `revalidate=60`; EmployersCTA POSTs to `/api/waitlist` with `source:'employers'`
- [x] Professionals page (`/professionals`) fully wired to Sanity CMS — same pattern; ProfessionalsCTA POSTs with `source:'professionals'`
- [x] About page (`/about`) fully wired to Sanity CMS — AboutMission (PortableText), AboutStory (PortableText), AboutValues (ICON_BY_VALUE_KEY), AboutTeam (founder from Sanity, LinkedIn link); `revalidate=60`
- [x] Blog (`/blog` + `/blog/[slug]`) fully wired to Sanity CMS via GROQ; `revalidate=60`
- [x] Navbar and Footer wired to `siteSettings` Sanity singleton — logos, nav links, social links, copyright, footer tagline editable from Studio
- [x] Sanity content seeded — homePage, employersPage, professionalsPage, aboutPage, siteSettings singletons; 10 posts, 6 services, 3 testimonials, 1 author; all posts categorised
- [x] `serverClient` (`useCdn: false`, `perspective: 'published'`) used in all wired `page.tsx` files
- [x] `ICON_BY_KEY` pattern for SVG icons — icons never stored in Sanity; keyed by `_key` in component
- [x] Optional props + `FALLBACK_*` constants on all wired components — pages render identically if Sanity is unreachable
- [x] `category` field on `post` schema — 4 options; blog filters working end-to-end
- [x] `mainImage` wired across all blog surfaces — `next/image` via `urlFor()` with gradient placeholder fallback
- [x] Waitlist form connected to Make.com via `/api/waitlist` server route — real JSON response, no CORS restriction
- [x] Full SEO — metadata, OG image, robots.txt, sitemap

---

## 8. Blog Post Page Components

All components live in `components/blog/`. The page assembler is `app/blog/[slug]/page.tsx`.

**Target audience:** Organic/SEO traffic + existing site visitors following a blog link  
**Tone:** Educational, authoritative, expert — thought leadership for both personas  
**Section framework:** Article reading flow (Orientation → Content → Credibility → Retention)

---

### 8.1 `components/blog/ArticleHero.tsx`

**Type:** Server Component

#### Purpose
Above-the-fold article identity. Answers: what is this article? who wrote it? how long will it take? The breadcrumb gives readers a back-path to the blog listing.

#### Elements

| Element | Detail |
|---------|--------|
| Breadcrumb | Home → Resources & Insights → Article title (truncated) |
| Category tag | `bg-brand-gold/20 text-brand-dark` pill — "Industry Insights" |
| H1 | Full article title |
| Author meta row | Avatar initials + author name · date · read time · share cue |
| Featured image | Full-width `max-w-6xl` container, rounded-2xl, `h-64 sm:h-80 lg:h-[500px]` |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Breadcrumb nav | Long-form content readers need a clear back-path. Without it, they hit back-button and may not return to the blog listing. |
| `max-w-6xl` for image, `max-w-4xl` for text | Text column is narrower for reading comfort; image bleeds wider to fill the page impressively. Both are centred. |
| `pt-28` (not `pt-24`) | Compensates for the fixed Navbar (80px) plus extra breathing room above the breadcrumb. |
| Share cue in meta row | Passive brand signal — users who feel compelled to share see the affordance without a disruptive share-button row. |

---

### 8.2 `components/blog/ArticleBody.tsx`

**Type:** Server Component

#### Purpose
The full article prose with typographic hierarchy. Placeholder content is written on the Nigerian doctor shortage topic to match the featured article throughout the blog section.

#### Typography System

| Element | Classes | Purpose |
|---------|---------|---------|
| Intro paragraph | `text-lg leading-relaxed text-gray-700 font-medium` | Slightly heavier than body — draws reader in |
| Body paragraphs | `text-base md:text-lg leading-relaxed text-gray-700` | Comfortable long-form reading weight |
| H2 headings | `text-2xl md:text-3xl font-bold text-brand-dark` | Scannable section breaks for non-linear readers |
| Blockquote | `border-l-4 border-brand-gold bg-brand-light rounded-r-xl py-5 pr-5 pl-6` | Pull-quote treatment isolates key insights |
| Bullet list | Gold `bg-brand-gold` dot, bold title + gray body per item | Structured, scannable action items |
| Tags row | `bg-brand-light text-brand-dark/70 border-brand-dark/10` pills | Contextualises the article for SEO and related-content navigation |

#### Content Structure

```
Intro → The Numbers (H2) → Facility Impact (H2) → Pull quote → 
Data Strategies (H2, with 5-item bullet list) → Technology Role (H2) → 
Closing paragraph → Tags
```

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `max-w-3xl mx-auto` column | 60–65 characters per line — the typographically optimal reading measure. Wider = tiring to track horizontally. |
| Gold bullet dots instead of default discs | Brand palette consistency — every visual element follows the brand colours, including list markers. |
| `border-t border-brand-dark/10 pt-8` before closing | Signals "end of article" without a heavy divider. The visual breathing room primes the reader for the author bio below. |
| Blockquote uses `bg-brand-light` fill | Matches the section background colour of the hero and author card sections — ties the article page's alternating rhythm together visually. |

**Sanity wiring (complete):** Renders Sanity Portable Text via `<PortableText>` from `next-sanity`. Custom block renderers: `normal` → styled `<p>`, `h2`/`h3` → brand-dark headings, `blockquote` → gold left-border pull quote. Body typed as `ComponentProps<typeof PortableText>['value']` (derived from the component, no transitive imports needed).

---

### 8.3 `components/blog/ArticleAuthorCard.tsx`

**Type:** Server Component

#### Purpose
Credibility signal placed immediately after the article ends. Readers who finish an article are the most receptive audience for trust signals — this is the moment to tell them who produced the content and why it is reliable.

#### Elements

| Element | Detail |
|---------|--------|
| Avatar | Deep green circle with gold "PT" initials — matches initials pattern from TestimonialsSection |
| Name | "ProNurtureSphere Team" |
| Role label | "Research & Editorial" in `text-brand-green` |
| Bio | One sentence describing the editorial team's expertise mix |
| "All Articles" link | Outlined pill button → `/blog` — drives return visits |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| White card on `bg-brand-light` section | Layered depth — consistent with FeaturesSection and BlogGrid patterns. |
| `sm:flex-row` layout | On mobile: stacked (avatar above text). On sm+: horizontal (avatar left, text right, button right). Adapts to available space. |
| "All Articles" link (not "Follow" or social) | No social profiles to link to yet. "All Articles" drives on-site engagement and is the highest-value next step for a content-led visitor. |

**Sanity wiring (complete):** Accepts `author: SanityAuthor | null`. Falls back to "ProNurtureSphere Team" / "Research & Editorial" when null. `getInitials()` derives 2-letter avatar from name. Photo: still uses initials avatar — replace with `next/image` when real headshots are available.

---

### 8.4 `components/blog/ArticleRelatedPosts.tsx`

**Type:** Server Component

#### Purpose
Prevents the "dead-end bounce" at the bottom of an article. Readers who finished the article have demonstrated intent — related posts convert that intent into further engagement.

#### Card Pattern
Identical structure and Tailwind classes to `BlogGrid.tsx` cards:
- White `bg-white` card on `bg-brand-light` section
- `hover:shadow-xl hover:-translate-y-1` lift effect
- `group-hover:scale-105` image zoom
- `group-hover:text-brand-green` title colour shift
- `bg-brand-gold/20 text-brand-dark` category tag
- `line-clamp-3` excerpt, `flex-1` for bottom-aligned "Read More →"

#### Three Related Articles

| # | Category | Title |
|---|----------|-------|
| 1 | For Employers | Retention Over Recruitment |
| 2 | For Employers | Real Cost of an Empty Shift |
| 3 | Industry Insights | Nigeria Needs a Healthcare Workforce Ecosystem |

**Sanity wiring (complete):** Accepts `posts: SanityPost[]`. Populated by `relatedPostsQuery` in `blog/[slug]/page.tsx` — 3 most recent posts excluding current slug. Returns `null` if empty. Card image: `next/image` via `urlFor()` when `mainImage` present, gradient placeholder otherwise.

---

### `/blog/[slug]` — Individual Blog Post

**File:** `app/(site)/blog/[slug]/page.tsx`  
**Type:** Server Component (async — Next.js 15 requires `await params`)  
**Status:** ✅ Complete — wired to Sanity CMS  
**Revalidation:** `export const revalidate = 3600`

**Next.js 15 params pattern:**
```ts
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // ...
}
```

**Section order:**
```
1. ArticleHero        → Breadcrumb, category tag, H1, author meta, featured image
2. ArticleBody        → Full prose with H2s, blockquote, bullet list, tags
3. ArticleAuthorCard  → Avatar, name, bio, "All Articles" link
4. ArticleRelatedPosts → 3 related cards (identical style to BlogGrid)
5. BlogNewsletterCTA  → Newsletter email capture (reused from /blog listing)
```

**Sanity wiring guide (in page comments):**
- GROQ query pattern for fetching a post by slug
- `notFound()` call for missing slugs
- `generateStaticParams` for build-time static generation
- `generateMetadata` is already defined (returns placeholder values for now)

### Infrastructure
- [ ] Configure email service (Resend recommended for Next.js) and add API key to `.env.local` + Vercel
- [ ] Set up `SANITY_API_READ_TOKEN` in Vercel environment variables for server-side Sanity queries

---

## 9. Waitlist Page Components

All components live in `components/waitlist/`. The page assembler is `app/waitlist/page.tsx`.

**Target audience:** All visitors who clicked a "Get Early Access" CTA from any page  
**Tone:** Confident, benefit-led, low-friction — the goal is a single conversion action  
**Section framework:** Pitch → Form → FAQ (objection-handling below the fold)

---

### 9.1 `components/waitlist/WaitlistForm.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/waitlist/WaitlistForm.tsx`

#### Purpose
The primary conversion section of the site. Every "Get Early Access" button across the site links to this component. Two-column layout pitches the value on the left, closes with the signup form on the right.

#### Layout

```
Section (bg-brand-light, min-h-screen, pt-28 for navbar clearance)
└── grid grid-cols-1 lg:grid-cols-2
    ├── LEFT — Pitch column
    │   ├── "Early Access" badge (gold dot + brand-dark/10 bg)
    │   ├── H1: "Be First to Transform Your Healthcare Workforce."
    │   ├── Subheadline
    │   ├── 3 benefit bullets (dark circle + gold checkmark icon)
    │   └── Decorative brand-colour rule
    └── RIGHT — Form card (bg-white rounded-2xl shadow-xl)
        ├── [idle/error/loading state]: Form fields + submit button
        └── [success state]: Checkmark + confirmation + spam note + Back to Home
```

#### State Machine

```
idle → (submit) → loading → success
                           ↘ error → (user types) → idle
```

| State | UI Behaviour |
|-------|-------------|
| idle | Form renders normally — all fields enabled |
| loading | Button shows spinner + "Joining…" text. All fields + button disabled. |
| success | Entire form card replaced by success state (checkmark, H2, message, spam note, Back to Home link) |
| error | Red error message below fields. Status resets to idle when user types in any field. |

#### Form Fields

| Field | Type | Validation | Name sent to webhook |
|-------|------|-----------|----------------------|
| Full Name | `text` | Required, non-empty after trim | `name` |
| Email Address | `email` | Required, regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | `email` |
| I am a... | `select` | Defaults to "Healthcare Professional", no required validation | `userType` |

**Select options:** `"Healthcare Professional"` · `"Healthcare Facility / Employer"` · `"Other"`

#### Submission Flow

The form POSTs to the internal Next.js API route `/api/waitlist` (see Section 11.1). The API route validates the payload server-side and forwards it to Make.com. The client reads the real JSON response and branches on `data.success`.

```
Browser → POST /api/waitlist → server validates → POST Make.com webhook
                             ← { success: true } ← Make.com 200
```

**Why API route instead of direct browser→Make.com:**
- Removes the CORS restriction that previously required `mode: 'no-cors'`
- Makes the response readable — opaque `no-cors` responses always show `ok: false`
- Gives the user real success/failure feedback instead of optimistic assumption

**Payload to `/api/waitlist`:**

```json
{
  "name": "Dr. Adaeze Okafor",
  "email": "adaeze@hospital.ng",
  "userType": "Healthcare Facility / Employer",
  "facilityType": "Private Hospital"
}
```

The API route strips unneeded fields and forwards clean JSON to Make.com. To change routing logic (CRM mapping, welcome email), update the Make.com scenario — not this code.

#### Success State Elements

| Element | Detail |
|---------|--------|
| Checkmark icon | White SVG on `bg-brand-dark` circle — consistent with benefit bullet style |
| H2 | "You're on the List! 🎉" |
| Confirmation message | Instructs user to check inbox for welcome email |
| Spam folder reminder box | `bg-brand-gold/15 border-brand-gold/30` — warm but not alarming; instructs user to mark as "Not Spam" for deliverability |
| "Back to Home" link | Outlined pill `→ /` — gives user a clear next action after submitting |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `min-h-screen pt-28` | Fills the viewport (hero-level section) and clears the fixed 80px navbar. The form is the entire page content — it must feel like a destination, not a section. |
| Left pitch column always visible (even after success) | Keeps the page from feeling empty after the success state appears. The benefits stay visible as a reassurance. |
| `noValidate` on `<form>` | Disables browser native validation popups so we control the UI entirely — styled to brand palette (red-50 error boxes, not browser chrome). |
| Error resets on user typing | `clearErrorOnChange()` is called in every `onChange`. Prevents the error from feeling "sticky" — users shouldn't have to dismiss it manually. |
| `role="alert"` on error message | Screen readers announce the error immediately when it enters the DOM. Required for accessible form validation. |
| `aria-live="polite" aria-atomic="true"` on the card | When the form card swaps to the success state, screen readers announce the new content. `polite` waits until the current announcement finishes; `atomic` reads the full new content rather than just the diff. |
| Gold button hover to brand-dark | Standard ProNurtureSphere CTA pattern: gold primary, dark hover — provides clear hover feedback without losing the gold CTA treatment at rest. |

---

### 9.2 `components/waitlist/WaitlistFAQ.tsx`

**Type:** `'use client'` (Client Component — accordion requires `useState`)  
**File:** `components/waitlist/WaitlistFAQ.tsx`

#### Purpose
Handles the final hesitations of visitors who scrolled past the form without submitting. Placed below the fold — visitors who reach the FAQ have demonstrated enough interest to keep reading, which makes them high-intent prospects.

#### State

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `openIndex` | `number \| null` | `null` | Index of the currently expanded FAQ. `null` = all closed. |

#### State Logic

```ts
const toggle = (index: number) => {
  setOpenIndex((prev) => (prev === index ? null : index));
};
```

Clicking the open item closes it. Clicking a different item opens it and closes the previous one.

#### Four FAQs and Their Objection Mapping

| Question | Objection Addressed |
|----------|---------------------|
| Is early access really free? | Cost / financial commitment barrier |
| When will ProNurtureSphere launch? | Timeline uncertainty |
| What do I get as an early access member? | Value clarity — what's the actual benefit? |
| Who is ProNurtureSphere for? | Eligibility — "is this for me?" |

#### Accordion Animation
`max-h-0 → max-h-96` CSS transition (same pattern as `EmployersFAQ.tsx` and `ProfessionalsFAQ.tsx`). Avoids JS-measured heights — no `useRef` required. `overflow-hidden` clips content during the transition.

#### Bottom prompt
`"Still have questions? Email us directly"` with `mailto:pronurturesphereltd@gmail.com`. Provides a fallback for visitors whose objection isn't covered by the four FAQ items, without requiring a full contact form.

#### Accessibility
- `aria-expanded` on each trigger button
- `aria-controls` links button to its answer panel
- `role="region"` + `aria-labelledby` on each answer panel
- Focus ring on trigger buttons (`focus-visible:ring-2`)

---

### `/waitlist` Page

**File:** `app/waitlist/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**SEO metadata:**
- Title: "Join the Waitlist — ProNurtureSphere Early Access"
- Description: Keyword-optimised for "early access" + "Nigeria healthcare platform"

**Section order:**

```
1. WaitlistForm  → Above the fold — pitch (left) + form card (right)
2. WaitlistFAQ   → Below the fold — 4-question accordion for objection handling
```

**Why only two sections?**  
The waitlist page has a single goal: form submission. Every additional section is a distraction that reduces conversion rate. The FAQ is an exception because it directly supports the goal — it answers questions and sends users back up to the form.

---

---

## 10. Contact Page Components

All components live in `components/contact/`. The page assembler is `app/contact/page.tsx`.

**Target audience:** Both buyer personas + partner organisations  
**Tone:** Warm, welcoming, professional — "we want to hear from you"  
**Section framework:** Orientation → Contact → Objection handling

---

### 10.1 `components/contact/ContactHero.tsx`

**Type:** Server Component  
**File:** `components/contact/ContactHero.tsx`

#### Purpose
Compact (~40vh) above-the-fold orientation for the `/contact` page. Sets the welcoming tone before the visitor sees the form. Intentionally lean — the form and contact details below are the real value.

#### Key Content

| Element | Content |
|---------|---------|
| Badge | "Get in Touch" with gold dot |
| H1 | "Let's Talk About Your Healthcare Workforce." |
| Subheadline | Welcomes professionals, facilities, and partners |
| Decorative rule | Brand-dark + brand-gold + brand-green colour trio |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| No CTA buttons | The page is entirely a contact funnel — CTA buttons would compete with the form just below |
| `minHeight: "40vh"` | Unlike full hero pages, a contact hero should not dominate — the content below is the destination |
| `pt-28` | Clears the fixed Navbar (112px) — consistent with WaitlistForm and other pages |

---

### 10.2 `components/contact/ContactMain.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/contact/ContactMain.tsx`

#### Purpose
Two-column section: direct contact details on the left, a mailto-based enquiry form on the right. The form builds a pre-filled `mailto:` URL on submit and triggers `window.location.href` to open the visitor's default email client.

#### Why mailto instead of a backend form?
Zero dependencies — no API key, no email service, no server route required at this pre-launch stage. Works immediately without infrastructure. Trade-off: depends on the visitor having a configured email client, which is true for virtually all healthcare professionals and hospital administrators.

#### Left Column — Contact Details

| Element | Detail |
|---------|--------|
| Email card | Icon + "Email Us" label + `uwa@pronurture.com.ng` (mailto link) |
| LinkedIn button | Links to `https://www.linkedin.com/company/psl25/` (opens `target="_blank"`) |
| X button | Links to `https://x.com/pronurture` (opens `target="_blank"`) |
| Response time | "We typically respond within 24 hours." with green pulse dot |

#### Right Column — Form Card

| Field | Type | Notes |
|-------|------|-------|
| Full Name | `type="text"` | Required; `autoComplete="name"` |
| Email Address | `type="email"` | Required; validated with regex |
| Subject | `type="text"` | Required; becomes mailto `?subject=` param |
| Message | `<textarea rows={5}` | Required; `resize-none` keeps card height stable |

#### Mailto Construction

```ts
const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`;
const link = `mailto:uwa@pronurture.com.ng?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
window.location.href = link;
```

`encodeURIComponent` converts special characters (`\n` → `%0A`, `&` → `%26`, accented letters → percent-encoded sequences) so the subject and body survive URL encoding without breaking.

#### State Machine

```
idle → (submit valid)   → sent
     → (submit invalid) → error → (user types) → idle
```

| State | UI Behaviour |
|-------|-------------|
| idle | Form renders normally |
| error | Styled error message below form. Resets when user types |
| sent | Form card replaced with checkmark + "email client opened" confirmation + fallback link if it didn't open |

#### Sent State Fallback
The sent state stores `mailtoLink` in React state so the fallback anchor (`"Click here to try again"`) renders the exact same URL that was triggered. Handles the case where no email client is configured or the browser blocked the redirect.

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| `items-start` on grid (not `items-center`) | Form card with 5 fields + button is taller than the contact details column — `items-start` top-aligns both columns cleanly |
| `resize-none` on textarea | Prevents layout breakage if the user drags the textarea handle — the card shadow would distort |
| Social links as `<a>` not `<Link>` | External URLs must use `<a target="_blank">` — `next/link` is for internal routes only |

#### Accessibility
- `aria-required="true"` on all required inputs
- `noValidate` on `<form>` to suppress browser validation UI in favour of styled brand error messages
- `role="alert"` + `aria-live="assertive"` on error message
- `aria-live="polite"` + `aria-atomic="true"` on card shell for sent-state announcement
- `focus-visible:ring-2` on social link buttons
- `aria-label` on all social links (includes "opens in new tab" context)

---

### 10.3 `components/contact/ContactFAQ.tsx`

**Type:** `'use client'` (Client Component)  
**File:** `components/contact/ContactFAQ.tsx`

#### Purpose
Four-question accordion below the contact section. Handles the final hesitations of visitors who scrolled past the form without submitting.

#### Four FAQs and Their Objection Mapping

| Question | Objection Addressed |
|----------|---------------------|
| How quickly will I get a response? | Response time anxiety — "will anyone read this?" |
| I'm a healthcare professional — how do I join? | Redirect to waitlist (wrong contact intent) |
| I represent a facility — can I request a demo? | Facility visitors don't know they can request demos |
| Where is ProNurtureSphere based? | Trust and local relevance — "is this a Nigerian company?" |

#### State Logic
Identical to `WaitlistFAQ.tsx`: `openIndex: number | null`, toggle function closes open item on re-click.

#### Bottom Prompt
`"Still have questions? Email us directly"` with `mailto:uwa@pronurture.com.ng`.

---

### `/contact` Page

**File:** `app/contact/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**SEO metadata:**
- Title: "Contact Us — ProNurtureSphere"
- Description: Optimised for "contact healthcare platform Nigeria" + "demo request"

**Section order:**

```
1. ContactHero → Compact orientation (~40vh) — badge, H1, subheadline
2. ContactMain → Two-column: contact details (left) + mailto form card (right)
3. ContactFAQ  → 4-question accordion for objection handling
```

**Footer link:** `Footer.tsx` already contained `{ label: "Contact Us", href: "/contact" }` in the Company column — no update needed.

---

---

## 11. API Routes

All API routes live under `app/api/` following the Next.js 15 App Router Route Handler convention. Each route exports named HTTP method functions (`GET`, `POST`, etc.) from a `route.ts` file.

---

### 11.1 `app/api/waitlist/route.ts`

**Route:** `POST /api/waitlist`  
**Type:** Next.js Route Handler (Server)  
**File:** `app/api/waitlist/route.ts`

#### Purpose

Server-side proxy between the waitlist form and the Make.com webhook. Introduced to solve two problems with the previous direct browser→Make.com approach:

| Problem | Solution |
|---------|---------|
| CORS restriction required `mode: 'no-cors'` | Server-to-server fetch has no browser origin policy |
| Opaque response — could never confirm success | Real JSON `{ success: true/false }` returned to client |
| Client-side-only validation was bypassable | Server validates again before forwarding |

#### Request

```http
POST /api/waitlist
Content-Type: application/json

{
  "name": "Dr. Adaeze Okafor",
  "email": "adaeze@hospital.ng",
  "userType": "Healthcare Facility / Employer",
  "facilityType": "Private Hospital"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | ✅ | Non-empty after trim |
| `email` | ✅ | Must pass `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `userType` | No | Defaults to `"Other"` if absent |
| `profession` | No | Only sent when `userType === "Healthcare Professional"` |
| `facilityType` | No | Only sent when `userType === "Healthcare Facility / Employer"` |

#### Responses

| Status | Body | When |
|--------|------|------|
| 200 | `{ "success": true }` | Make.com accepted the payload |
| 400 | `{ "success": false, "error": "..." }` | Validation failure (missing/invalid fields) |
| 500 | `{ "success": false, "error": "..." }` | Make.com returned non-2xx, or network error |

#### Internal Flow

```
1. Parse JSON body (return 400 if malformed)
2. Validate name present + email regex (return 400 if invalid)
3. Build clean payload (omit empty optional fields)
4. fetch() to Make.com webhook — no CORS restriction server-side
5. If makeResponse.ok → return { success: true }
6. If makeResponse not ok → log status, return 500
7. Catch any thrown error → log, return 500
```

#### Make.com Webhook

**URL:** `https://hook.eu1.make.com/km9hduqfg83mft3u8j9k3e2qqnr92f00`  
**Method:** POST  
**Content-Type:** `application/json`

The Make.com scenario handles downstream routing: CRM lead creation, welcome email, team notification. To update routing logic, edit the Make.com scenario — not this file.

#### Error Logging

Two `console.error` calls are present for server-side observability:
- `[waitlist] Make.com webhook returned {status}` — HTTP-level failure from Make.com
- `[waitlist] Unexpected error: {error}` — catch-all for network failures and unexpected throws

These are visible in Vercel Function Logs under the `/api/waitlist` route.

---

## 12. SEO & Metadata

All SEO infrastructure lives in the `app/` root directory as Next.js file conventions. No third-party SEO library is used — Next.js 15 App Router handles everything natively.

---

### 12.1 Root Metadata (`app/layout.tsx`)

The `export const metadata` in `app/layout.tsx` sets the site-wide defaults. Every page inherits from this unless it overrides specific fields.

**Title template:**

```ts
title: {
  default: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
  template: "%s | ProNurtureSphere",
}
```

- `default` is used for any page that does NOT export its own `metadata.title`.
- `template` wraps per-page titles: `"About Us"` → `"About Us | ProNurtureSphere"`.
- Result: all page titles are distinct for SEO, with consistent brand suffix for recognition.

**metadataBase:**

```ts
metadataBase: new URL("https://pronurture.vercel.app")
```

Required by Next.js to resolve relative URLs in OpenGraph and Twitter image paths to absolute URLs. When the domain moves from Vercel to `pronurture.com.ng`, update this one value.

**OpenGraph:**

| Field | Value |
|-------|-------|
| `type` | `"website"` |
| `siteName` | `"ProNurtureSphere"` |
| `title` | Site-wide default |
| `description` | Site-wide default |
| `images[0].url` | `/og-image.png` (1200×630, see Section 12.3) |

**Twitter Card:**

| Field | Value |
|-------|-------|
| `card` | `"summary_large_image"` |
| `title` | Site-wide default |
| `description` | Site-wide default |
| `images` | `["/og-image.png"]` |

**Icons:**

```ts
icons: {
  icon: "/brand-assets/Green Mono.svg",
  apple: "/brand-assets/Green Mono.svg",
}
```

Uses the mono green SVG logo as the browser tab favicon and Apple touch icon.

---

### 12.2 Per-page Metadata

Each page exports its own `metadata` object with a short `title` and unique `description`. The title template in `layout.tsx` appends `" | ProNurtureSphere"` automatically.

| Route | Title (pre-template) | Description focus |
|-------|---------------------|-------------------|
| `/` | Smarter Staffing for Nigerian Healthcare | Platform overview, both audiences |
| `/employers` | For Healthcare Employers | Shift posting, credentials, payroll, compliance |
| `/professionals` | For Healthcare Professionals | Locum shifts, CPD, verified employers |
| `/about` | About Us | Origin story, mission, ecosystem model |
| `/blog` | Resources & Insights | Guides, analysis, career resources |
| `/waitlist` | Get Early Access | Early access, no credit card, priority onboarding |
| `/contact` | Contact Us | Contact, demo request, 24-hour response |
| `/privacy` | Privacy Policy | Data collection, storage, rights |
| `/terms` | Terms of Service | Platform terms, early access programme, IP |

**No client component pages needed splitting** — all `page.tsx` files are already Server Components. The `'use client'` directive is on child components only (e.g. `WaitlistForm.tsx`, `ContactMain.tsx`), not on the page assemblers.

---

### 12.3 `app/opengraph-image.tsx`

**Type:** Next.js special file convention (OG image route)  
**Served at:** `/opengraph-image.png` (auto-wired to `<meta og:image>` and `<meta twitter:image>`)  
**Dimensions:** 1200×630px (social sharing standard)  
**Format:** PNG (rendered at request time by Satori / ImageResponse)

#### Design

| Element | Style |
|---------|-------|
| Background | Deep green `#103613` |
| Brand bar | White (40px) + Gold (20px) + Green (20px) horizontal pills — mirrors the page divider motif |
| Wordmark | "ProNurtureSphere" — 80px bold white, letter-spacing -1px |
| Tagline | "Nigeria's Healthcare Workforce Platform" — 34px `#c09e5a` (brand gold) |
| Font | `system-ui, sans-serif` — Satori does not load Google Fonts by default; system font renders cleanly at this size |

#### Key Decisions

| Decision | Why |
|----------|-----|
| File convention (`opengraph-image.tsx`) | Next.js auto-wires it — no manual `<meta>` tags or routes needed |
| System font instead of DM Sans | Loading Google Fonts in Satori requires a manual `fetch` + base64 embed. System fonts render cleanly at 80px and remove the async dependency from the image route |
| `export const size` + spread `{...size}` | `ImageResponse` second-arg options must match the exported `size` — exporting both ensures they stay in sync |

---

### 12.4 `app/robots.ts`

**Served at:** `/robots.txt`

```
User-Agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Sitemap: https://pronurture.vercel.app/sitemap.xml
```

- Allows all crawlers on all public pages.
- Blocks Sanity Studio (`/studio/`) — no SEO value; no need to expose the CMS endpoint to crawlers.
- Blocks API routes (`/api/`) — internal server routes, not indexable content.

---

### 12.5 `app/sitemap.ts`

**Served at:** `/sitemap.xml`

| URL | Priority | Change Frequency |
|-----|----------|-----------------|
| `/` | 1.0 | monthly |
| `/employers` | 0.9 | monthly |
| `/professionals` | 0.9 | monthly |
| `/about` | 0.8 | monthly |
| `/blog` | 0.8 | weekly |
| `/waitlist` | 0.7 | yearly |
| `/contact` | 0.6 | yearly |
| `/privacy` | 0.3 | yearly |
| `/terms` | 0.3 | yearly |

**Blog post slugs are not included** — they will be added dynamically once blog posts are wired to the live Sanity `post` collection via GROQ. The sitemap function will need to `fetch` published slug values from Sanity at that point.

**To update the domain:**  
Change `BASE_URL` in `app/sitemap.ts` and `metadataBase` in `app/layout.tsx`. Also update the `sitemap` field in `app/robots.ts`.

---

---

## 13. Blog Post Engagement — Comments & Reactions

Added 2026-06-08. All files documented below.

---

### 13.1 `sanity/schemaTypes/comment.ts`

**Type:** Sanity document schema (collection)

#### Purpose
Stores reader comments submitted via the blog post page. Comments are held with `approved: false` until manually approved in Sanity Studio, preventing any comment from appearing publicly without a review step.

#### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Displayed publicly on the post |
| `email` | string | yes | Never returned to the frontend — moderation use only |
| `body` | text (rows: 4) | yes | The comment text |
| `post` | reference → post | yes | Which post this comment belongs to |
| `approved` | boolean | — | Default `false`. Set to `true` in Studio to publish |

**Studio preview:** Shows `✓ Name` (approved) or `⏳ Name` (pending) + first 80 chars of body.

#### Moderation flow
1. Reader submits via the form on `/blog/[slug]`
2. Comment appears in Sanity Studio → Content → Comment with `approved: false`
3. Studio editor reviews and sets `approved: true`
4. Comment appears on the post within the next ISR cycle (3600s)

---

### 13.2 `post` schema — `likes` and `dislikes` fields

Two `number` fields added to the existing `post` schema, both with `initialValue: 0`. These are incremented via `/api/reactions` and should not be edited manually in Studio (description warns against it). Legacy seeded posts with no value start at `0` via `setIfMissing` in the patch operation.

---

### 13.3 `sanity/lib/queries.ts` additions

**`commentsQuery`** — fetches approved comments for a given post slug:
```groq
*[_type == "comment" && post->slug.current == $slug && approved == true]
| order(_createdAt asc) {
  _id, name, body, _createdAt
}
```
Email is intentionally excluded from the projection — it must never reach the frontend.

**`postBySlugQuery`** — now includes `likes` and `dislikes` fields.

---

### 13.4 `sanity/lib/types.ts` additions

| Type | Shape |
|------|-------|
| `BlogComment` | `{ _id, name, body, _createdAt }` — matches `commentsQuery` projection |
| `SanityPostFull.likes` | `number \| undefined` |
| `SanityPostFull.dislikes` | `number \| undefined` |

---

### 13.5 `app/api/comments/route.ts`

**Method:** POST  
**Route:** `/api/comments`

**Request body:**
```json
{ "name": "Dr. Adaeze", "email": "adaeze@example.com", "body": "Great article.", "postSlug": "my-post" }
```

**Logic:**
1. Validates all four fields are present
2. Validates email with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. Fetches the post `_id` from Sanity by slug (needed for the reference)
4. Creates a `comment` document with `approved: false`
5. Returns `{ success: true }` or `{ success: false, error: "..." }`

**Security:** Uses `SANITY_API_WRITE_TOKEN` (server-only, never NEXT_PUBLIC_). Email never returned in any response.

---

### 13.6 `app/api/reactions/route.ts`

**Method:** POST  
**Route:** `/api/reactions`

**Request body:**
```json
{ "postId": "abc123", "type": "like" }
```
`type` must be `"like"` or `"dislike"`.

**Logic:**
1. Validates `postId` and `type` present; validates `type` is one of the two allowed values
2. Uses `patch(postId).setIfMissing({ likes: 0, dislikes: 0 }).inc({ [field]: 1 }).commit()`
3. Returns `{ success: true, likes: N, dislikes: N }` with fresh counts from the committed document

**Security:** Uses `SANITY_API_WRITE_TOKEN` server-only.

---

### 13.7 `components/blog/ReactionButtons.tsx`

**Type:** `'use client'`

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `postId` | `string` | Sanity post `_id` — sent to `/api/reactions` as `postId` |
| `initialLikes` | `number` | Server-fetched count — hydrates initial state |
| `initialDislikes` | `number` | Server-fetched count — hydrates initial state |

#### State

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `likes` | `number` | `initialLikes` | Updated from API response after vote |
| `dislikes` | `number` | `initialDislikes` | Updated from API response after vote |
| `voted` | `'like' \| 'dislike' \| null` | `null` | Restored from localStorage on mount |
| `loading` | `boolean` | `false` | Prevents double-click |

#### localStorage key
`pronurture_reaction_{postId}` — stores `'like'` or `'dislike'` after a vote is cast. Read on mount via `useEffect`. On SSR this effect does not run, so the initial hydration always shows unvoted state.

#### Vote styles

| State | Like button | Dislike button |
|-------|-------------|----------------|
| Unvoted | Outline, `brand-dark/30` border | Outline, `gray-300` border |
| Like voted | `bg-brand-dark text-white` (solid) | Outline, disabled |
| Dislike voted | Outline, disabled | `bg-red-100 text-red-700 border-red-300` |

#### Accessibility
- `aria-label` includes the current count
- `aria-pressed` reflects voted state
- Keyboard focus ring on both buttons

---

### 13.8 `components/blog/CommentSection.tsx`

**Type:** `'use client'`

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `postSlug` | `string` | Sent to `/api/comments` as `postSlug` |
| `initialComments` | `BlogComment[]` | Approved comments fetched server-side on page load |

#### State machine

```
idle → (submit) → loading → success
                           ↘ error → (user types) → idle
```

- **success:** Form replaced with green confirmation: "Your comment has been submitted and is awaiting moderation."
- **error:** Inline red message below the form. Clears when user types (calls `clearError()`).
- **loading:** Submit button disabled and shows spinner + "Submitting…".

#### Comment display
- Each approved comment shows an initial-letter avatar (`bg-brand-dark`), name, formatted date, and body text.
- `whitespace-pre-line` preserves paragraph breaks in comment body.
- `formatDate(iso)` → `"8 June 2026"` via `toLocaleDateString('en-GB', ...)`.

#### Key design decisions

| Decision | Why |
|----------|-----|
| `initialComments` from server | Comments rendered on first paint — no client-side fetch needed for SSR output. New comments only appear after moderation + revalidation. |
| Email `(kept private)` label | Explicit reassurance addresses the most common reason people don't leave comments — fear of spam. |
| `noValidate` on form | Disables browser native validation so the brand-styled inline error messages control UX. |
| `bg-brand-light` section background | Off-white matches the article page's visual rhythm; distinct from the white body section above. |

---

### 13.9 Blog post page — `app/(site)/blog/[slug]/page.tsx` changes

Added `commentsQuery` to the `Promise.all` with `stega: false` (comment text must not contain stega invisible characters):

```ts
const [postResult, relatedResult, commentsResult] = await Promise.all([
  sanityFetch({ query: postBySlugQuery, params: { slug } }),
  sanityFetch({ query: relatedPostsQuery, params: { currentSlug: slug } }),
  sanityFetch({ query: commentsQuery, params: { slug }, stega: false }),
])
```

**Updated section order:**

```
1. ArticleHero
2. ArticleBody
3. ArticleAuthorCard
4. ReactionButtons    (NEW — centered wrapper, bg-white, border-t)
5. CommentSection     (NEW — bg-brand-light section)
6. ArticleRelatedPosts
7. BlogNewsletterCTA
```

`ReactionButtons` receives `post._id`, `post.likes ?? 0`, `post.dislikes ?? 0`.  
`CommentSection` receives `slug` (as `postSlug`) and `comments`.

---

*Documentation maintained by Claude Code | ProNurtureSphere Limited*
