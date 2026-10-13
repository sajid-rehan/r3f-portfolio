// `icon` is a file in public/assets/projects/; projects without one fall back
// to an initials badge. Public repos are those with at least one link.
const PROJECTS = [
  {
    id: 'gcls',
    name: 'Green Cloud Load Shifter',
    short: 'GCLS',
    kind: 'University project',
    period: 'SS 2026',
    accent: '#34c759',
    tagline: 'Run here. Run there. Run green.',
    description:
      'A cloud-native platform that schedules compute jobs into the region with the lowest carbon intensity right now, so the same work emits less CO₂. Four teams of 4–5 students built it as Go microservices in one shared monorepo. Ran on Open Telekom Cloud for the length of the project and was presented at the iExpo, a university project showcase (grade 1.0).',
    role: 'Team of 4: scheduler and carbon-intensity provider',
    highlights: [
      'From submit to greenest worker: submit, sense, route green, report',
      'Live Electricity Maps integration in the carbon-intensity-provider',
      'Circuit breaker, retry, timeout, fallback and rate limiting',
      'Kubernetes manifests for scheduler and provider',
      'Part of a larger platform: CI/CD, infrastructure, monitoring and tracing were built by the other teams',
      'Project targets: p95 < 50 ms, 10k jobs/day, 95% success rate, 80% test coverage',
    ],
    stack: ['Go', 'Docker', 'Kubernetes', 'REST / OpenAPI'],
    links: [],
    note: 'Repository is hosted on the university Git instance and not public.',
    media: [
      {
        type: 'image',
        src: 'gcls-poster.webp',
        caption: 'Project poster (click to enlarge)',
        fit: 'poster',
      },
      {
        type: 'image',
        src: 'gcls-overview.webp',
        caption: 'System context',
        fit: 'wide',
      },
      {
        type: 'image',
        src: 'gcls-resilience.webp',
        caption: 'Building blocks and resilience patterns',
        fit: 'wide',
      },
    ],
  },
  {
    id: 'ui-personalization',
    name: 'AI-assisted UI Personalization',
    short: 'UI AI',
    kind: 'University project',
    period: 'SS 2024',
    accent: '#af52de',
    tagline: 'Natural-language UI customization for a low-code platform.',
    description:
      'Commissioned by an industry partner: a 6-person Scrum team integrated an LLM into an existing low-code platform. Users describe in plain language how a generated UI should change, a locally hosted LLM (Ollama) returns structured change instructions, and the platform applies them.',
    role: 'Lead developer',
    highlights: [
      'Technical lead and architecture decisions',
      'Built on the open source Cody Engine (Nx monorepo)',
      'Node.js / TypeScript / Express backend: LLM integration, prompt engineering, API design',
      'React frontend for the personalization interface',
      'Full Scrum process: planning, reviews, retrospectives',
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'Express',
      'React',
      'Ollama',
      'LLM',
      'Scrum',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/110-Devs/SEP' }],
    media: [
      {
        type: 'diagram',
        diagram: 'sep-architecture',
        caption: 'Architecture: AI extension on top of Cody Engine',
      },
    ],
  },
  {
    id: 'peanut-progress',
    icon: 'peanut.webp',
    name: 'Peanut Progress',
    short: 'Peanut',
    kind: 'University project',
    period: 'Sep 2024 – Feb 2025',
    accent: '#ff9f0a',
    tagline: 'Cross-platform habit tracker from a single Flutter codebase.',
    description:
      'Habit tracker built by an 8-person team. Runs natively on Android, iOS, Windows, Linux and the web.',
    role: 'Notifications, localization, tests',
    highlights: [
      'Cross-platform push notifications',
      'Localization / internationalization',
      'Contributed to the Provider state-management architecture',
      'Unit tests and documentation',
    ],
    stack: ['Flutter', 'Dart', 'Android', 'iOS', 'Windows', 'Linux', 'Web'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Hercules133/Peanut-Progress-Habit-Tracker',
      },
    ],
    media: [
      {
        type: 'image',
        src: 'peanut-19.webp',
        caption: 'Habit list',
        fit: 'phone',
      },
      {
        type: 'image',
        src: 'peanut-14.webp',
        caption: 'Habit detail',
        fit: 'phone',
      },
      {
        type: 'image',
        src: 'peanut-16.webp',
        caption: 'Statistics',
        fit: 'phone',
      },
      {
        type: 'image',
        src: 'peanut-18.webp',
        caption: 'Language and theme settings',
        fit: 'phone',
      },
    ],
  },
  {
    id: 'keespot',
    icon: 'keespot.webp',
    name: 'KeeSpot',
    short: 'KeeSpot',
    kind: 'Personal project',
    period: '2026',
    accent: '#0a84ff',
    tagline: 'Spotlight-style launcher for KeePassXC on macOS.',
    description:
      'Global hotkey (⌘⇧Space) opens a floating search window over your KeePassXC vault. Copy password, username or TOTP from the keyboard; the clipboard clears itself after a timeout. Built with Tauri instead of Electron for a small memory footprint.',
    role: 'Solo project',
    highlights: [
      'Live search across all fields, fully keyboard driven',
      'Auto-clearing clipboard, auto-lock and auto-hide on focus loss',
      'Native-feeling frameless, always-on-top window with tray icon',
      'Vault access through keepassxc-cli, no custom .kdbx parsing',
    ],
    stack: ['Rust', 'Tauri', 'Svelte', 'TypeScript', 'macOS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sajid-rehan/keespot' },
    ],
    media: [
      {
        type: 'video',
        src: 'keespot-demo.mp4',
        poster: 'keespot-demo-poster.webp',
        caption: '20-second demo',
      },
    ],
  },
  {
    id: 'verbum',
    icon: 'verbum.webp',
    name: 'Verbum',
    short: 'Verbum',
    kind: 'Personal project',
    period: '2026',
    accent: '#c9a24b',
    tagline: 'A new word card on your Android home screen every day.',
    description:
      'Bring your own word list: a scheduled GitHub Actions job renders cards from words.json and pushes them to an orphan branch. A Kotlin Android app syncs them through the GitHub API and shows them as a home-screen widget. Started as a private vocabulary widget App.',
    role: 'Solo project',
    highlights: [
      'Fully automated daily pipeline, no manual steps',
      'Python (Pillow) card generator with editable colors and themes',
      'Orphan "daily" branch keeps repository history small',
      'Optional word-list generation from Wiktionary data',
    ],
    stack: ['Kotlin', 'Android', 'Python', 'Pillow', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/sajid-rehan/verbum' }],
    media: [
      {
        type: 'image',
        src: 'verbum-1.webp',
        caption: 'Daily card as home-screen widget',
        fit: 'phone',
      },
      {
        type: 'image',
        src: 'verbum-2.webp',
        caption: 'Connect your word-list repo',
        fit: 'phone',
      },
    ],
  },
  {
    id: 'r3f-portfolio',
    icon: '../profile.svg',
    name: '3D Portfolio',
    short: '3D Site',
    kind: 'Personal project',
    period: '2024',
    accent: '#ff453a',
    tagline: 'This website: a Blender-made room rendered live in WebGL.',
    description:
      'Interactive portfolio with 3D models and animations created in Blender, rendered in the browser with React Three Fiber on top of Three.js.',
    role: 'Solo project',
    highlights: [
      'Models, baking and animation made in Blender',
      'Animated camera transitions between scene sections',
      'HTML content embedded on the 3D laptop screen',
    ],
    stack: [
      'React',
      'React Three Fiber',
      'Three.js',
      'WebGL',
      'Blender',
      'JavaScript',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/sajid-rehan/r3f-portfolio' },
    ],
  },
  {
    id: 'ice-runner',
    icon: 'ice-runner.webp',
    name: 'Ice Runner',
    short: 'Ice Runner',
    kind: 'University project',
    period: 'Jan 2025',
    accent: '#64d2ff',
    tagline: 'Winter-themed endless runner made with Unity.',
    description:
      'Temple Run / Subway Surfers style endless runner built by a 4-person team.',
    role: 'Menus, shop, scoring and gameplay mechanics',
    highlights: [
      'Main menu, pause menu and shop scene',
      'Coin system (tracking and UI)',
      'Scoring and highscore',
      'Speed boost mechanic after jumping',
    ],
    stack: ['Unity', 'C#'],
    links: [
      { label: 'GitHub', href: 'https://github.com/elloco02/3MS_ICE_RUNNER' },
    ],
    media: [
      {
        type: 'image',
        src: 'ice-runner-menu.webp',
        caption: 'Main menu concept art',
        fit: 'wide',
      },
    ],
  },
];

export default PROJECTS;
