/**
 * Central portfolio data — single source of truth for all resume-derived content.
 * Update contact links and project entries marked with UPDATE_ME before publishing.
 */

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'ai-ml'
  | 'databases'
  | 'cloud-devops'
  | 'testing';

export type SkillFilter = 'all' | SkillCategory;

export interface Skill {
  name: string;
  /** simple-icons slug, e.g. "nodedotjs" — leave empty for generic icon */
  iconSlug?: string;
  category: SkillCategory;
  /** Short note shown when a tile is selected */
  description?: string;
  /** Optional accent for tile glow (hex without #) */
  accent?: string;
}

export interface Experience {
  id: string;
  /** Display order marker, e.g. "01" */
  roleNumber: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  summary: string;
  /** Primary bullets shown by default */
  achievements: string[];
  /** Extra bullets revealed on expand (must still come from resume) */
  moreAchievements?: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  technologies: string[];
  image: string;
  github: string;
  demo: string;
}

export interface WorkspaceMode {
  id: 'backend' | 'fullstack' | 'ai';
  label: string;
  description: string;
  technologies: string[];
  workflow: string[];
}

export interface Publication {
  title: string;
  authors?: string;
  journal: string;
  volumeIssue: string;
  pages: string;
  date: string;
  doi: string;
  url: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  /** Path under public/, e.g. /certifications/aws-developer.svg */
  badgeImage?: string;
  /** Credential date when available on resume — omit if unknown */
  date?: string;
  /** Credential verification URL when available — omit if unknown */
  credentialUrl?: string;
}

