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

## Dealerships

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

