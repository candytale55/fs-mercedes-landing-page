# Project Structure Documentation

## Purpose

This document provides a complete structural blueprint of the Mercedes-Benz landing page using Emmet-like notation. It serves as:

1. **Reference Guide** — Quick lookup for HTML structure, class names, and element relationships
2. **Recreation Tool** — Can be used to rebuild the project structure from scratch
3. **Onboarding Resource** — Helps understand the page architecture

**How to read this document:**
- Elements are shown in hierarchical tree format
- Classes are prefixed with `.` (e.g., `.hero`, `.container`)
- IDs are prefixed with `#` (e.g., `#electric`, `#newsletter`)
- Attributes are shown in brackets (e.g., `[href="#electric"]`, `[aria-label="..."]`)
- Text content is shown in quotes (e.g., `"Electric"`)
- External links are indicated as `[href="External link"]` for simplicity

---

## Directory Layout

```
/
├─ index.html
├─ README.md
├─ agents.md
├─ docs/
│  ├─ notes-for-reviewer.md
│  ├─ emmet-structure.md
│  ├─ my_notes.md
│  ├─ structure.md
│  └─ shots/
├─ src/
│  ├─ images/
│  ├─ js/
│  │  └─ main.js
│  └─ css/
│     ├─ variables.css
│     ├─ main.css
│     ├─ utilities.css
│     ├─ components/
│     │  ├─ buttons.css
│     │  ├─ cards.css
│     │  ├─ nav.css
│     │  ├─ forms.css
│     │  └─ modal.css
│     └─ sections/
│        ├─ hero.css
│        ├─ gallery.css
│        ├─ dealerships.css
│        ├─ features.css
│        ├─ maybach.css
│        ├─ appointment.css
│        └─ footer.css
```

---

## Header Structure

```md
header.header
└─ div.container.gutter.header-layout
   ├─ nav.main-nav[aria-label="Primary navigation"]
   │  ├─ a.logo-link[href="#primary-menu"][aria-label="Mercedes-Benz home"]
   │  │  └─ img.logo
   │  │     ├─ src="./src/images/icon-mercedes.svg"
   │  │     └─ alt="Mercedes-Benz three-pointed star logo"
   │  └─ ul#primary-menu.main-nav-list
   │     ├─ li
   │     │  └─ button.nav-close.btn-icon
   │     │     ├─ type="button"
   │     │     ├─ aria-label="Close menu"
   │     │     └─ span[aria-hidden="true"] "×"
   │     ├─ li
   │     │  └─ a.nav-link[href="#electric"] "Electric"
   │     ├─ li
   │     │  └─ a.nav-link[href="#maybach"] "Maybach"
   │     ├─ li
   │     │  └─ a.nav-link[href="#accessories"] "Accessories"
   │     └─ li
   │        └─ a.nav-link[href="#dealerships"] "Stores"
   └─ nav.secondary-nav[aria-label="Account and shopping"]
      └─ ul.secondary-nav-list
         ├─ li
         │  └─ a.icon-link[href="#primary-menu"][aria-label="Access your account"]
         │     └─ img.icon
         │        ├─ src="./src/images/user-icon.png"
         │        └─ alt="User account"
         ├─ li
         │  └─ a.icon-link[href="#primary-menu"][aria-label="View shopping bag"]
         │     └─ img.icon
         │        ├─ src="./src/images/shopping-bag-icon.png"
         │        └─ alt="Shopping bag"
         └─ li
            └─ button.nav-toggle.btn-icon
               ├─ type="button"
               ├─ aria-label="Open menu"
               ├─ aria-expanded="false"
               ├─ aria-controls="primary-menu"
               └─ text "☰"
```

## Hero Section

```md
section.section.section-flush.hero[aria-label="Hero"]
├─ img.hero-img
│ ├─ src="./src/images/mercedes-benz-coupe-hero.jpeg"
│ └─ alt="Mercedes-Benz coupe in motion, front-side view."
└─ div.container.hero-content.gutter
├─ h2.section-title.hero-subtitle "New Mercedes CLS"
└─ p.hero-tagline "The power in your hands"
```

