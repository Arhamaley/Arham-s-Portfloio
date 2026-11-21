export type WorkCategory = 'Web Engineering' | 'UI/UX Systems' | 'Graphic Design';

export interface ProjectItem {
  id: string;
  title: string;
  category: WorkCategory;
  year: string;
  role: string;
  summary: string;
  featured: boolean;
  imagePath: string;
  imageAlt: string;
  aspectClass: string;
  outcome: string;
  stack: string[];
  uxBreakdown: {
    problem: string;
    interactionDecisions: string;
    accessibilityAndCode: string;
  };
  deliverables: string[];
}

export interface CapabilityItem {
  index: string;
  title: string;
  summary: string;
  practices: string[];
}

export interface StandardItem {
  title: string;
  detail: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export const PORTFOLIO_OWNER = {
  name: 'Arham Ali',
  email: 'arhamaley26@gmail.com',
  age: 22,
  experienceYears: 4,
  degree: 'B.S. Computer Science',
  headline: 'Designing intuitive interfaces backed by clean, accessible code.',
  roleLine: 'Full-Stack Developer · UI/UX & Graphic Designer',
  heroLead:
    'I am Arham Ali, a 22-year-old Computer Science graduate with 4 years of experience bridging front-end and back-end web engineering with graphic and UI/UX design—focused on intuitive interfaces, seamless interaction craft, and WCAG AA accessibility.',
  heroImage: '/src/assets/images/hero_workspace_editorial_1795099469946.jpg',
  heroImageAlt:
    'Minimalist dark architectural desk setup displaying clean source code and structural diagrams on a matte black monitor',
  portraitImage: '/src/assets/images/arham_portrait_editorial_1795101183176.jpg',
  portraitAlt:
    'Editorial portrait of Arham Ali, 22-year-old software developer and UI/UX designer holding a wireframe notebook against a dark charcoal architectural wall',
};

export const CREDENTIAL_METRICS = [
  {
    value: '04 Years',
    label: 'Web Engineering & Visual Design',
  },
  {
    value: 'B.S. CS',
    label: 'Computer Science Graduate',
  },
  {
    value: 'WCAG AA',
    label: 'Accessibility-First Standard',
  },
  {
    value: 'Full-Stack',
    label: 'UI/UX Craft to Production APIs',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'kinetix-analytics',
    title: 'Kinetix Financial Telemetry',
    category: 'Web Engineering',
    year: '2026',
    role: 'Lead Full-Stack Engineer & UI Designer',
    summary:
      'Real-time SaaS revenue and operational metrics workspace built with strict tabular alignment and sub-200ms filter transitions.',
    featured: true,
    imagePath: '/src/assets/images/work_kinetix_dashboard_1795099469496.jpg',
    imageAlt:
      'Dark-mode financial analytics web application displayed on a frameless monitor with clean revenue trend charts and structured tables',
    aspectClass: 'aspect-[16/10]',
    outcome: '42% faster weekly reporting workflow across 18 product teams',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    uxBreakdown: {
      problem:
        'Finance operators had to cross-reference four disconnected spreadsheets and slow legacy dashboards just to reconcile weekly recurring revenue and churn trends.',
      interactionDecisions:
        'Unified KPI summaries, synchronized time-range filtering, and keyboard-navigable data rows into one high-contrast dark workspace so numbers scan effortlessly without visual clutter.',
      accessibilityAndCode:
        'Enforced tabular-nums alignment across all currency columns, keyboard arrow navigation on data tables, ARIA live status updates for query states, and modular TypeScript API contracts.',
    },
    deliverables: [
      'REST & streaming query API',
      'Accessible data table primitives',
      'Interactive chart inspection',
    ],
  },
  {
    id: 'atlas-commerce',
    title: 'Atlas Architectural Objects',
    category: 'Web Engineering',
    year: '2025',
    role: 'Full-Stack Developer & Art Direction',
    summary:
      'Editorial e-commerce platform pairing asymmetric product storytelling with server-validated inventory and frictionless checkout.',
    featured: false,
    imagePath: '/src/assets/images/work_atlas_commerce_1795099470616.jpg',
    imageAlt:
      'Minimalist editorial e-commerce storefront interface displayed on a matte desktop monitor in an architectural studio',
    aspectClass: 'aspect-[4/3]',
    outcome: '99 Lighthouse accessibility score and 1.1s median page load',
    stack: ['TypeScript', 'React', 'Express', 'REST API', 'Stripe Webhooks'],
    uxBreakdown: {
      problem:
        'Design-forward retail stores frequently sacrifice screen-reader clarity, keyboard navigation, and checkout speed for heavy visual animations.',
      interactionDecisions:
        'Structured a split-rail catalog with instant variant previews, persistent cart state, and quiet typographic hierarchy that keeps product photography as the hero.',
      accessibilityAndCode:
        'Built semantic landmark regions, focus-managed cart drawers, optimistic state rollbacks on API errors, and clean separation between pricing validation and UI components.',
    },
    deliverables: [
      'Full-stack storefront & cart engine',
      'Editorial product grid layout',
      'Server-side inventory validation',
    ],
  },
  {
    id: 'pulse-habit-ux',
    title: 'Pulse Biometric Companion',
    category: 'UI/UX Systems',
    year: '2025',
    role: 'UI/UX & Interaction Designer',
    summary:
      'Mobile-first health and sleep telemetry flow engineered around thumb-zone ergonomics, calm dark surfaces, and zero-noise charts.',
    featured: false,
    imagePath: '/src/assets/images/work_pulse_mobile_ux_1795099469289.jpg',
    imageAlt:
      'Three dark-mode mobile application screens resting on dark slate showing activity, run tracking, and sleep efficiency interfaces',
    aspectClass: 'aspect-[4/3]',
    outcome: 'Reduced daily logging steps from 6 taps to 2 interactions',
    stack: ['Figma', 'Interaction Prototyping', 'Design Tokens', 'WCAG Audits'],
    uxBreakdown: {
      problem:
        'Existing fitness trackers overwhelmed morning users with competing rings, neon gradients, and multi-level nested menus.',
      interactionDecisions:
        'Designed a 3-screen primary loop—Activity Hub, Live Session, and Sleep Efficiency—anchored by 48px bottom touch targets and a single warm amber focal action.',
      accessibilityAndCode:
        'Verified minimum 4.5:1 text contrast on OLED charcoal backgrounds, paired color indicators with explicit metric labels, and authored motion specs honoring reduced-motion preferences.',
    },
    deliverables: [
      'End-to-end mobile user flows',
      'Interactive micro-interaction specs',
      'High-contrast OLED dark palette',
    ],
  },
  {
    id: 'forma-design-system',
    title: 'Forma Multi-Surface Design System',
    category: 'UI/UX Systems',
    year: '2026',
    role: 'Design Systems Architect & Front-End Engineer',
    summary:
      'Token-driven UI system unifying typography scales, 12-column grid rules, and WCAG AA component primitives across web apps.',
    featured: true,
    imagePath: '/src/assets/images/work_forma_design_system_1795099469119.jpg',
    imageAlt:
      'Dark-mode design system documentation interface showing typographic scales, 12-column grid geometry, contrast ratios, and interactive controls',
    aspectClass: 'aspect-[16/10]',
    outcome: 'Adopted across 5 production web applications with zero contrast regressions',
    stack: ['React', 'TypeScript', 'CSS Custom Properties', 'Storybook', 'ARIA'],
    uxBreakdown: {
      problem:
        'Growing product teams shipped inconsistent spacing, non-standard button focus rings, and duplicated form logic across separate front-end repositories.',
      interactionDecisions:
        'Authored a disciplined token architecture pairing semantic surface variables with interactive state matrices (default, hover, focus-visible, disabled) documented inline.',
      accessibilityAndCode:
        'Tested every interactive primitive with keyboard-only workflows and screen readers, enforcing automated contrast checks and clean headless hook composition.',
    },
    deliverables: [
      'Semantic color & type token specification',
      '28 accessible React UI primitives',
      'Interactive documentation portal',
    ],
  },
  {
    id: 'nocturne-exhibition',
    title: 'Grafik.Raum Exhibition Identity',
    category: 'Graphic Design',
    year: '2024',
    role: 'Graphic Designer & Art Director',
    summary:
      'Swiss-inspired visual identity, exhibition poster grid, and tactile stationery suite built on modular architectural geometry.',
    featured: false,
    imagePath: '/src/assets/images/work_nocturne_identity_1795099468890.jpg',
    imageAlt:
      'Dark textured charcoal stationery and Swiss typographic exhibition poster mockup featuring gold foil geometric accents',
    aspectClass: 'aspect-[4/3]',
    outcome: 'Complete print and digital identity deployed across 14 exhibition touchpoints',
    stack: ['Illustrator', 'InDesign', 'Grid Systems', 'Typography', 'Print Production'],
    uxBreakdown: {
      problem:
        'An international architecture and typography exhibition needed a cohesive identity system scaling seamlessly from A1 street posters to pocket stationery and digital wayfinding.',
      interactionDecisions:
        'Developed a strict 6-unit geometric grid emblem paired with bold grotesque display type and warm gold metallic foil accents against uncoated charcoal stock.',
      accessibilityAndCode:
        'Applied the same legibility rigor from screen work into print—balancing optical tracking, clear hierarchical scale ratios, and glare-free matte ink contrast.',
    },
    deliverables: [
      'Modular geometric brand mark',
      'A1 poster & signage system',
      'Stationery & editorial print specs',
    ],
  },
  {
    id: 'structura-monograph',
    title: 'Structura Symbol Monograph',
    category: 'Graphic Design',
    year: '2024',
    role: 'Editorial & Iconography Designer',
    summary:
      '120-page typographic monograph and bespoke geometric symbol taxonomy exploring proportion, optical balance, and grid construction.',
    featured: false,
    imagePath: '/src/assets/images/work_editorial_monograph_1795099469610.jpg',
    imageAlt:
      'Open editorial graphic design monograph spread and metallic geometric symbol blocks photographed flat-lay on dark basalt stone',
    aspectClass: 'aspect-[4/3]',
    outcome: '16-symbol geometric taxonomy standardized for multi-scale digital and print marks',
    stack: ['Editorial Layout', 'Vector Geometry', 'Type Pairing', 'Print Art Direction'],
    uxBreakdown: {
      problem:
        'Complex multi-product ecosystems often suffer from mismatched iconography that breaks optical weight between 16px UI icons and large brand signage.',
      interactionDecisions:
        'Constructed 16 geometric symbols on a shared mathematical keyline grid, documenting optical corrections and stroke-to-negative-space ratios in a tactile print monograph.',
      accessibilityAndCode:
        'Exported pixel-snapped SVG paths with consistent 24x24 viewBoxes and clean semantic attributes ready for direct React component consumption.',
    },
    deliverables: [
      'Editorial book spread & grid layout',
      '16-piece geometric symbol library',
      'SVG keyline production guide',
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01',
    title: 'Front-End Engineering',
    summary:
      'Building fast, resilient single-page and server-rendered interfaces in React and TypeScript with strict semantic HTML, predictable state flow, and zero layout thrash.',
    practices: ['React & TypeScript', 'Responsive Grid Systems', 'Motion & Interaction Budgets'],
  },
  {
    index: '02',
    title: 'Back-End & API Architecture',
    summary:
      'Designing clean RESTful APIs, relational data schemas, and validation layers that keep client experiences reliable, secure, and maintainable.',
    practices: ['Node.js & Express', 'PostgreSQL & Schema Design', 'Clean Modular Services'],
  },
  {
    index: '03',
    title: 'UI/UX & Interaction Design',
    summary:
      'Translating complex workflows into intuitive user journeys, clear information hierarchy, and micro-interactions that feel effortless and responsive.',
    practices: ['User Flows & Wireframing', 'Tokenized Design Systems', 'Usability & Focus Parity'],
  },
  {
    index: '04',
    title: 'Graphic Design & Visual Identity',
    summary:
      'Crafting Swiss-rooted typography, brand systems, and editorial layouts that bring visual clarity and intentional craft to digital products.',
    practices: ['Brand Identity & Marks', 'Editorial Typography', 'Art Direction & Print Specs'],
  },
];

export const ENGINEERING_STANDARDS: StandardItem[] = [
  {
    title: 'WCAG AA Contrast & Legibility',
    detail:
      'Every text, surface, and interactive state is verified for 4.5:1+ contrast, paired with clear labels rather than color-only cues.',
  },
  {
    title: 'Keyboard-First & Semantic Landmarks',
    detail:
      'Full keyboard operability, focus-visible rings, trapped modal focus, and native landmark elements baked in from the first component.',
  },
  {
    title: 'Clean, Maintainable Code',
    detail:
      'Strictly typed interfaces, single-responsibility modules, predictable state transitions, and zero dead handlers or brittle workarounds.',
  },
  {
    title: 'Reduced-Motion & Performance Discipline',
    detail:
      'Compositor-only transforms that settle within 200ms and automatically honor prefers-reduced-motion system preferences.',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    handle: 'github.com/Arhamaley',
    href: 'https://github.com/Arhamaley',
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/arhamali',
    href: 'https://linkedin.com/in/arhamali',
  },
  {
    label: 'Dribbble',
    handle: 'dribbble.com/arhamali',
    href: 'https://dribbble.com/arhamali',
  },
  {
    label: 'X / Twitter',
    handle: 'x.com/arhamali',
    href: 'https://x.com/arhamali',
  },
];
