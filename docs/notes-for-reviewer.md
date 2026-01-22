# Notes for Review - RTC Proyecto: Landing Page

Esta sección explica como está integrado el proyecto y como se dió cumplimiento a cada uno de los requisitos.

Está escrito con la intención de ayudar a navegar a quien vaya a calificar el proyecto. 

---

## Important info about this project

- Mi intención era crear un proyecto tratando de tener una estrategia general, con primitivas, variables css, reglas para un layout que afectaran al proyecto completo en lugar de por sección. 

[INSTRUCCION: 
Por favor incluir aquí una descripción muy breve de las estrategias de layout (stack, gutter, container, split-layout etc - Objetivo es solo explciar en general para el revisor, cada archivo css tendrá la información específica en sus comentarios)
]

- Also I hate huge styles.css page that you need to scroll and scroll to get to each section, so I've divided the css into several CSS files per section and

La estructura de archivos está en README.md [INSTRUCTIONS: ADD LINK to README.md] y aquí hay una tabla por sección y los archivos que modifican cada sección (quick guide).

[INSTRUCCIONES : 

describe lo que contienen: 
main.css, variable.css utilities.css

describe que tipo de archivos están en components/ y en sections/ - descripcion general para entender porque estan divididos así
]

[INSTRUCCIONES: 

Incluye una tabla en md ordenada por sección como aparece en index.html (es decir en orden natural), excepto por el modal, que está hasta abajo, esa sección colocala inmediatamente después de la forma / newsletter section

Del lado izquierdo el nombre de la sección, y del derecho los archivos css y si aplica js que el reviewer deberá consultar para calificar el proyecto.

ejemplo: 

features section | features.css, cards.css 

buttons.css aplica a todas o muchas de las las secciones, así que los puedes explicar individualmente.

Si aplica main.js como por ejemplo con la barra de navegacion o el modal, agregalo también. Si para una sección tiene mucho peso main.css agregalo con la sección mas importante entre paréntesis. Si no es demasiado relevante no lo incluyas.

]


- I used an agents.md written by myself. I'm working on it for some time, trying to create my rules for my workflow. I tried to follow them as best as possible.    


- Each code file includes comments on top and also over most rules / functions explaining what it does and where it was applied . 

- The project has basic JS functionality, because why not. It works in the newsletter suscription form  displaying a modal once you fill in correct data and submit and the navigation has a working side-sliding burger menu for mobile navigation. 

- Please ignore my_notes.md. They are AI responses, errors and solutions found, explanations, etc and are personal notes for my future self. I was going to delete them at first but realized it was better to leave them with a note.  

- Use of AI: I used AI to automate certain processes with VS copilot, and used copilot, ChatGPT and Google AI Studio assistants to research for solutions, fix errors and create documentation, but I took all decisions after reviewing and confirming the AI responses (no copy pasting or trusting it blindly). 

Also, I created a fist project where I manually built the structure following the figma file. After I've done it and realized my class naming was a mess, I recreated the same structure with AI and my agents.md so the classes names and other attributes followed a plan.  

That original project is here: [Webpage](https://mercedes-lp-old.netlify.app/) ,  [Repo](https://github.com/candytale55/mercedes-lp)
  

## Requisitos del proyecto:

Esta seccion incluye los requisitos específicos para el proyecto y la forma en que los cubrí.

[INSTRUCCION: Por favor revisar que todo lo que digo en esta sección siguiente es real, puesto que hice algunos cambios desde que se escribió. No des número exacto de elementos no "incluyendo 7 tipos de tokens ...", para no tenerme que preocuparme de si esos numeros estan actualizados o no cada vez que se hacen cambios]

### ✅ Buen uso de variables CSS

El proyecto utiliza un sistema completo de variables CSS definido en `variables.css`, incluyendo tipografía, colores (sistema de primitivos y semánticos), espaciado (tokens basados en propósito), border-radius, y transiciones. Todas las variables siguen una nomenclatura descriptiva coherente (o es lo que se intentó) (`--font-size-heading`, `--spacing-section`, `--color-text-primary`) que facilita el mantenimiento y la escalabilidad del proyecto.

### ✅ Reutilización de estilos con el uso de clases

Se implementa un sistema de clases reutilizables organizadas en componentes (`.btn`, `.card`, `.link`) y primitivas de layout (`.section`, `.container`, `.gutter`, `.stack`). Los componentes admiten modificadores mediante clases adicionales (`.btn-dark`, `.product-card`, `.feature-card`) siguiendo una estrategia de nombrado semántico-funcional que permite combinar clases para crear variaciones sin duplicar código.

No me gusta BEM, me pone de malas, así que lo evito mediante una instrucción en agens.md

### ✅ Uso de Grid o Flex

El proyecto utiliza ambas tecnologías: **CSS Grid** para layouts bidimensionales (galería de productos 1→2→4 columnas, footer con auto-fit, sección dealer con grid-template-areas) y **Flexbox** para layouts unidimensionales (header, botones, stacks verticales). La navegación móvil usa grid para el overlay fullscreen y flexbox para la alineación de elementos internos.

[INSTRUCCIONES: Revisar texto, y dejar más generalista, para no tenerme que preocupar de cambiar este texto si cambio una sección de flex a grid o vice-versa]

### ✅ Página FULL RESPONSIVE

Diseño mobile-first con breakpoints estratégicos (390px baseline, 530px, 600px, 768px, 900px, 1200px) que se adaptan al contenido. Incluye tipografía fluida con `clamp()`, imágenes responsivas con `object-fit`, grid adaptable, navegación overlay en móvil → horizontal en desktop, y ajustes específicos por sección (ej: botones redimensionados según layout de cards).

Los breakpoints fueron escogidos en base al aspecto de la pagina en cada breakpoint, y no en base a un tamaño específico de device. 



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

Tiene enlaces externos que apuntan a páginas oficiales de Mercedes-Benz España. Todos usan `target="_blank"` y `rel="noopener noreferrer"` para seguridad.  

En ciertas secciones, como los links del footer o las redes sociales, los enlaces van a ids internos de su misma sección para evitar saltos a home y href="#" vacios.

El navbar tiene enlaces a las diferentes secciones de la pagina mediante ids. 


## Known Issues

- Los círculos de colores en las car cards deberían ser links a imágenes de los coches en ese color. Como no hay esas imágenes, me pareció que no valía la pena crear los elementos como links. En la vida real hubieran sido links y cargado la fotografía en el color indicado.

- El proyecto trata las tarjetas de car cards de manera estática. En la vida real probablemente dejaría las tarjetas llenar el espacio disponible, usando un grid con un auto-fill o auto-fit y un minmax para controlar el tamaño. Pero como solo hay cuatro tarjetas hacer eso quedaba muy feo estéticamente.

- SOy conciente que usar un aspect-ratio fijo 1/1, 4/3 no es una muy buena idea, pero la diferencia en el tamaño de las imágenes me complicaba mucho la vida para que el aspecto fuera siempre uniforme. Intenté  varias de las otras opciones (my_notes.md), pero la que mejor funcionó fue esta. 

- Me dí cuenta del elemento con la flecha al final del diseño figma justo cuando iba a entregar el projecto, así que lo he dejado fuera. Lo interpreto como un link a home que quedaría probablemente pegado a la parte inferior, para que el usuario pudiera regresar arriba en el momento que quiera. Espero que no haya problema por no incluirlo, preferiría empezar a trabajar en los otros proyectos.




