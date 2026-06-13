# STRATEX-STYLE WEBSITE DESIGN SKILL

**Purpose:** Replicate the visual language, motion system, gradient palette, interaction feel, and content structure of the Stratex Framer consulting template — adapted for ProNurtureSphere or any professional services landing page. No emoji. Lucide React icons only. Higgsfield video/image integration for hero and service cards.

---

## 1. DESIGN TOKENS

### Color Palette (ProNurtureSphere Brand)

```css
:root {
  /* Brand Core — from ProNurtureSphere Brand Guidelines 2026 */
  --brand-dark:       #103613;   /* Deep Green — primary buttons, nav bg, hero card, section bg */
  --brand-green:      #7a853e;   /* Yellow Green — accents, icon badges, section tags, hover states */
  --brand-gold:       #c09e5a;   /* Gold ("Gray Orange") — warmth accents, highlight details, badges */
  --brand-white:      #ffffff;   /* White — text on dark, card backgrounds */
  --brand-offwhite:   #f5f5f0;   /* Off-white — alternating section bg (derived from palette tints) */
  --brand-near-black: #0d0d0d;   /* Near-black — primary body text */
  --brand-gray:       #5a5a5a;   /* Muted gray — subtext, descriptions */

  /*
    Color philosophy (from guidelines):
    Deep Green (#103613) = authority, health, trust — the anchor
    Yellow Green (#7a853e) = energy, approachability — fresh and alive
    Gold (#c09e5a) = warmth, professionalism — keeps it from feeling clinical
    Together: professional without being sterile
  */

  /* Gradients — adapted from Stratex patterns using ProNurture palette */
  --gradient-hero-card: linear-gradient(
    244deg,
    rgba(122, 133, 62, 0.12) 0%,   /* yellow-green tint */
    #ffffff                  73%,
    rgba(192, 158, 90, 0.04) 100%   /* gold whisper */
  );
  --gradient-service-card-mask: linear-gradient(
    180deg,
    rgba(0,0,0,0)    0%,
    rgba(0,0,0,0)   50%,
    rgba(0,0,0,0.6) 66%,
    rgba(0,0,0,1)  100%
  );
  --gradient-pricing-card: linear-gradient(
    180deg,
    rgba(122, 133, 62, 0.10) 0%,   /* subtle yellow-green wash */
    rgba(255,255,255,0)      100%
  );
  --gradient-pricing-card-featured: linear-gradient(
    180deg,
    rgba(192, 158, 90, 0.15) 0%,   /* gold wash for premium card */
    rgba(255,255,255,0)      70%,
    rgba(255,255,255,0)      100%
  );
  --gradient-team-card-overlay: linear-gradient(
    180deg,
    rgba(255,255,255,0)   0%,
    rgba(16, 54, 19, 0.7) 100%     /* deep green tinted overlay */
  );
  --gradient-step-connector: linear-gradient(
    180deg,
    #ffffff  0%,
    #103613 100%
  );
  --gradient-fade-left: linear-gradient(
    90deg,
    #ffffff 0%,
    rgba(255,255,255,0) 100%
  );
  --gradient-fade-right: linear-gradient(
    270deg,
    #ffffff 0%,
    rgba(255,255,255,0) 100%
  );
  --gradient-section-tint: linear-gradient(
    180deg,
    rgba(122, 133, 62, 0.08) 0%,
    rgba(255,255,255,0)      70%,
    rgba(255,255,255,0)      100%
  );
  --gradient-hero-dark-bg: linear-gradient(
    135deg,
    #103613 0%,
    #1a4d1e 100%                   /* subtle depth on dark hero card */
  );
}
```

### Typography (ProNurtureSphere Brand)

