# AGENTS.md — Portafolio Angular + Tailwind

## Objetivo
Portafolio de proyectos de Gastón Diego Mancilla (Diego), frontend developer en Bolivia.
Single page, estilo minimalista tipo Tesla: secciones a pantalla completa, mucho espacio vacío, tipografía grande y limpia, colores profundos e inmersivos, animaciones simples.

## Stack
- Angular (última estable), standalone components, sin NgModules
- TypeScript estricto
- Tailwind CSS v4 (sin Angular Material ni otras librerías de UI)
- Sin SSR
- Referencia de estructura: github.com/mayragss/mgmes

## Setup de Tailwind (v4)
1. npm install tailwindcss @tailwindcss/postcss postcss
2. Crear .postcssrc.json en la raíz:
   { "plugins": { "@tailwindcss/postcss": {} } }
3. En src/styles.css: @import "tailwindcss";
4. Colores y fuentes personalizados con @theme en styles.css (ver Paleta)

## Estructura
src/app/
  components/
    navbar/        fija, transparente, blur al hacer scroll
    hero/          100vh, nombre + rol + 2 botones + foto
    about/         100vh, bio corta + foto
    projects/      una sección grande por proyecto, full-width
    skills/        grid minimalista
    contact/       100vh, CTA grande + links
    footer/
  directives/
    reveal.directive.ts   fade-up con IntersectionObserver
  data/
    profile.ts
    projects.ts
    skills.ts
  models/
    project.model.ts
  app.ts, app.config.ts, app.routes.ts

public/                  (archivos estáticos, se sirven desde la raíz "/")
  favicon.ico
  images/
    profile/
      hero.webp
      about.webp
    projects/
      <slug-del-proyecto>/
        cover.webp
        screen-1.webp
        screen-2.webp
    og/
      og-image.png

## Imágenes (IMPORTANTE: las pone el usuario)
Las imágenes son fotos y capturas propias del usuario. El agente NO debe descargar, generar ni usar imágenes de stock ni URLs externas.

Dónde colocarlas y para qué sirve cada una:

| Archivo | Dónde se usa | Medida recomendada | Notas |
|---|---|---|---|
| public/images/profile/hero.webp | Hero (foto principal de Diego) | 1200x1600 (vertical) o 1920x1080 (horizontal) | Mejor con fondo oscuro o recortada (sin fondo) para mezclarse con la paleta. Medio cuerpo o rostro. |
| public/images/profile/about.webp | Sección About | 800x1000 | Foto más casual o de trabajo, distinta a la del hero. |
| public/images/projects/<slug>/cover.webp | Fondo/imagen principal de cada proyecto | 1920x1080 (16:9) | Captura o mockup de la app. Una por proyecto, obligatoria. |
| public/images/projects/<slug>/screen-N.webp | Galería opcional del proyecto | 1440x900 | Opcional, máximo 4 por proyecto. |
| public/images/og/og-image.png | Vista previa al compartir el link | 1200x630 | Se declara en index.html (meta og:image). |
| public/favicon.ico | Pestaña del navegador | 32x32 | Inicial o logo de Diego. |

Reglas:
- Formato WebP (PNG solo si necesita transparencia), peso máximo ~300 KB por imagen (hero hasta 500 KB)
- Nombres en minúsculas, sin espacios ni tildes, con guiones: cover.webp, screen-1.webp
- <slug-del-proyecto> en kebab-case, igual al campo "slug" de src/app/data/projects.ts
- En el código las rutas empiezan con "/images/..." (NO "public/images/..."). Ejemplo: "/images/profile/hero.webp"
- Usar NgOptimizedImage con width y height; priority solo en la imagen del hero; el resto con lazy
- Siempre alt descriptivo (ej: "Diego Mancilla, frontend developer")
- Sobre las fotos poner un overlay de gradiente (from-bg/80 to-transparent) para que el texto siempre se lea
- La foto del hero se integra con la paleta: borde difuminado con máscara/gradiente, nada de recuadros duros
- Si una imagen no existe todavía, mostrar un placeholder con gradiente de la paleta y dejar un comentario TODO; no romper el layout ni inventar imágenes
- Las rutas de imágenes viven en src/app/data (profile.ts y projects.ts), nunca hardcodeadas en el HTML

