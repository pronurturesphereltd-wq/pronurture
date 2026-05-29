# CLAUDE.md — ProNurture Website Project Guide

> This file is the single source of truth for all AI agents (Claude Code, etc.) working on this project.
> It must be updated after every major feature or page is completed.
> Last updated: 2026-05-27 | Status: Foundation Setup

---

## 1. PROJECT OVERVIEW

**Product:** ProNurture by Sphere Limited
**Type:** Marketing/product website (not a web app)
**Purpose:** Present ProNurture's digital healthcare workforce platform to two audiences — healthcare employers and healthcare professionals in Nigeria.
**Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Sanity CMS
**Repo:** https://github.com/pronurturesphereltd-wq/pronurture.git
**Live URL:** Deployed on Vercel (auto-deploys on push to main)
**Sanity Project ID:** cfu3qevi | Dataset: production

---

## 2. DESIGN SYSTEM RULES

### ALWAYS reference these before writing any UI code:
- **Frontend Design Skill** — `/mnt/skills/public/frontend-design/SKILL.md`
- **UI UX Pro Max Skills** — installed via `npx skills add anthropics/skills --skill frontend-design`
- **21st.dev MCP** — use for sourcing high-quality UI components and patterns

### Brand Colors (use ONLY these)
```ts
// tailwind.config.ts
colors: {
  'brand-dark':  '#103613', // Deep Green — primary, authority
  'brand-green': '#7a853e', // Yellow Green — energy, approachability
  'brand-gold':  '#c09e5a', // Gold/Warm — warmth, not sterile
  'brand-white': '#ffffff', // White — clean backgrounds
  'brand-light': '#f5f5f0', // Off-white — soft section backgrounds
}
```

### Typography
- **Primary font:** DM Sans (Google Fonts) — Regular, Bold, Italic
- **Fallback:** sans-serif
- Import via `next/font/google` in `app/layout.tsx`

### Logo
- Located in `public/brand-assets/` folder
- Use the deep green version on white backgrounds
- Use the white version on dark green backgrounds
- NEVER modify logo colors or proportions

### Design Tone
- Professional but NOT sterile
- Warm and approachable for clinicians
- Formal and authoritative for hospital administrators
- Nigerian healthcare context — authentic, locally grounded

### DO's
- Use official color palette only
- Follow DM Sans typography consistently
- Use photography/imagery that reflects Nigerian healthcare professionals
- Ensure messaging aligns with brand values

### DON'Ts
- Never modify the logo
- Never use colors outside the brand palette
- Never use conflicting messaging
- Never use generic stock imagery that feels Western/non-Nigerian

---

## 3. BUYER PERSONAS (Design with these users in mind)

### Persona 1 — Dr. Adaeze Okafor (Healthcare Employer)
- **Role:** Hospital Administrator / Medical Director / HR Manager
- **Age:** 30–45 | **Income:** ₦8M–₦25M/year
- **Location:** Lagos, Abuja, Port Harcourt, Enugu, Kano
- **Goals:** Streamline staffing, automate payroll, ensure compliance, reduce admin workload
- **Pains:** Staff shortages, scheduling conflicts, payroll errors, difficulty sourcing verified locum staff
- **Triggers:** Staff shortages, compliance requirements, facility expansion
- **Barriers:** Implementation cost, data security, staff adoption concerns
- **Searches:** "Hospital staffing software Nigeria", "medical payroll software", "locum doctor platform Nigeria"
- **Design implication:** Formal, data-driven, ROI-focused messaging. Show dashboards, stats, compliance features.

### Persona 2 — Dr. Amarachi Bello (Healthcare Professional)
- **Role:** Doctor / Nurse / Pharmacist / Allied Health Professional
- **Age:** 25–40 | **Income:** ₦2.5M–₦12M/year
- **Location:** Lagos, Abuja, Port Harcourt, Ibadan, Enugu, Kano, Uyo
- **Goals:** Secure better jobs, access flexible locum shifts, complete CPD, grow career
- **Pains:** Fake job listings, expensive CPD, unreliable employers, poor platform UX
- **Triggers:** Need for extra income, licence renewal, career advancement
- **Barriers:** Trust issues, expensive programs, bad UX
- **Searches:** "Locum doctor jobs Nigeria", "Nursing jobs in Lagos", "Accredited CPD courses Nigeria"
- **Design implication:** Warm, opportunity-focused, mobile-first. Show shifts, earnings, CPD badges, ease of use.

