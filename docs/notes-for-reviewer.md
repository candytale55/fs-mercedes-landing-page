# Notes for Review - RTC Proyecto: Landing Page

## Requisitos del proyecto:

Esta sección muestra como se dió cumplimiento a cada uno de los requisitos del proyecto.

### ✅ Buen uso de variables CSS

El proyecto utiliza un sistema completo de variables CSS definido en `variables.css`, incluyendo tipografía (8 tamaños escalables), colores (sistema de primitivos y semánticos), espaciado (tokens basados en propósito), border-radius, y transiciones. Todas las variables siguen una nomenclatura descriptiva coherente (`--font-size-heading`, `--spacing-section`, `--color-text-primary`) que facilita el mantenimiento y la escalabilidad del proyecto.

### ✅ Reutilización de estilos con el uso de clases

Se implementa un sistema de clases reutilizables organizadas en componentes (`.btn`, `.card`, `.link`) y primitivas de layout (`.section`, `.container`, `.gutter`, `.stack`). Los componentes admiten modificadores mediante clases adicionales (`.btn-dark`, `.product-card`, `.feature-card`) siguiendo una estrategia de nombrado semántico-funcional que permite combinar clases para crear variaciones sin duplicar código.

### ✅ Uso de Grid o Flex

El proyecto utiliza ambas tecnologías de forma estratégica: **CSS Grid** para layouts bidimensionales (galería de productos 1→2→4 columnas, footer con auto-fit, sección dealer con grid-template-areas) y **Flexbox** para layouts unidimensionales (header, botones, stacks verticales). La navegación móvil usa grid para el overlay fullscreen y flexbox para la alineación de elementos internos.

### ✅ Página FULL RESPONSIVE

Diseño mobile-first con breakpoints estratégicos (390px baseline, 530px, 600px, 768px, 900px, 1200px) que se adaptan al contenido. Incluye tipografía fluida con `clamp()`, imágenes responsivas con `object-fit`, grid adaptable, navegación overlay en móvil → horizontal en desktop, y ajustes específicos por sección (ej: botones redimensionados según layout de cards).

### ✅ Ningún error en el HTML

El HTML ha sido validado exitosamente con [W3C Validator](https://validator.w3.org/) sin errores. Se utilizan elementos semánticos HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), estructura correcta de encabezados (H1→H2→H3), atributos ARIA apropiados (`aria-label`, `aria-expanded`, `aria-hidden`), y formularios con elementos asociados mediante `id`/`for`.

### ✅ Buena semántica y accesibilidad

Implementación completa de accesibilidad: un H1 por página, secciones con nombres accesibles (`.sr-only` o títulos visibles), navegación con estados ARIA, imágenes con texto alternativo descriptivo, color dots con `aria-label`, enlaces con `aria-label` para contexto, focus visible en elementos interactivos, y gestión de foco en modal y menú móvil. Todo cumple con WCAG AA.

### ✅ Uso de meta etiquetas que mejoran el SEO

El `<head>` incluye meta tags completos: descripción SEO (150-160 caracteres), canonical URL, robots index/follow, título optimizado (50-60 caracteres), Open Graph tags para redes sociales (Facebook, LinkedIn, Discord), Twitter Card tags, y favicon. Las etiquetas están comentadas y organizadas por secciones para facilitar el mantenimiento.

Las etiquetas Open Graph fueron probadas en 
[socialsharepreview.com](https://socialsharepreview.com/?url=https://mercedes-landing-page.netlify.app/)

![socialsharepreview.com Screenshot](../docs/shots/social-share-screenshot.png)


### ✅ La web contiene enlaces a los productos reales

Todos los enlaces externos apuntan a páginas oficiales de Mercedes-Benz España: sección Features enlaza a [Maybach S-Class features](https://www.mercedes-benz.es/passengercars/models/saloon-long/maybach-s-class/overview.html), sección Dealerships a [localizador de concesionarios](https://www.mercedes-benz.es/passengercars/brand/locations.html), sección Maybach Wheels al [programa de ruedas Maybach](https://www.mercedes-benz.es/passengercars/models/saloon-long/maybach-s-class/overview.html), y Appointment a [test drive](https://www.mercedes-benz.es/passengercars/test-drive.html). Todos usan `target="_blank"` y `rel="noopener noreferrer"` para seguridad.

---

## Important info about this project

- Use of AI: I used AI to automate certain processes with VS copilot, and used copilot, ChatGPT and Google AI Studio assistants to research for solutions, fix errors and create documentation, but I took all decisions after reviewing and confirming the AI responses (no copy pasting or trusting it blindly). 

There's also a long commit history that shows it. 

* 

- It uses an agents.md written by myself and which I've been working on for some time now, improving it little by little to create a consistent ruleset.    

- I hate to have a huge styles.css page so I've divided into several CSS files

[Add structure for the css/ files and a brief description for main.css, variable.css utilities.css and for the folders css/components/ and css/pages - a description of what type of files are in each folder]

- I included comments on top of most rules / functions explaining what it does and where it was applied. 

- It has JS functionality that works in the newsletter suscription form  displays a modal once you fill in correct data and submit and the navigation has a working side-sliding burger menu in mobile. 

- You can ignore my_notes.md . They are the notes I kept from AI responses, errors and solutions found, explanations, etc and it is intended for my future self. I was going to delete them at first bur realized I wouldn't know where to find them in the future if I did it.  



