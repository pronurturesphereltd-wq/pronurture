# DOCS.md — ProNurtureSphere Component & Configuration Documentation

> **Last updated:** 2026-06-03  
> **Status:** Homepage + Employers + Professionals + About pages complete  
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
        hostname: "placehold.co",
      },
    ],
  },
};
```

**Why `placehold.co`?**  
`next/image` blocks all external image sources by default for security. `placehold.co` is used for placeholder images across all sections during development, before real photography of Nigerian healthcare professionals is sourced. Every `<Image src="https://placehold.co/..." />` in the codebase needs this permission.

**When to update:**  
Once real photography is uploaded (Sanity CDN, Vercel Blob, or a custom CDN), add that hostname here and remove `placehold.co`.

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

**SEO metadata configured:**
- Title: "ProNurtureSphere — Smarter Healthcare Workforce Management in Nigeria"
- Description: Platform summary for Google snippets
- Keywords: "healthcare staffing Nigeria", "locum doctor platform Nigeria", etc.
- OpenGraph: `type: "website"` with title + description for social sharing

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
**Renders in:** `app/layout.tsx` — appears on every page  
**File:** `components/Navbar.tsx`

#### Purpose
Sticky top navigation bar. Transparent with a white logo when floating over the dark hero section; transitions to a white background with the full-colour logo once the user scrolls.

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
**Renders in:** `app/layout.tsx` — appears on every page  
**File:** `components/Footer.tsx`

#### Purpose
Site-wide footer providing navigation, social links, legal notice, and brand closure on a deep green background.

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
None.

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
None.

#### Data Structure

```ts
interface Stat {
  value: string;   // "500+"
  label: string;   // "Healthcare Professionals"
}
```

Stats are defined in the `stats` array at the top of the file. Edit this array to update the numbers when real data is available.

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
None.

#### Data Structure

```ts
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;  // Inline SVG
}
```

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
None.

#### Data Structure

```ts
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation: string;
  initials: string;    // Two-letter avatar until real headshots are available
  avatarBg: string;    // Tailwind class e.g. "bg-brand-dark"
}
```

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
None.

#### Data Structure

```ts
interface StatItem {
  value: string;
  label: string;
  sublabel?: string;  // Optional secondary descriptor
}
```

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
None.

#### Data Structure

```ts
interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imagePlaceholder: string;
  imageAlt: string;
}
```

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
| Visual-only (no functional filtering yet) | Static blog page — real filtering requires either client-side state or server query params. Wiring this is a TODO once articles are in Sanity. |
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
| `encodeURIComponent` in placeholder URL | The `category` string in the placehold.co URL includes spaces and ampersands — encoding prevents broken image URLs. |
| `flex flex-col flex-1` card structure | Makes all cards in a row the same height — required for a clean grid with bottom-aligned CTAs. |
| 1-col → 2-col → 3-col breakpoints | Mobile-first; 2-col tablet avoids very wide cards before switching to the full 3-column desktop layout. |

> ⚠️ **TODO:** Replace the static `blogPosts` array with a GROQ query fetching from the Sanity `post` collection. The schema is already configured. Use `client.fetch()` in the page Server Component and pass articles as props.

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

**File:** `app/blog/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**SEO metadata:**
- Title: "Resources & Insights — ProNurtureSphere"
- Description: Platform description targeting both personas + SEO keywords

**Section order:**

```
1. BlogHero          → Compact orientation (~50vh) — badge, H1, subheadline
2. BlogFilters       → Category pills — self-selection for both personas
3. BlogFeaturedPost  → Full-width featured article — editorial centrepiece
4. BlogGrid          → 9-article responsive card grid (1→2→3 columns)
5. BlogNewsletterCTA → Newsletter email capture — retention CTA (deep green)
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

#### API Integration (Placeholder)
Currently uses a 1-second `setTimeout` to simulate a network request:

```ts
await new Promise((resolve) => setTimeout(resolve, 1000));
```

**To connect to a real backend:**
```ts
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
if (!response.ok) throw new Error('Server error');
```

See `app/api/waitlist/route.ts` (to be created) for the API route.

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

**File:** `app/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete  

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

