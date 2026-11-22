# ivanpastorsimarro.com v2 (React + Mantine) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir la web personal ivanpastorsimarro.com en React + Mantine en una carpeta nueva, con estructura centrada en proyectos y redes sociales, i18n ES/EN/JA, dark/light mode y una página de detalle por proyecto.

**Architecture:** SPA con Vite + React + TypeScript. Rutas: `/` (secciones ancladas `#inicio`, `#proyectos`, `#redes`, `#about`, `#contacto`) y `/projects/:slug` (detalle con banner). Datos tipados en `src/data/` (proyectos con copy trilingüe inline, redes, perfil). i18n con react-i18next + detector de navegador. UI 100% Mantine v8 (sin Tailwind). Cada tarea termina en un build limpio y un commit.

**Tech Stack:** Vite 7, React 19, TypeScript 5.8, Mantine v8 (`@mantine/core`, `@mantine/hooks`), `@tabler/icons-react`, `react-router` v7, `react-i18next` + `i18next` + `i18next-browser-languagedetector`, Google Fonts (Source Code Pro + Reenie Beanie).

## Global Constraints

- Workdir de todos los comandos: `/home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2` (los bloques de comando incluyen el `cd`).
- La carpeta ya contiene `docs/` y `.git` — NUNCA borrarlos ni recrear el repo.
- Desarrollo solo local, sin deploy.
- Sin framework de tests: la verificación de cada tarea es `npm run build` (tsc hace de type-check) + revisión visual con `npm run dev`.
- Mantine v8: los componentes de layout `Header`/`Navbar`/`Footer` fueron ELIMINADOS en v8 → header sticky con `Box component="header"`.
- Acento: `#4305ba` en claro / `#9a7ef0` en oscuro → paleta `accent` de 10 tonos + `primaryShade: { light: 6, dark: 3 }`.
- i18n: `es`/`en`/`ja`, detección `['localStorage','navigator']`, caché localStorage, fallback `en`, `load: 'languageOnly'`, `supportedLngs: ['es','en','ja']`. (La spec menciona claves "404" pero la sección Rutas define redirección a `/`, no hay página 404.)
- Fuentes Google: Source Code Pro (principal) + Reenie Beanie (logo "ip."), cargadas en `index.html`.
- Enlaces externos SIEMPRE `target="_blank"` + `rel="noopener noreferrer"`.
- Dark mode: `defaultColorScheme="auto"` + toggle con `useMantineColorScheme().toggleColorScheme()`; clave localStorage `mantine-color-scheme-value`; script anti-flash inline en `index.html`.
- Commits con trailer: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

---

### Task 1: Scaffold Vite + React + TS + Mantine con tema base

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/theme.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Consumes: nada (primera tarea).
- Produces: `theme` exportado de `src/theme.ts` (Mantine `createTheme`); `App` como default export de `src/App.tsx`; scripts npm `dev`/`build`/`preview`; el color primario `accent` usable como `color="accent"` en cualquier componente Mantine.

- [ ] **Step 1: Verificar versión de Node**

Run: `node --version`
Expected: `v20.19.x`, `v22.12.x` o superior (requisito de Vite 7). Si es anterior, parar e instalar Node moderno.

- [ ] **Step 2: Escribir `package.json`, `vite.config.ts`, `tsconfig.json`, `.gitignore`**

`package.json`:
```json
{
  "name": "ivanpastorsimarro-com-v2",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mantine/core": "^8.0.0",
    "@mantine/hooks": "^8.0.0",
    "@tabler/icons-react": "^3.31.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.5.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "^5.8.0",
    "vite": "^7.0.0"
  }
}
```

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vite/client"],
    "esModuleInterop": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

`.gitignore`:
```
node_modules
dist
```

- [ ] **Step 3: Instalar dependencias**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm install`
Expected: `added N packages` sin errores (N ≈ 200-300).

- [ ] **Step 4: Escribir `index.html`** (fuentes + favicon + script anti-flash de Mantine)

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&family=Source+Code+Pro:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>Iván Pastor Simarro</title>
    <script>
      try {
        var stored = localStorage.getItem('mantine-color-scheme-value');
        var scheme =
          stored === 'light' || stored === 'dark'
            ? stored
            : window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
        document.documentElement.dataset.mantineColorScheme = scheme;
      } catch (e) {}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Escribir `src/index.css` y `src/theme.ts`**

`src/index.css`:
```css
html {
  scroll-behavior: smooth;
}

section[id] {
  scroll-margin-top: 72px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

`src/theme.ts`:
```ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: "'Source Code Pro', monospace",
  headings: { fontFamily: "'Source Code Pro', monospace" },
  colors: {
    accent: [
      '#f0ebfc', '#ded1f7', '#bca4ef', '#9a7ef0', '#7d5bea',
      '#6a41dd', '#4305ba', '#3a05a1', '#32048c', '#250367',
    ],
  },
  primaryColor: 'accent',
  primaryShade: { light: 6, dark: 3 },
});
```

- [ ] **Step 6: Escribir `src/main.tsx` y `src/App.tsx` minimal** (sin i18n todavía; se añade en Task 2)

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return <h1>ip.</h1>;
}
```

- [ ] **Step 7: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: `tsc && vite build` sin errores, termina con `✓ built in Xs` y genera `dist/`.

- [ ] **Step 8: Verificación visual rápida**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run dev` (en segundo plano), abrir `http://localhost:5173`
Expected: se ve "ip." en grande con la fuente monoespaciada. Parar el servidor.

