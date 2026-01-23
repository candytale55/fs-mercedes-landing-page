# Notas para la Revisión - RTC Proyecto: Landing Page

Esta sección explica cómo está integrado el proyecto y cómo se dio cumplimiento a cada uno de los requisitos.

Está escrito con la intención de ayudar a navegar a quien vaya a calificar el proyecto.

---

## Índice

  - [Filosofía de desarrollo](#filosofía-de-desarrollo)
  - [Estructura de archivos CSS](#estructura-de-archivos-css)
  - [Tabla de referencia rápida por sección](#tabla-de-referencia-rápida-por-sección)
- [Requisitos del proyecto](#requisitos-del-proyecto)
- [Problemas conocidos](#problemas-conocidos)
- [Fuentes](#references-and-sources)

---

## Información importante sobre este proyecto
[↑ Volver al índice](#índice)

### Filosofía de desarrollo

Mi objetivo fue construir el proyecto con una estrategia coherente, evitando resolver cada sección de forma aislada. Para ello, trabajé sobre estas bases:

**Primitivas de layout**  
Clases reutilizables que controlan la estructura y el espaciado a nivel global:

- `.container` → ancho máximo y centrado horizontal  
- `.gutter` → padding horizontal para proteger bordes  
- `.stack` → espaciado vertical entre elementos en flujo  
- `.section` (con variantes) → separación entre bloques principales  
- `.split-layout` → layout dividido (móvil: apilado · desktop: grid de dos columnas)

**Variables CSS**  
Sistema centralizado de tokens de diseño (tipografía, colores, espaciado, border-radius y transiciones) definido en `variables.css`.

**Mobile-first**  
El proyecto parte de un baseline de 390px y escala progresivamente hacia pantallas más grandes.

---

### Estructura de archivos CSS

No soy fan de un único `styles.css` enorme e inmanejable. Por eso dividí el CSS en archivos pequeños, organizados por responsabilidad.

**Archivos base**

- `variables.css` → Tokens de diseño  
- `main.css` → Reset CSS, estilos base y primitivas de layout  
- `utilities.css` → Clases helper pequeñas (`.sr-only`, `.uppercase`)

**Carpeta `components/`** — Componentes reutilizables en varias secciones:

- `buttons.css` → Botones y variantes (`.btn`, `.btn-dark`, `.btn-wide`)
- `cards.css` → Tarjetas base y variantes
- `nav.css` → Navegación principal y menú móvil
- `forms.css` → Formulario de newsletter
- `modal.css` → Modal de confirmación

**Carpeta `sections/`** — Estilos específicos por sección:

- `hero.css`
- `gallery.css`
- `dealerships.css`
- `features.css`
- `maybach.css`
- `appointment.css`
- `footer.css`

La estructura completa está documentada en el `README.md`.

---

### Tabla rápida de referencia por sección

| Sección | Archivos CSS | JavaScript |
|------|-------------|------------|
| Header / Navegación | `nav.css`, `buttons.css` | `main.js` |
| Hero | `hero.css` | — |
| Car Gallery | `gallery.css`, `cards.css`, `buttons.css` | — |
| Dealerships | `dealerships.css`, `buttons.css` | — |
| Features | `features.css`, `cards.css`, `buttons.css` | — |
| Maybach Red | `maybach.css` | — |
| Maybach Wheels | `maybach.css`, `buttons.css` | — |
| Appointment | `appointment.css`, `buttons.css` | — |
| Newsletter | `forms.css`, `buttons.css` | `main.js` |
| Modal | `modal.css`, `buttons.css` | `main.js` |
| Footer | `footer.css` | — |

> Nota: `main.css` contiene las primitivas de layout usadas en todo el sitio (por ejemplo `.container`, `.gutter`, `.stack`, `.section`), por eso no se repite en la tabla.

---

### Sobre `agents.md`

Utilicé un `agents.md` escrito por mí. Llevo tiempo refinándolo como guía personal de trabajo y traté de seguirlo de forma consistente durante el desarrollo.

Algunas reglas clave:

- **No uso BEM** (simplemente no es para mí)
- **Nomenclatura semántica-funcional**: nombres que describen propósito, no jerarquía
- **Separación clara de responsabilidades**: layout, contenido y comportamiento

---

### Comentarios en el código

Cada archivo CSS incluye:

- Un comentario inicial explicando su propósito
- Comentarios inline cuando aportan contexto
- Referencias a las secciones donde se aplican los estilos

Lo mismo aplica para `main.js`.

---

### JavaScript

La funcionalidad es intencionalmente sencilla:

- **Newsletter**: validación del formulario y modal de confirmación
- **Navegación móvil**: menú tipo burger que se desliza desde la derecha
- **Modal**: se puede cerrar con el botón X, el botón OK o la tecla Escape

---

### `my_notes.md`

Ignorar este archivo. Son notas personales, pruebas, respuestas de IA y explicaciones intermedias.

---

### Uso de IA

Utilicé IA como apoyo para investigar soluciones, corregir errores y generar documentación.

La primera estructura del proyecto la hice manualmente a partir de Figma, pero los nombres de clases se volvieron inmanejables. Decidí rehacer la estructura usando IA junto con mi `agents.md`, manteniendo el control de las decisiones.

El proyecto original está aquí:  
Página web, Repositorio

---

## Requisitos del proyecto
[↑ Volver al índice](#índice)

### ✅ Uso correcto de variables CSS

Sistema completo de variables en `variables.css`, incluyendo:

- Tipografía (tamaño, peso, line-height, familia)
- Colores (primitivos y semánticos)
- Espaciado
- Border-radius
- Transiciones

Nomenclatura descriptiva como `--font-size-heading`, `--spacing-section`, `--color-text-primary`.

---

### ✅ Reutilización de estilos mediante clases

Dos grandes categorías:

- **Componentes** (`.btn`, `.card`, `.link`)
- **Primitivas de layout** (`.section`, `.container`, `.gutter`, `.stack`)

Los componentes admiten modificadores (`.btn-dark`, `.product-card`, `.feature-card`) y se pueden combinar sin duplicar código.

No uso BEM por decisión consciente; prefiero nombres semánticos orientados a propósito (aunque sigo afinando este enfoque).

---

### ✅ Uso de Grid y Flexbox

Se usan ambas según el caso:

**CSS Grid**
- Galería de productos
- Footer
- Secciones con `grid-template-areas`
- Header

**Flexbox**
- Header y navegación
- Alineación de botones
- `.stack`
- Iconos sociales del footer

La navegación móvil combina Grid (overlay) y Flexbox (alineación interna).

---

### ✅ Página completamente responsive

Diseño mobile-first con breakpoints definidos por el contenido, no por dispositivos.

**Técnicas usadas**
- Tipografía fluida con `clamp()`
- Imágenes responsivas con `object-fit` y `aspect-ratio`
- Grids adaptativos
- Navegación que cambia de overlay a layout horizontal
- Ajustes específicos por sección

**Breakpoints principales**  
390px (baseline), 550px, 650px, 768px, 900px, 1200px

---

### ✅ HTML sin errores

El HTML fue validado con W3C Validator sin errores al momento de la entrega.

Página del proyecto:  
https://mercedes-landing-page.netlify.app/

Nota: En algunas ocasiones Visual Studio modifica automáticamente el cierre de etiquetas al actualizar archivos, lo que puede afectar validaciones puntuales.

---

### ✅ Buena semántica y accesibilidad

Cumple con WCAG AA:

**Estructura**
- Un solo `<h1>` por página
- Todas las secciones tienen nombre accesible
- Jerarquía correcta de encabezados

**Navegación**
- Estados ARIA en elementos interactivos
- Gestión de foco en menú móvil y modales

**Contenido**
- Imágenes con `alt` descriptivo
- Dots de color con `aria-label`
- Foco visible en todos los elementos interactivos
- Focus trap y restauración de foco en modales

---

### ✅ Meta etiquetas y SEO

El `<head>` incluye:

- Meta description
- Canonical URL
- Robots index/follow
- Título optimizado
- Open Graph (Facebook, LinkedIn, Discord)
- Twitter Card (summary large image)

Las etiquetas Open Graph fueron validadas con socialsharepreview.com.

---

### ✅ Enlaces a productos reales

El sitio incluye enlaces a páginas oficiales de Mercedes-Benz España.

**Estrategia**
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`
- Enlaces internos del footer apuntan a secciones por ID
- Navbar enlaza a secciones específicas (`#electric`, `#maybach`, etc.)

---

## Problemas conocidos
[↑ Volver al índice](#índice)

**Círculos de color en las tarjetas**  
Deberían enlazar a imágenes del coche en ese color. Como esas imágenes no existen en el proyecto, decidí no simular enlaces irreales.

**Grid estático en car gallery**  
Con solo cuatro tarjetas, un grid dinámico (`auto-fit / minmax`) producía resultados visuales pobres en algunos tamaños. Opté por un grid controlado.

**Aspect-ratio fijo en imágenes**  
No es ideal, pero fue la solución más consistente dada la disparidad de tamaños de las imágenes originales.

**Elemento de flecha final en Figma**  
Lo detecté al final del proceso y decidí no incluirlo. Lo interpreto como un posible “back to top”. Preferí avanzar al siguiente proyecto antes que añadirlo a última hora.

---

## References and Sources

- W3C Validator: https://validator.w3.org/  
- Social Share Preview: https://socialsharepreview.com  
- Figma Design: https://www.figma.com/design/rNClWJKvueW7qQDXWrtzSg/PROYECTO1
