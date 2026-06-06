export const en = {
  nav: {
    home: 'Home',
    company: 'Company',
    aboutUs: 'About Us',
    lifeAtIndvaltech: 'Life at IndvalTech',
    industries: 'Industries',
    services: 'Services',
    career: 'Career',
    cta: 'Consult Experts',
    hamburgerOpen: 'Open navigation menu',
  },
  hero: {
    slide1: {
      eyebrow: 'Manufacturing Excellence',
      heading: 'Precision at every stage of production',
      body: 'Advanced manufacturing solutions powered by robotic precision and industrial expertise.',
      cta: 'Explore our capabilities',
    },
    slide2: {
      eyebrow: 'Professional Expertise',
      heading: 'Trusted by engineers, proven in the field.',
      body: 'Collaborative engineering partnerships that deliver high-stakes results across global industries.',
      cta: 'Read client stories',
    },
    slide3: {
      eyebrow: 'Join Our Team',
      heading: 'Build your career where craft meets innovation',
      body: 'Empowering the next generation of engineering talent to solve complex aerospace and automotive challenges.',
      cta: 'View open positions',
    },
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
    heading: 'Why IndvalTech?',
    description: 'Driving industrial transformation through a unique synthesis of veteran engineering wisdom and cutting-edge execution speed.',
    label: 'Our value proposition',
    articles: {
      clientSuccess: {
        title: 'Proven client success & retention',
        description: 'Our outstanding track record is built on engineering excellence and deep-rooted long-term partnerships that drive sustainable business outcomes.',
      },
      veteranExpertise: {
        title: 'Veteran expertise & prompt execution',
        description: 'A unique blend of industry veterans and technical experts ensuring high-precision project delivery on aggressive schedules.',
      },
      costEffective: {
        title: 'Cost-effective engineering without compromise',
        description: 'We deliver optimized, budget-conscious solutions that reduce overhead without trading off the integrity or reliability of the final output.',
      },
      continuousImprovement: {
        title: 'Continuous improvement & on-time delivery',
        description: 'Our team evolves processes daily, refining workflows, tightening schedules, and adapting systems to ensure every deadline is met and every client is satisfied.',
      },
    },
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
  about: {
    hero: {
      eyebrow: 'Engineering Excellence',
      heading: 'INDVALTECH',
      body: 'Solving complex engineering problems with forensic precision and a decade of expertise.',
      cta: 'Our Methodology',
      metricsLabel: 'Precision Metrics',
      metric1Value: '10+',
      metric1Label: 'Years of Excellence',
      metric2Value: '25+',
      metric2Label: 'Aerospace Heritage',
    },
    vision: {
      eyebrow: 'The Horizon',
      title: 'Vision',
      body: "To be the most competitive, trusted & preferred partner for it's customer across the globe in Engineering Services",
    },
    mission: {
      eyebrow: 'The Pursuit',
      title: 'Mission',
      body: 'To make integrated collaborative partnership between employees, clients & suppliers with value addition & creative thinking in our every service offered.',
    },
    passion: {
      eyebrow: 'The Engine',
      title: 'Passion',
      body: 'Provide Innovative and creative solutions to the service request of every customer',
    },
    leadership: {
      title: 'Aerospace Veteran Leadership',
      body: 'Our firm is architected and driven by an aerospace veteran with 25 years of cross-functional experience. This foundation of rigid precision and safety-first methodology informs every vertical of our service delivery.',
      tag1: '25 Yrs Experience',
      tag2: 'Safety-First',
      tag3: 'Cross-Functional',
    },
    competences: {
      eyebrow: 'Engineered Intelligence',
      heading: 'Competences & Commitment',
      team: {
        title: 'Technical Team',
        body: 'Our core strength lies in our technically sound engineers across diverse domains:',
        item1: 'Aerospace',
        item2: 'Automotive',
        item3: 'Locomotive',
        item4: 'Off Highway',
        item5: 'General Engineering',
      },
      qa: {
        title: 'Quality Assurance',
        body: 'We operate under a "Forensic Precision" mandate, ensuring every calculation and design meets global safety and performance standards without compromise.',
      },
      global: {
        title: 'Global Reach',
        body: 'With strategic operational hubs, we bridge the gap between complex engineering requirements and localized, high-value execution.',
      },
    },
  },
} as const;

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type Translations = DeepString<typeof en>;