export const portfolio = {
  personal: {
    /** Legal / nav title — short form only (no surname on site) */
    fullName: 'Sri Dhimple',
    /** Hero display name */
    displayName: 'Sri Dhimple',
    initials: 'SD',
    email: 'sri.dhimplen14@gmail.com',
    phone: '',
    location: 'United States',
    /**
     * UPDATE_ME: Set to a short status string (e.g. "open_to_work") or null to hide.
     */
    availability: null as string | null,
    title: 'Software Developer – AI',
    shortTitle: 'Software Engineer & AI Engineer',
    identities: [
      'Software Engineer',
      'Full-Stack Developer',
      'AI-Powered Applications',
      'MS in Artificial Intelligence',
    ] as const,
    summary:
      'Software Developer with 4+ years of experience building full-stack applications and distributed backend services using Java, Spring Boot, Python, React, and Node.js. Experienced in API design, PostgreSQL, Redis, Kafka, automated testing, CI/CD, Kubernetes, and production AI-search integration.',
    socials: {
      github: '', // UPDATE_ME: e.g. https://github.com/your-username
      linkedin: 'https://www.linkedin.com/in/dimplesn',
    },
    resumeFile: '/Sri_Dhimple_Nuthalapati_Resume.pdf',
  },

  heroModules: [
    'JAVA',
    'PYTHON',
    'REACT',
    'TYPESCRIPT',
    'SPRING',
    'FASTAPI',
  ],

  workspaceModes: [
    {
      id: 'backend',
      label: 'Backend Systems',
      description:
        'Distributed services and APIs with Java, Spring Boot, FastAPI, Kafka, and resilient data access.',
      technologies: [
        'Java',
        'Spring Boot',
        'FastAPI',
        'Kafka',
        'PostgreSQL',
        'Redis',
        'Go',
      ],
      workflow: ['Client Request', 'API Gateway', 'Service Layer', 'PostgreSQL / Redis'],
    },
    {
      id: 'fullstack',
      label: 'Full-Stack Products',
      description:
        'Responsive React and TypeScript interfaces connected to Node.js and Spring Boot backends.',
      technologies: [
        'React',
        'TypeScript',
        'Redux',
        'Node.js',
        'Express.js',
        'GraphQL',
        'Docker',
      ],
      workflow: ['UI Surface', 'Application Logic', 'REST / GraphQL', 'Cloud Deploy'],
    },
    {
      id: 'ai',
      label: 'AI-Powered Applications',
      description:
        'Production RAG workflows with LangChain, Azure OpenAI, and Pinecone for grounded answers.',
      technologies: [
        'LangChain',
        'Azure OpenAI',
        'Pinecone',
        'Python',
        'FastAPI',
        'PyTorch',
      ],
      workflow: ['Documents', 'Retrieval', 'Azure OpenAI', 'Grounded Response'],
    },
  ] as WorkspaceMode[],

  skills: [
    { name: 'Java', iconSlug: 'openjdk', category: 'languages', accent: 'ED8B00', description: 'Primary backend language for Spring microservices.' },
    { name: 'Python', iconSlug: 'python', category: 'languages', accent: '3776AB', description: 'Used for FastAPI services and AI pipelines.' },
    { name: 'JavaScript', iconSlug: 'javascript', category: 'languages', accent: 'F7DF1E', description: 'Client and Node.js application logic.' },
    { name: 'TypeScript', iconSlug: 'typescript', category: 'languages', accent: '3178C6', description: 'Typed React and Node.js applications.' },
    { name: 'Go', iconSlug: 'go', category: 'languages', accent: '00ADD8', description: 'Event-driven services for asynchronous updates.' },
    { name: 'SQL', iconSlug: 'postgresql', category: 'languages', accent: '4169E1', description: 'Relational queries and transactional data access.' },
    { name: 'React', iconSlug: 'react', category: 'frontend', accent: '61DAFB', description: 'Reusable UI components for customer and admin apps.' },
    { name: 'Redux', iconSlug: 'redux', category: 'frontend', accent: '764ABC', description: 'Standardized frontend state management.' },
    { name: 'Spring Boot', iconSlug: 'springboot', category: 'backend', accent: '6DB33F', description: 'Independently deployable Java microservices.' },
    { name: 'Spring MVC', iconSlug: 'spring', category: 'backend', accent: '6DB33F', description: 'Web layer patterns in Spring applications.' },
    { name: 'Spring Security', iconSlug: 'springsecurity', category: 'backend', accent: '6DB33F', description: 'Authentication and authorization controls.' },
    { name: 'FastAPI', iconSlug: 'fastapi', category: 'backend', accent: '009688', description: 'High-volume Python API services.' },
    { name: 'Pydantic', iconSlug: 'pydantic', category: 'backend', accent: 'E92063', description: 'Request and response validation for FastAPI.' },
    { name: 'Node.js', iconSlug: 'nodedotjs', category: 'backend', accent: '5FA04E', description: 'RESTful service layer for full-stack apps.' },
    { name: 'Express.js', iconSlug: 'express', category: 'backend', accent: 'AAAAAA', description: 'HTTP routing for Node.js APIs.' },
    { name: 'REST', category: 'backend', accent: 'F97316', description: 'API design for administration and reporting workflows.' },
    { name: 'GraphQL', iconSlug: 'graphql', category: 'backend', accent: 'E10098', description: 'Efficient data-fetching for React clients.' },
    { name: 'Hibernate', iconSlug: 'hibernate', category: 'backend', accent: '59666C', description: 'ORM mapping with Spring Data JPA.' },
    { name: 'Spring Data JPA', iconSlug: 'spring', category: 'backend', accent: '6DB33F', description: 'Persistence layer for transactional services.' },
    { name: 'LangChain', iconSlug: 'langchain', category: 'ai-ml', accent: '1C3C3C', description: 'Orchestration for RAG pharmacy support flows.' },
    { name: 'Azure OpenAI', category: 'ai-ml', accent: '0078D4', description: 'LLM inference for inquiry resolution.' },
    { name: 'Pinecone', category: 'ai-ml', accent: '000000', description: 'Vector retrieval for grounded pharmacy answers.' },
    { name: 'Hugging Face', iconSlug: 'huggingface', category: 'ai-ml', accent: 'FFD21E', description: 'Transformers ecosystem for ML workflows.' },
    { name: 'PyTorch', iconSlug: 'pytorch', category: 'ai-ml', accent: 'EE4C2C', description: 'Deep learning model development.' },
    { name: 'Scikit-learn', iconSlug: 'scikitlearn', category: 'ai-ml', accent: 'F7931E', description: 'Classical machine learning tooling.' },
    { name: 'spaCy', iconSlug: 'spacy', category: 'ai-ml', accent: '09A3D5', description: 'NLP processing for text pipelines.' },
    { name: 'MLflow', iconSlug: 'mlflow', category: 'ai-ml', accent: '0194E2', description: 'Experiment tracking for ML work.' },
    { name: 'PostgreSQL', iconSlug: 'postgresql', category: 'databases', accent: '4169E1', description: 'Primary relational store for high-volume records.' },
    { name: 'Redis', iconSlug: 'redis', category: 'databases', accent: 'FF4438', description: 'Caching to reduce redundant database reads.' },
    { name: 'Kafka', iconSlug: 'apachekafka', category: 'databases', accent: '231F20', description: 'Event-driven messaging across services.' },
    { name: 'Azure', category: 'cloud-devops', accent: '0078D4', description: 'Cloud platform for identity, Key Vault, and AKS.' },
    { name: 'AKS', iconSlug: 'kubernetes', category: 'cloud-devops', accent: '326CE5', description: 'Managed Kubernetes on Azure.' },
    { name: 'Docker', iconSlug: 'docker', category: 'cloud-devops', accent: '2496ED', description: 'Containerized service packaging.' },
    { name: 'Kubernetes', iconSlug: 'kubernetes', category: 'cloud-devops', accent: '326CE5', description: 'Orchestration for microservice releases.' },
    { name: 'Jenkins', iconSlug: 'jenkins', category: 'cloud-devops', accent: 'D24939', description: 'CI automation for service pipelines.' },
    { name: 'GitHub Actions', iconSlug: 'githubactions', category: 'cloud-devops', accent: '2088FF', description: 'CI/CD workflows for deployments.' },
    { name: 'Git', iconSlug: 'git', category: 'cloud-devops', accent: 'F05032', description: 'Source control across all projects.' },
    { name: 'CI/CD', category: 'cloud-devops', accent: 'F97316', description: 'Automated build, test, and release pipelines.' },
    { name: 'JUnit', iconSlug: 'junit5', category: 'testing', accent: '25A162', description: 'Unit testing for Java services.' },
    { name: 'Mockito', category: 'testing', accent: 'F97316', description: 'Mocking for Java unit tests.' },
    { name: 'Pytest', iconSlug: 'pytest', category: 'testing', accent: '0A9EDC', description: 'Unit and integration tests for Python APIs.' },
    { name: 'Jest', iconSlug: 'jest', category: 'testing', accent: 'C21325', description: 'Frontend unit testing.' },
    { name: 'Cypress', iconSlug: 'cypress', category: 'testing', accent: '69D3A7', description: 'End-to-end browser testing.' },
    { name: 'Postman', iconSlug: 'postman', category: 'testing', accent: 'FF6C37', description: 'API exploration and validation.' },
    { name: 'Prometheus', iconSlug: 'prometheus', category: 'testing', accent: 'E6522C', description: 'Production metrics and diagnostics.' },
    { name: 'Grafana', iconSlug: 'grafana', category: 'testing', accent: 'F46800', description: 'Observability dashboards for services.' },
  ] as Skill[],

  experience: [
    {
      id: 'walgreens',
      roleNumber: '01',
      company: 'Walgreens',
      title: 'Software Developer',
      location: 'United States',
      startDate: '2025-03',
      endDate: 'Present',
      summary:
        'Engineering high-throughput Java and Spring Boot backend microservices for pharmacy search, prescription inquiries, and location services.',
      achievements: [
        'Engineered high-throughput Java and Spring Boot backend microservices handling over 85,000 daily requests for pharmacy search workflows, prescription inquiries, and location services.',
        'Integrated the Google Maps API and geospatial indexing with Java backend APIs, enabling location searches, spatial radius queries, and dynamic mapping visualization for end users.',
        'Designed PostgreSQL data-access workflows, schemas, and relational data structures using Spring Data JPA and Hibernate, optimizing execution speeds for high-volume transactions.',
      ],
      moreAchievements: [
        'Implemented Redis caching mechanisms across Spring Boot RESTful services to eliminate redundant database reads, reducing average downstream query execution times by 42%.',
        'Developed unit and integration test suites using JUnit and Mockito to debug programs, catch regressions, and ensure system reliability prior to production releases.',
        'Authored program documentation and technical specifications to support long-term system maintainability and knowledge transfer across engineering teams.',
      ],
      technologies: [
        'Java',
        'Spring Boot',
        'Google Maps API',
        'PostgreSQL',
        'Spring Data JPA',
        'Hibernate',
        'Redis',
        'JUnit',
        'Mockito',
      ],
    },
    {
      id: 'ibm',
      roleNumber: '02',
      company: 'IBM',
      title: 'Software Developer',
      location: 'Chennai, India',
      startDate: '2022-06',
      endDate: '2023-12',
      summary:
        'Refactored legacy systems into Java 17 and Spring Boot microservices, with query tuning, CI/CD automation, and production monitoring.',
      achievements: [
        'Refactored monolithic legacy functionality into modular Java 17 and Spring Boot microservices, applying Object-Oriented Design patterns (Factory, Singleton, Repository) to improve system maintainability.',
        'Tuned execution plans for heavy PostgreSQL and Oracle DB queries, reducing p99 API response latency by 86% across mission-critical transaction workflows.',
        'Maintained and debugged production applications, reviewing design specifications and coding enhancements to resolve functional defects and data inconsistencies.',
      ],
      moreAchievements: [
        'Automated build, test, and deployment workflows using Git, Docker, and CI/CD pipelines, collaborating effectively in a cross-functional team environment with minimal supervision.',
        'Utilized Prometheus and Grafana logging and monitoring tools to analyze system performance, monitor JVM health, and troubleshoot production software issues.',
      ],
      technologies: [
        'Java 17',
        'Spring Boot',
        'PostgreSQL',
        'Oracle',
        'Git',
        'Docker',
        'CI/CD',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      id: 'virtusa',
      roleNumber: '03',
      company: 'Virtusa',
      title: 'Full-Stack Developer',
      location: 'Chennai, India',
      startDate: '2021-01',
      endDate: '2022-06',
      summary:
        'Built responsive React front ends and 20+ REST APIs across Java, Node.js, and relational databases, with strong automated test coverage.',
      achievements: [
        'Developed responsive, accessible front-end web interfaces using HTML, CSS, JavaScript, React, Redux, and Bootstrap for administrative and customer-facing applications.',
        'Designed and implemented 20+ RESTful API endpoints integrating Java, Node.js, and relational databases (PostgreSQL/MSSQL) for user administration and operational reporting.',
        'Enhanced front-end user experience and page-load speeds by 55% through route-based code splitting, lazy loading, and Webpack bundle optimizations.',
      ],
      moreAchievements: [
        'Established automated unit and end-to-end testing with JUnit, Jest, and Cypress, achieving 88% code coverage and reducing post-release production defects by 45%.',
      ],
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Redux',
        'Bootstrap',
        'Java',
        'Node.js',
        'PostgreSQL',
        'MSSQL',
        'Webpack',
        'JUnit',
        'Jest',
        'Cypress',
      ],
    },
  ] as Experience[],

  projects: [
    {
      id: 'splitshare',
      number: 'PROJECT_01',
      title: 'SplitShare Application',
      category: 'FULL-STACK',
      description:
        'A full-stack expense-sharing application that helps users create groups, record shared expenses, divide costs, track balances, and manage settlements.',
      details: [
        'Create and manage expense-sharing groups',
        'Split expenses equally or by custom amounts',
        'Calculate balances automatically',
        'Track payments and settlement history',
        'Secure user authentication',
        'Responsive application interface',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Spring Boot',
        'PostgreSQL',
        'REST APIs',
        'JWT',
      ],
      image: '',
      github: '',
      demo: '',
    },
    {
      id: 'customer-segmentation',
      number: 'PROJECT_02',
      title: 'Customer Segmentation System',
      category: 'MACHINE LEARNING',
      description:
        'A machine-learning system that analyzes customer behavior and transaction data to identify meaningful customer segments for business and marketing analysis.',
      details: [
        'Clean and preprocess customer datasets',
        'Perform exploratory data analysis',
        'Apply K-Means clustering',
        'Evaluate clustering quality',
        'Visualize customer segments',
        'Generate understandable customer profiles',
      ],
      technologies: [
        'Python',
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'Matplotlib',
        'Seaborn',
      ],
      image: '',
      github: '',
      demo: '',
    },
    {
      id: 'rag-hybrid-search',
      number: 'PROJECT_03',
      title: 'RAG System with Hybrid Search',
      category: 'GENERATIVE AI',
      description:
        'An AI-powered document question-answering system that combines semantic vector retrieval and keyword search to produce grounded answers with source citations.',
      details: [
        'Load, clean, and chunk documents',
        'Generate and store vector embeddings',
        'Combine BM25 and semantic vector search',
        'Rerank retrieved documents',
        'Generate context-grounded responses',
        'Return supporting source citations',
        'Handle irrelevant and out-of-scope questions',
      ],
      technologies: [
        'Python',
        'FastAPI',
        'LangChain',
        'BM25',
        'Sentence Transformers',
        'Pinecone',
        'LLM APIs',
      ],
      image: '',
      github: '',
      demo: '',
    },
    {
      id: 'ai-job-agent',
      number: 'PROJECT_04',
      title: 'AI Job Application Agent',
      category: 'AGENTIC AI',
      description:
        'An intelligent job-search assistant that analyzes resumes and job descriptions, evaluates compatibility, identifies missing skills, and provides tailored application guidance.',
      details: [
        'Extract structured resume information',
        'Analyze job-description requirements',
        'Calculate role compatibility',
        'Identify missing skills and keywords',
        'Generate role-specific resume recommendations',
        'Provide personalized application guidance',
        'Coordinate tasks through a multi-step agent workflow',
      ],
      technologies: [
        'Python',
        'FastAPI',
        'LangGraph',
        'LangChain',
        'React',
        'PostgreSQL',
        'LLM APIs',
      ],
      image: '',
      github: '',
      demo: '',
    },
  ] as Project[],

  publication: {
    title: 'Wearable Smart Device That Can Monitor Multiple Vital Parameters',
    journal: 'Journal of Population Therapeutics and Clinical Pharmacology',
    volumeIssue: '30(15)',
    pages: '342–349',
    date: 'June 2023',
    doi: '10.47750/jptcp.2023.30.15.039',
    url: 'https://doi.org/10.47750/jptcp.2023.30.15.039',
  } as Publication,

  education: [
    {
      institution: 'Webster University',
      location: 'Saint Louis, MO',
      degree: 'M.S. Cybersecurity with Artificial Intelligence',
      endDate: 'December 2025',
    },
    {
      institution: 'R.M.K. Engineering College',
      location: 'Chennai, India',
      degree: 'B.Tech. Computer Science and Engineering',
      endDate: 'May 2023',
    },
  ] as Education[],

  certifications: [
    {
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      badgeImage: '/certifications/aws-developer.svg',
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      badgeImage: '/certifications/aws-cloud-practitioner.svg',
    },
    {
      name: 'PyTorch for Deep Learning',
      issuer: 'PyTorch',
      badgeImage: '/certifications/pytorch.svg',
    },
  ] as Certification[],

  /**
   * Optional Formspree endpoint. Leave empty to use mailto: fallback.
   * UPDATE_ME: Set to your Formspree form URL if desired.
   */
  contactFormEndpoint: '',
} as const;

export type Portfolio = typeof portfolio;

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  'ai-ml': 'AI/ML',
  databases: 'Databases',
  'cloud-devops': 'Cloud & DevOps',
  testing: 'Testing & Tools',
};

export const skillFilters: { id: SkillFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud-devops', label: 'Cloud & DevOps' },
  { id: 'testing', label: 'Testing & Tools' },
];

/** True when GitHub URL looks configured (not a template placeholder). */
export function hasValidGithub(url: string | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes('github.com/') &&
    !lower.includes('your-username') &&
    !lower.includes('username') &&
    !lower.includes('update_me')
  );
}

/** True when LinkedIn URL looks configured (not a template placeholder). */
export function hasValidLinkedIn(url: string | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes('linkedin.com/') &&
    !lower.includes('your-profile') &&
    !lower.includes('your-username') &&
    !lower.includes('update_me')
  );
}