```css
/*
  Brand font: DM Sans — from ProNurtureSphere Brand Guidelines 2026
  "Switzer balances warmth with authority — readable, modern, and fitting
  for a brand operating at a professional level."
  (Note: the guidelines show DM Sans as the specimen font; use DM Sans throughout)

  Single font family — DM Sans — across all roles, differentiated by weight:
  Regular (400): body text, descriptions
  Medium (500):  nav links, labels, captions
  Bold (700):    headings, CTAs, emphasis
  Italic:        pull quotes, testimonials
*/

--font-primary: "DM Sans", sans-serif;
/* No separate display/serif font — DM Sans bold does all heading work */
/* Google Fonts import: https://fonts.google.com/specimen/DM+Sans */
/* weights: 400, 500, 700 + italic variants */

/* Type Scale */
--text-hero:     clamp(40px, 5.5vw, 56px);  /* H1 — DM Sans Bold 700 */
--text-h2:       clamp(36px, 4vw,  48px);   /* Section headings — DM Sans Bold 700 */
--text-h3:       clamp(28px, 3vw,  36px);   /* Sub-headings — DM Sans Bold 700 */
--text-h4:       clamp(20px, 2vw,  26px);   /* Feature/card titles — DM Sans Bold 700 */
--text-body-lg:  20px;                        /* Lead paragraphs — DM Sans Regular 400 */
--text-body:     17px;                        /* Default body — DM Sans Regular 400 */
--text-sm:       15px;                        /* Nav links, captions — DM Sans Medium 500 */
--text-xs:       13px;                        /* Tags, labels — DM Sans Medium 500 */
--text-xxs:      11px;                        /* Micro badge text — DM Sans Medium 500 */

/* Letter spacing — DM Sans reads well at tighter tracking */
--ls-heading: -0.02em;
--ls-body:    -0.01em;
--ls-ui:       0em;     /* nav, buttons — neutral */
--ls-caps:     0.08em;  /* "SPHERE LIMITED" sub-brand, section eyebrows in uppercase */

/* Line heights */
--lh-heading: 1.2em;
--lh-body:    1.6em;    /* DM Sans needs slightly more leading for readability */
--lh-ui:      1.2em;

/* Font usage rules */
/*
  H1–H3:      DM Sans 700 (Bold), --ls-heading, --lh-heading
  H4–H5:      DM Sans 700 (Bold), --ls-heading, --lh-body
  Body text:  DM Sans 400 (Regular), --ls-body, --lh-body
  Nav/Labels: DM Sans 500 (Medium), --ls-ui, --lh-ui
  Buttons:    DM Sans 500 (Medium), --ls-ui
  Sub-brand:  DM Sans 500, uppercase, --ls-caps (e.g. "SPHERE LIMITED")
  Quotes:     DM Sans 400 Italic
*/
```

### Spacing & Radius

```css
--radius-hero-card:    28px;
--radius-service-card: 24px;
--radius-pricing-card: 28px; /* 34px on white variant */
--radius-team-card:    20px;
--radius-feature-icon: 16px;
--radius-pill:         1000px; /* fully rounded */
--radius-tag:          100px;

--section-padding-y:   72px;
--container-max:       1150px;
--container-pad:       25px;
```

---

## 2. LAYOUT ARCHITECTURE

### Page Sections (in order)

```
[NAVBAR]         — sticky, white bg, slide-in from top on load
[HERO]           — dark green card, serif headline, Higgsfield image right
[PARTNERS]       — logo ticker, fade edges, masked scroll
[WHY US]         — 2-col gradient card (before/after comparison)
[SERVICES]       — horizontal drag/swipe slideshow, photo cards with text mask
[TESTIMONIAL]    — centered quote, star rating, user badge
[FEATURES]       — 3-col icon grid, centered layout
[PRICING]        — 2-col cards, one plain + one filled green
[HOW IT WORKS]   — alternating image + text steps with timeline connector
[IMPACT]         — centered stat bubbles flanking a portrait photo
[TEAM]           — auto-scroll horizontal carousel, fade edges
[FAQ]            — accordion with green icon toggle
[CONTACT]        — dark green full-width, 2-col form + portrait image
[FOOTER]         — 4-col grid on light white
```

---

## 3. COMPONENT PATTERNS

### 3.1 Navbar

