# Development Notes

## Navigation Flash Issue (Mobile Menu)

### Problem Description

When resizing the browser window past the 550px breakpoint (mobile ↔ desktop), there's a visible "flash" where the menu links appear to glide/slide to the right before disappearing. This happens when transitioning from mobile to desktop view.

### Root Cause

The issue occurs because:

1. The parent menu container has CSS transitions on `transform`, `opacity`, and `visibility`
2. When the media query switches from mobile to desktop, the `transform` and `opacity` properties change
3. The browser animates these changes over 0.3 seconds
4. During this animation, the **child elements (links)** remain visible and inherit the parent's opacity changes
5. This creates the visual effect of links "gliding away" during the transition

**Key insight:** The transition is defined globally on the mobile menu, so ANY change to those properties (including media query switches) triggers the animation.

### Solutions Attempted

#### Solution 1: Remove Global Transition (PARTIALLY WORKING)

**What:** Move the `transition` property inside the mobile media query only, and explicitly set `transition: none` in the desktop media query.

**Why:** Prevents the transition from firing when crossing breakpoints, since the desktop view doesn't need animations.

**Code:**

```css
/* Mobile */
@media (max-width: 549px) {
  #primary-menu.main-nav-list {
    transition: transform var(--transition-speed) var(--transition-timing), opacity
        var(--transition-speed) var(--transition-timing),
      visibility var(--transition-speed) var(--transition-timing);
  }
}

/* Desktop */
@media (min-width: 550px) {
  #primary-menu.main-nav-list {
    transition: none; /* No transition on desktop = no flash */
  }
}
```

**Status:** ✅ Stops the menu container from sliding, but ❌ links still fade/glide

---

#### Solution 2: Disable Child Transitions (DID NOT WORK)

**What:** Add `transition: none` to all child elements of the menu.

**Why:** Prevent children from inheriting or having their own transitions that could cause visual artifacts.

**Code:**

```css
@media (max-width: 549px) {
  /* Prevent links from inheriting transition */
  #primary-menu.main-nav-list * {
    transition: none;
  }
}
```

**Status:** ❌ Did not solve the problem - links still glide

---

#### Solution 3: Separate Opacity for Children (NOT TESTED YET)

**What:** Remove `opacity` transition from the parent, and control child visibility separately with a delayed fade-in.

**Why:** By keeping the parent's opacity at 1 always and only animating `transform`, we can then control when children become visible independently.

**Code:**

```css
@media (max-width: 549px) {
  #primary-menu.main-nav-list {
    /* Remove opacity from transition */
    transition: transform var(--transition-speed) var(--transition-timing), visibility
        0s var(--transition-speed);

    /* Keep opacity always 1, hide with transform + visibility only */
    opacity: 1;
  }

  /* Hide content when menu is closed */
  #primary-menu.main-nav-list > * {
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  /* Show content when menu is open (with slight delay) */
  #primary-menu.main-nav-list.is-open > * {
    opacity: 1;
    transition-delay: 0.2s;
  }
}
```

**Status:** ⚠️ Not yet tested

---

#### Solution 4: "Resize Animation Stopper" Pattern (REJECTED)

**What:** Use JavaScript to detect window resize events and temporarily disable ALL transitions site-wide by adding a utility class.

**Why rejected:**

- Overcomplicated for the actual problem
- Uses `!important` (violates agents.md principles)
- Mixes concerns (JS managing CSS presentation)
- Creates unnecessary dependencies across files

**Code (NOT RECOMMENDED):**

```javascript
// JavaScript
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
```

```css
/* CSS */
.resize-animation-stopper * {
  transition: none !important;
}
```

**Status:** ❌ Not implemented (architectural reasons)

---

### Next Steps

1. **Test Solution 3** (separate opacity for children)
2. If that fails, consider completely removing the opacity transition and only using `transform` + `visibility`
3. Alternative approach: Use `display: none` instead of `visibility: hidden` (but this prevents transitions)
4. Check if there are any global transitions being applied from other CSS files (main.css, utilities.css)

### Current Status

- ✅ Menu container no longer slides when crossing breakpoints
- ❌ Menu links still fade/glide during breakpoint crossing
- 📝 Ready to test Solution 3

---

## References