---

## 4. WEBSITE PAGES & STATUS

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Complete |
| For Healthcare Employers | `/employers` | 🔲 Not started |
| For Healthcare Professionals | `/professionals` | 🔲 Not started |
| About | `/about` | 🔲 Not started |
| Blog / Resources | `/blog` | 🔲 Not started |
| Blog Post | `/blog/[slug]` | 🔲 Not started |
| Contact | `/contact` | 🔲 Not started |
| Waitlist / Early Access | `/waitlist` | 🔲 Not started |
| Sanity Studio | `/studio` | ✅ Complete |

> Update the status column after each page is completed.

---

## 5. ABOUT PRONURTURE (PSL)

ProNurture by Sphere Limited is a **combined digital staffing, rostering, verification, payroll, and training platform** for hospitals, clinics, and staffing agencies in Nigeria.

**Core problem it solves:**
Nigeria's health workforce faces staffing gaps, manual HR processes (WhatsApp, spreadsheets, paper rosters), and weak tracking of credentials, deployment, and continuing education.

**Platform features:**
- Shift posting and booking for hospitals and private clinics
- Credential tracking for licenses, training, and expiry dates
- Attendance, timesheets, and payroll handoff
- Agency and internal staff management in one dashboard
- Workforce reporting for planning, retention, and compliance
- Short training and CPD-style onboarding
- Mobile app for clinicians to accept locum shifts and view rates

**Primary users:** Private hospitals, maternity homes, diagnostics centers, agency nursing firms

**Key differentiators:**
- Nigeria-specific (payroll rules, currency ₦, tax/pension, low-bandwidth mobile)
- Strong verification workflows for professional licenses
- Moves healthcare from reactive staffing to data-driven workforce management

**Brand values:** Compliance-first, practitioner-led, locally grounded

---

## 6. SANITY CMS STRUCTURE

**Project ID:** cfu3qevi | **Dataset:** production | **Studio:** `/studio`

### Schemas
| Schema | Type | Purpose |
|--------|------|---------|
| `homePage` | Singleton | Homepage content |
| `employersPage` | Singleton | For Employers page |
| `professionalsPage` | Singleton | For Professionals page |
| `aboutPage` | Singleton | About page content |
| `siteSettings` | Singleton | Global config (logo, nav, footer) |
| `post` | Collection | Blog articles |
| `author` | Collection | Team/founders |
| `service` | Collection | Platform features |
| `testimonial` | Collection | User quotes |
| `faq` | Collection | FAQs |
| `partner` | Collection | Partner logos/links |

### Sanity Client (use this pattern)
```ts
// sanity/lib/client.ts
import { createClient } from 'next-sanity'
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
})
```

---

## 7. CODING STANDARDS

### General Rules
- **All code must be well commented** — explain WHY not just WHAT
- Use TypeScript strictly — no `any` types
- Use `next/image` for all images (never `<img>`)
- Use `next/link` for all internal links (never `<a>`)
- Mobile-first responsive design always
- All components go in `components/` folder
- All pages go in `app/` folder (App Router)

### Component Structure
```tsx
// components/ExampleComponent.tsx

/**
 * ExampleComponent
 * 
 * Brief description of what this component does and why.
 * 
 * @param prop1 - description
 * @param prop2 - description
 */

import React from 'react'

interface ExampleComponentProps {
  prop1: string
  prop2?: boolean
}

const ExampleComponent = ({ prop1, prop2 = false }: ExampleComponentProps) => {
  return (
    <div>
      {/* Component JSX with inline comments where logic is non-obvious */}
    </div>
  )
}

export default ExampleComponent
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Pages: `page.tsx` inside route folders
- Utilities: `camelCase.ts` (e.g., `sanityClient.ts`)
- Styles: `globals.css` only — use Tailwind classes everywhere else

### Tailwind Usage
- Always use brand color classes: `bg-brand-dark`, `text-brand-gold`, etc.
- Never hardcode hex colors in className
- Use responsive prefixes: `md:`, `lg:` etc.

---

## 8. ENVIRONMENT VARIABLES

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=cfu3qevi
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-26
```

---

## 9. FOLDER STRUCTURE