```jsx
// Structure
<nav className="navbar">
  <Logo />               // icon box (deep green #103613) + "ProNurture" in DM Sans Bold
                         // sub-brand "SPHERE LIMITED" in DM Sans 500 uppercase tracking-widest
  <NavLinks />           // For Professionals | For Employers | About | Blog
  <CTAButton />          // "Join the Waitlist" — pill, deep green bg, white text, sliding arrow
</nav>

// Behavior
// - Fixed/sticky, z-index: 10
// - Enters: opacity 0, translateY(-20px) → spring animation on mount
// - Mobile: hamburger toggles vertical nav with slide-down, opacity fade
// - CTA button: pill shape, dark green bg, white text, arrow icon slides
//   right on hover (translateX animation via CSS transform)

// Sticky scroll blur (optional): backdrop-filter: blur(12px) when scrolled
```

### 3.2 Hero Section

```jsx
// Container: dark green rounded card (border-radius: 28px), full-width inside section
// Left column: ratings pill → H1 → body text → two CTA buttons
// Right column: Higgsfield portrait image, rounded corners

// Ratings pill
<div className="rating-pill">
  <StarRow count={5} color="white" size={21} />
  <span>Rated 4.9/5</span>
</div>

// Heading
<h1 style={{ fontFamily: 'DM Sans', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
  Connect with the right clinical opportunities
</h1>

// Body
<p style={{ opacity: 0.8, color: '#fff' }}>
  Elevate your business with expert insights...
</p>

// Buttons row
<PrimaryButton href="#contact">Get in touch</PrimaryButton>
<TextLinkButton href="#services">What we do</TextLinkButton>

// Higgsfield image placement
// - Right column, height: 580px, object-fit: cover, border-radius: 20px
// - Appears with scale(0.85) → scale(1) spring on load, opacity 0→1

// Entrance animations (staggered, spring type):
// rating:  delay 0.1s
// heading: delay 0.2s, translateY(24px)
// body:    delay 0.3s
// buttons: delay 0.4s
// image:   delay 0.1s, scale(0.85→1)
```

### 3.3 Partners Ticker

```jsx
// Horizontal scroll marquee with fade edges
// Left edge: gradient-fade-left mask
// Right edge: gradient-fade-right mask
// Auto-scrolling, no pause on hover needed

// Container: opacity 0.001 → 1 on scroll reveal
// mask-image: linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)
// Logo images: SVG format, height ~26-30px, object-fit: contain, gap: 52px
```

### 3.4 Why Us — Comparison Card

```jsx
// 2-column grid inside a gradient card:
//   background: linear-gradient(244deg, #edffe3 0%, #ffffff 73%, #fdfffc 100%)
//   border: 1px solid rgba(0,0,0,0.05)
//   border-radius: 38px
//   padding: 5px

// Left card (Other Firms): plain off-white bg, gray icon badges
// Right card (With Stratex): white bg, drop shadow, green icon badges

// Each feature row:
// [GrayOrGreen Icon Badge 20px] [Title 22px Inter 500] + [Body text 16px gray]

// Icons (Lucide):
// Generic Strategies → <X /> or <Minus />
// Limited Guidance   → <AlertCircle />
// Hidden Fees        → <EyeOff />
// Tailored Consulting→ <CheckCircle2 />
// Dedicated Support  → <Users />
// Transparent Pricing→ <DollarSign />

// Scroll reveal: opacity 0 → 1, translateY(20px) → 0, scale(0.85→1)
```

### 3.5 Services Slideshow

```jsx
// Horizontal draggable carousel (Framer Motion drag or CSS scroll-snap)
// Card dimensions: 580×400px (desktop), adapts on mobile
// Cards: full-bleed background image, gradient mask overlay on bottom half,
//        white text positioned at bottom-left with backdrop blur on mask

// Mask overlay per card:
// backdrop-filter: blur(5px)
// mask: linear-gradient(180deg, transparent 0%, transparent 50%,
//                       rgba(0,0,0,0.6) 66%, black 100%)

// Navigation: prev/next buttons, green circle bg, arrow SVG icons
// Button positions: absolute left/right sides, -20px inset

// HIGGSFIELD: use generated images for each service card background:
// - Business consulting: professional meeting room / strategy session
// - Operational efficiency: clean modern office workflow
// - Market research: data visualization / analytics dashboard
// - Digital transformation: tech/code environment

// Card text (bottom of card):
// <h3 color="white">Business consulting</h3>
// <p color="#fafafa" opacity>Gain a clear roadmap for growth...</p>
```