**File:** `app/employers/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**Section order (AIDA framework):**

```
1. EmployersHero           → Attention — above the fold, "For Healthcare Facilities"
2. EmployersPainPoints     → Interest  — empathy with Dr. Adaeze's daily frustrations
3. EmployersTransformation → Desire    — Before/After narrative pivot (deep green)
4. EmployersFeatures       → Desire    — 6 benefit-led platform capability cards
5. EmployersHowItWorks     → Desire    — 3 steps to remove implementation fear
6. EmployersTestimonials   → Desire    — social proof from hospital administrators only
7. EmployersFAQ            → Action    — resolves final objections (client component)
8. EmployersCTA            → Action    — email capture + trust badges (client component)
```

---

### `/professionals` — For Healthcare Professionals

**File:** `app/professionals/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**Target persona:** Dr. Amarachi Bello — Doctor / Nurse / Pharmacist / Allied Health Professional  
**Tone:** Warm, opportunity-focused, encouraging, mobile-first. Uses "you" language throughout.  
**Section framework:** AIDA (Attention → Interest → Desire → Action)

**Section order:**

```
1. ProfessionalsHero           → Attention — above the fold, "For Healthcare Professionals"
2. ProfessionalsPainPoints     → Interest  — empathy with Dr. Amarachi's daily frustrations
3. ProfessionalsTransformation → Desire    — Before/After narrative pivot (deep green)
4. ProfessionalsFeatures       → Desire    — 6 benefit-led platform capability cards
5. ProfessionalsHowItWorks     → Desire    — 3 steps to remove complexity and trust barriers
6. ProfessionalsTestimonials   → Desire    — social proof from Nigerian doctors and nurses
7. ProfessionalsFAQ            → Action    — resolves final hesitations (client component)
8. ProfessionalsCTA            → Action    — email capture + trust badges (client component)
```

---

### `/about` — About ProNurtureSphere

**File:** `app/about/page.tsx`  
**Type:** Server Component  
**Status:** ✅ Complete

**Target audience:** Both personas + partners, media, stakeholders  
**Tone:** Mission-driven, institutional, authentic. Story page — NOT a conversion page.  
**Section framework:** Narrative arc (Who → Why → What → How → Who We Serve → People → Operations → Action)

**Section order:**

```
1. AboutHero          → Above the fold — page identity, H1, founding photograph
2. AboutMission       → Mission (green) + Vision (light) two-column
3. AboutStory         → Origin narrative + pull quote + founding stats
4. AboutValues        → 7 core values card grid
5. AboutEcosystem     → 4-pillar ecosystem model (green bg)
6. AboutLifecycle     → 7-stage professional lifecycle model
7. AboutWhoWeServe    → 3 audience groups: professionals, institutions, communities
8. AboutTeam          → Founder card + 6 director role cards
9. AboutPSLArms       → 6 operating arms of PSL
10. AboutCTA          → Dual CTA: "Get Early Access" + "Contact Us"
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

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| Deep green left / off-white right | Green = roots/foundation (mission). Light = aspiration/future (vision). Colour carries meaning. |
| `<blockquote>` element | Semantic HTML — mission/vision statements are quotations from the organisation's founding charter. |
| No body copy, just the statements | Both statements are long enough to stand alone. Adding explanatory text would dilute them. |

---

### 6.3 `components/about/AboutStory.tsx`

**Type:** Server Component

#### Purpose
The origin narrative. Answers "why does this organisation exist?" with five paragraphs of authentic, locally-grounded prose. A pull quote isolates the central founding insight. Two stat cards give the story institutional weight.

#### Key Content

| Element | Detail |
|---------|--------|
| H2 | "Why We Built ProNurtureSphere." |
| Narrative | 5 paragraphs: problem (demand-supply gap) → employer pain → professional pain → founding decision → platform solution |
| Pull quote | "Healthcare professionals are trained but not nurtured into sustainable excellence." |
| Stat card 1 | 72k+ nurses with lapsed licences annually |
| Stat card 2 | 1:8,000 doctor-to-patient ratio vs 1:600 WHO recommendation |

#### Key Design Decisions

| Decision | Why |
|----------|-----|
| 3:2 column split (prose left, quote right) | Prose gets the majority space — it is the content. The pull quote is accent, not equal weight. |
| Stats sourced from real data context | Specific numbers beat vague claims. These figures contextualise the scale of the problem PSL was founded to address. |
| Pull quote on `bg-brand-dark` with gold left border | The visual treatment isolates the most important insight on the entire About page — it must stand apart from the prose. |

---

### 6.4 `components/about/AboutValues.tsx`

**Type:** Server Component

#### Purpose
Makes organisational character concrete and scannable. Seven values in a card grid — each with an icon, title, and 1–2 sentence description.

#### Seven Values

| Value | Core Message |
|-------|-------------|
| Compassion | Empathy, dignity, respect for human life |
| Excellence | Evidence-based, clinical competence, international standards |
| Integrity | Ethical practice, transparency, regulatory compliance |
| Nurturing Leadership | Developing people, not just professionals |
| Innovation | Forward-thinking: education + technology integrated |
| Equity & Inclusion | Access regardless of geography or background |
| Collaboration | Strategic partnerships that multiply impact |

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

#### Purpose
Establishes human credibility with a prominent founder card and 6 director role cards. Names for director roles are intentionally absent — will be added when leadership is publicly confirmed.

#### Founder Card

| Element | Content |
|---------|---------|
| Name | Iziegbe Asemota |
| Title | Founder & CEO, ProNurtureSphere Limited |
| Bio | Founded PSL on the conviction that the workforce crisis requires a complete ecosystem — education, deployment, mentorship, and technology. |
| Avatar | Placeholder `placehold.co/160x160/103613/c09e5a?text=IA` |

#### Six Director Roles (names TBC)

Director of Clinical Services · Director of Education & Training · Director of Workforce & Staffing Solutions · Director of Operations & Compliance · Director of Partnerships & Global Development · Director of Homecare & Wellness Services

> ⚠️ Replace placeholder avatar with real founder photograph before launch. Add director names when confirmed.

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

## 5. Sanity CMS Schemas

All schemas in `sanity/schemaTypes/`. Studio at `http://localhost:3000/studio` (local) or `/studio` (production).