- File: [`src/css/components/nav.css`](../src/css/components/nav.css)
- File: [`src/js/main.js`](../src/js/main.js)
- Breakpoint: 550px (must match between CSS and JS)
- Project rules: [`agents.md`](../agents.md) - "Prefer clarity, semantics, and consistency over abstraction"

---

## Maybach Wheels Split Layout Issue

### Problem Description

When implementing a split layout (text left, image right) for the Maybach Wheels section on desktop, the mobile layout broke. The button appeared on top of the image instead of below it. The initial approach used a wrapper div (`.maybach-left`) which disrupted the natural grid flow.

### Root Cause

The solution attempted to wrap the title and content in a container to control desktop layout, but this created a 2-item grid instead of a 3-item grid on mobile:

- Grid had: `.maybach-left` (wrapper) + image (2 items)
- Needed: title, image, content (3 separate items)

The wrapper prevented proper mobile stacking (title → image → content).

### Why This Is a Perfect Use Case for Grid Template Areas

**Advantages:**

1. ✅ **Visual mapping:** CSS shows layout structure literally
2. ✅ **Easy reordering:** Change layout between breakpoints without HTML changes
3. ✅ **Semantic naming:** Descriptive area names (title, image, content)
4. ✅ **Cleaner than positioning:** No `grid-row`/`grid-column` numbers
5. ✅ **Self-documenting:** Areas name themselves
6. ✅ **Follows agents.md:** Clear, semantic, maintainable

### Recommended Solution: CSS Grid Template Areas

#### HTML Structure (Remove `.maybach-left` wrapper)

```html
<section class="section maybach-wheels">
  <div class="container gutter split-layout">
    <!-- Direct children become grid items -->
    <h2 class="section-title">
      <span>The Mercedes-Maybach </span>
      <span>wheel programme</span>
    </h2>

    <img
      class="card-media"
      src="./src/images/maybach-multispoke-wheel.png"
      alt="Close-up of a Mercedes-Maybach wheel with intricate multi-spoke rim design."
    />

    <div class="maybach-content">
      <p>
        The exclusive Mercedes-Maybach wheel programme, e.g. with optional 53.3
        cm (21") Maybach forged wheels in multi-spoke design.
      </p>
      <a class="btn btn-dark uppercase" href="..." target="_blank"
        >Learn More</a
      >
    </div>
  </div>
</section>
```

#### CSS Implementation

```css
/* ======= Maybach Wheels ======= */

.maybach-wheels {
  background-color: var(--color-background-light-surface);
}

/* Mobile: Title → Image → Content (stacked vertically) */
.maybach-wheels .split-layout {
  display: grid;
  gap: var(--spacing-flow);
  grid-template-areas:
    "title"
    "image"
    "content";
}

.maybach-wheels .section-title {
  grid-area: title;
  color: var(--color-text-primary);
  font-size: var(--font-size-title);
  text-align: center;
}

.maybach-wheels .section-title span {
  display: block;
}

.maybach-wheels .card-media {
  grid-area: image;
  border-radius: var(--border-radius-medium);
}

.maybach-wheels .maybach-content {
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-flow);
  align-items: center;
}

/* Desktop: Two columns, title and content on left, image on right */
@media (min-width: 768px) {
  .maybach-wheels .split-layout {
    gap: var(--spacing-section);
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title   image"
      "content image";
    align-items: center;
  }

  /* Fine-tune vertical alignment */
  .maybach-wheels .section-title {
    align-self: end; /* Push title to bottom of its cell */
  }

  .maybach-wheels .maybach-content {
    align-self: start; /* Push content to top of its cell */
  }
}

.maybach-wheels .btn {
  width: fit-content;
}
```

### How It Works

**Mobile Layout:**

```
+-------+
| title |
+-------+
| image |
+-------+
|content|
+-------+
```

**Desktop Layout:**

```
+-------+-------+
| title | image |
+-------+       |
|content|       |
+-------+-------+
```

### Benefits

- **No wrapper divs needed:** Cleaner HTML structure
- **Visual grid in CSS:** Template areas literally show the layout
- **Flexible:** Easy to adjust without touching HTML
- **Maintainable:** Clear intent, follows agents.md principles
- **Reusable pattern:** Can apply to Appointment and Dealerships sections

### Current Status

