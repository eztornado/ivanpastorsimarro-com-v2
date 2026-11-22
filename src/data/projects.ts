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