```
pronurture/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── employers/          # For Employers page
│   ├── professionals/      # For Professionals page
│   ├── about/              # About page
│   ├── blog/               # Blog listing + [slug]
│   ├── contact/            # Contact page
│   ├── waitlist/           # Waitlist page
│   └── studio/             # Sanity Studio
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── sanity/                 # Sanity CMS config
│   ├── schemaTypes/        # All 11 schemas
│   ├── lib/                # Sanity client
│   └── structure.ts        # Studio sidebar config
├── public/
│   └── brand-assets/       # Logo files, brand images
├── CLAUDE.md               # This file
├── DOCS.md                 # Code documentation
└── .env.local              # Environment variables
```

---

## 10. GIT & DEPLOYMENT WORKFLOW

```
Code in VS Code
     ↓
git add . && git commit -m "descriptive message"
     ↓
git push origin main
     ↓
GitHub → Vercel auto-deploys → Live site
```

### Commit Message Format
```
feat: add hero section to homepage
fix: correct navbar mobile menu
style: update brand colors in tailwind config
content: add about page sanity schema
```

---

## 11. DOCS.md UPDATE RULE

After every major feature or page completion:
1. Update the page status table in Section 4 of this file
2. Update `DOCS.md` with what was built, components created, and how they work

---

## 12. WEB DESIGN PRINCIPLES (Apply to every page)

These principles must guide every design and build decision on this website.

### UX vs UI
- **UX (User Experience)** — how the site FEELS to use. Is it easy to navigate? Does it help the user get what they came for?
- **UI (User Interface)** — how it LOOKS. Colors, fonts, buttons, layout.
- Both matter equally. Beautiful UI with terrible UX fails. Great UX with poor UI also fails.
- Rule: Always design UX first (flow, structure, logic), then apply UI (brand colors, typography, visuals).

### Page Planning Process
Always follow this order before writing any code:
1. **Wireframe first** — black and white sketch of layout and structure. Figure out where everything goes before worrying about how it looks.
2. **Mockup second** — apply brand colors, typography, and imagery on top of the wireframe. Static visual of the final design.
3. **Build third** — only start coding once the structure and design are clear.

### Above the Fold — Most Valuable Real Estate
- Everything visible on the page BEFORE scrolling is "above the fold."
- This decides whether visitors stay or leave. Get it wrong and nothing else matters.
- The hero section must always sit above the fold.

### Hero Section Rules (Apply to EVERY page)
The hero section must answer 3 questions in 3 seconds:
1. **What is this?**
2. **Who is it for?**
3. **Why should I care?**

Every hero must contain:
- A strong headline (H1)
- A supporting subheadline
- A compelling image or visual
- A clear Call to Action (CTA) button

### Call to Action (CTA) Rules
- Every single page must have at least one clear CTA
- **Weak CTA:** "Click here" / "Learn more"
- **Strong CTA:** Tells the user exactly what they get — "Get Early Access", "Post Your First Shift Free", "Find Locum Shifts Near You"
- Use `brand-gold` (`#c09e5a`) for primary CTA buttons to create visual contrast

### Visual Hierarchy
Control what the user's eye sees first using size, color, contrast, spacing, and positioning:
- H1 headline = most dominant element on the page
- Section headings (H2) = second level
- Subsections (H3) = third level
- Body copy = supporting context
- Fine print = least prominent
- Rule: If everything is loud, nothing stands out.

### Typography Hierarchy
```
H1  — Page title, most important, largest, one per page
H2  — Main section headings
H3  — Subsection headings
p   — Body copy, adds context, readable line length (60–80 chars)
```
- Good hierarchy = page is readable at a glance
- Bad hierarchy = everything feels the same importance → users bounce

### White Space Rules
- White space is NOT wasted space — it is an intentional premium design choice
- Makes everything easier to read and the site feel more premium
- Most cheap-looking websites CRAM too much in
- Most premium sites give elements room to BREATHE
- Rule: If the page feels cluttered, add more white space first

### Responsive & Mobile-First Design
- Design for MOBILE SCREENS FIRST, then scale up to desktop
- Over 60% of web traffic is mobile in 2026
- Google indexes mobile versions first — affects SEO
- Mobile-first forces you to prioritize only what matters (no room for clutter)
- Use Tailwind responsive prefixes in this order: base (mobile) → `md:` (tablet) → `lg:` (desktop)