- ⚠️ **Not yet implemented** - proposed solution documented for review
- 📝 Ready to apply when approved

### Pattern Reusability

This same pattern can be applied to:

1. **Appointment section** (call-to-action with image)
2. **Dealerships map section** (info + map background)

---

## References

- File: [`src/css/sections/maybach.css`](../src/css/sections/maybach.css)
- File: [`index.html`](../index.html) (Maybach Wheels section)
- Related: `.split-layout` primitive in [`src/css/main.css`](../src/css/main.css)
- Project rules: [`agents.md`](../agents.md) - "Semantic names for sections and components"

---

## Button Centering Strategies (Development Journey)

### Overview

This section documents the evolution of button centering approaches in the project, from inconsistent strategies to a unified system. It explains what worked, what didn't, and the final solution that follows best practices.

### Initial Problem

Buttons across different sections used different centering strategies, creating maintenance issues and inconsistencies:

- Some used `align-self: center` (worked only with flexbox parents)
- Some used `justify-self: center` (worked only with grid parents)
- Some used `display: block + width: fit-content + margin-inline: auto` (worked anywhere but verbose)
- Base `.btn` class didn't control width, causing buttons to expand in flex/grid contexts

### Analysis of Current Strategies (Before Fix)

#### Strategy 1: `align-self: center` (Flexbox parent)

**Used in:**

- `forms.css` - Newsletter form button
  ```css
  .newsletter-form .btn {
    align-self: center;
  }
  ```
  ✅ Works because `.newsletter-form` uses `display: flex`

#### Strategy 2: `justify-self: center` (Grid parent)

**Used in:**

- `gallery.css` - Feature cards
  ```css
  .feature-card .btn {
    justify-self: center;
  }
  ```
  ✅ Works because `.features-track` uses horizontal scroll with grid-like behavior

#### Strategy 3: `display: block + width: fit-content + margin-inline: auto`

**Used in:**

- `maybach.css` - Maybach Wheels button
  ```css
  .maybach-wheels .btn {
    display: block;
    width: fit-content;
    margin-inline: auto;
  }
  ```
- `appointment.css` - Appointment button (mobile only)
  ```css
  .appointment .btn {
    display: block;
    width: fit-content;
    margin-inline: auto;
  }
  ```
  ✅ Works with any parent (margin-based centering)

#### Strategy 4: Grid placement (Desktop only)

**Used in:**

- `appointment.css` - Appointment button on desktop
  ```css
  @media (min-width: 768px) {
    .appointment .btn {
      grid-area: contact-button;
    }
  }
  ```
  ✅ Grid positioning (no explicit centering needed if grid cell is sized correctly)

### Inconsistencies Found

#### 1. Mixed strategies in same section

`appointment.css` used:

- Mobile: `display: block + fit-content + margin-inline: auto`
- Desktop: Grid placement

**Problem:** The mobile centering properties weren't removed in the desktop view, creating redundant/conflicting rules.

#### 2. Button width not always controlled

Some buttons used `width: fit-content`, others relied on `display: inline-block` (from `buttons.css` base)

#### 3. Grid template mismatch

`appointment.css` used:

```css
grid-template-columns: 1fr 1fr; /* Two equal columns */
grid-template-areas: "content contact-button";
```

**Problem:** Button would expand to fill its column (defeats the purpose of `fit-content`)

### Final Solution: Consistent Button Strategy

#### Base Rule (buttons.css)

```css
.btn {
  /* Keep existing inline-block for default behavior */
  display: inline-block;
  /* Button should only be as wide as its content */
  width: fit-content;
}
```

#### Centering Based on Parent Layout

**For Flexbox parents:**

```css
.parent-with-flex .btn {
  align-self: center;
}
```

**For Grid parents:**

```css
.parent-with-grid .btn {
  justify-self: center;
}
```

**For Block/Flow parents (fallback):**

```css
.parent-without-flex-or-grid .btn {
  display: block;
  margin-inline: auto;
}
```

### Applied Fixes

#### 1. Updated `buttons.css` (Base component)

```css
.btn {
  display: inline-block;
  width: fit-content; /* Added globally */
  background-color: var(--white);
  color: var(--color-text-primary);
  font-size: var(--font-size-small);
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5px;
  border: none;
  border-radius: var(--border-radius-pill);
  padding: 0.75em 2em;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-speed) var(--transition-timing);
}
```

