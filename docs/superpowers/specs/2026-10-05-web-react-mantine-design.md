# Spec: ivanpastorsimarro.com v2 — React + Mantine

**Fecha:** 2026-10-05
**Estado:** Aprobada por el usuario (diseño presentado y validado en conversación)

## Objetivo

Nueva versión de la web personal [ivanpastorsimarro.com](https://github.com/eztornado/ivanpastorsimarro.com) (actualmente Vue 3 + Tailwind, plantilla *webdev_portfolio*) reescrita en **React + Mantine**, en una carpeta nueva, manteniendo un diseño visual similar al original pero con estructura centrada en **proyectos** y **redes sociales**, y soporte de idiomas **Español, Inglés y Japonés**.

## Alcance

**Incluye:**
- Home con scroll y secciones ancladas: Hero, Proyectos (protagonista), Redes sociales, About corto, Contacto.
- Página propia para cada proyecto con banner (imagen, vídeo mp4 o embed YouTube) y descripción elaborada.
- i18n ES/EN/JA con detección de navegador y selector manual.
- Dark/light mode con toggle (por defecto sigue al sistema).
- 6 proyectos iniciales (los de la web actual) con capturas reutilizadas.
- Desarrollo local únicamente (sin configuración de deploy).

**Excluye (decisión explícita):**
- Splash screen de la plantilla original (omisible, se puede añadir después).
- Sección Experience (el historial laboral queda en LinkedIn).
- Tests con framework (la verificación es build + revisión visual).
- Configuración de despliegue.

## Stack

| Pieza | Elección |
|---|---|
| Build | Vite + React + TypeScript |
| UI | Mantine v8 (`@mantine/core`, `@mantine/hooks`), estilos CSS Modules de Mantine |
| Iconos | `@tabler/icons-react` (incluye marcas: github, linkedin, spotify, x) |
| Rutas | react-router |
| i18n | react-i18next + i18next + i18next-browser-languagedetector |
| Fuentes | Google Fonts: Source Code Pro (principal) + Reenie Beanie (logo) |

## Carpeta y repo

`/home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2` — repo git nuevo (usuario git: eztornado). Sin deploy.

Nota de scaffold: la carpeta contiene `docs/` y `.git`; crear el proyecto Vite sin borrarlos (scaffold manual de `package.json`, `vite.config.ts`, `index.html`, `src/` o equivalente no interactivo).

## Estructura de carpetas

```
src/
  main.tsx              # MantineProvider + ColorSchemeScript + router + i18n init
  App.tsx               # layout: Navbar + <Outlet/> + Footer
  theme.ts              # tema Mantine: acento, fuente, dark
  i18n/
    index.ts            # config i18next (detección + localStorage + fallback)
    es.json  en.json  ja.json
  data/
    projects.ts         # los 6 proyectos (editable, tipado)
    socials.ts          # redes sociales
  components/
    Navbar.tsx          # sticky: logo "ip.", anclas, lang switcher, toggle tema, burger móvil
    Footer.tsx
    ProjectCard.tsx
    SocialCard.tsx
    TechBadge.tsx
    Reveal.tsx          # aparición al scroll (IntersectionObserver)
  pages/
    HomePage.tsx        # Hero + Projects + Socials + About + Contact
    ProjectDetailPage.tsx
  assets/images/        # capturas y retratos copiados de la web original
```

## Rutas

- `/` — HomePage con secciones: `#inicio` (Hero), `#proyectos`, `#redes`, `#about`, `#contacto`
- `/projects/:slug` — detalle de proyecto; slug desconocido → redirección a `/`

## Diseño visual

- Fuente principal **Source Code Pro** (monoespaciada), logo "ip." en **Reenie Beanie** (misma identidad que el original).
- Acento **`#4305ba`** en modo claro; en oscuro una variante más clara del mismo morado (p. ej. `#9a7ef0`) para contraste.
- Dark mode: toggle en navbar vía `useMantineColorScheme`; por defecto sigue `prefers-color-scheme`.
- Hero: retrato circular con sombra (misma composición que la web original).
- Cards con sombra suave y hover discreto.
- Animación de aparición al hacer scroll: componente `Reveal` con IntersectionObserver (equivalente ligero a las transiciones de la original). Respeta `prefers-reduced-motion`.

## i18n

- Idiomas: `es`, `en`, `ja`.
- Detección: idioma del navegador (`i18next-browser-languagedetector`, caches localStorage), **fallback `en`**.
- Selector manual en la navbar (SegmentedControl ES/EN/JA), persistente.
- Claves en `es.json`/`en.json`/`ja.json`: nav, hero, secciones, contacto, etiquetas de proyecto, 404.
- Las **descripciones y summaries de proyectos viven en `projects.ts`** con campo `{ es, en, ja }` — todo lo de un proyecto se edita en un solo sitio.
- `lang` del `<html>` se actualiza al cambiar de idioma; `ja` con `lang="ja"` para tipografía correcta.

## Modelo de datos

```ts
// src/data/projects.ts
export type Banner =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string }  // mp4 local en /public o assets
  | { type: "youtube"; id: string };      // embed

export interface Project {
  slug: string;
  title: string;
  year: string;
  banner: Banner;
  summary: Record<"es" | "en" | "ja", string>;      // corto, para la card
  description: Record<"es" | "en" | "ja", string>;  // elaborado, párrafos, página detalle
  tech: string[];
  links: { label: string; url: string; type: "web" | "github" | "youtube" }[];
}
```

```ts
// src/data/socials.ts
export interface Social {
  id: "github" | "linkedin" | "spotify" | "x";
  label: string;
  url: string;
  handle: string;
}
```

## Contenido inicial

**Redes sociales:** GitHub `github.com/eztornado`, LinkedIn `linkedin.com/in/iván-pastor-simarro-9b115a113`, Spotify `open.spotify.com/user/eztornado`, X/Twitter `twitter.com/eztornado_`.

**Proyectos** (descripciones base en `portfolio.js` de la web original; se elaboran y traducen a ES/EN/JA en la implementación):

| slug | Año | Banner | Links | Tech |
|---|---|---|---|---|
| pokersolverai | IN PROGRESS | youtube `lrY3uv-FJ_Q` | YouTube, app.pokersolver.tornadocore.es | PHP, Laravel, Redis, VueJs |
| reigreengroup | 2022-2023 | image reigreengroup.png | reigreengroup.com | PHP, Laravel, VueJs, Plesk |
| vocabulariojapones | 2021 | image vocabulariojapones.png | GitHub, vocabulariojapones.com | PHP, Laravel, Mysql |
| agustinostv | 2017-2019 | image agustinostv.png | GitHub front, GitHub API, archive | PHP, Laravel, VueJs, NGINX, Apache, Linux |
| mc-gamingforce | 2017-2019 | image mcgamingforce.png | GitHub, archive | PHP, Laravel, Mysql, Java |
| loadingstudios | 2014 | image loadingstudios.png | GitHub, archive | PHP, CodeIgniter |

**Imágenes:** copiar de la web original `src/assets/images/`: 6 capturas de proyectos + `ivan.png` (retrato hero) + `ivan1-3.png` (about, opcional).

**About corto:** bio condensada de la original (perfil backend, PHP/Laravel/Symfony, Java Spring; hobbies: piano/sintes, cultura japonesa) + tech stack como badges.

**Contacto:** texto con invitación a contactar por LinkedIn (como la original; sin formulario).

## Componentes clave

- **Navbar:** header sticky de Mantine; anclas con scroll suave a secciones de la home (si se está en `/projects/:slug`, las anclas navegan a `/` y hacen scroll); SegmentedControl de idioma; `ActionIcon` de tema; `Burger` + `Drawer` en móvil.
- **ProjectCard:** banner recortado (aspect 16/9), título, año, summary, tech badges, link a `/projects/:slug`.
- **ProjectDetailPage:** banner a ancho completo según tipo (`image` → `<Image>`, `video` → `<video controls>`, `youtube` → iframe embed), título + año, descripción elaborada, tech, links (botones con icono por tipo), nav anterior/siguiente.
- **SocialCard:** una card por red con icono de marca, handle y enlace externo.
- **Reveal:** wrapper con IntersectionObserver; fade + translate-y al entrar en viewport.

## Manejo de errores

- Slug inexistente → `<Navigate to="/">`.
- Banner `video` con fichero ausente → atributo `poster` con la captura del proyecto.
- Enlaces externos con `target="_blank"` + `rel="noopener noreferrer"`.

## Verificación

1. `npm run build` (tsc + vite) sin errores.
2. Revisión visual en dev server: home completa, las 6 páginas de detalle, los 3 idiomas (comprobar JA), dark/light y vista móvil (burger menu).
3. Comprobación de que los enlaces de redes y proyectos apuntan a las URLs correctas.
