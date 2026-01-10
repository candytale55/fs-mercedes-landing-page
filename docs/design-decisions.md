# Design Decisions

## Overview

This document tracks key design decisions made during the development of the Mercedes-Benz landing page.

## Decisions

### CSS Architecture

- Modular CSS structure with separate files for components and sections
- Variables for consistent theming
- Utility classes for common patterns

### Layout

#### Separation of Concerns: Layout Primitives vs Content Structure

**Decision:** Use nested wrapper elements to separate layout responsibilities instead of combining multiple layout classes on a single element.

**Pattern:**

```html
<div class="container gutter">
  <!-- Width + padding -->
  <div class="split-layout">
    <!-- Grid/flex structure -->
    <!-- content -->
  </div>
</div>
```

**Why This Approach:**

1. **Single Responsibility Principle**

   - `.container` → Controls max-width and horizontal centering
   - `.gutter` → Adds horizontal padding for edge protection
   - `.split-layout` → Manages internal content arrangement (grid/flexbox)

2. **Prevents "Mega-Class" Elements**

   - Combining layout classes on one element (e.g., `class="container gutter split-layout"`) creates conflicting responsibilities
   - Padding from `.gutter` would interfere with grid calculations in `.split-layout`
   - Makes it unclear which class controls which aspect of layout

3. **Reusability & Flexibility**

   - `.split-layout` can be used in any container (narrow sections, modals, etc.)
   - Not tied to `.container` constraints
   - Easy to modify one aspect without affecting others

4. **Follows agents.md Principles**
   - "Multiple classes per element are expected" refers to combining complementary classes (like `container gutter`), not mixing concerns
   - Layout primitives system: each primitive has one clear job
   - Maintains clear hierarchy in CSS cascade

**Applied in:**

- Maybach Wheels section (mobile: vertical stack, desktop: 2-column grid)
- Appointment section (mobile: centered stack, desktop: content + button layout)

---

#### Button Centering Strategy

**Decision:** Use a consistent, parent-driven approach for centering buttons, with `width: fit-content` applied globally to prevent buttons from expanding.

**Base Rule (buttons.css):**

```css
.btn {
  display: inline-block;
  width: fit-content; /* Buttons only as wide as their content */
}
```

**Centering by Parent Layout:**

1. **Flexbox Parents** → Use `align-items: center` on parent

   ```css
   .parent {
     display: flex;
     flex-direction: column;
     align-items: center; /* Centers all children including buttons */
   }
   ```

   - Used in: Newsletter form, Maybach content, Appointment (mobile)

2. **Grid Parents** → Use `justify-self: center` on button OR smart column sizing

   ```css
   /* Option A: Explicit centering */
   .card .btn {
     justify-self: center;
   }

   /* Option B: Auto-sized column */
   .layout {
     grid-template-columns: 1fr auto; /* Button column stays compact */
   }
   ```

   - Used in: Gallery cards, Feature cards, Appointment (desktop)

3. **Block/Flow Parents (Fallback)** → Use `display: block + margin-inline: auto`
   - Only when parent isn't flex or grid
   - Avoid when possible (prefer modern layout methods)

**Why This Approach:**

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

**Previous Issues (Now Fixed):**

- ❌ Mixed strategies: Some buttons used `display: block + margin-inline: auto`, others used `align-self: center`
- ❌ Missing `width: fit-content` in base, causing buttons to expand full-width in flex/grid
- ❌ Redundant centering rules in media queries

**Current Implementation:**

- ✅ All buttons inherit `width: fit-content` from base class
- ✅ Centering controlled by parent's layout system (flex/grid)
- ✅ Section-specific CSS only adjusts parent layout, not button properties

---

#### Responsive Design

- Mobile-first methodology
- Breakpoints driven by content needs, not device sizes