### 3.6 Feature Cards Grid (3-col)

```jsx
// Layout: CSS Grid, 3 columns desktop / 1 column mobile, gap: 58px
// Each card: centered, flex-col, gap: 28px

// Icon badge: 50×50px, dark green bg, border-radius: 16px
//   box-shadow: 0px 1px 24px rgba(0,0,0,0.12), inset 0 0 4px 1px rgba(255,255,255,0.28)
//   Icon inside: 22×22px white SVG

// Icons (Lucide) per feature:
// Unlimited consultations  → <Calendar />
// Tailored solutions       → <Settings2 />
// Expert insights          → <Lightbulb />
// Data strategies          → <BarChart2 />
// Ongoing support          → <HeadphonesIcon /> or <LifeBuoy />
// Seamless execution       → <Zap />

// Title: Inter 22px, 500 weight, centered, #141414
// Body:  Inter 17px, 500 weight, centered, #636363, max-width 270px

// Scroll reveal: staggered translateY(10px) → 0, opacity 0→1
// delay per card: index * 0.08s
```

### 3.7 Pricing Cards

```jsx
// 2-col grid, max-width: 830px, centered

// Card A (Standard): white bg, border 1px solid rgba(31,81,76,0.05), radius 28px
//   Gradient overlay (subtle): linear-gradient(180deg, #edffe3 0%, transparent 100%) 
//   opacity 0.2, positioned inset 5px top

// Card B (Premium): same but with prominent green gradient overlay:
//   linear-gradient(180deg, #edffe3 0%, rgba(250,255,247,0) 70%, transparent 100%)
//   Tag badge: dark green pill "Popular" with sparkle Lucide icon

// Price display: H2 (Hedvig serif) + "/Month" small text, aligned bottom
// CTA button:
//   Standard: bordered pill button (transparent bg, border rgba(0,0,0,0.12))
//   Premium:  filled dark green pill button with white text

// Checklist items: Lucide <Check /> icon (green), 20px, + body text
// Example icons per item:
// <CheckCircle2 size={20} color="#1f514c" />

// Scroll reveal: translateY(10px), opacity 0→1, spring 400/58
```

### 3.8 How It Works — Timeline Steps

```jsx
// 3 alternating steps: [image | connector | text] layout
// Step 1: image LEFT  | connector CENTER | text RIGHT
// Step 2: text LEFT   | connector CENTER | image RIGHT
// Step 3: image LEFT  | connector CENTER | text RIGHT

// Timeline connector (vertical line + numbered dot):
// Line above dot: 2px wide, opacity 0.2, deep green #103613 (fades in from top)
// Dot: 30×30px circle, deep green #103613 bg, white text "01" "02" "03", DM Sans Medium 14px
// Line below dot: same style, opacity 0.2

// Images: Higgsfield-generated per step:
// Step 1 "Simple Booking":   Initial consultation meeting
// Step 2 "Tailored Strategy": Strategy whiteboard / planning session
// Step 3 "Continuous Support": Ongoing team collaboration / check-in

// Image container: border-radius 28px, height 295px, overflow visible
// Scroll reveal: images opacity 0→1, text translateY(16px)→0

// "Discover More" link: text + Lucide <ArrowRight /> size 17, inline
```

### 3.9 Team Carousel

```jsx
// Horizontal auto-scroll carousel, 4 visible cards desktop
// Card: 276×320px, border-radius 20px, overflow hidden
// Image: full-bleed Higgsfield portrait (professional headshots)
// Overlay: gradient linear(transparent→rgba(0,0,0,0.4)), bottom 0
// Text: name (Inter 22px white), role (16px white 80% opacity)

// Fade edges: left/right gradient masks (120px wide each)
// Navigation: green circle buttons (36px), centered below at bottom

// HIGGSFIELD prompts for team cards:
// "Professional headshot, person in business attire, neutral background,
//  confident expression, soft studio lighting, [role-specific props]"
```