| Schema | Type | Purpose |
|--------|------|---------|
| `homePage` | Singleton | Homepage content fields |
| `employersPage` | Singleton | Employers page content |
| `professionalsPage` | Singleton | Professionals page content |
| `aboutPage` | Singleton | About page content |
| `siteSettings` | Singleton | Global config (logo, nav, contact) |
| `post` | Collection | Blog articles |
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
| `SANITY_API_READ_TOKEN` | (secret) | Server-side fetching, live preview |

All `NEXT_PUBLIC_*` variables are safe to expose to the browser. `SANITY_API_READ_TOKEN` is server-only — never prefix it with `NEXT_PUBLIC_`.

---

## 7. TODOs & Next Steps

### Immediate (before launch)

- [ ] **Replace placeholder hero image** — source real photography of Nigerian healthcare professionals. Update `HeroSection.tsx` image `src` and `alt`.
- [ ] **Replace placeholder testimonials** — collect real quotes from beta users. Update `TestimonialsSection.tsx` or connect to Sanity `testimonial` collection.
- [ ] **Replace placeholder blog posts** — write real articles in Sanity Studio. Connect `BlogPreviewSection.tsx` to Sanity via GROQ query.
- [ ] **Connect waitlist form** — create `app/api/waitlist/route.ts` and integrate with Mailchimp / Resend / ConvertKit.
- [ ] **Replace placeholder stats** — update numbers in `SocialProofBar.tsx` and `StatsSection.tsx` with real data.

### Next pages to build (priority order)
1. `/waitlist` — standalone waitlist page (the CTA destination — must exist before launch)
2. `/contact` — Contact page
3. Connect BlogGrid, BlogPreviewSection, and blog/[slug] to live Sanity `post` collection via GROQ

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

> ⚠️ **TODO:** Replace hardcoded JSX prose with `@portabletext/react` PortableText renderer wired to the Sanity `post.body` field.

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

> ⚠️ **TODO:** Accept author props from Sanity `author` collection (name, role, bio, photo). Replace initials avatar with real headshot using `<img>` or `next/image`.

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

> ⚠️ **TODO:** Accept `relatedPosts` as a prop. Populate via Sanity GROQ query that finds posts with matching tags or category, excluding the current slug.

---

### `/blog/[slug]` — Individual Blog Post

**File:** `app/blog/[slug]/page.tsx`  
**Type:** Server Component (async — Next.js 15 requires `await params`)  
**Status:** ✅ Complete (placeholder template)

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

#### Webhook Integration

**URL:** `https://hook.eu1.make.com/km9hduqfg83mft3u8j9k3e2qqnr92f00`  
**Method:** POST  
**Headers:** `Content-Type: application/json`  
**Body:**

```json
{
  "name": "Dr. Adaeze Okafor",
  "email": "adaeze@hospital.ng",
  "userType": "Healthcare Facility / Employer"
}
```

The Make.com scenario receives this payload and handles downstream routing — adding the lead to a CRM, sending a welcome email, or notifying the team. To change the routing logic, update the Make.com scenario (not the front-end code).

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

*Documentation maintained by Claude Code | ProNurtureSphere Limited*