#### 2. Updated `appointment.css`

```css
/* ========== Appointment Section ========== */

.appointment {
  background-color: var(--color-background-appointment);
  color: var(--color-text-inverse);
}

.appointment .container {
  text-align: center;
}

/* Mobile: stacked vertically */
.appointment .split-layout {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-flow);
  align-items: center; /* Center all children including button */
}

/* Desktop: Two columns */
@media (min-width: 768px) {
  .appointment .split-layout {
    display: grid;
    grid-template-columns: 1fr auto; /* Content expands, button stays compact */
    align-items: center; /* Vertically center button with text */
    gap: var(--spacing-section);
    text-align: left;
  }
}
```

#### 3. Updated `maybach.css`

```css
/* Remove redundant width: fit-content (now in base .btn) */
.maybach-wheels .btn {
  /* width: fit-content; ← Removed */
  /* Centering handled by parent flex container */
}

/* If .maybach-content uses flex: */
.maybach-wheels .maybach-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-flow);
  align-items: center; /* Centers button via flexbox */
}
```

### Strategy Comparison Table

| Parent Layout  | Centering Method                                                      | Example                            |
| -------------- | --------------------------------------------------------------------- | ---------------------------------- |
| **Flexbox**    | `align-items: center` on parent                                       | Newsletter form, Maybach content   |
| **Grid**       | `justify-self: center` on button OR `grid-template-columns: 1fr auto` | Feature cards, Appointment desktop |
| **Block/Flow** | `display: block + margin-inline: auto` on button                      | Fallback only                      |

### Golden Rules

1. ✅ **Always set `width: fit-content` in base `.btn` class**
2. ✅ **Use parent alignment when possible** (flexbox/grid)
3. ✅ **Only use `margin-inline: auto` as fallback** for non-flex/grid parents
4. ✅ **Remove redundant centering rules in media queries**

### Why This Approach Works

1. **Consistency Across Project**

   - All buttons have same base width behavior
   - Centering method depends on parent layout context
   - No ad-hoc solutions per section

2. **Semantic & Maintainable**

   - Parent controls layout, child is passive
   - Clear relationship between container and content
   - Easy to adjust layout without touching button styles

3. **Avoids Redundancy**

   - No need to repeat `width: fit-content` in every section
   - No conflicting rules (e.g., `display: block` overriding `display: inline-block`)
   - Media queries only adjust parent layout, not individual buttons

4. **Modern CSS Best Practices**
   - Leverages flexbox/grid alignment properties
   - Follows "parent controls child positioning" principle
   - Reduces specificity wars

### Current Implementation Status

- ✅ All buttons inherit `width: fit-content` from base class
- ✅ Centering controlled by parent's layout system (flex/grid)
- ✅ Section-specific CSS only adjusts parent layout, not button properties
- ✅ Consistent strategy documented in `design-decisions.md`

### References

- File: [`src/css/components/buttons.css`](../src/css/components/buttons.css)
- File: [`src/css/sections/appointment.css`](../src/css/sections/appointment.css)
- File: [`src/css/sections/maybach.css`](../src/css/sections/maybach.css)
- File: [`src/css/components/forms.css`](../src/css/components/forms.css)
- File: [`src/css/sections/gallery.css`](../src/css/sections/gallery.css)
- File: [`src/css/sections/features.css`](../src/css/sections/features.css)
- Project rules: [`agents.md`](../agents.md) - "Prefer clarity, semantics, and consistency over abstraction"
- Design documentation: [`design-decisions.md`](design-decisions.md) - Button Centering Strategy section

---

## Hero Section Implementation & Troubleshooting

### Overview

The hero section required complex responsive behavior: full-width background image with text overlay that repositions from bottom-left (mobile) to upper-left (desktop). Multiple issues encountered with image sizing, text positioning, and smooth transitions across breakpoints.

### Issues Encountered & Solutions

#### Issue 1: Image Not Covering Container

**Problem:**

- Hero image showing at natural size (not filling container)
- Empty space below/around image on mobile
- Car not prominently displayed

**Root Cause:**

- Used `height: auto` which respects image's natural dimensions
- No `object-fit` property to control how image fills space

**Solution:**