### Grid System
- Use a consistent 12-column grid to keep all content aligned
- Tailwind's grid and container classes handle this automatically
- Never let elements float randomly — everything snaps to the grid

### Color Theory — ProNurture Application
- **Deep Green `#103613`** — trust, authority, health (primary brand)
- **Yellow Green `#7a853e`** — energy, growth, approachability
- **Gold `#c09e5a`** — warmth, premium, not clinical — use for CTAs and accents
- **White/Off-white** — clean, breathing room, premium feel
- Maintain high contrast ratios for accessibility:
  - Small text: minimum 7:1 contrast ratio
  - Large text/headings: minimum 4.5:1 contrast ratio
  - Always use white text on `brand-dark` backgrounds ✅

### Social Proof — Must Include on Key Pages
Social proof is one of the highest-leverage elements on any homepage. Include:
- Testimonials from healthcare employers and professionals
- Partner/client logos
- Stats and numbers (shifts filled, professionals registered, hospitals served)
- Trust badges, regulatory alignments, accreditations
- Rule: People buy from businesses that other people trust.

### Loading Speed
- Every 1-second delay reduces conversions by ~7%
- Always use `next/image` for automatic image optimization
- Never use uncompressed images
- Keep component bundles lean

### Accessibility Checklist (apply to every component)
- All images must have descriptive `alt` text
- Sufficient color contrast (see ratios above)
- Keyboard-navigable menus and interactive elements
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Focus states on all interactive elements

### Bounce Rate Awareness
- Homepage bounce rate above 80% = something is broken
- Fix order: hero section → CTA clarity → page load speed → mobile experience

### CTA Conversion Goal
- Target 2–3% conversion rate baseline
- Optimize for "Get Early Access" / waitlist signups as primary conversion
- Keep forms short — name + email only for waitlist

---

## 13. CHANGE LOG

| Date | Change | Page/Feature |
|------|--------|--------------|
| 2026-05-26 | Initial setup — Next.js 15, Sanity, GitHub, Vercel | Foundation |
| 2026-05-26 | Created 11 Sanity schemas + Studio structure | Sanity CMS |
| 2026-05-26 | Created CLAUDE.md | Project config |
| 2026-05-27 | Added Section 12 — Web Design Principles (UX/UI, hero rules, CTA, hierarchy, white space, mobile-first, accessibility, social proof, color theory, loading speed) | Project config |
| 2026-05-27 | Built complete Homepage — Navbar, Footer, HeroSection, SocialProofBar, ProblemSection, FeaturesSection, AudienceSection, TestimonialsSection, StatsSection, BlogPreviewSection, WaitlistSection | Homepage `/` |
| 2026-05-27 | Updated globals.css — Tailwind v4 @theme brand colors + DM Sans font variable | Design system |
| 2026-05-27 | Updated next.config.ts — added placehold.co remote image domain | Config |
| 2026-05-27 | Fixed homepage rendering issues — added `color-scheme: light` to globals.css to prevent dark-mode black backgrounds; changed `bg-brand-white` → `bg-white` in ProblemSection, TestimonialsSection, FeaturesSection cards; updated hero and blog placeholder image URLs; fixed Navbar scroll threshold 20px → 50px | Homepage `/` |
| 2026-05-27 | Added hover effects to all buttons and links — gold CTAs hover to brand-dark, outline CTAs hover to white/dark, nav links hover to brand-green, cursor-pointer on all interactive elements | All components |
| 2026-05-27 | Navbar refactor — removed scroll-based transparency logic; navbar is now always white with Full Color Logo.svg and shadow-sm border; simplified component (removed scrolled state + scroll useEffect) | Navbar.tsx |
| 2026-05-27 | HeroSection fixes — replaced next/image with plain img tag for placeholder; H1 made entirely white (removed gold span); reduced font sizes to text-4xl/5xl/6xl; reduced padding to pt-24 pb-12 so full hero content fits above the fold | HeroSection.tsx |
| 2026-05-27 | HeroSection redesign — light layout (bg-brand-light), text-brand-dark headline, gray-600 subheadline, deep green accent panel on right, h-[calc(100vh-80px)] viewport fit, dark/inverted CTA buttons, mobile image fallback | HeroSection.tsx |