### 3.10 FAQ Accordion

```jsx
// Question row: text left + green circle icon button right
// Icon: <Plus /> → rotates 45° to become <X /> on open (CSS transform)
// Border: 1px solid rgba(0,0,0,0.05) between items

// Open state: reveal answer text with height animation
//   height: 0 → auto, opacity 0→1, duration 0.3s ease
// Icon: background-color: #1f514c, border-radius 1000px, 25×25px
// Icon inside: 12×12px white SVG

// Questions:
// 1. How does your consulting process work?
// 2. What industries do you specialize in?
// 3. How long does it take to see results?
// 4. Do you offer one-time consultations?
// 5. Can small businesses afford your services?
// 6. How do I get started?
```

### 3.11 Contact Section

```jsx
// Full dark green background (#1f514c), left text + form, right portrait photo
// Section tag: white dot + "Contact us" white text
// H2: white, serif, left-aligned, max-width 450px

// Form grid: 2 columns
// Fields: Name, Email, Date picker, Service dropdown, Budget dropdown
// Textarea: Message, full-width (spans 2 columns), min-height 120px

// Field styles:
//   background: rgba(255,255,255,0.08)
//   border-radius: 12px
//   color: white
//   placeholder: rgba(250,250,250,0.7)
//   border on focus: 1px solid #fafafa

// Submit button: pill shape, rgba(255,255,255,0.07) bg, white text
//   right side: white circle icon with dark green arrow
//   Same sliding arrow animation as navbar CTA

// Right image: Higgsfield portrait of professional consultant
//   height 700px, border-radius 34px, object-fit cover

// Scroll reveal: whole section opacity 0→1 with scale/translate spring
```

---

## 4. MOTION SYSTEM

### Spring Configuration (Primary)

```js
// Used for entrance animations and button hover states
const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 58,
  mass: 1,
};

// Soft spring for cards
const softSpring = {
  type: "spring",
  stiffness: 200,
  damping: 40,
};
```

### Entrance Animation Patterns

```js
// Pattern A: Slide up + fade (most common)
initial:  { opacity: 0, y: 24 }
animate:  { opacity: 1, y: 0 }
transition: { ...springConfig, delay: 0.2 }

// Pattern B: Scale up from small (images, hero card)
initial:  { opacity: 0, scale: 0.85 }
animate:  { opacity: 1, scale: 1 }
transition: { ...softSpring, delay: 0.1 }

// Pattern C: Subtle lift (cards, grid items)
initial:  { opacity: 0, y: 10 }
animate:  { opacity: 1, y: 0 }
// Staggered via index * 0.08s delay

// Pattern D: Slide in from side (stats, impact items)
// Left items:  { opacity: 0, x: -20 } → { opacity: 1, x: 0 }
// Right items: { opacity: 0, x:  20 } → { opacity: 1, x: 0 }

// All triggered by scroll intersection: threshold 0.1
```

### Button Hover: Sliding Arrow

```jsx
// The signature interaction — used on every CTA button
// Structure: [Text label] [Icon circle with TWO arrows]

// Two arrows overlaid:
// Arrow 1: positioned left side of circle (hidden initially)
// Arrow 2: positioned center of circle (visible initially)

// On hover: both arrows translateX right simultaneously
// Arrow 1 moves from left-offscreen → center
// Arrow 2 moves from center → right-offscreen
// Creates illusion of continuous arrow sliding through the circle

// CSS:
.btn-icon-circle {
  width: 33px; height: 33px;
  border-radius: 1000px;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.arrow-1 { position: absolute; left: -20px; transition: left 0.2s ease; }
.arrow-2 { position: absolute; right: -20px; transition: right 0.2s ease; }
.btn:hover .arrow-1 { left: 0; right: unset; }
.btn:hover .arrow-2 { right: -20px; /* already off */ }

// Alternative with Framer Motion:
// whileHover: animate both arrows with x transition
```

### Scroll-triggered Reveal (Intersection Observer)