```css
.hero-img {
  object-fit: cover; /* Fill container, crop edges */
  object-position: center center; /* Keep car centered */
  position: absolute;
  height: 100%; /* Fill hero container */
}
```

**Why this works:**

- `object-fit: cover` makes image fill entire container while maintaining aspect ratio
- `object-position: center` ensures car stays visible (crops top/bottom or left/right equally)
- Absolute positioning removes image from document flow, allowing text overlay

---

#### Issue 2: Empty Space Below Hero Image on Mobile

**Problem:**

- Image displayed correctly but large gap underneath on small screens
- Hero container taller than image height

**Root Cause:**

- `.hero` container: `min-height: clamp(250px, 75vh, 300px)`
- `.hero-img`: `height: clamp(200px, 30vh, 300px)`
- **Height mismatch:** When image was 200px but container was 250px → 50px gap

**Solution:**

```css
/* Mobile: Container matches image height */
.hero {
  min-height: clamp(200px, 30vh, 300px); /* Same as image */
}

.hero-img {
  height: clamp(200px, 30vh, 300px); /* Matches container */
}

/* Larger mobile: Image fills container */
@media (min-width: 400px) {
  .hero {
    min-height: clamp(300px, 50vh, 500px); /* Taller */
  }

  .hero-img {
    height: 100%; /* Now fills taller container */
  }
}
```

**Why this works:**

- Container and image have identical dimensions on small mobile (no gap)
- At 400px+, image switches to `height: 100%` to fill any container size
- Responsive scaling handled by container's `clamp()`, image follows

---

#### Issue 3: Text Content Misaligned (Not Bottom-Left)

**Problem:**

- Text appearing centered or too far right
- Not sticking to bottom-left corner on mobile

**Root Cause:**

- `.hero-content` has `.container` class which adds `margin-inline: auto` (centers content)
- Flexbox `align-items: flex-start` was fighting against this centering

**Solution:**

```css
.hero {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Bottom alignment */
  align-items: flex-start; /* Left alignment */
}

.hero-content {
  margin-inline: 0; /* Override .container centering */
  padding-bottom: var(--spacing-flow); /* 1rem bottom spacing */
}
```

**Why this works:**

- Flexbox on `.hero` controls vertical/horizontal positioning
- Overriding `margin-inline: auto` allows true left alignment
- Still benefits from `.gutter` class for edge padding
- No `position: absolute` needed (cleaner, more maintainable)

---

#### Issue 4: Awkward Typography Scaling on Small Screens

**Problem:**

- Text too large on tiny screens (< 350px)
- Subtitle and tagline not scaling proportionally
- Relationship between text sizes inconsistent

**Root Cause:**

- Initial clamp ranges too aggressive (24px-40px subtitle, 14px-20px tagline)
- Different viewport-relative scaling (5vw vs 2.5vw) created uneven growth

**Solution:**

```css
.hero-subtitle {
  font-size: clamp(1.25rem, 5vw, 2rem); /* 20px → 32px */
}

.hero-tagline {
  font-size: clamp(0.75rem, 3vw, 1.125rem); /* 12px → 18px */
}
```

**Why this works:**

- Smaller minimums (20px, 12px) prevent overwhelming tiny screens
- Tagline grows faster (3vw vs 5vw) to maintain proportion with subtitle
- Consistent ~1.67:1 ratio across all viewport sizes

---

#### Issue 5: No Smooth Transition Between Mobile and Desktop Layouts

**Problem:**

- Content abruptly jumped from bottom (mobile) to top (desktop) at 900px
- Large gap (400px-900px) with no intermediate positioning

**Root Cause:**

- Only two breakpoints defined (400px for sizing, 900px for position)
- Removed intermediate 630px breakpoint during testing

**Solution:**

```css
/* Mobile: Bottom positioning */
.hero {
  justify-content: flex-end;
}

.hero-content {
  padding-bottom: var(--spacing-flow); /* 1rem */
}

/* Tablet (630px+): Move to top with moderate padding */
@media (min-width: 630px) {
  .hero {
    justify-content: flex-start; /* Top alignment */
  }

  .hero-content {
    padding-top: var(--spacing-section); /* 3rem */
    padding-bottom: 0;
  }
}

/* Desktop (900px+): Larger padding */
@media (min-width: 900px) {
  .hero-content {
    padding-top: var(--spacing-section-large); /* 4rem */
  }
}
```