## Estilo visual (estilo Tesla)
- Cada sección ocupa 100vh (min-h-screen) con contenido centrado
- scroll-snap vertical suave: snap-y snap-mandatory en el contenedor, snap-start en cada sección
- Mucho espacio en blanco (negativo), cero elementos decorativos innecesarios
- Tipografía: sans geométrica (Inter o Geist), títulos enormes (text-5xl a text-8xl), font-light o font-medium, tracking-tight; texto secundario pequeño y con opacidad baja
- Navbar: nombre a la izquierda, 4-5 links a la derecha, text-sm, sin bordes ni sombras; backdrop-blur al hacer scroll
- Botones: dos variantes por sección, uno sólido y uno outline, rounded-md, px-10 py-2.5, texto pequeño
- Hero: nombre y rol grandes con la foto de Diego integrada (a un lado en escritorio, de fondo con overlay en móvil)
- Proyectos: imagen cover grande como fondo de la sección, título arriba, descripción corta, botones "Ver demo" y "Código" abajo al centro
- Sin sombras pesadas ni bordes gruesos; usar gradientes sutiles y overlays

## Paleta (profunda e inmersiva)
Definir en styles.css:
@theme {
  --color-bg: #050816;          /* azul noche, fondo base */
  --color-surface: #0b1030;     /* secciones alternas */
  --color-primary: #6d5efc;     /* violeta profundo */
  --color-accent: #22d3ee;      /* cian, solo detalles */
  --color-text: #f5f7ff;
  --color-muted: #8b93b8;
}
- Fondos: gradientes radiales difusos (violeta/cian a baja opacidad) sobre bg
- Alternar bg y surface entre secciones
- Un solo color de acento por sección; nada de arcoíris
- Solo modo oscuro (no implementar modo claro)

## Animaciones (simples, sin librerías)
- Reveal al entrar en viewport: opacity 0 -> 1 y translateY(24px) -> 0, 700ms ease-out, vía IntersectionObserver en una directiva appReveal
- Hero: texto aparece escalonado (delay 100/250/400 ms); la foto entra con fade + leve scale (1.05 -> 1)
- Hover en tarjetas y botones: scale-[1.02] y transición 300ms
- Indicador de scroll (flecha) en el hero con bounce suave
- Fondo con gradiente que se mueve lento (keyframes, 20s+, infinite)
- Respetar prefers-reduced-motion: desactivar todo con motion-reduce:
- Prohibido: parallax pesado, animaciones largas, librerías de animación

## Reglas de código
- Un componente por sección, standalone, ChangeDetectionStrategy.OnPush
- Signals y control flow nuevo (@if, @for), no *ngIf/*ngFor
- Archivos separados .ts / .html; estilos solo con clases Tailwind (CSS propio únicamente en styles.css para @theme y keyframes)
- El contenido nunca se hardcodea en el HTML: todo viene de src/app/data
- Mobile-first: probar 360px, 768px y 1280px
- Accesibilidad: HTML semántico, alt en imágenes, contraste AA, foco visible
- No agregar dependencias sin preguntar

## Datos del usuario (rellenar)
profile:
  nombre: Gastón Diego Mancilla
  rol: Frontend Developer
  bio: [2-3 líneas]
  ubicacion: Bolivia
  fotoHero: /images/profile/hero.webp
  fotoAbout: /images/profile/about.webp
  contacto: { email: , github: , linkedin: }

proyectos (repetir por cada uno):
  slug:
  nombre:
  descripcion: [1-2 líneas]
  stack: [React Native, React, ...]
  repo:
  demo:
  cover: /images/projects/<slug>/cover.webp
  capturas: [/images/projects/<slug>/screen-1.webp]

skills: [React, React Native, Angular, TypeScript, Tailwind, ...]

## Comandos
npm install
ng serve --open
ng build

## Definición de terminado
- Compila sin errores ni warnings
- Todas las secciones leen datos de src/app/data
- Todas las imágenes salen de public/images y se referencian con "/images/..."
- Scroll-snap y reveal funcionan; reduced-motion respetado
- Se ve bien en 360, 768 y 1280 px
- Lighthouse performance y accesibilidad > 90
