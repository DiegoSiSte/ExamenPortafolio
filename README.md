# Portafolio de Diego Mancilla

Portafolio de una sola página construido con Angular standalone, TypeScript y Tailwind CSS v4.

La dirección visual toma como referencia la estructura editorial y la navegación discreta de [Brittany Chiang](https://brittanychiang.com/) y el uso intencional de la tipografía de [Rauno Freiberg](https://rauno.me/), reinterpretados con una paleta de bosque que acompaña la fotografía personal de Diego.

## Desarrollo

```bash
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200/`.

## Publicación en GitHub Pages

El flujo de GitHub Actions publica automáticamente la rama `main` en:

<https://diegosiste.github.io/ExamenPortafolio/>

La primera vez, habilita GitHub Pages en **Settings → Pages → Build and deployment → Source → GitHub Actions**. Después, cada push a `main` compilará y publicará el portafolio automáticamente.

## Personalización

- Edita `src/app/data/profile.ts` para actualizar la presentación, biografía y enlaces de contacto.
- Actualiza las direcciones de tus perfiles GitHub e Instagram en `src/app/data/profile.ts` si cambian.
- Añade proyectos reales en `src/app/data/projects.ts`; cada proyecto lleva su slug, descripción, stack, enlaces y ruta a la portada.
- Revisa `src/app/data/skills.ts` y ajusta las habilidades para que representen tu experiencia.
- La foto principal está en `public/images/profile/hero.jpeg`. Su recorte cuadrado para la presentación circular está en `public/images/profile/portrait.jpeg`.
- Para cada proyecto, coloca su portada en `public/images/projects/<slug>/cover.webp` y activa `coverAvailable` en sus datos. Las capturas son opcionales.

Las imágenes propias deben optimizarse en WebP; no se incluyen imágenes de stock ni enlaces externos de imágenes.

## Verificación

```bash
npm run build
npm test -- --watch=false
```