- [ ] **Step 9: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: scaffold Vite+React+TS+Mantine con tema base

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```
Expected: commit creado (identidad git eztornado).

---

### Task 2: i18n es/en/ja con detección de idioma

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/i18n/es.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/ja.json`
- Modify: `src/main.tsx` (añadir `import './i18n'`)
- Modify: `src/App.tsx` (rutas + efectos de idioma y scroll)

**Interfaces:**
- Consumes: nada nuevo de Task 1 aparte del scaffold.
- Produces: init de i18n por side-effect (`import './i18n'` en main.tsx); `export type Locale = 'es' | 'en' | 'ja'` y `export function toLocale(lng: string): Locale` desde `src/i18n/index.ts`; claves de traducción `nav.projects`, `nav.socials`, `nav.about`, `nav.contact`, `hero.intro`, `hero.message`, `hero.location`, `project.tech`, `project.links`, `project.inProgress`, `project.prev`, `project.next`, `project.back`, `about.p1`, `about.p2`, `about.stack`, `contact.text`, `contact.button`, `footer.made`.

- [ ] **Step 1: Instalar i18n**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm install i18next react-i18next i18next-browser-languagedetector`
Expected: `added N packages` sin errores.

- [ ] **Step 2: Escribir `src/i18n/index.ts`**

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './es.json';
import en from './en.json';
import ja from './ja.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    ja: { translation: ja },
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  load: 'languageOnly',
  supportedLngs: ['es', 'en', 'ja'],
  detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
});

export type Locale = 'es' | 'en' | 'ja';

export function toLocale(lng: string): Locale {
  return lng.startsWith('es') ? 'es' : lng.startsWith('ja') ? 'ja' : 'en';
}

export default i18n;
```

- [ ] **Step 3: Escribir `src/i18n/es.json`**

```json
{
  "nav": {
    "projects": "Proyectos",
    "socials": "Redes",
    "about": "Sobre mí",
    "contact": "Contacto"
  },
  "hero": {
    "intro": "Hola 👋, me llamo",
    "message": "Soy ingeniero informático y actualmente trabajo como technical leader specialist / desarrollador de software. Busco siempre mejorar mi carrera con proyectos basados en tecnologías en las que tengo amplia experiencia, con nuevos retos y un buen ambiente de trabajo, prefiriendo posiciones remotas.",
    "location": "Alicante, España"
  },
  "project": {
    "tech": "Tecnologías",
    "links": "Enlaces",
    "inProgress": "EN DESARROLLO",
    "prev": "Anterior",
    "next": "Siguiente",
    "back": "Volver a proyectos"
  },
  "about": {
    "p1": "Me llamo Iván Pastor Simarro. Soy technical leader specialist / desarrollador de software con perfil backend. Tengo experiencia con PHP (Laravel, Symfony), Java (Spring) y Vue.js, y disfruto construyendo proyectos desde el diseño hasta producción.",
    "p2": "Fuera del trabajo toco el piano y los sintetizadores, y en los últimos años he empezado a viajar, con especial interés en la cultura japonesa.",
    "stack": "Stack habitual"
  },
  "contact": {
    "text": "La mejor forma de contactar conmigo es LinkedIn.",
    "button": "Escríbeme en LinkedIn"
  },
  "footer": {
    "made": "Hecho con React + Mantine"
  }
}
```

- [ ] **Step 4: Escribir `src/i18n/en.json`**

```json
{
  "nav": {
    "projects": "Projects",
    "socials": "Social",
    "about": "About me",
    "contact": "Contact"
  },
  "hero": {
    "intro": "Hello 👋, my name is",
    "message": "I'm a computer science engineer, currently working as a technical leader specialist / software developer. Always searching to improve my career with projects based on technologies I have extensive experience in, with new challenges and a friendly work environment, preferring remote positions.",
    "location": "Alicante, Spain"
  },
  "project": {
    "tech": "Tech",
    "links": "Links",
    "inProgress": "IN PROGRESS",
    "prev": "Previous",
    "next": "Next",
    "back": "Back to projects"
  },
  "about": {
    "p1": "I'm Iván Pastor Simarro, a technical leader specialist / software developer with a backend profile. I have experience with PHP (Laravel, Symfony), Java (Spring) and Vue.js, and I enjoy building projects from design to production.",
    "p2": "Outside of work I play piano and synths, and in recent years I've been travelling, especially interested in Japanese culture.",
    "stack": "Common stack"
  },
  "contact": {
    "text": "The best way to reach me is LinkedIn.",
    "button": "Contact me on LinkedIn"
  },
  "footer": {
    "made": "Built with React + Mantine"
  }
}
```

- [ ] **Step 5: Escribir `src/i18n/ja.json`**

```json
{
  "nav": {
    "projects": "プロジェクト",
    "socials": "ソーシャル",
    "about": "私について",
    "contact": "お問い合わせ"
  },
  "hero": {
    "intro": "こんにちは👋、",
    "message": "コンピューター工学エンジニアとして、現在はテックリード / ソフトウェア開発者として働いています。豊富な経験がある技術を使ったプロジェクト、新しい挑戦、良い職場環境を求めています。リモートワーク歓迎です。",
    "location": "スペイン・アリカンテ"
  },
  "project": {
    "tech": "使用技術",
    "links": "リンク",
    "inProgress": "開発中",
    "prev": "前のプロジェクト",
    "next": "次のプロジェクト",
    "back": "プロジェクト一覧に戻る"
  },
  "about": {
    "p1": "Iván Pastor Simarroです。バックエンド寄りのテックリード / ソフトウェア開発者です。PHP（Laravel・Symfony）、Java（Spring）、Vue.jsでの開発経験があり、設計から本番リリースまでプロジェクトを作り上げるのが好きです。",
    "p2": "仕事のほかにはピアノやシンセサイザーを弾いています。ここ数年は旅行にも出かけており、とりわけ日本文化に興味があります。",
    "stack": "よく使う技術"
  },
  "contact": {
    "text": "お問い合わせはLinkedInが一番スムーズです。",
    "button": "LinkedInで連絡する"
  },
  "footer": {
    "made": "React + Mantineで構築"
  }
}
```

