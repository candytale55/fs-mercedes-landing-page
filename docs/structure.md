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