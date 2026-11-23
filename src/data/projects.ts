import pokersolverImg from '../assets/images/pokersolver1.png';
import reigreenImg from '../assets/images/reigreengroup.png';
import vocabularioImg from '../assets/images/vocabulariojapones.png';
import agustinostvImg from '../assets/images/agustinostv.png';
import mcgamingforceImg from '../assets/images/mcgamingforce.png';
import loadingImg from '../assets/images/loadingstudios.png';
import ezMusicImg from '../assets/images/ezmusicproduction.jpg';
import ezCommerceImg from '../assets/images/ezcommerce.jpg';
import eventManagerImg from '../assets/images/eventmanager.jpg';
import statusPageImg from '../assets/images/projects-status-page.jpg';
import ocrImg from '../assets/images/ocr-microservice.jpg';
import rotaryImg from '../assets/images/rotary-santa-susanna.jpg';
import quantumCardsImg from '../assets/images/quantumcards.jpg';
import infoelectricaImg from '../assets/images/infoelectrica.jpg';

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
    slug: 'ezmusicproduction',
    title: 'EZMusicProduction',
    year: '2026',
    banner: { type: 'image', src: ezMusicImg },
    summary: {
      es: 'DAW open source multiplataforma con instrumentos, efectos, IA y más de 21.000 sonidos.',
      en: 'Open-source cross-platform DAW with instruments, effects, AI and 21,000+ sounds.',
      ja: '楽器・エフェクト・AI・21,000以上のサウンドを備えたオープンソースDAW。',
    },
    description: {
      es: 'EZMusicProduction es un DAW open source para macOS, Linux y Windows que reúne grabación, edición, mezcla y automatización en una sola ventana. Incluye cuatro instrumentos propios (EZInstruments, EZSynth, EZDrums y EZOrquestra), una librería de más de 21.000 sonidos libres, efectos integrados y herramientas de IA para mezclar, estructurar canciones y generar melodías.\n\nLa interfaz está construida con Flutter y el motor de audio con C++20 y JUCE. También incorpora Piano Roll, soporte para plugins AU/VST3, control por MIDI, importación de proyectos de Cubase en modo lectura, exportación WAV y una app de control remoto para Android. La aplicación, la web y la documentación están disponibles en abierto.',
      en: 'EZMusicProduction is an open-source DAW for macOS, Linux and Windows that brings recording, editing, mixing and automation into a single window. It ships with four built-in instruments (EZInstruments, EZSynth, EZDrums and EZOrquestra), a library of more than 21,000 free sounds, built-in effects and AI tools for mixing, song structuring and melody generation.\n\nThe interface is built with Flutter and the audio engine with C++20 and JUCE. It also includes a piano roll, AU/VST3 plugin support, MIDI controller support, read-only Cubase project import, WAV export and an Android remote-control app. The application, website and documentation are all open source.',
      ja: 'EZMusicProductionは、macOS・Linux・Windows向けのオープンソースDAWです。録音、編集、ミックス、オートメーションをひとつのウィンドウにまとめ、EZInstruments、EZSynth、EZDrums、EZOrquestraの4つの内蔵楽器、21,000以上の無料サウンド、内蔵エフェクト、ミックスや曲構成、メロディ生成を支援するAIツールを搭載しています。\n\nUIはFlutter、オーディオエンジンはC++20とJUCEで構築しています。ピアノロール、AU/VST3プラグイン、MIDIコントローラー、Cubaseプロジェクトの読み取り専用インポート、WAV書き出し、Android向けリモコンアプリも備えています。アプリ、Webサイト、ドキュメントはすべてオープンソースです。',
    },
    tech: ['C++', 'JUCE', 'Flutter', 'Dart', 'Python'],
    links: [
      { label: 'Web', type: 'web', url: 'https://ezmusicproduction.com' },
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/EZMusicProduction' },
      { label: 'Descargas', type: 'web', url: 'https://github.com/eztornado/EZMusicProduction/releases/latest' },
    ],
  },
  {
    slug: 'ezcommerce',
    title: 'EzCommerce',
    year: '2026',
    banner: { type: 'image', src: ezCommerceImg },
    summary: {
      es: 'E-commerce full-stack con API en Rust, frontend React y panel de administración.',
      en: 'Full-stack e-commerce with a Rust API, React frontend and admin panel.',
      ja: 'Rust API・Reactフロントエンド・管理画面を備えたフルスタックEC。',
    },
    description: {
      es: 'EzCommerce es una plataforma de comercio electrónico completa: tienda online responsive y panel de administración, con backend API en Rust (Larust) y frontend React + Mantine. Incluye catálogo con búsqueda y filtros, productos configurables con variantes, carrito de invitado y registrado, cupones, checkout en una página, cuentas de cliente, pedidos, devoluciones, envíos multi-almacén y reseñas.\n\nEl panel de administración añade métricas de ventas, un DataGrid genérico con exportación CSV, gestión de productos y categorías, reglas de marketing, CMS, idiomas, monedas, usuarios y roles con ACL. La API resuelve autenticación JWT, cálculo de impuestos y envíos, reservas de stock y precios materializados. Se despliega con Docker y usa MySQL/MariaDB en producción y SQLite en desarrollo.',
      en: 'EzCommerce is a complete e-commerce platform: a responsive storefront and an admin panel, with a Rust API backend (Larust) and a React + Mantine frontend. It covers catalog search and filters, configurable products with variants, guest and registered carts, coupons, one-page checkout, customer accounts, orders, refunds, multi-warehouse shipping and reviews.\n\nThe admin panel adds sales metrics, a generic DataGrid with CSV export, product and category management, marketing rules, CMS, languages, currencies, users and ACL roles. The API handles JWT authentication, tax and shipping calculation, stock reservation and materialized prices. It deploys with Docker and uses MySQL/MariaDB in production and SQLite in development.',
      ja: 'EzCommerceは、レスポンシブなオンラインストアと管理画面を備えたフルスタックのECプラットフォームです。バックエンドはRust（Larust）、フロントエンドはReact + Mantineで構築しています。カタログ検索・絞り込み、バリエーション付き商品、ゲスト／会員カート、クーポン、ワンページチェックアウト、顧客アカウント、注文、返金、複数倉庫の配送、レビューをカバーします。\n\n管理画面では売上指標、CSV出力付きDataGrid、商品・カテゴリ管理、マーケティングルール、CMS、言語、通貨、ユーザーとACLロールを管理できます。APIはJWT認証、税金・送料計算、在庫予約、マテリアライズド価格を処理します。Dockerでデプロイし、本番はMySQL/MariaDB、開発はSQLiteを使用します。',
    },
    tech: ['Rust', 'Larust', 'React', 'Mantine', 'MySQL', 'Docker'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/EzCommerce' },
    ],
  },
  {
    slug: 'eventmanager',
    title: 'EventManager',
    year: '2026',
    banner: { type: 'image', src: eventManagerImg },
    summary: {
      es: 'Plataforma de eventos y venta de entradas con backoffice para organizadores.',
      en: 'Event and ticketing platform with a backoffice for organizers.',
      ja: '主催者向けバックオフィスを備えたイベント・チケット販売プラットフォーム。',
    },
    description: {
      es: 'EventManager es una plataforma de eventos y registros con una tienda pública para asistentes y un backoffice para organizadores. Cubre venta de entradas, formatos y tarifas, cupones, regalos, seguimiento de pedidos y gestión de clubes, con soporte para eventos deportivos, congresos, conciertos, actividades culturales y talleres.\n\nEl backend está hecho en Rust con Larust (Axum), SQLx y SQLite, y el frontend en React 19 + TypeScript + Mantine + TanStack Query. Incluye autenticación JWT con roles, checkout multipaso con campos dinámicos, pasarela de pago simulada o Stripe Checkout real, y despliegue con Docker/Coolify.',
      en: 'EventManager is an event and registration platform with a public store for attendees and a backoffice for organizers. It covers ticket sales, formats and pricing, coupons, gifts, order tracking and club management, supporting sports events, conferences, concerts, cultural activities and workshops.\n\nThe backend is built with Rust, Larust (Axum), SQLx and SQLite, while the frontend uses React 19, TypeScript, Mantine and TanStack Query. It includes JWT authentication with roles, a multi-step checkout with dynamic fields, a simulated payment gateway or real Stripe Checkout, and Docker/Coolify deployment.',
      ja: 'EventManagerは、参加者向けの公開ストアと主催者向けバックオフィスを備えたイベント・登録プラットフォームです。チケット販売、形式と料金、クーポン、ギフト、注文追跡、クラブ管理をひとつにまとめ、スポーツイベント、カンファレンス、コンサート、文化イベント、ワークショップに対応します。\n\nバックエンドはRust、Larust（Axum）、SQLx、SQLite、フロントエンドはReact 19、TypeScript、Mantine、TanStack Queryで構築しています。ロール付きJWT認証、動的フィールド付きの多段階チェックアウト、シミュレーション決済または実際のStripe Checkout、Docker/Coolifyデプロイを備えています。',
    },
    tech: ['Rust', 'Larust', 'React', 'TypeScript', 'Mantine', 'SQLite', 'Docker'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/EventManager' },
    ],
  },
  {
    slug: 'projects-status-page',
    title: 'Projects Status Page',
    year: '2026',
    banner: { type: 'image', src: statusPageImg },
    summary: {
      es: 'Página de estado self-hosted y white-label para monitorizar servicios.',
      en: 'Self-hosted, white-label status page for monitoring services.',
      ja: 'サービス監視用のセルフホスト型ホワイトラベル・ステータスページ。',
    },
    description: {
      es: 'Projects Status Page es una página de estado self-hosted y white-label pensada para desplegarse en Coolify con un solo contenedor: backend Python (FastAPI) que sirve el frontend compilado en React y Vite.\n\nMonitoriza cada cinco minutos servicios HTTP(S) y bases de datos MySQL/MariaDB, guarda el histórico de uptime en SQLite con retención de siete días y expone una API REST con estado, histórico y healthcheck. Toda la configuración (nombre del proyecto y servicios) se define con variables de entorno, así que se puede entregar a un cliente creando un nuevo recurso. Incluye notificaciones opcionales por Telegram cuando un servicio cae o se recupera.',
      en: 'Projects Status Page is a self-hosted, white-label status page designed to be deployed on Coolify as a single container: a Python backend (FastAPI) serving the compiled React + Vite frontend.\n\nIt checks HTTP(S) services and MySQL/MariaDB databases every five minutes, stores uptime history in SQLite with seven-day retention, and exposes a REST API for status, history and health checks. All configuration (project name and services) lives in environment variables, so the project can be handed to a client by creating a new resource. Optional Telegram notifications alert when a service goes down or recovers.',
      ja: 'Projects Status Pageは、Coolifyで単一コンテナとして運用できるセルフホスト型・ホワイトラベルのステータスページです。Pythonバックエンド（FastAPI）が、ビルド済みのReact + Viteフロントエンドを配信します。\n\n5分ごとにHTTP(S)サービスとMySQL/MariaDBデータベースを監視し、稼働履歴をSQLiteに7日間保持します。状態、履歴、ヘルスチェック用のREST APIも提供します。プロジェクト名や監視対象はすべて環境変数で設定するため、クライアントごとに新しいリソースを作るだけで納品できます。サービス停止・復旧時のTelegram通知にも対応しています。',
    },
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Docker'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/projects-status-page' },
      { label: 'Web', type: 'web', url: 'https://status.reigreengroup.com' },
    ],
  },
  {
    slug: 'ocr-microservice',
    title: 'OCR Microservice',
    year: '2026',
    banner: { type: 'image', src: ocrImg },
    summary: {
      es: 'API REST de OCR con modelos de visión locales, colas asíncronas y control de acceso.',
      en: 'OCR REST API with local vision models, async queues and API-key access control.',
      ja: 'ローカル視覚モデル・非同期キュー・APIキー認証を備えたOCR REST API。',
    },
    description: {
      es: 'OCR Microservice es una API REST para procesar documentos con OCR usando modelos de visión que se ejecutan en local mediante Ollama o cualquier servidor compatible con OpenAI (llama.cpp, vLLM, LM Studio...). Acepta imágenes y PDF completos, y permite trabajos asíncronos para documentos que tardan más de diez minutos.\n\nEstá construida con FastAPI, MySQL y Redis: MySQL guarda las claves de API y las estadísticas, mientras que Redis gestiona la cola de trabajos y los resultados. Incluye autenticación por API key, rate limiting, prompts personalizables por tipo de documento (basta con añadir un `.txt`), logs con rotación diaria y despliegue con Docker Compose.',
      en: 'OCR Microservice is a REST API for OCR document processing using local vision models served by Ollama or any OpenAI-compatible server (llama.cpp, vLLM, LM Studio...). It accepts images and full PDFs, and supports asynchronous jobs for documents that take more than ten minutes.\n\nIt is built with FastAPI, MySQL and Redis: MySQL stores API keys and statistics, while Redis handles the job queue and results. It includes API-key authentication, rate limiting, customisable prompts per document type (just add a `.txt` file), daily rotating logs and Docker Compose deployment.',
      ja: 'OCR Microserviceは、OllamaやOpenAI互換サーバー（llama.cpp、vLLM、LM Studioなど）で動くローカル視覚モデルを使ったOCR用REST APIです。画像とPDF全体を処理でき、10分以上かかる文書向けの非同期ジョブにも対応しています。\n\nFastAPI、MySQL、Redisで構築しています。MySQLはAPIキーと統計を保存し、Redisはジョブキューと結果を管理します。APIキー認証、レート制限、文書タイプごとのカスタムプロンプト（`.txt`を追加するだけ）、日次ローテーションログ、Docker Composeデプロイを備えています。',
    },
    tech: ['Python', 'FastAPI', 'Redis', 'MySQL', 'Docker', 'Ollama'],
    links: [
      { label: 'GitHub', type: 'github', url: 'https://github.com/eztornado/ocr-microservice' },
      { label: 'API Docs', type: 'web', url: 'https://ocr.reigreengroup.com/docs' },
    ],
  },
  {
    slug: 'rotary-santa-susanna',
    title: 'Rotary Santa Susana',
    year: '2026',
    banner: { type: 'image', src: rotaryImg },
    summary: {
      es: 'Web y gestor de contenidos para el club Rotary Santa Susana Costa Barcelona.',
      en: 'Website and content manager for the Rotary Club Santa Susana Costa Barcelona.',
      ja: 'Rotary Club Santa Susana Costa BarcelonaのWebサイトとコンテンツ管理システム。',
    },
    description: {
      es: 'Sitio web del Rotary Club Santa Susana Costa Barcelona, una organización de servicio a la comunidad. La web pública reúne noticias, agenda y eventos, hermanamientos con clubes internacionales, patrocinadores, socios, contacto y donaciones, además de inscripción a eventos.\n\nIncluye un panel de administración a medida para gestionar noticias, eventos, socios y páginas, con soporte multilingüe en catalán, español, inglés y francés. El frontend está construido con React, TypeScript y Mantine, se distribuye como PWA instalable y consume una API REST propia. El resultado es una presencia digital completa y fácil de mantener para el club.',
      en: 'Website for the Rotary Club Santa Susana Costa Barcelona, a community service organisation. The public site brings together news, agenda and events, twinning with international clubs, sponsors, members, contact and donations, plus event registration.\n\nIt includes a custom admin panel to manage news, events, members and pages, with multilingual support in Catalan, Spanish, English and French. The frontend is built with React, TypeScript and Mantine, ships as an installable PWA and consumes its own REST API. The result is a complete, easy-to-maintain digital presence for the club.',
      ja: '地域奉仕団体Rotary Club Santa Susana Costa BarcelonaのWebサイトです。公開サイトではニュース、予定表、イベント、海外クラブとの姉妹提携、スポンサー、会員、お問い合わせ、寄付、イベント申し込みをまとめて掲載しています。\n\nニュース、イベント、会員、ページを管理する独自の管理画面を備え、カタルーニャ語、スペイン語、英語、フランス語に対応しています。フロントエンドはReact、TypeScript、Mantineで構築し、インストール可能なPWAとして配信され、独自のREST APIを利用します。クラブにとって維持しやすい、完全なデジタルプレゼンスを実現しました。',
    },
    tech: ['React', 'TypeScript', 'Mantine', 'PWA', 'REST API', 'i18n'],
    links: [
      { label: 'Web', type: 'web', url: 'https://rotarysantasusanna.org' },
    ],
  },
  {
    slug: 'quantumcards',
    title: 'QuantumCards',
    year: '2026',
    banner: { type: 'image', src: quantumCardsImg },
    summary: {
      es: 'Tarjetas de visita digitales y tienda online para empresas, con panel de gestión.',
      en: 'Digital business cards and online stores for companies, with an admin panel.',
      ja: '企業向けデジタル名刺とオンラインストア、管理画面を備えたSaaS。',
    },
    description: {
      es: 'QuantumCards (tarjetaweb.es) es una plataforma SaaS de tarjetas de visita digitales: cada empresa o profesional crea una presentación web con su información de contacto, ubicación, redes sociales, catálogo de productos o servicios y descarga de vCard. La plataforma incluye además una tienda online, carrito, checkout, suscripciones y gestión de pedidos.\n\nEl frontend está construido con React, TypeScript y Mantine, y consume una API REST propia. El panel de administración permite gestionar empresas, usuarios, productos, categorías, pedidos, clientes, roles y permisos, idiomas, monedas y contenido. Es una solución white-label pensada para que cada negocio tenga su propia tarjeta digital y su escaparate online.',
      en: 'QuantumCards (tarjetaweb.es) is a SaaS platform for digital business cards: each company or professional creates a web presentation with contact details, location, social links, a product or service catalog and vCard download. The platform also includes an online store, cart, checkout, subscriptions and order management.\n\nThe frontend is built with React, TypeScript and Mantine and consumes its own REST API. The admin panel manages companies, users, products, categories, orders, customers, roles and permissions, languages, currencies and content. It is a white-label solution designed to give every business its own digital card and online storefront.',
      ja: 'QuantumCards（tarjetaweb.es）は、デジタル名刺のSaaSプラットフォームです。企業や個人が、連絡先、所在地、SNS、商品・サービスカタログ、vCardダウンロードを備えたWebプレゼンテーションを作成できます。オンラインストア、カート、チェックアウト、サブスクリプション、注文管理も統合しています。\n\nフロントエンドはReact、TypeScript、Mantineで構築し、独自のREST APIを利用します。管理画面では企業、ユーザー、商品、カテゴリ、注文、顧客、ロールと権限、言語、通貨、コンテンツを管理できます。各事業者が自社のデジタル名刺とオンラインショップを持てるホワイトラベル型ソリューションです。',
    },
    tech: ['React', 'TypeScript', 'Mantine', 'REST API', 'SaaS', 'eCommerce'],
    links: [
      { label: 'Web', type: 'web', url: 'https://tarjetaweb.es' },
    ],
  },
  {
    slug: 'infoelectrica',
    title: 'infoelectrica.es',
    year: '2026',
    banner: { type: 'image', src: infoelectricaImg },
    summary: {
      es: 'Dashboard del mercado eléctrico español con precios spot, PVPC y gas.',
      en: 'Spanish electricity market dashboard with spot, PVPC and gas prices.',
      ja: 'スポット・PVPC・ガス価格を表示するスペイン電力市場ダッシュボード。',
    },
    description: {
      es: 'infoelectrica.es es un dashboard del mercado eléctrico español que muestra el precio de la luz por horas: media del mercado diario (spot OMIE), PVPC minorista, hora más barata y más cara, gas TTF y comparativa con Portugal, Alemania, Francia e Italia. También incluye el balance del sistema eléctrico, ajustes, costes estimados por tarifa y series históricas.\n\nLa web se renderiza en servidor para que los datos estén disponibles desde la primera carga, y el frontend actualiza las cifras y los gráficos con Chart.js. Cada dato muestra su fuente y hora de actualización (OMIE, REE, etc.), con un enfoque claro en la trazabilidad. Forma parte del ecosistema de REI Green Group.',
      en: 'infoelectrica.es is a dashboard for the Spanish electricity market showing hourly power prices: daily market average (OMIE spot), retail PVPC, cheapest and most expensive hour, TTF gas and a comparison with Portugal, Germany, France and Italy. It also includes the Spanish power system balance, adjustments, estimated tariff costs and historical series.\n\nThe site is server-rendered so the data is available on first load, while the frontend refreshes figures and charts with Chart.js. Every figure shows its source and update time (OMIE, REE, etc.), with a clear focus on traceability. It is part of the REI Green Group ecosystem.',
      ja: 'infoelectrica.esは、スペインの電力市場ダッシュボードです。時間別の電気料金として、日前市場（OMIEスポット）の平均価格、小売PVPC、最安・最高時間、TTFガス価格、ポルトガル・ドイツ・フランス・イタリアとの比較を表示します。電力システムのバランス、調整費、料金別の推定コスト、過去の推移も確認できます。\n\n初回読み込みからデータを表示できるようサーバーサイドレンダリングを行い、フロントエンドではChart.jsで数値とグラフを更新します。各データには出典と更新時刻（OMIE、REEなど）を明記し、トレーサビリティを重視しています。REI Green Groupのエコシステムの一員です。',
    },
    tech: ['Python', 'SSR', 'Chart.js', 'OMIE API', 'REE API'],
    links: [
      { label: 'Web', type: 'web', url: 'https://infoelectrica.es' },
    ],
  },
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