**Why this works:**

- Three-stage transition: bottom → upper-left → top-left
- Progressive padding increase (1rem → 3rem → 4rem)
- Smoother UX, less jarring layout shift

---

#### Issue 6: Letter-Spacing Inconsistency

**Problem:**

- At 400px+ breakpoint, `letter-spacing: 1.5px` applied to BOTH subtitle and tagline
- Subtitle didn't have letter-spacing in base styles
- Inconsistent typography treatment

**Root Cause:**

- Used grouped selector `.hero-tagline, .hero-subtitle`
- Unintentionally applied property to both elements

**Solution:**

```css
/* Base: Only tagline has letter-spacing */
.hero-tagline {
  letter-spacing: 1px;
}

/* 400px+: Increase tagline spacing only */
@media (min-width: 400px) {
  .hero-tagline {
    letter-spacing: 1.5px;
  }
}
```

**Why this works:**

- Subtitle stays clean (no letter-spacing at any breakpoint)
- Tagline progressively widens (1px → 1.5px)
- Clearer typographic hierarchy

---

### Key Learnings

1. **`object-fit: cover` + `object-position`** are essential for background-style images using `<img>` tags

   - Better for accessibility (alt text) than CSS backgrounds
   - More control than `background-size: cover`

2. **Match container and content dimensions** on small screens to avoid gaps

   - Use identical `clamp()` values initially
   - Switch to `height: 100%` at breakpoints where container grows

3. **Override layout primitive defaults when needed**

   - `.container` adds `margin-inline: auto` (centering)
   - Override with `margin-inline: 0` for left-aligned content
   - Document overrides with comments

4. **Flexbox for positioning, avoid absolute positioning**

   - `justify-content` controls vertical position (flex-end/flex-start)
   - `align-items` controls horizontal position (flex-start for left)
   - Cleaner than absolute positioning, easier to maintain

5. **Progressive breakpoints create smoother transitions**

   - Three-stage approach better than two-stage jump
   - 400px (sizing), 630px (position), 900px (refinement)
   - Match padding progression to layout changes

6. **Typography scaling requires careful ratio management**

   - Use consistent multipliers (e.g., 1.67:1 subtitle:tagline)
   - Test on smallest supported viewport (320px)
   - Adjust minimum values to prevent overwhelming small screens

7. **`.section-flush` utility class pattern**
   - Follows agents.md layout primitives strategy
   - Reusable for any full-bleed section
   - Declarative: HTML shows intent (no vertical padding)
   - Similar to `.section-tight`, `.section-compact` modifiers

### Implementation Status

- ✅ Hero image covers container at all breakpoints
- ✅ No empty space gaps on mobile
- ✅ Text positioned bottom-left (mobile) → upper-left (630px+) → top-left (900px+)
- ✅ Typography scales proportionally across all viewports
- ✅ Smooth three-stage transition with progressive padding
- ✅ Letter-spacing only on tagline (subtitle clean)
- ✅ Flexbox-based layout (no absolute positioning for text)
- ✅ Follows agents.md principles (semantic, maintainable, clear)

### Final Responsive Behavior

| Viewport Width | Hero Height | Image Coverage    | Content Position           | Subtitle Size | Tagline Size |
| -------------- | ----------- | ----------------- | -------------------------- | ------------- | ------------ |
| **< 400px**    | 200-300px   | Matches container | Bottom-left (1rem padding) | 20-32px       | 12-18px      |
| **400-629px**  | 300-500px   | Fills container   | Bottom-left (1rem padding) | 20-32px       | 12-18px      |
| **630-899px**  | 300-500px   | Fills container   | Upper-left (3rem padding)  | 20-32px       | 12-18px      |
| **900px+**     | 600-900px   | Fills container   | Top-left (4rem padding)    | 20-32px       | 12-18px      |

### References

- File: [`src/css/sections/hero.css`](../src/css/sections/hero.css)
- File: [`src/css/main.css`](../src/css/main.css) - `.section-flush` utility
- HTML: [`index.html`](../index.html) - Line 115 (hero section)
- Project rules: [`agents.md`](../agents.md) - Mobile-first, layout primitives, spacing strategy
- Related: Dealerships section uses similar full-bleed background pattern

---