```js
// Use IntersectionObserver for all section reveals
// threshold: 0.1 (triggers when 10% visible)
// Each element gets initial hidden state, reveals on enter

const useScrollReveal = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
};

// Apply to: section containers, grid items, individual text blocks
// Do NOT apply to navbar (always visible) or footer
```

### Micro-interactions

```js
// Nav links: opacity 0.7 → 1.0 on hover, 150ms ease
// Footer links: opacity 0.5 → 1.0 on hover, 150ms ease

// Pricing card hover: subtle translateY(-4px), box-shadow intensifies
// whileHover: { y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }

// Feature icon badge hover: scale(1.05), 200ms spring
// whileHover: { scale: 1.05 }

// Service card drag: cursor: grab → grabbing
// Carousel drag: momentum-based inertia scroll

// FAQ accordion icon: rotate(0deg) → rotate(45deg) on open
// transition: transform 0.25s cubic-bezier(0.33, 1.53, 0.69, 0.99)
// (backOut easing — slight overshoot feels alive)
```

---

## 5. HIGGSFIELD INTEGRATION

### Usage Pattern

```js
// Higgsfield is used for all photographic content — no stock photo placeholders.
// Generate via the connected Higgsfield MCP tool, then embed as <img> or CSS background.

// All Higgsfield calls should specify:
// - Style: "professional photography, natural light, editorial quality"
// - Aspect ratio: match container (e.g., 3:4 for portrait, 4:3 for landscape)
// - No text in image, no overlaid graphics
```

### Required Images

```
1. HERO PORTRAIT
   Prompt: "Professional consultant portrait, business attire, confident pose,
   soft natural window light, neutral muted background, editorial photography,
   vertical 3:4 aspect ratio"
   Size: 736×938px
   Usage: Hero section right column

2. SERVICE CARDS (4 images, landscape 4:3)
   Card 1 — Business Consulting:
     "Corporate strategy meeting, executive team around modern conference table,
     natural light, editorial photography, horizontal format"

   Card 2 — Operational Efficiency:
     "Clean modern open-plan office, people collaborating at standing desks,
     workflow charts visible, editorial photography, horizontal format"

   Card 3 — Market Research:
     "Data analysis workspace, person reviewing charts on large monitor,
     professional environment, natural light, horizontal format"

   Card 4 — Digital Transformation:
     "Technology workspace, clean desk with laptop and multiple screens,
     modern tech environment, editorial photography, horizontal format"

3. HOW IT WORKS (3 images)
   Step 1 — Simple Booking:
     "Two professionals in initial consultation, modern meeting room,
     natural light, candid editorial, horizontal 4:3"

   Step 2 — Tailored Strategy:
     "Strategy session with whiteboard, two consultants reviewing plan,
     focused professional environment, horizontal 4:3"

   Step 3 — Continuous Support:
     "Remote team check-in, person on video call at professional desk,
     warm natural light, editorial photography, horizontal 4:3"

4. TEAM CARDS (4 portraits, vertical 3:4)
   Each: "Professional business portrait, [gender/style], clean neutral background,
   confident expression, soft studio lighting, editorial headshot quality"
   — Vary ethnicity, age, and gender across team to reflect diversity

5. CONTACT IMAGE
   "Professional consultant in business attire, vertical 2:3 portrait,
   clean studio or office background, confident composed expression,
   editorial photography quality"
   Size: ~530×700px
```

### Image Sizing Reference

```
Hero portrait:         736×938px  (or ~450×580px display)
Service card:          580×400px  (display), use 1280×853px source
How-it-works images:   ~500×295px (display), use 1280×960px source
Team cards:            276×320px  (display), use 426×470px source
Contact portrait:      530×700px  (display), use 1000×1500px source
Partner logos:         SVG preferred, ~90-140px wide, 26-30px tall
```

---

## 6. SECTION TAG COMPONENT