## Car Gallery Section

```md
section#electric.section.car-gallery
└─ div.container.gutter
   ├─ h2.sr-only "Vehicle gallery"
   └─ div.card-grid.gallery-grid
      ├─ article.card.product-card
      │  ├─ h3.card-title "Electric"
      │  ├─ p.card-subtitle "Mercedes E450 Cabriolet"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-silver-convertible.png"
      │  │  └─ alt="Mercedes-Benz convertible in silver, front-side view."
      │  └─ div.card-footer
      │     ├─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
      │     └─ div.color-dots
      │        ├─ span.color-dot.gray[aria-label="Gray color option"]
      │        ├─ span.color-dot.red[aria-label="Red color option"]
      │        ├─ span.color-dot.blue[aria-label="Blue color option"]
      │        └─ span.color-dot.black[aria-label="Black color option"]
      ├─ article.card.product-card
      │  ├─ h3.card-title "Hybrid"
      │  ├─ p.card-subtitle "Mercedes GLC SUV"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-black-suv.png"
      │  │  └─ alt="Black Mercedes-Benz SUV, front-side view."
      │  └─ div.card-footer
      │     ├─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
      │     └─ div.color-dots
      │        ├─ span.color-dot.black[aria-label="Black color option"]
      │        ├─ span.color-dot.yellow[aria-label="Yellow color option"]
      │        └─ span.color-dot.red[aria-label="Red color option"]
      ├─ article.card.product-card
      │  ├─ h3.card-title "Hybrid"
      │  ├─ p.card-subtitle "Mercedes-Benz G-Class"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-black-offroad-suv.png"
      │  │  └─ alt="Black Mercedes-Benz off-road SUV, front-side view."
      │  └─ div.card-footer
      │     ├─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
      │     └─ div.color-dots
      │        ├─ span.color-dot.black[aria-label="Black color option"]
      │        ├─ span.color-dot.slate-blue[aria-label="Slate blue color option"]
      │        └─ span.color-dot.muted-red[aria-label="Muted red color option"]
      └─ article.card.product-card
         ├─ h3.card-title "Electric"
         ├─ p.card-subtitle "Mercedes GLC SUV"
         ├─ img.card-media
         │  ├─ src="./src/images/mercedes-benz-silver-sports-coupe.png"
         │  └─ alt="Silver Mercedes-Benz sports coupe, front-side view."
         └─ div.card-footer
            ├─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
            └─ div.color-dots
               ├─ span.color-dot.black[aria-label="Black color option"]
               ├─ span.color-dot.yellow[aria-label="Yellow color option"]
               └─ span.color-dot.red[aria-label="Red color option"]
```

---

## Dealerships Section

```md
section#dealerships.section.section-compact.dealerships
├─ div.container.gutter.stack.dealer-intro
│  ├─ h2.section-title
│  │  └─ span "Find your nearest Mercedes dealer"
│  └─ p
│     ├─ span "Browse over 1000 dealers worldwide, and "
│     └─ span "find the one that best suits your situation."
└─ div.dealer-map.gutter
   └─ div.container
      └─ div.dealer-card.stack
         ├─ h3.dealer-title
         │  ├─ span "Discover your "
         │  ├─ span "local Mercedes "
         │  └─ span "partner store "
         └─ a.btn.btn-wide[href="External link"][target="_blank"][rel="noopener noreferrer"] "Find a partner store near you"
```

---

## Features Section

