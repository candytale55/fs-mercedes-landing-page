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