```jsx
// Used as section eyebrow label across all sections
// Structure: [8px dot] [label text]

const SectionTag = ({ label, variant = "green" }) => (
  <div className={`section-tag section-tag--${variant}`}>
    <div className="section-tag__dot" />
    <span>{label}</span>
  </div>
);

// Styles:
.section-tag {
  display: flex; align-items: center; gap: 8px;
  width: fit-content;
}
.section-tag__dot {
  width: 8px; height: 8px;
  border-radius: 1000px;
}
.section-tag--green .section-tag__dot { background: #103613; }
.section-tag--green span { color: #103613; font-family: "DM Sans"; font-weight: 500; }
.section-tag--gold .section-tag__dot { background: #c09e5a; }
.section-tag--gold span { color: #c09e5a; font-family: "DM Sans"; font-weight: 500; }
.section-tag--white .section-tag__dot { background: #ffffff; }
.section-tag--white span { color: #ffffff; font-family: "DM Sans"; font-weight: 500; }

// Font: DM Sans 15px, 500 weight, letter-spacing 0em
```

---

## 7. BUTTON COMPONENTS

### Primary Button (Dark Green Pill)

```jsx
// Used in hero, how-it-works, navbar
// bg: #103613, border-radius: 1000px
// padding: 3px 3px 3px 14px
// Text: white, 15px DM Sans 500
// Right: white circle (33px) with sliding arrow icon (deep green)

<a className="btn-primary" href={href}>
  <span className="btn-primary__text">{label}</span>
  <div className="btn-primary__icon-circle">
    {/* Two Lucide ArrowRight icons, animation via CSS */}
    <ArrowRight size={17} className="arrow-a" />
    <ArrowRight size={17} className="arrow-b" />
  </div>
</a>
```

### Secondary Button (White Pill)

```jsx
// Same structure but bg: white, text: #0d0d0d
// Icon circle: deep green bg (#103613), white arrows
```

### Text Link Button

```jsx
// No background, text + ArrowRight 17px inline
// Used alongside primary in hero: "What we do →"
// color: white (on dark bg) or #141414 (on light bg)
// hover: opacity 0.7, 150ms ease
```

### Pricing Buttons

```jsx
// Standard: transparent bg, border 1px solid rgba(0,0,0,0.12), radius 999px
//   padding: 8px 22px, text: #141414, width: 100%
//   hover: bg rgba(0,0,0,0.04)

// Premium: bg #103613, text white, same sizing
//   Gold (#c09e5a) border: 1px solid rgba(192,158,90,0.3) — warm premium feel
//   hover: opacity 0.9, subtle scale(0.98)
```

---

## 8. STATS / IMPACT BADGES

```jsx
// Pill-shaped stat bubbles used in Impact section
// Flanking a central portrait on both sides

// Badge structure:
// [green rounded tag with value] [separator dot/line] [label text]
// Wrapping container: bg #fafafa, radius 999px, padding 5px 18px 5px 5px

const StatBadge = ({ value, label, direction = "left" }) => (
  <div className={`stat-badge stat-badge--${direction}`}>
    <div className="stat-badge__tag">
      <span className="stat-badge__value">{value}</span>  {/* "$7M+", "72%", etc */}
    </div>
    <span className="stat-badge__label">{label}</span>    {/* "Revenue", "Growth" */}
    {direction === "left" && <div className="stat-badge__line" />}
  </div>
);

// Separator line: 90px wide, 1px tall, bg #141414, opacity 0.1
// Tag bg: #103613, radius 100px, padding 4px 12px, text white 15px DM Sans
// Gold accent option: use #c09e5a tag bg for "featured" stats
// Direction "left": line on right side  (pointing toward center image)
// Direction "right": line on left side  (pointing toward center image)

// Available stats from Stratex:
// Left column:  $7M+ Revenue | 72% Growth | 65% Skills
// Right column: 78% Impact   | 1% Designers | 10+ Consultants
```

---

## 9. RESPONSIVE BREAKPOINTS

```css
/* Desktop */
@media (min-width: 1200px) { /* 12-col grid, max-width 1150px container */ }

/* Tablet */
@media (min-width: 810px) and (max-width: 1199px) {
  /* Hero: stack columns vertically, gap 44px */
  /* Services slideshow: full width */
  /* Footer: 2-col instead of 4 */
}

/* Mobile */
@media (max-width: 809px) {
  /* All sections: single column */
  /* Hero card: border-radius 24px, padding 30px 22px */
  /* Features grid: 1 col */
  /* Pricing: 1 col */
  /* How-it-works: stack, timeline on left absolute */
  /* Contact: stack form above image */
  /* Navbar: hamburger menu */
}
```

