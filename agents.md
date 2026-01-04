# agents.md — Project Rules (Mercedes-Benz Landing Page)

This document defines the working rules and quality standards for this project.
Its purpose is to keep the implementation **clean, consistent, accessible, and aligned with the course requirements**.

This is a **static HTML/CSS project** (no framework, no bundler).

---

## 1. Scope & Constraints

- Stack: **HTML + CSS + minimal JavaScript**
- No frameworks, no preprocessors, no Vite
- JavaScript is allowed **only** for UI behavior (e.g. mobile navigation)
- Final HTML **must pass W3C validation**
- Project must be **fully responsive**

---

## 2. File Structure Rules

- CSS is split by responsibility:
  - `variables.css` → design tokens only
  - `main.css` → reset, base styles, layout primitives
  - `utilities.css` → small helpers (e.g. `.sr-only`)
  - `components/*.css` → reusable UI components (cards, buttons, nav)
  - `sections/*.css` → section-specific styles only
- No inline styles
- No unused CSS files

---

## 3. Naming Strategy (NO BEM)

BEM is intentionally **not used**.

### Principles

- **Semantic names** for sections and components
- **Functional names** for layout and utilities
- Multiple classes per element are expected

### Examples

- Sections: `.hero`, `.car-gallery`, `.features`, `.dealerships`
- Layout: `.section`, `.container`, `.gutter`, `.stack`
- Components: `.card`, `.btn`, `.link`
- State: `.is-open`, `.is-active`

No class names should encode hierarchy (e.g. no `block__element--modifier`).

---

## 4. Spacing Strategy (Mandatory)

Spacing is handled via **layout primitives + CSS variables**, not ad-hoc margins.

### Layout primitives

- `.section` → vertical spacing between major regions
- `.container` → max-width + centering
- `.gutter` → horizontal padding (edge protection)
- `.stack` → vertical spacing between flow content (headings, paragraphs)

### Rules

- `.stack` is **never** used on `body`, `main`, or layout containers
- Layout spacing uses `gap`, not margins
- Section spacing is controlled only by `.section`

---

## 5. Responsive Strategy

- Mobile-first (baseline ~390px)
- Breakpoints are **layout-based**, not device-based
- Components may have their own breakpoints if needed

### Approved patterns

- Car gallery: 1 column → 2 columns (never more)
- Features: stacked on mobile → horizontal scroll on desktop
- Footer & dealer section: stacked on mobile → split layout on desktop

---

## 6. Cards Strategy

- All cards share a base `.card` class (surface, padding, radius)
- Layout is controlled by the parent (grid or scroll track)
- Cards inside a grid must have **equal height within a row**
- Aspect ratio is enforced with `aspect-ratio`, not fixed heights
- Variants are allowed via additional classes (e.g. `.product-card`, `.feature-card`)

---

## 7. Anchor & Button Rules

- `<a>` → navigation only
- `<button>` → actions / UI state changes
- Visual style does not change semantic role

### Classes

- `.btn` → CTA-style links or buttons
- `.link` → standard navigation links
- Footer uses `.link` only (no buttons)

No `href="#"` in final delivery.

---

## 8. Accessibility Rules (Required)

- One `<h1>` per page (may be visually hidden)
- Every `<section>` must have an accessible name
  - visible heading OR `.sr-only` heading
- Navigation toggles must be `<button>` with:
  - `aria-expanded`
  - `aria-controls`
- All images require meaningful `alt` text
- Icon-only links require `alt` or `aria-label`

---

## 9. SEO & Validation

- `<meta name="description">` is required
- Semantic landmarks must be used (`header`, `nav`, `main`, `section`, `footer`)
- HTML must pass https://validator.w3.org without errors

---

## 10. Development Discipline

- No placeholder styles in final build (e.g. debug borders)
- No commented-out broken HTML
- No unused variables or classes
- Readability > cleverness

---

## 11. Documentation

- `/docs/structure.md` → Emmet-like DOM structure
- `/docs/design-decisions.md` → short explanation of key choices
- `/docs/notes-for-review.md` → notes for the teacher / reviewer
- `/docs/shots/` → screenshots (validator, responsive views)

---

## 12. Guiding Principle

> Prefer clarity, semantics, and consistency over abstraction.

If a rule conflicts with accessibility, validation, or course requirements,
**the rule must be changed**.