## Car Gallery (Product Cards) System

### Overview

The car gallery displays vehicle cards in a responsive grid that transitions from 1 column (mobile) → 2 columns (tablet) → 4 columns (wide desktop). Each card uses CSS Grid for internal layout with square aspect ratio and tightly controlled spacing.

### Architecture

#### Gallery Container (`.gallery-grid`)

```css
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: var(--spacing-flow); /* 1rem between cards */
}
```

**Purpose:**

- Controls card layout across viewport sizes
- Provides spacing between cards (not within cards)
- Mobile-first: starts with single column

**Responsive behavior:**

- **< 530px:** 1 column
- **530px+:** 2 columns (`repeat(2, 1fr)`)
- **1200px+:** 4 columns (`repeat(4, 1fr)`) + removes `.container` max-width for full-width display

---

#### Product Card (`.product-card`)

```css
.product-card {
  aspect-ratio: 1 / 1; /* Square cards */
  display: grid;
  grid-template-rows: auto auto minmax(0, clamp(12rem, 40vw, 16rem)) auto;
  row-gap: 0.2rem; /* 3.2px - Tight spacing */
  min-height: 0; /* Allows grid children to shrink */
  min-width: 280px; /* Prevents cards from becoming too small */
  padding: var(--spacing-flow); /* Internal padding */
}
```

**Key Design Decisions:**

1. **Square aspect ratio (`1/1`)**

   - Consistent card dimensions
   - Works well in multi-column grids
   - Maintains visual harmony

2. **Grid template rows breakdown:**

   - Row 1: `auto` - Card title (e.g., "Electric")
   - Row 2: `auto` - Card subtitle (e.g., "Mercedes E450 Cabriolet")
   - Row 3: `minmax(0, clamp(12rem, 40vw, 16rem))` - Car image (flexible, responsive)
   - Row 4: `auto` - Card footer (button + color dots)

3. **Image row uses `minmax(0, clamp())`:**

   - `minmax(0, ...)` - Allows row to shrink below content size if needed
   - `clamp(12rem, 40vw, 16rem)` - Image height scales: 192px min → 40% viewport → 256px max
   - Responsive without media queries

4. **Tight row-gap (0.2rem / 3.2px):**

   - Reduced from default `var(--spacing-flow)` (1rem)
   - Brings title and subtitle closer together
   - Still uses `gap` (follows agents.md layout primitive strategy)
   - Better visual hierarchy

5. **`min-height: 0` on container:**

   - Critical for grid children to respect `minmax(0, ...)`
   - Without this, children can't shrink below their content size
   - Prevents grid blowout

6. **`min-width: 280px`:**
   - Prevents cards from becoming unreadable on very small screens
   - Ensures button text doesn't wrap awkwardly
   - Works with body `min-width: 320px` to enable horizontal scroll if needed

---

#### Card Image (`.product-card .card-media`)

```css
.product-card .card-media {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Show entire car, no cropping */
  display: block;
  object-position: center 60%; /* Slightly lower than center */
  min-height: 0; /* Key: lets image shrink instead of forcing track */
}
```

**Why `object-fit: contain`:**

- Shows entire car (no cropping)
- Maintains car's aspect ratio
- Better than `cover` for product photography

**Why `object-position: center 60%`:**

- Centers horizontally
- Positions slightly below vertical center (60% from top)
- Gives more "breathing room" above car
- Prevents cars from feeling "floating"

**Why `min-height: 0`:**

- Allows image to shrink below natural dimensions
- Works with parent's `minmax(0, ...)` to create flexible sizing
- Without this, image would force grid track to expand

---

#### Card Footer (`.product-card .card-footer`)

```css
.product-card .card-footer {
  display: flex;
  justify-content: center; /* Mobile: center button */
  align-items: center;
  gap: var(--spacing-flow);
}
```

**Responsive behavior:**

- **Mobile (< 620px):**
  - Button centered
  - Color dots hidden (`display: none`)
- **Desktop (620px+):**
  - `justify-content: space-between` (button left, dots right)
  - Color dots visible in flex row with 0.75rem gap

---

#### Color Dots System

**Base styles (utility classes):**

```css
.gray {
  background-color: #c5c5c5;
}
.red {
  background-color: #b20000;
}
.blue {
  background-color: #0010a1;
}
/* etc... */
```

