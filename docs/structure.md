# Project Structure

## Directory Layout

```
/
├─ index.html
├─ README.md
├─ agents.md
├─ docs/
│  ├─ notes-for-review.md
│  ├─ design-decisions.md
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
│     │  └─ forms.css
│     └─ sections/
│        ├─ hero.css
│        ├─ gallery.css
│        ├─ dealerships.css
│        ├─ features.css
│        ├─ maybach.css
│        ├─ appointment.css
│        └─ footer.css
```

## Header Structure

```md
header.header
└─ div.container.gutter.header-layout
   ├─ nav.main-nav[aria-label="Primary navigation"]
   │  ├─ a.logo-link[href="#"]
   │  │  └─ img.logo
   │  │     ├─ src="./src/images/icon-mercedes.svg"
   │  │     └─ alt="Mercedes-Benz logo"
   │  ├─ button.nav-toggle.btn-icon
   │  │  ├─ type="button"
   │  │  ├─ aria-label="Open menu"
   │  │  ├─ aria-expanded="false"
   │  │  └─ aria-controls="primary-menu"
   │  │     └─ img.icon
   │  │        ├─ src="./src/images/burger-menu-icon.svg"
   │  │        └─ alt="Open menu"
   │  └─ ul#primary-menu.main-nav-list
   │     ├─ li
   │     │  └─ button.nav-close.btn-icon
   │     │     ├─ type="button"
   │     │     └─ aria-label="Close menu"
   │     ├─ li
   │     │  └─ a.nav-link[href="#"] "Electric"
   │     ├─ li
   │     │  └─ a.nav-link[href="#"] "Maybach"
   │     ├─ li
   │     │  └─ a.nav-link[href="#"] "Accessories"
   │     └─ li
   │        └─ a.nav-link[href="#"] "Stories"
   └─ nav.secondary-nav[aria-label="Account and shopping"]
      └─ ul.secondary-nav-list
         ├─ li
         │  └─ a.icon-link[href="#"]
         │     └─ img.icon
         │        ├─ src="./src/images/user-icon.png"
         │        └─ alt="User account"
         └─ li
            └─ a.icon-link[href="#"]
               └─ img.icon
                  ├─ src="./src/images/shopping-bag-icon.png"
                  └─ alt="Shopping bag"
```

## Main 
<!-- TODO: Add Structure once all sections are built -->

## Hero Section

```md
section.section.section-flush.hero[aria-label="Hero"]
└─ div.container.gutter.stack
   ├─ h2.subtitle.hero-title "New Mercedes CLS"
   └─ p.hero-tagline "The power in your hands"
```

## Car Gallery Section

```md
section.section.car-gallery
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
      │     ├─ a.btn[href="#"] "More Info"
      │     └─ div.color-dots[aria-label="Available colors"]
      │        ├─ span.color-dot.gray
      │        ├─ span.color-dot.red
      │        ├─ span.color-dot.blue
      │        └─ span.color-dot.black
      ├─ article.card.product-card
      │  ├─ h3.card-title "Hybrid"
      │  ├─ p.card-subtitle "Mercedes GLC SUV"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-black-suv.png"
      │  │  └─ alt="Black Mercedes-Benz SUV, front-side view."
      │  └─ div.card-footer
      │     ├─ a.btn[href="#"] "More Info"
      │     └─ div.color-dots[aria-label="Available colors"]
      │        ├─ span.color-dot.black
      │        ├─ span.color-dot.yellow
      │        └─ span.color-dot.red
      ├─ article.card.product-card
      │  ├─ h3.card-title "Hybrid"
      │  ├─ p.card-subtitle "Mercedes-Benz G-Class"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-black-offroad-suv.png"
      │  │  └─ alt="Black Mercedes-Benz off-road SUV, front-side view."
      │  └─ div.card-footer
      │     ├─ a.btn[href="#"] "More Info"
      │     └─ div.color-dots[aria-label="Available colors"]
      │        ├─ span.color-dot.black
      │        ├─ span.color-dot.slate-blue
      │        └─ span.color-dot.muted-red
      └─ article.card.product-card
         ├─ h3.card-title "Electric"
         ├─ p.card-subtitle "Mercedes GLC SUV"
         ├─ img.card-media
         │  ├─ src="./src/images/mercedes-benz-silver-sports-coupe.png"
         │  └─ alt="Silver Mercedes-Benz sports coupe, front-side view."
         └─ div.card-footer
            ├─ a.btn[href="#"] "More Info"
            └─ div.color-dots[aria-label="Available colors"]
               ├─ span.color-dot.black
               ├─ span.color-dot.yellow
               └─ span.color-dot.red
```

