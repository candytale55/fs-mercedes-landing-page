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