**Dot component:**

```css
.color-dot {
  width: 1.65rem; /* 26.4px */
  aspect-ratio: 1 / 1; /* Perfect circle */
  border-radius: 50%;
  border: 2px solid var(--color-text-inverse); /* White border */
  display: inline-block;
}
```

**Pattern:**

- Color classes are **utility classes** (reusable)
- Applied to `.color-dot` elements: `<span class="color-dot gray"></span>`
- Hidden on mobile, shown on 620px+

---

### Responsive Breakpoints Summary

| Breakpoint     | Gallery Grid           | Card Text | Color Dots             |
| -------------- | ---------------------- | --------- | ---------------------- |
| **< 530px**    | 1 column               | Center    | Hidden                 |
| **530-619px**  | 2 columns              | Center    | Hidden                 |
| **620-899px**  | 2 columns              | Center    | Visible, space-between |
| **900-1199px** | 2 columns              | Left      | Visible, space-between |
| **1200px+**    | 4 columns (full-width) | Left      | Visible, space-between |

### Key Technical Patterns

1. **Nested Grid:**

   - `.gallery-grid` (outer grid) - Controls card layout
   - `.product-card` (inner grid) - Controls card internal structure
   - Clean separation of concerns

2. **Aspect ratio + Grid tracks:**

   - Aspect ratio enforces square cards
   - Grid rows control internal proportions
   - Image track is flexible, text tracks are auto

3. **`minmax(0, clamp())` Pattern:**

   - Allows content to shrink below natural size
   - Provides min/preferred/max sizing in one declaration
   - Responsive without media queries

4. **`min-height: 0` Critical Rule:**

   - Required on both `.product-card` AND `.card-media`
   - Allows grid children to shrink
   - Without it, grid won't respect `minmax(0, ...)`

5. **Progressive disclosure:**
   - Color dots hidden on mobile (reduce visual clutter)
   - Revealed on larger screens when space allows
   - Footer layout shifts from centered to space-between

### Common Pitfalls & Solutions

#### Issue: Cards Not Shrinking on Small Screens

**Symptom:** Images overflow or cards become too large on mobile

**Cause:** Missing `min-height: 0` on grid containers

**Solution:**

```css
.product-card {
  min-height: 0; /* On parent grid */
}

.product-card .card-media {
  min-height: 0; /* On image child */
}
```

#### Issue: Title and Subtitle Too Far Apart

**Symptom:** Large gap between "Electric" and "Mercedes E450"

**Cause:** Default `row-gap: var(--spacing-flow)` (1rem) too large

**Solution:**

```css
.product-card {
  row-gap: 0.2rem; /* Reduced from 1rem */
}
```

**Why not remove gap entirely:**

- Violates agents.md (should use `gap` for layout spacing)
- Fragile (breaks if typography changes)
- Not explicit (unclear if omission is intentional)

#### Issue: Cards Becoming Unreadably Small

**Symptom:** On very small screens, text wraps, images tiny

**Cause:** No minimum card width

**Solution:**

```css
.product-card {
  min-width: 280px; /* Prevents shrinking below readable size */
}

body {
  min-width: 320px; /* Page-level minimum */
}
```

**Effect:** Below 320px viewport, horizontal scroll appears (graceful degradation)

### Implementation Status

- ✅ Responsive 1-2-4 column layout
- ✅ Square cards with aspect-ratio
- ✅ Flexible image sizing with clamp()
- ✅ Tight title/subtitle spacing (0.2rem)
- ✅ Progressive color dot visibility
- ✅ Minimum width constraints (280px cards, 320px body)
- ✅ Mobile-first approach
- ✅ Follows agents.md spacing strategy (uses gap, not margins)
- ✅ Clean separation of layout vs content concerns

### References

- File: [`src/css/sections/gallery.css`](../src/css/sections/gallery.css)
- HTML: [`index.html`](../index.html) - Car gallery section
- File: [`src/css/components/cards.css`](../src/css/components/cards.css) - Base card styles
- File: [`src/css/components/buttons.css`](../src/css/components/buttons.css) - CTA buttons
- Project rules: [`agents.md`](../agents.md) - Layout primitives, spacing strategy, no BEM
- Related: Features section uses similar card pattern with horizontal scroll