```md
section#accessories.section.features
└─ div.container.gutter
   ├─ h2.sr-only "Features"
   └─ div.features-track.h-scroll
      ├─ article.card.feature-card.stack
      │  ├─ h3.card-title "Comfort"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-interior-comfort.jpg"
      │  │  └─ alt="Luxurious Mercedes-Benz interior with wide digital display and ambient lighting, showcasing comfort features."
      │  └─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
      ├─ article.card.feature-card.stack
      │  ├─ h3.card-title "Technology"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-led-headlight-technology.png"
      │  │  └─ alt="Close-up of a Mercedes-Benz LED headlight with modern lighting technology."
      │  └─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
      └─ article.card.feature-card.stack
         ├─ h3.card-title "Accessories"
         ├─ img.card-media
         │  ├─ src="./src/images/mercedes-benz-rear-seat-accessories.jpg"
         │  └─ alt="Mercedes-Benz rear seat entertainment system with tablet holder mounted on beige leather headrest, displaying luxury in-car accessories"
         └─ a.btn[href="External link"][target="_blank"][rel="noopener noreferrer"] "More Info"
```

---

## Maybach Red Section

```md
section#maybach.section.maybach-red
├─ img.hero-image
│  ├─ src="./src/images/mercedes-maybach-red-luxury-sedan.png"
│  └─ alt="Metallic red Mercedes-Maybach S-Class luxury sedan parked on modern white terrace overlooking ocean at sunset, rear three-quarter view showcasing elegant proportions and chrome details"
└─ div.container.gutter.stack
   ├─ h2.section-title "Red as tentation"
   └─ p "Good design is what drives us, and we're proud to share that Mercedes-Maybach has already won the prestigious Best Design Award 2023, as judged by the world's best product designers."
```

---

## Maybach Wheels Section

```md
section.section.maybach-wheels
└─ div.container.gutter
   └─ div.split-layout
      ├─ h2.section-title [grid-area: title]
      │  ├─ span "The Mercedes-Maybach "
      │  └─ span "wheel programme"
      ├─ img.card-media [grid-area: image]
      │  ├─ src="./src/images/maybach-multispoke-wheel.png"
      │  └─ alt="Close-up of Mercedes-Maybach 21-inch forged multi-spoke wheel with intricate silver spokes, chrome center cap with three-pointed star, and low-profile tire"
      └─ div.maybach-content.stack [grid-area: content]
         ├─ p "The exclusive Mercedes-Maybach wheel programme, e.g. with optional 53.3 cm (21\") Maybach forged wheels in multi-spoke design."
         └─ a.btn.btn-dark.uppercase[href="External link"][target="_blank"][rel="noopener noreferrer"] "Learn More"
```

**Note:** Uses CSS Grid with template areas for responsive layout:
- Mobile: Title → Image → Content (stacked)
- Desktop: (Title + Content) | Image (2 columns)

---

## Appointment Only Section

```md
section.section.section-tight.appointment
└─ div.container.gutter
   └─ div.split-layout
      ├─ div.appointment-content.stack
      │  ├─ h2.sr-only "Appointment only"
      │  └─ p "Ready to own the car of your dreams? Mercedes-Maybach are now available at our dealers by appointment only."
      └─ a.btn.uppercase[href="External link"][target="_blank"][rel="noopener noreferrer"] "Contact Now"
```

**Note:** Uses flexbox on mobile (centered), grid on desktop (content | button).

---

## Newsletter Sign-up

```md
section.section.newsletter-signup#newsletter[aria-labelledby="newsletter-title"]
└─ div.container.gutter.stack
   ├─ p.newsletter-kicker "Join the Power"
   ├─ h2.section-title#newsletter-title "Sign up for our newsletter"
   └─ form.newsletter-form#newsletter-form
      ├─ div.form-group
      │  └─ div.newsletter-sign-up-pill
      │     ├─ label.sr-only[for="newsletter-email"] "Email address"
      │     ├─ input#newsletter-email
      │     │  ├─ name="email"
      │     │  ├─ type="email"
      │     │  ├─ autocomplete="email"
      │     │  ├─ placeholder="you@example.com"
      │     │  └─ required
      │     └─ button.btn[type="submit"] "Subscribe"
      └─ div.form-check
         ├─ input#newsletter-consent
         │  ├─ name="consent"
         │  ├─ type="checkbox"
         │  └─ required
         └─ label[for="newsletter-consent"]
            └─ text "By signing up, I agree to the " + a.link[href="#newsletter"] "privacy policy" + "."
```

