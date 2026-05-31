export const en = {
  nav: {
    home: 'Home',
    company: 'Company',
    industries: 'Industries',
    services: 'Services',
    career: 'Career',
    cta: 'Consult Experts',
    hamburgerOpen: 'Open navigation menu',
  },
  hero: {
    eyebrow: 'Future-Ready Engineering',
    heading1: 'Precision Engineering.',
    heading2: 'Accelerated Growth.',
    body: 'Navigating the complexity of modern industrial systems through advanced simulation, structural analysis, and bespoke manufacturing intelligence.',
    ctaPrimary: 'Consult Our Experts',
    ctaSecondary: 'View Portfolio',
    certLabel: 'Certified Excellence',
    certBodyPrefix: 'Full',
    certBodyConjunction: 'and',
    certBodySuffix: 'compliance integrated into every design iteration',
    imgAlt: 'Advanced Turbine Component — precision aerospace engineering',
  },
  stats: {
    industries: 'Industries',
    clients: 'Clients',
    years: 'Years',
    employees: 'Employees',
  },
  industries: {
    heading: 'Multidisciplinary Engineering Ecosystem',
    description: 'End-to-end solutions designed for high-stakes environments where failure is not an option.',
    aerospace: {
      title: 'Aerospace & Defense',
      description: 'Precision structural optimization, fatigue analysis, and propulsion system integration for mission-critical avionics.',
    },
    automotive: {
      title: 'Automotive Systems',
      description: 'EV chassis development, advanced thermal management, and ADAS sensor integration frameworks.',
    },
    locomotive: {
      title: 'Locomotive',
      description: 'High-speed rail design and freight locomotive engine assembly optimization.',
    },
    offHighway: {
      title: 'Off Highway',
      description: 'Robust hydraulic systems and chassis engineering for heavy construction & agriculture.',
    },
    general: {
      title: 'General Engineering',
      description: 'Multidisciplinary technical solutions for advanced manufacturing and complex assembly lines.',
    },
  },
  thought: {
    heading: 'Engineering Excellence in 2026',
    description: 'The convergence of AI, additive manufacturing, and sustainable materials is redefining the boundaries of physical design.',
    label: 'Thought Leadership',
    articles: {
      generativeDesign: {
        title: 'Generative Design Synthesis',
        description: 'Moving beyond human intuition, we leverage cloud-based generative algorithms to create high-performance topologies that minimize mass while maximizing structural integrity.',
      },
      circularMaterial: {
        title: 'Circular Material Economy',
        description: 'Engineering for end-of-life starts at inception. We help OEMs integrate recycled carbon fiber and bio-resins into high-stress applications without compromising safety.',
      },
      hybridManufacturing: {
        title: 'Hybrid Manufacturing Flows',
        description: 'Strategic integration of subtractive CNC and additive DMLS processes to produce complex internal geometries and cooling channels previously impossible to manufacture.',
      },
      infrastructure: {
        title: 'Critical Infrastructure Security',
        description: 'Robust engineering solutions for energy, water, and transport networks, designed to withstand both physical stress and cyber-physical threats in modern urban centers.',
      },
    },
  },
  trust: {
    heading: 'Trusted by Global Industry Leaders',
  },
  footer: {
    brand: 'Specialized engineering partners providing precision technical solutions for the world\'s most demanding industries.',
    solutionsHeading: 'Solutions',
    companyHeading: 'Company',
    newsletterHeading: 'Newsletter',
    newsletterDesc: 'Technical insights delivered quarterly.',
    emailPlaceholder: 'Work email',
    subscribeLabel: 'Subscribe',
    copyright: '© {year} Indvaltech Engineering. Precision Guaranteed.',
    solutions: {
      aerospace: 'Aerospace & Defense',
      automotive: 'Automotive Systems',
      automation: 'Industrial Automation',
      qa: 'Quality Assurance',
    },
    company: {
      pedigree: 'Our Pedigree',
      papers: 'Technical Papers',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  bottomNav: {
    home: 'Home',
    explore: 'Explore',
    services: 'Services',
    contact: 'Contact',
  },
} as const;

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type Translations = DeepString<typeof en>;