- [ ] **Step 6: Actualizar `src/main.tsx`** (añadir `import './i18n'`)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import App from './App';
import { theme } from './theme';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 7: Reescribir `src/App.tsx`** (rutas con placeholders; las páginas llegan en Tasks 5-6)

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<div>ip.</div>} />
      <Route path="/projects/:slug" element={<div>detalle</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

- [ ] **Step 8: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores, `✓ built in Xs`.

- [ ] **Step 9: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: i18n es/en/ja con detección de idioma

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Datos de proyectos, redes y perfil + imágenes

**Files:**
- Create: `src/assets/images/` (10 .png copiados de la web original)
- Create: `src/data/socials.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`

**Interfaces:**
- Consumes: nada de las tasks anteriores (solo compilación TS).
- Produces (desde `src/data/projects.ts`):
  - `export type Banner = { type: 'image'; src: string } | { type: 'video'; src: string; poster?: string } | { type: 'youtube'; id: string }`
  - `export interface ProjectLink { label: string; url: string; type: 'web' | 'github' | 'youtube' }`
  - `export interface Project { slug: string; title: string; year: string; banner: Banner; summary: Record<'es' | 'en' | 'ja', string>; description: Record<'es' | 'en' | 'ja', string>; tech: string[]; links: ProjectLink[] }`
  - `export const projects: Project[]` (6 proyectos, orden: pokersolverai, reigreengroup, vocabulariojapones, agustinostv, mc-gamingforce, loadingstudios)
  - `export function getProject(slug: string): Project | undefined`
  - `export function getNeighbors(slug: string): { prev?: Project; next?: Project }`
- Produces (desde `src/data/socials.ts`): `export interface Social { id: 'github' | 'linkedin' | 'spotify' | 'x'; label: string; url: string; handle: string }` y `export const socials: Social[]`
- Produces (desde `src/data/profile.ts`): `export const profile: { name: string; portrait: string; aboutPhoto: string; techStack: string[] }`

- [ ] **Step 1: Copiar imágenes de la web original**

Run:
```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && mkdir -p src/assets/images && cp ../ivanpastorsimarro.com/src/assets/images/{pokersolver1,reigreengroup,vocabulariojapones,agustinostv,mcgamingforce,loadingstudios,ivan,ivan1,ivan2,ivan3}.png src/assets/images/
```

- [ ] **Step 2: Verificar copia**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && ls src/assets/images/`
Expected: exactamente estos 10 ficheros: `agustinostv.png  ivan.png  ivan1.png  ivan2.png  ivan3.png  loadingstudios.png  mcgamingforce.png  pokersolver1.png  reigreengroup.png  vocabulariojapones.png`

- [ ] **Step 3: Escribir `src/data/socials.ts`**

```ts
export interface Social {
  id: 'github' | 'linkedin' | 'spotify' | 'x';
  label: string;
  url: string;
  handle: string;
}

export const socials: Social[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/eztornado',
    handle: '@eztornado',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/iv%C3%A1n-pastor-simarro-9b115a113/',
    handle: 'Iván Pastor Simarro',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    url: 'https://open.spotify.com/user/eztornado',
    handle: 'eztornado',
  },
  {
    id: 'x',
    label: 'X / Twitter',
    url: 'https://twitter.com/eztornado_',
    handle: '@eztornado_',
  },
];
```

- [ ] **Step 4: Escribir `src/data/profile.ts`**

```ts
import ivanPortrait from '../assets/images/ivan.png';
import ivanAbout from '../assets/images/ivan1.png';

export const profile = {
  name: 'Iván Pastor Simarro',
  portrait: ivanPortrait,
  aboutPhoto: ivanAbout,
  techStack: ['PHP', 'VueJs', 'Java', 'Mysql', 'Javascript', 'NodeJs'],
};
```

- [ ] **Step 5: Escribir `src/data/projects.ts`** (6 proyectos con copy trilingüe completo)

```ts
import pokersolverImg from '../assets/images/pokersolver1.png';
import reigreenImg from '../assets/images/reigreengroup.png';
import vocabularioImg from '../assets/images/vocabulariojapones.png';
import agustinostvImg from '../assets/images/agustinostv.png';
import mcgamingforceImg from '../assets/images/mcgamingforce.png';
import loadingImg from '../assets/images/loadingstudios.png';

export type Banner =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'youtube'; id: string };