**Note:** The `newsletter-sign-up-pill` wrapper creates a unified pill design combining input + button.

---

## Newsletter Success Modal

```md
div.modal-overlay#newsletter-modal
├─ role="dialog"
├─ aria-modal="true"
├─ aria-hidden="true"
├─ aria-labelledby="newsletter-modal-title"
├─ aria-describedby="newsletter-modal-desc"
└─ div.modal-card.stack[tabindex="-1"]
   ├─ button.btn-icon.modal-close
   │  ├─ type="button"
   │  ├─ aria-label="Close dialog"
   │  └─ span[aria-hidden="true"] "×"
   ├─ h2.section-title#newsletter-modal-title "Check your inbox"
   ├─ p#newsletter-modal-desc "Please confirm your subscription using the link we sent you."
   └─ button.btn.btn-dark.modal-ok[type="button"] "OK"
```

**Note:** Modal visibility controlled by `.is-visible` class via JavaScript.

---

## Footer

```md
footer.footer
└─ div.container.gutter
   ├─ div.social
   │  └─ ul.social-list[aria-label="Social media"]
   │     ├─ li
   │     │  └─ a.icon-link[href="#social-list"][aria-label="Visit our Facebook page"]
   │     │     └─ img.icon
   │     │        ├─ src="./src/images/icon-facebook.svg"
   │     │        └─ alt="Facebook"
   │     ├─ li
   │     │  └─ a.icon-link[href="#social-list"][aria-label="Follow us on Instagram"]
   │     │     └─ img.icon
   │     │        ├─ src="./src/images/icon-instagram.svg"
   │     │        └─ alt="Instagram"
   │     ├─ li
   │     │  └─ a.icon-link[href="#social-list"][aria-label="Watch our videos on YouTube"]
   │     │     └─ img.icon
   │     │        ├─ src="./src/images/icon-youtube.svg"
   │     │        └─ alt="YouTube"
   │     ├─ li
   │     │  └─ a.icon-link[href="#social-list"][aria-label="Connect with us on LinkedIn"]
   │     │     └─ img.icon
   │     │        ├─ src="./src/images/icon-linkedin.svg"
   │     │        └─ alt="LinkedIn"
   │     └─ li
   │        └─ a.icon-link[href="#social-list"][aria-label="Follow us on TikTok"]
   │           └─ img.icon
   │              ├─ src="./src/images/icon-tiktok.svg"
   │              └─ alt="TikTok"
   └─ div.section.footer-nav-grid#footer-nav-grid
      ├─ nav.footer-nav[aria-label="Explorer"]
      │  ├─ h3.footer-title "Explorer"
      │  └─ ul
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Electric Bikes"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "City Bikes"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Kids' Bikes"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Accessories"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Outlet"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Business"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Insurance Electric"
      │     └─ li └─ a.link[href="#footer-nav-grid"] "Size Guide"
      ├─ nav.footer-nav[aria-label="About"]
      │  ├─ h3.footer-title "About"
      │  └─ ul
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "About Us"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Journal"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Reviews"
      │     ├─ li └─ a.link[href="#footer-nav-grid"] "Press"
      │     └─ li └─ a.link[href="#footer-nav-grid"] "Jobs"
      └─ nav.footer-nav[aria-label="Help"]
         ├─ h3.footer-title "Help"
         └─ ul
            ├─ li └─ a.link[href="#footer-nav-grid"] "Contact"
            ├─ li └─ a.link[href="#footer-nav-grid"] "FAQ"
            ├─ li └─ a.link[href="#footer-nav-grid"] "Delivery"
            ├─ li └─ a.link[href="#footer-nav-grid"] "Assembly & manuals"
            ├─ li └─ a.link[href="#footer-nav-grid"] "Payment options"
            ├─ li └─ a.link[href="#footer-nav-grid"] "Privacy policy"
            └─ li └─ a.link[href="#footer-nav-grid"] "Terms & conditions"
```

---

## End of Structure Documentation
