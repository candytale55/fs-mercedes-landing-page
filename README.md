# 🚗 Mercedes-Benz Landing Page

## Description

A fully responsive, static landing page showcasing Mercedes-Benz's premium vehicle lineup and brand experience. This project features an immersive hero section, interactive car gallery with multiple vehicle options and color variants, exclusive Maybach showcases, dealership locator with map integration, and a newsletter signup form. Built with semantic HTML5, modern CSS layout techniques (Grid/Flexbox), and minimal JavaScript for enhanced interactivity.

Developed as the first project for the **Máster Desarrollador Full Stack** program at [ThePower](https://thepowertech.es/rock-the-code) (2025-2026). The project emphasizes clean code architecture, accessibility standards (W3C validation), mobile-first responsive design, and maintainable CSS using a modular component-based structure with design tokens.

## Technologies

- **HTML5** — Semantic structure, accessibility attributes, W3C-validated markup
- **CSS3** — Mobile-first responsive design, CSS custom properties (design tokens), Grid/Flexbox layouts, scroll-snap API, clamp() for fluid typography
- **JavaScript (ES6+)** — Mobile navigation toggle, modal interactions, form handling
- **Google Fonts** — ABeeZee (body text), Abhaya Libre (headings)
- **Netlify** — Static site hosting and deployment

## Live Demo

Live demo 👉 [Mercedes-Benz Landing Page](https://mercedes-landing-page.netlify.app/) on Netlify

## Quickstart

1. Download or clone this repository
2. Open `index.html` directly in your browser  
   _(No build tools, bundlers, or dependencies required — pure HTML, CSS, and JS)_

## Screenshots

| Desktop                                      | Mobile                                     | Gallery                                | Maybach                                    |
| -------------------------------------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------------ |
| ![Desktop Hero](docs/shots/desktop-hero.png) | ![Mobile View](docs/shots/mobile-view.png) | ![Car Gallery](docs/shots/gallery.png) | ![Maybach Section](docs/shots/maybach.png) |

## Project Structure

```
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── agents.md               # Development rules & standards
├── src/
│   ├── css/
│   │   ├── variables.css   # Design tokens (colors, spacing, typography)
│   │   ├── main.css        # Global resets, base styles, layout primitives
│   │   ├── utilities.css   # Helper classes (.sr-only, .uppercase)
│   │   ├── components/     # Reusable UI components
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── nav.css
│   │   │   ├── forms.css
│   │   │   └── modal.css
│   │   └── sections/       # Section-specific styles
│   │       ├── hero.css
│   │       ├── gallery.css
│   │       ├── dealerships.css
│   │       ├── features.css
│   │       ├── maybach.css
│   │       ├── appointment.css
│   │       └── footer.css
│   ├── js/
│   │   └── main.js         # Navigation, modal, form interactions
│   └── images/             # Project images
│       ├── hero/
│       ├── products/
│       └── ...
└── docs/                   # Project documentation
    ├── structure.md        # DOM structure blueprint
    ├── notes-for-reviewer.md  # Project compliance documentation
    └── shots/              # Screenshots for README
```

## Documentation

All project documentation is located in the `/docs` folder, with the exception of agents.md which is in the root:

- **[structure.md](docs/structure.md)** — Emmet-like DOM blueprint and component reference
- **[notes-for-reviewer.md](docs/notes-for-reviewer.md)** — Project requirements compliance documentation (Spanish)
- **[agents.md](agents.md)** — Development rules, naming conventions, and code standards

## References and Sources

- **W3C Validator**: https://validator.w3.org/
- **Social Share Preview**: https://socialsharepreview.com
- **Figma Design**: https://www.figma.com/design/rNClWJKvueW7qQDXWrtzSg/PROYECTO1
- **Course Program**: https://thepowertech.es/rock-the-code