export interface ProjectLink {
  label: string;
  url: string;
  type: 'web' | 'github' | 'youtube';
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  banner: Banner;
  summary: Record<'es' | 'en' | 'ja', string>;
  description: Record<'es' | 'en' | 'ja', string>;
  tech: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'pokersolverai',
    title: 'Pokersolverai.com',
    year: 'IN PROGRESS',
    banner: { type: 'youtube', id: 'lrY3uv-FJ_Q' },
    summary: {
      es: 'Consejos de póker en tiempo real con IA.',
      en: 'Real-time poker advice powered by AI.',
      ja: 'AIによるリアルタイムのポーカーアドバイス。',
    },
    description: {
      es: 'Servicio web que ofrece consejos en tiempo real para jugar al póker basados en inteligencia artificial. Construido con PHP 8.2 y Laravel 10, usa Redis para cachear grandes cantidades de datos y sistemas de IA de terceros para decidir qué hacer en cada mano en menos de 10 segundos. El frontend está hecho con Vue.js y Quasar Framework, con un diseño mobile first.',
      en: "Web service that offers real-time advice for playing poker games based on artificial intelligence. Built with PHP 8.2 and Laravel 10, it uses Redis to cache large amounts of data and third-party AI systems to decide what to do in each game in less than 10 seconds. The frontend is built with Vue.js and Quasar Framework, with a mobile-first UX.",
      ja: '人工知能を使ってポーカーのリアルタイムなアドバイスを提供するWebサービスです。PHP 8.2とLaravel 10で構築し、大量のデータをRedisでキャッシュし、サードパーティのAIシステムによって各ゲームでの判断を10秒以内に行います。フロントエンドはVue.js + Quasar Frameworkで、モバイルファーストのUX設計です。',
    },
    tech: ['PHP', 'Laravel', 'Redis', 'VueJs'],
    links: [
      { label: 'YouTube', type: 'youtube', url: 'https://www.youtube.com/watch?v=lrY3uv-FJ_Q' },
      { label: 'Web', type: 'web', url: 'https://app.pokersolver.tornadocore.es/auth/login' },
    ],
  },
  {
    slug: 'reigreengroup',
    title: 'Reigreengroup',
    year: '2022-2023',
    banner: { type: 'image', src: reigreenImg },
    summary: {
      es: 'Panel de gestión interna para una agencia energética.',
      en: 'Internal management panel for an energy agency.',
      ja: 'エネルギー会社向けの社内管理パネル。',
    },
    description: {
      es: 'Mi trabajo se centró en el desarrollo completo del panel de gestión interno donde se almacenan los contratos y los datos necesarios de estos para una agencia energética de Barcelona. Construido con Laravel y Vue.js, desplegado en Plesk.',
      en: 'My work focused on the complete development of the internal management panel where contracts and the data needed for them are stored for an energy agency located in Barcelona. Built with Laravel and Vue.js, deployed on Plesk.',
      ja: 'バルセロナのエネルギー会社向けに、契約書とその必要データを管理する社内パネルを開発しました。LaravelとVue.jsで構築し、Pleskにデプロイしています。',
    },
    tech: ['PHP', 'Laravel', 'VueJs', 'Plesk'],
    links: [{ label: 'Web', type: 'web', url: 'https://reigreengroup.com' }],
  },
  {
    slug: 'vocabulariojapones',
    title: 'vocabulariojapones',
    year: '2021',
    banner: { type: 'image', src: vocabularioImg },
    summary: {
      es: 'Web de repaso aleatorio de vocabulario japonés.',
      en: 'Random Japanese vocabulary review site.',
      ja: '日本語単語をランダムに復習できるサイト。',
    },
    description: {
      es: 'Web hecha con Laravel que contiene registros de vocabulario japonés añadidos por mí a partir de los libros que he ido adquiriendo, con el objetivo de ayudarme a recordar el vocabulario que estaba aprendiendo. Su funcionamiento es simple: accedes y te muestra un registro aleatorio, y puedes escuchar la palabra con el Text to Speech integrado en los navegadores compatibles. Planeo ampliar contenido y funcionalidad en el futuro.',
      en: "Website made with Laravel that contains vocabulary records of Japanese words added by myself from the books I've acquired, created to help me remember the vocabulary I was learning. It's simple: open the site and it shows a random record, and you can listen to the word using the Text to Speech built into compatible browsers. I plan to expand its content and functionality in the future.",
      ja: '日本語学習書から自分で追加した単語を記録し、学習した単語を思い出すのを助けるために作ったLaravel製のWebサイトです。アクセスするとランダムに単語が表示され、対応ブラウザの音声読み上げ機能で発音を聞くことができます。今後、コンテンツと機能を拡張する予定です。',
    },
    tech: ['PHP', 'Laravel', 'Mysql'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/vocabulariojapones.com' },
      { label: 'Web', type: 'web', url: 'https://vocabulariojapones.com' },
    ],
  },
  {
    slug: 'agustinostv',
    title: 'AgustinosTV',
    year: '2017-2019',
    banner: { type: 'image', src: agustinostvImg },
    summary: {
      es: 'Plataforma de vídeo bajo demanda y directos para mi instituto.',
      en: 'On-demand and live video platform for my high school.',
      ja: '母校向けのオンデマンド・ライブ配信プラットフォーム。',
    },
    description: {
      es: 'Proyecto creado para el instituto donde estudié: una plataforma interna donde los alumnos podían acceder a vídeos bajo demanda creados por el propio centro gracias a una de sus actividades extracurriculares. En una de sus actualizaciones se añadió el seguimiento de emisiones en directo: con backend en Laravel y un servidor NGINX RTMP, la plataforma permitía seguir los directos vía web, Android o iOS.',
      en: 'Project created for the high school where I studied: an internal platform where students could watch on-demand videos created by the center itself through one of its extracurricular activities. In one of its updates, live broadcasts were added — using a Laravel backend and an NGINX RTMP server, the platform could stream live via web, Android or iOS.',
      ja: '卒業した高校のために作ったプロジェクトです。学校の課外活動で作成された動画を生徒がオンデマンドで視聴できる内部プラットフォームでした。アップデートのひとつでライブ配信機能を追加し、LaravelバックエンドとNGINX RTMPサーバーによって、Web・Android・iOSからライブ視聴が可能になりました。',
    },
    tech: ['PHP', 'Laravel', 'VueJs', 'NGINX', 'Apache', 'Linux'],
    links: [
      { label: 'Front GitHub', type: 'github', url: 'https://github.com/eztornado/AgustinosTV-front' },
      { label: 'API REST GitHub', type: 'github', url: 'https://github.com/eztornado/AgustinosTV-API' },
      { label: 'Archive Web', type: 'web', url: 'https://agustinostv-front.archive.tornadocore.es/#/auth/login' },
    ],
  },
  {
    slug: 'mc-gamingforce',
    title: 'MC GamingForce',
    year: '2017-2019',
    banner: { type: 'image', src: mcgamingforceImg },
    summary: {
      es: 'Parte pública y privada de la web de un servidor de Minecraft.',
      en: 'Public and private site for a Minecraft server.',
      ja: 'Minecraftサーバー用の公開・非公開サイト。',
    },
    description: {
      es: 'La parte pública y privada de una web hecha con PHP Laravel para consultar los datos almacenados en un servidor de Minecraft: estadísticas de jugadores, rankings y herramientas de administración del servidor.',
      en: 'The public and private part of a website made with PHP Laravel to consult the data stored on a Minecraft server: player stats, rankings and server administration tools.',
      ja: 'Minecraftサーバーに保存されたデータを照会するための、PHP Laravel製Webサイトの公開部分と管理部分です。プレイヤーの統計、ランキング、サーバー管理ツールを提供します。',
    },
    tech: ['PHP', 'Laravel', 'Mysql', 'Java'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/Mc-gaming-force.es-WEB' },
      { label: 'Archive Web', type: 'web', url: 'https://mc.gaming-force.archive.tornadocore.es/' },
    ],
  },
  {
    slug: 'loadingstudios',
    title: 'LoadingStudios',
    year: '2014',
    banner: { type: 'image', src: loadingImg },
    summary: {
      es: 'Mi primer proyecto web personal.',
      en: 'My first personal web project.',
      ja: '初めての個人Webプロジェクト。',
    },
    description: {
      es: 'Mi primer proyecto web personal: una landing page para dar a conocer el trabajo mío y de unos amigos en desarrollo web, diseño y multimedia. Hecho con PHP y CodeIgniter.',
      en: "My first personal web project: a landing page to advertise my own and some friends' work on web development, design and multimedia. Built with PHP and CodeIgniter.",
      ja: '初めての個人Webプロジェクト。Web開発・デザイン・マルチメディアに関する自分や友人の仕事を紹介するランディングページで、PHPとCodeIgniterで構築しました。',
    },
    tech: ['PHP', 'CodeIgniter'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/LoadingStudiosWeb' },
      { label: 'Archive Web', type: 'web', url: 'https://loadingstudios.archive.tornadocore.es/' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNeighbors(slug: string): { prev?: Project; next?: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
```

- [ ] **Step 6: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores (tsc valida que cada `Record<'es' | 'en' | 'ja', string>` tenga las 3 claves y que las rutas de import de .png resuelven), `✓ built in Xs`.

- [ ] **Step 7: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: datos de proyectos, redes y perfil + imágenes

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Navbar, Footer y SocialIcon

**Files:**
- Create: `src/components/SocialIcon.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx` (envolver Routes con Navbar + Footer)

**Interfaces:**
- Consumes: `socials: Social[]` y `Social['id']` de Task 3; `toLocale(lng: string): Locale` y claves `nav.*`/`footer.*` de Task 2; `toggleColorScheme` de `@mantine/core`.
- Produces: `export function SocialIcon({ id, size }: { id: 'github' | 'linkedin' | 'spotify' | 'x'; size?: number })`; `export function Navbar()` (sticky, anclas `#inicio/#proyectos/#redes/#about/#contacto`, SegmentedControl de idioma, toggle de tema, Burger+Drawer en móvil); `export function Footer()` (copyright, iconos de redes, texto `footer.made`).

- [ ] **Step 1: Escribir `src/components/SocialIcon.tsx`**

```tsx
import { IconBrandGithub, IconBrandLinkedin, IconBrandSpotify, IconBrandX } from '@tabler/icons-react';
import type { Social } from '../data/socials';

const ICONS = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  spotify: IconBrandSpotify,
  x: IconBrandX,
} as const;

export function SocialIcon({ id, size = 20 }: { id: Social['id']; size?: number }) {
  const Icon = ICONS[id];
  return <Icon size={size} stroke={1.5} />;
}
```

- [ ] **Step 2: Escribir `src/components/Navbar.tsx`**

```tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { toLocale } from '../i18n';

const SECTIONS = [
  { id: 'proyectos', key: 'nav.projects' },
  { id: 'redes', key: 'nav.socials' },
  { id: 'about', key: 'nav.about' },
  { id: 'contacto', key: 'nav.contact' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, setOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('light', { getRootElement: true });

  function scrollToSection(id: string) {
    setOpened(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const langSwitch = (
    <SegmentedControl
      size="xs"
      value={toLocale(i18n.language)}
      onChange={(lng) => i18n.changeLanguage(lng)}
      data={[
        { value: 'es', label: 'ES' },
        { value: 'en', label: 'EN' },
        { value: 'ja', label: 'JA' },
      ]}
    />
  );

  const themeToggle = (
    <ActionIcon variant="default" size="lg" onClick={() => toggleColorScheme()} aria-label="Toggle theme">
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--mantine-color-default-border)',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Group h={60} px="md" justify="space-between">
        <Anchor
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('inicio');
          }}
          style={{ textDecoration: 'none' }}
        >
          <Title order={3} style={{ fontFamily: "'Reenie Beanie', cursive", fontSize: 34 }}>
            ip.
          </Title>
        </Anchor>

        <Group gap="md" visibleFrom="sm">
          {SECTIONS.map((s) => (
            <Anchor
              key={s.id}
              c="dimmed"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id);
              }}
            >
              {t(s.key)}
            </Anchor>
          ))}
          {langSwitch}
          {themeToggle}
        </Group>

        <Group gap="sm" hiddenFrom="sm">
          {langSwitch}
          {themeToggle}
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" />
        </Group>
      </Group>

      <Drawer opened={opened} onClose={() => setOpened(false)} position="top" size="auto">
        <Stack gap="md">
          {SECTIONS.map((s) => (
            <Anchor key={s.id} fz="xl" onClick={() => scrollToSection(s.id)}>
              {t(s.key)}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
```

- [ ] **Step 3: Escribir `src/components/Footer.tsx`**

```tsx
import { Anchor, Container, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { socials } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export function Footer() {
  const { t } = useTranslation();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" wrap="wrap">
        <Text c="dimmed" fz="sm">
          © {new Date().getFullYear()} Iván Pastor Simarro
        </Text>
        <Group gap="sm">
          {socials.map((s) => (
            <Anchor
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              c="dimmed"
            >
              <SocialIcon id={s.id} size={20} />
            </Anchor>
          ))}
        </Group>
        <Text c="dimmed" fz="sm">{t('footer.made')}</Text>
      </Group>
    </Container>
  );
}
```

- [ ] **Step 4: Reescribir `src/App.tsx`** (Navbar + Footer alrededor de las rutas con placeholders)

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>ip.</div>} />
        <Route path="/projects/:slug" element={<div>detalle</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores, `✓ built in Xs`.

- [ ] **Step 6: Verificación visual**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run dev` (en segundo plano), abrir `http://localhost:5173`
Expected:
- Header sticky con logo "ip." en Reenie Beanie, 4 anclas, selector ES/EN/JA y botón de tema.
- Al cambiar idioma, los enlaces de la navbar cambian y `<html lang>` se actualiza (inspeccionar en DevTools).
- El toggle cambia claro/oscuro y el acento pasa de `#4305ba` a `#9a7ef0`; tras recargar, se mantiene.
- Con viewport < 768px aparecen Burger + Drawer; las anclas del drawer hacen scroll y lo cierran.
Parar el servidor.

- [ ] **Step 7: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: navbar y footer (anclas, idioma, tema)

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: HomePage con cards (hero, proyectos, redes, about, contacto)

**Files:**
- Create: `src/components/TechBadge.tsx`
- Create: `src/components/Reveal.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/SocialCard.tsx`
- Create: `src/pages/HomePage.tsx`
- Modify: `src/App.tsx` (usar HomePage en la ruta `/`)

**Interfaces:**
- Consumes: `projects`, `Project` de Task 3; `socials`, `Social` y `profile` de Task 3; `SocialIcon` de Task 4; `toLocale`, claves `nav.*`/`hero.*`/`about.*`/`contact.*`/`project.inProgress` de Task 2.
- Produces: `export function TechBadge({ label }: { label: string })`; `export function Reveal({ children, delay }: { children: ReactNode; delay?: number })`; `export function ProjectCard({ project }: { project: Project })`; `export function SocialCard({ social }: { social: Social })`; `export function HomePage()` (secciones con `id` = `inicio`, `proyectos`, `redes`, `about`, `contacto`).

- [ ] **Step 1: Escribir `src/components/TechBadge.tsx`**

```tsx
import { Badge } from '@mantine/core';

export function TechBadge({ label }: { label: string }) {
  return <Badge variant="light" color="accent">{label}</Badge>;
}
```

- [ ] **Step 2: Escribir `src/components/Reveal.tsx`**

```tsx
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Box } from '@mantine/core';

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}
```

- [ ] **Step 3: Escribir `src/components/ProjectCard.tsx`**

```tsx
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Box, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import type { Project } from '../data/projects';
import { toLocale } from '../i18n';
import { TechBadge } from './TechBadge';

export function ProjectCard({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const locale = toLocale(i18n.language);

  function bannerSrc() {
    if (project.banner.type === 'youtube') {
      return `https://img.youtube.com/vi/${project.banner.id}/hqdefault.jpg`;
    }
    return project.banner.src;
  }

  return (
    <Card
      component={Link}
      to={`/projects/${project.slug}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <Card.Section>
        <Box style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <Image src={bannerSrc()} fit="cover" w="100%" h="100%" alt={project.title} />
        </Box>
      </Card.Section>
      <Stack gap="xs" mt="md">
        <Group justify="space-between" wrap="nowrap" gap="sm">
          <Title order={4}>{project.title}</Title>
          <Badge variant="light" color="accent" style={{ flexShrink: 0 }}>
            {project.year === 'IN PROGRESS' ? t('project.inProgress') : project.year}
          </Badge>
        </Group>
        <Text c="dimmed" fz="sm" lineClamp={3}>
          {project.summary[locale]}
        </Text>
        <Group gap="xs" mt="xs">
          {project.tech.slice(0, 4).map((label) => (
            <TechBadge key={label} label={label} />
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
```

- [ ] **Step 4: Escribir `src/components/SocialCard.tsx`**

```tsx
import { Anchor, Card, Group, Stack, Text } from '@mantine/core';
import type { Social } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export function SocialCard({ social }: { social: Social }) {
  return (
    <Card
      component={Anchor}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ textDecoration: 'none' }}
    >
      <Group wrap="nowrap" gap="md">
        <SocialIcon id={social.id} size={28} />
        <Stack gap={0}>
          <Text fw={600}>{social.label}</Text>
          <Text c="dimmed" fz="sm">{social.handle}</Text>
        </Stack>
      </Group>
    </Card>
  );
}
```

- [ ] **Step 5: Escribir `src/pages/HomePage.tsx`**

```tsx
import { Anchor, Avatar, Box, Button, Container, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { socials } from '../data/socials';
import { ProjectCard } from '../components/ProjectCard';
import { SocialCard } from '../components/SocialCard';
import { TechBadge } from '../components/TechBadge';
import { Reveal } from '../components/Reveal';

function SectionTitle({ children }: { children: string }) {
  return (
    <Title order={2} mb="lg">
      <Text component="span" c="accent" inherit>#</Text> {children}
    </Title>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const linkedin = socials.find((s) => s.id === 'linkedin');

  return (
    <Container size="lg">
      <Group id="inicio" justify="space-between" align="center" py="xl" wrap="nowrap" gap="lg">
        <Stack gap="sm">
          <Text c="dimmed">{t('hero.intro')}</Text>
          <Title order={1}>{profile.name}</Title>
          <Text maw={520}>{t('hero.message')}</Text>
          <Text c="dimmed" fz="sm">📍 {t('hero.location')}</Text>
        </Stack>
        <Avatar
          src={profile.portrait}
          size={220}
          visibleFrom="sm"
          style={{ boxShadow: 'var(--mantine-shadow-xl)' }}
        />
      </Group>

      <Box component="section" id="proyectos" py="xl">
        <SectionTitle>{t('nav.projects')}</SectionTitle>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </SimpleGrid>
      </Box>

      <Box component="section" id="redes" py="xl">
        <SectionTitle>{t('nav.socials')}</SectionTitle>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {socials.map((social) => (
            <SocialCard key={social.id} social={social} />
          ))}
        </SimpleGrid>
      </Box>

      <Box component="section" id="about" py="xl">
        <SectionTitle>{t('nav.about')}</SectionTitle>
        <Group align="center" gap="xl">
          <Image src={profile.aboutPhoto} w={280} radius="md" visibleFrom="sm" />
          <Stack gap="sm" style={{ flex: 1 }}>
            <Text>{t('about.p1')}</Text>
            <Text>{t('about.p2')}</Text>
            <Text fw={600} mt="sm">{t('about.stack')}</Text>
            <Group gap="xs">
              {profile.techStack.map((label) => (
                <TechBadge key={label} label={label} />
              ))}
            </Group>
          </Stack>
        </Group>
      </Box>

      <Box component="section" id="contacto" py="xl">
        <SectionTitle>{t('nav.contact')}</SectionTitle>
        <Stack align="center" gap="md" py="md">
          <Text>{t('contact.text')}</Text>
          <Button
            component={Anchor}
            href={linkedin?.url}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
          >
            {t('contact.button')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
```

- [ ] **Step 6: Actualizar `src/App.tsx`** (HomePage en la ruta `/`)

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<div>detalle</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores, `✓ built in Xs`.

- [ ] **Step 8: Verificación visual**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run dev` (en segundo plano), abrir `http://localhost:5173`
Expected:
- Hero con intro, nombre, mensaje, ubicación y retrato circular con sombra (a partir de 768px).
- Sección Proyectos: 6 cards (grid 1/2/3 columnas) con banner, título, año (pokersolverai muestra "EN DESARROLLO"/"IN PROGRESS"/"開発中" según idioma), summary y tech badges; aparecen con fade al hacer scroll.
- Sección Redes: 4 cards con icono de marca, label y handle; los enlaces abren en pestaña nueva.
- Sección About: foto + 2 párrafos + stack con badges.
- Sección Contacto: botón que abre LinkedIn en pestaña nueva.
- Las anclas de la navbar hacen scroll suave a cada sección (con offset por el header sticky).
Parar el servidor.

- [ ] **Step 9: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: home (hero, proyectos, redes, about, contacto)

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: ProjectDetailPage con banner

**Files:**
- Create: `src/pages/ProjectDetailPage.tsx`
- Modify: `src/App.tsx` (usar ProjectDetailPage en `/projects/:slug`)

**Interfaces:**
- Consumes: `getProject`, `getNeighbors`, `Project`, `Banner` de Task 3; `toLocale`, claves `project.*` de Task 2; `TechBadge` de Task 5; `useParams`, `Navigate`, `Link` de react-router.
- Produces: `export function ProjectDetailPage()` — slug desconocido → `<Navigate to="/" replace />`; renderiza banner según tipo (youtube → iframe 16/9, video → `<video controls poster>`, image → `<Image>`), descripción por párrafos, links con icono por tipo, tech y navegación prev/next.

- [ ] **Step 1: Escribir `src/pages/ProjectDetailPage.tsx`**

```tsx
import { Link, Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandGithub, IconBrandYoutube, IconWorld } from '@tabler/icons-react';
import { getNeighbors, getProject, type Banner, type Project } from '../data/projects';
import { toLocale } from '../i18n';
import { TechBadge } from '../components/TechBadge';

const LINK_ICONS = {
  web: IconWorld,
  github: IconBrandGithub,
  youtube: IconBrandYoutube,
} as const;

function ProjectBanner({ banner, title }: { banner: Banner; title: string }) {
  if (banner.type === 'youtube') {
    return (
      <Box style={{ aspectRatio: '16 / 9' }} w="100%">
        <iframe
          src={`https://www.youtube.com/embed/${banner.id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0, borderRadius: 'var(--mantine-radius-md)' }}
        />
      </Box>
    );
  }
  if (banner.type === 'video') {
    return (
      <video
        controls
        poster={banner.poster}
        src={banner.src}
        style={{ width: '100%', borderRadius: 'var(--mantine-radius-md)' }}
      />
    );
  }
  return <Image src={banner.src} radius="md" alt={title} />;
}

function ProjectBody({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const locale = toLocale(i18n.language);
  const { prev, next } = getNeighbors(project.slug);

  return (
    <>
      <Group justify="space-between" wrap="nowrap" mt="md" mb="lg" gap="sm">
        <Title order={1}>{project.title}</Title>
        <Badge variant="light" color="accent" style={{ flexShrink: 0 }}>
          {project.year === 'IN PROGRESS' ? t('project.inProgress') : project.year}
        </Badge>
      </Group>

      <ProjectBanner banner={project.banner} title={project.title} />

      <Stack gap="md" mt="xl">
        {project.description[locale].split('\n\n').map((paragraph, i) => (
          <Text key={i}>{paragraph}</Text>
        ))}
      </Stack>

      {project.links.length > 0 && (
        <>
          <Title order={4} mt="xl" mb="sm">{t('project.links')}</Title>
          <Group gap="sm">
            {project.links.map((link) => {
              const Icon = LINK_ICONS[link.type];
              return (
                <Button
                  key={link.url}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  color="accent"
                  leftSection={<Icon size={16} />}
                >
                  {link.label}
                </Button>
              );
            })}
          </Group>
        </>
      )}

      <Title order={4} mt="xl" mb="sm">{t('project.tech')}</Title>
      <Group gap="xs">
        {project.tech.map((label) => (
          <TechBadge key={label} label={label} />
        ))}
      </Group>

      <Group
        justify="space-between"
        mt="xl"
        pt="md"
        style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
      >
        {prev && (
          <Anchor
            component={Link}
            to={`/projects/${prev.slug}`}
            aria-label={t('project.prev')}
            fz="sm"
          >
            ← {prev.title}
          </Anchor>
        )}
        {next && (
          <Anchor
            component={Link}
            to={`/projects/${next.slug}`}
            aria-label={t('project.next')}
            fz="sm"
          >
            {next.title} →
          </Anchor>
        )}
      </Group>
    </>
  );
}

export function ProjectDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const project = getProject(slug ?? '');

  if (!project) return <Navigate to="/" replace />;

  return (
    <Container size="md" py="xl">
      <Anchor component={Link} to="/" c="dimmed" fz="sm">
        ← {t('project.back')}
      </Anchor>
      <ProjectBody project={project} />
    </Container>
  );
}
```

- [ ] **Step 2: Reescribir `src/App.tsx`** (versión final)

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build de verificación**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores (incluido el narrowing del union `Banner`), `✓ built in Xs`.

- [ ] **Step 4: Verificación visual**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run dev` (en segundo plano)
Expected, visitando una a una:
- `/projects/pokersolverai` — embed de YouTube 16/9 reproducible, badge "EN DESARROLLO"/"IN PROGRESS"/"開発中", 2 botones de links con iconos, navegación ← vocabulariojapones / reigreengroup → (ciclo circular).
- `/projects/reigreengroup`, `/projects/vocabulariojapones`, `/projects/agustinostv`, `/projects/mc-gamingforce`, `/projects/loadingstudios` — banner imagen, descripción en el idioma activo, links correctos, prev/next ciclan (loadingstudios → pokersolverai).
- `/projects/no-existe` — redirige a `/`.
- El enlace "← Volver a proyectos" navega a `/`.
- Los links de cada detalle abren en pestaña nueva.
Parar el servidor.

- [ ] **Step 5: Commit**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
feat: página de detalle de proyecto con banner

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Verificación final

**Files:**
- Modify: solo si la verificación destapa incidencias.

**Interfaces:**
- Consumes: todo lo construido en Tasks 1-6.
- Produces: sitio completo verificado contra la spec.

- [ ] **Step 1: Build final**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run build`
Expected: sin errores ni warnings de TS, `✓ built in Xs`, `dist/` generado.

- [ ] **Step 2: Checklist visual completo**

Run: `cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && npm run dev` (en segundo plano), abrir `http://localhost:5173` y recorrer:
- Home: 5 secciones (`#inicio`, `#proyectos`, `#redes`, `#about`, `#contacto`) con scroll suave desde la navbar.
- Las 6 páginas de detalle: `/projects/pokersolverai`, `/projects/reigreengroup`, `/projects/vocabulariojapones`, `/projects/agustinostv`, `/projects/mc-gamingforce`, `/projects/loadingstudios`.
- Los 3 idiomas vía SegmentedControl: ES/EN/JA renderizan todo (incluidos summaries y descripciones de proyectos); `<html lang>` cambia; el idioma persiste tras recargar.
- Dark/light: toggle funciona, sigue al sistema por defecto, persiste tras recargar y no hay flash de tema equivocado al arrancar.
- Móvil (< 768px): burger + drawer funcionan; el hero oculta el retrato; grids colapsan a 1 columna.
- Enlaces: redes y links de proyecto apuntan a las URLs de `src/data/` y abren con `target="_blank" rel="noopener noreferrer"` (inspeccionar al menos GitHub, LinkedIn y un link de proyecto).
- Slug inválido `/projects/xxx` → redirige a `/`.
Parar el servidor.

- [ ] **Step 3: Commit solo si hay cambios**

```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git status --porcelain
```
Expected: vacío. Si hay cambios (fixes de la verificación), corregirlos y commitear:
```bash
cd /home/ivan/Documentos/GitHub/ivanpastorsimarro.com-v2 && git add -A && git commit -m "$(cat <<'EOF'
fix: ajustes de la verificación final

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```