## Dealerships Section

```md
section.section.dealerships
├─ div.container.gutter.stack
│  ├─ h2.subtitle "Find your nearest Mercedes dealer"
│  └─ p "Browse over 1000 dealers worldwide, and find the one that best suits your situation."
└─ div.dealer-map[aria-label="Dealer locator map"]
   └─ div.container.gutter
      └─ div.dealer-card.card.stack
         ├─ h3.dealer-title "Discover your local Mercedes partner store"
         └─ a.btn.btn-wide[href="#"] "Find a partner store near you"
```

## Features Section

```md
section.section.features
└─ div.container.gutter
   ├─ h2.sr-only "Features"
   └─ div.features-track.h-scroll
      ├─ article.card.feature-card.stack
      │  ├─ h3.card-title "Comfort"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-interior-comfort.jpg"
      │  │  └─ alt="Luxurious Mercedes-Benz interior with wide digital display and ambient lighting, showcasing comfort features."
      │  └─ a.btn[href="#"] "More Info"
      ├─ article.card.feature-card.stack
      │  ├─ h3.card-title "Technology"
      │  ├─ img.card-media
      │  │  ├─ src="./src/images/mercedes-benz-led-headlight-technology.png"
      │  │  └─ alt="Close-up of a Mercedes-Benz LED headlight with modern lighting technology."
      │  └─ a.btn[href="#"] "More Info"
      └─ article.card.feature-card.stack
         ├─ h3.card-title "Accessories"
         ├─ img.card-media
         │  ├─ src="./src/images/mercedes-benz-rear-seat-accessories.jpg"
         │  └─ alt="Rear-seat tablet holder accessory mounted on a Mercedes-Benz headrest."
         └─ a.btn[href="#"] "More Info"
```

## Maybach Red Section

```md
section.section.maybach-red
├─ img.hero-image
│  ├─ src="./src/images/mercedes-maybach-red-luxury-sedan.png"
│  └─ alt="Red Mercedes-Benz Maybach luxury sedan parked near a modern seaside terrace, rear-side view."
└─ div.container.gutter.stack
   ├─ h2.subtitle "Red as tentation"
   └─ p "Good design is what drives us, and we're proud to share that Mercedes-Maybach has already won the prestigious Best Design Award 2023, as judged by the world's best product designers."
```

## Maybach Wheels Section

```md
section.section.maybach-wheels
└─ div.container.gutter.stack
   ├─ h2.subtitle "The Mercedes-Maybach wheel programme"
   ├─ img
   │  ├─ src="./src/images/maybach-multispoke-wheel.png"
   │  └─ alt="Close-up of a Mercedes-Maybach wheel with intricate multi-spoke rim design."
   ├─ p "The exclusive Mercedes-Maybach wheel programme, e.g. with optional 53.3 cm (21\") Maybach forged wheels in multi-spoke design."
   └─ a.btn.btn-dark.uppercase[href="#"] "Learn More"
```

## Appointment Only Section

```md
section.section.section-tight.appointment
└─ div.container.gutter.stack
   ├─ h2.sr-only "Appointment only"
   ├─ p "Ready to own the car of your dreams? Mercedes-Maybach are now available at our dealers by appointment only."
   └─ a.btn.uppercase[href="#"] "Contact Now"

```

## Newsletter Sign-up

<!-- TODO: Include the actual input tags needed -->

```md
section.section.newsletter-signup
└─ div.container.gutter.stack
   ├─ h2.subtitle "Sign up for our newsletter"
   └─ form.newsletter-form[aria-label="Newsletter sign-up"]
      ├─ div.form-group
      │   └─ !-- Placeholder for input and label elements --
      └─ button.btn.btn-submit[type="submit"] "Subscribe"
```