---

## 10. IMPLEMENTATION CHECKLIST

### Dependencies (React/Next.js project)

```bash
npm install framer-motion lucide-react
# Google Fonts: DM Sans (weights 400, 500, 700 + italic variants)
# https://fonts.google.com/specimen/DM+Sans
```

### CSS Reset Additions

```css
* { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
h1,h2,h3,h4,h5,h6,p,figure { margin: 0; }
body { font-family: "DM Sans", sans-serif; background: #ffffff; color: #0d0d0d; }
```

### Animation Setup

```jsx
// Wrap page in MotionConfig for global spring defaults
import { MotionConfig } from "framer-motion";

<MotionConfig transition={{ type: "spring", stiffness: 400, damping: 58 }}>
  <App />
</MotionConfig>
```

### Section Wrapper Pattern

```jsx
// Every section uses this scroll-reveal wrapper
const Section = ({ children, id, bg }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.8"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);
  return (
    <motion.section ref={ref} id={id} style={{ opacity, y, background: bg }}>
      {children}
    </motion.section>
  );
};
```

---

## 11. QUICK REFERENCE — COPY TEMPLATES

### Section Tags
- "Why choose us" | "Services" | "Features" | "Pricing" | "How it works"
- "Impact" | "Our team" | "FAQ" | "Contact us"

### Headlines (Hedvig Serif style — confident, benefit-led)
- "Expert consulting tailored to your business success"
- "Reliable expertise to drive your greatest success"
- "Key benefits that set us apart from other firms"
- "Flexible pricing tailored to your business needs"
- "A proven process to achieve your biggest goals"
- "Real results that drive lasting impact for everyone"
- "Meet the experts behind your business success"
- "Answers to your most common questions"
- "Get in touch with our experts team"

### CTA Labels
- "Get in touch" (primary pill)
- "What we do" (text link)
- "Request Consultation" (pricing standard)
- "Get Started" (pricing premium)
- "Discover More" (how-it-works inline)
- "Submit your Form" (contact)

### FAQ Content
1. How does your consulting process work?
2. What industries do you specialize in?
3. How long does it take to see results?
4. Do you offer one-time consultations?
5. Can small businesses afford your services?
6. How do I get started?

---

## 12. HIGGSFIELD MCP CALL PATTERN

```jsx
// When building this page, call Higgsfield MCP for each image needed.
// Example call structure for the hero portrait:

const heroImage = await higgsfield.generateImage({
  prompt: "Professional consultant portrait, business attire, confident pose, soft natural window light, neutral muted background, editorial photography, vertical 3:4 aspect ratio",
  aspectRatio: "3:4",
  style: "photographic",
  quality: "high"
});

// Embed as:
<img
  src={heroImage.url}
  alt="Consultant portrait"
  style={{ width: "100%", height: "580px", objectFit: "cover", borderRadius: "20px" }}
/>

// For service cards as CSS background:
<div style={{
  backgroundImage: `url(${serviceImage.url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "24px",
  height: "400px",
  position: "relative"
}}>
  <div className="service-card__mask" /> {/* gradient mask overlay */}
  <div className="service-card__text">
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
</div>
```

---

## 13. DESIGN ANTI-PATTERNS TO AVOID

- **No emoji** anywhere in the UI — use Lucide icons exclusively
- **No placeholder grey boxes** — every image slot gets a Higgsfield call
- **No generic blue links** — all link color follows brand palette
- **No thick borders** — max border 1px solid at low opacity
- **No flat buttons without the sliding arrow** — the arrow motion is the brand interaction
- **No unsupported fonts** — only DM Sans (Regular 400, Medium 500, Bold 700 + italic)
- **No transforms without spring** — use spring physics, not linear/ease for entrance
- **No abrupt section transitions** — each section has a scroll-triggered entrance
- **No border-radius less than 16px** on interactive components
- **Don't stack too many animations** on one element — max: opacity + one translate
