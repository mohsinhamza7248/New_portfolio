export const PROJECTS = [
  {
    id: 'eden-sign',
    title: 'Eden Sign',
    tagline: 'Salon Appointment Platform',
    description:
      'A full-featured salon booking platform connecting customers with top-rated salons. Enables real-time appointment scheduling, service discovery, and connects salon professionals with new opportunities.',
    longDescription:
      'Eden Sign is a production SaaS platform built to modernize the salon industry. It handles high-concurrency booking with real-time slot availability, SMS/email notifications via Twilio & Nodemailer, role-based dashboards for salon owners vs customers, and an admin CMS for managing services and pricing.',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'JWT Auth', 'AWS S3', 'Cloudinary', 'REST API'],
    category: 'SaaS Platform',
    color: '#8b5cf6',
    live: 'https://eden-sign.netlify.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: true,
    challenges: 'Real-time slot conflict resolution, multi-timezone support, image upload pipeline',
    solution: 'Implemented optimistic locking on appointment slots, Cloudinary CDN for media, and JWT refresh token rotation',
  },
  {
    id: 'stockpro',
    title: 'StockPro',
    tagline: 'Wholesale Stock Management Dashboard',
    description:
      'Production-ready inventory management system for wholesale mobile components businesses. Features real-time analytics, bill import, auto-categorization, and role-based access control.',
    longDescription:
      'Built for Gani Enterprises — a Delhi-based wholesale mobile components dealer. Handles thousands of SKUs, supplier bills import, stock level alerts, and generates PDF reports. The dashboard provides live inventory metrics and profit/loss analytics.',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'NestJS', 'JWT Auth', 'Shadcn UI', 'TailwindCSS', 'Docker'],
    category: 'Dashboard / SaaS',
    color: '#0ea5e9',
    live: 'https://gani-mobile-stock.vercel.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: true,
    challenges: 'Complex inventory reconciliation, bulk bill import parsing, multi-user concurrent edits',
    solution: 'Event-sourced inventory ledger, CSV parser with error recovery, WebSocket-based live updates',
  },
  {
    id: 'medico-humsafar',
    title: 'Medico Humsafar',
    tagline: 'AI Medical Guidance Chatbot',
    description:
      'An intelligent AI-powered medical guidance platform. Users upload medical reports and receive expert analysis and health recommendations powered by LLM integration.',
    longDescription:
      'Medico Humsafar bridges the gap between patients and medical knowledge. The platform uses LLM APIs to analyze uploaded medical reports (PDF/image), extract key findings, and provide actionable health guidance. Built with accessibility and privacy in mind.',
    tech: ['Next.js', 'TypeScript', 'AI/LLM API', 'Shadcn UI', 'TailwindCSS', 'Vercel'],
    category: 'AI Application',
    color: '#ec4899',
    live: 'https://medico-humsafar.vercel.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: true,
    challenges: 'Accurate medical report parsing, LLM hallucination prevention, privacy compliance',
    solution: 'Structured prompting with validation layers, client-side document processing, zero data retention policy',
  },
  {
    id: 'evergreen-pizza',
    title: 'EverGreen Pizza',
    tagline: 'Full-Stack Restaurant Platform',
    description:
      'A modern pizza ordering platform with dynamic menu, cart management, contact forms, and a beautiful dark-themed UI with smooth animations.',
    longDescription:
      'EverGreen Pizza is a complete restaurant web app with NextUI components, image carousels, online ordering flow, service pages, and contact management. Deployed on Vercel with optimized image loading and SEO.',
    tech: ['Next.js', 'TypeScript', 'NextUI', 'TailwindCSS', 'Vercel', 'REST API'],
    category: 'E-Commerce',
    color: '#22c55e',
    live: 'https://evergreen-pizza.vercel.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: false,
    challenges: 'Real-time cart synchronization, responsive image carousels, mobile-first design',
    solution: 'Zustand for cart state, Preline carousel library, TailwindCSS responsive grid',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    tagline: 'Intelligent Conversational AI',
    description:
      'A sleek AI chatbot interface with context-aware conversation, streaming responses, and a clean minimal UI for seamless human-AI interaction.',
    longDescription:
      'A production chatbot built with streaming LLM responses, conversation history management, and a beautiful UI. Supports markdown rendering in responses, code highlighting, and multi-turn context.',
    tech: ['React', 'TypeScript', 'AI API', 'Node.js', 'REST API', 'TailwindCSS'],
    category: 'AI Application',
    color: '#f59e0b',
    live: 'https://chatbot-ten-tau-60.vercel.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: false,
    challenges: 'Streaming token rendering, conversation context management, response formatting',
    solution: 'Server-Sent Events for streaming, sliding window context buffer, react-markdown with syntax highlighting',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Agency',
    tagline: 'Agency Website with Lead Gen',
    description:
      'A high-converting digital marketing agency website with service showcases, portfolio sections, testimonials, and optimized lead capture forms.',
    longDescription:
      'Built for a digital marketing agency with a focus on conversion rate optimization. Features animated hero sections, service cards, client testimonials, and a multi-step contact form with email integration.',
    tech: ['React', 'Next.js', 'TailwindCSS', 'Nodemailer', 'Vercel', 'Framer Motion'],
    category: 'Agency Website',
    color: '#f97316',
    live: 'https://digital-marketing-122.netlify.app/',
    github: 'https://github.com/mohsinhamza7248',
    featured: false,
    challenges: 'Performance optimization, SEO, lead form spam prevention',
    solution: 'Static generation, structured data markup, honeypot + rate limiting on contact API',
  },
];

export const SKILLS = {
  Frontend: {
    color: '#0ea5e9',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'Material UI', 'Shadcn UI', 'Redux', 'Framer Motion', 'GSAP'],
  },
  Backend: {
    color: '#8b5cf6',
    skills: ['Node.js', 'NestJS', 'Express', 'REST API', 'JWT Auth', 'WebSockets'],
  },
  Database: {
    color: '#06b6d4',
    skills: ['MongoDB', 'PostgreSQL', 'Redis'],
  },
  Cloud: {
    color: '#22c55e',
    skills: ['AWS S3', 'Cloudinary', 'Vercel', 'Render'],
  },
  DevOps: {
    color: '#f59e0b',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD'],
  },
  '3D & Design': {
    color: '#ec4899',
    skills: ['Three.js', 'React Three Fiber', 'GSAP', 'Figma', 'Framer Motion'],
  },
};

export const EXPERIENCE = [
  {
    year: '2024 – Present',
    role: 'Full Stack Developer',
    company: 'Current Position',
    description:
      'Engineering scalable full-stack applications with Next.js, NestJS, and PostgreSQL. Leading frontend architecture decisions, building reusable component libraries, and optimizing Core Web Vitals.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Docker'],
    type: 'work',
  },
  {
    year: '2023 – 2024',
    role: 'Frontend Developer',
    company: 'Freelance',
    description:
      'Delivered 6+ production projects for clients across India. Specialized in React/Next.js development, responsive design, and REST API integration.',
    tech: ['React', 'Next.js', 'TailwindCSS', 'Node.js', 'MongoDB'],
    type: 'work',
  },
  {
    year: '2022 – 2023',
    role: 'Self-taught Developer',
    company: 'Learning Phase',
    description:
      'Completed intensive full-stack curriculum. Built 10+ projects spanning e-commerce, dashboards, and AI integrations. Mastered React ecosystem and backend development.',
    tech: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    type: 'education',
  },
];

export const SERVICES = [
  {
    title: 'Full Stack Development',
    description: 'End-to-end web application development from database design to polished UI.',
    icon: '⚡',
    color: '#0ea5e9',
  },
  {
    title: 'Dashboard & Admin Panels',
    description: 'Data-rich dashboards with real-time analytics, role-based access, and beautiful UI.',
    icon: '📊',
    color: '#8b5cf6',
  },
  {
    title: 'REST API Development',
    description: 'Scalable, documented, and secure REST APIs with Node.js, NestJS, and Express.',
    icon: '🔌',
    color: '#06b6d4',
  },
  {
    title: 'SaaS Application Development',
    description: 'Multi-tenant SaaS platforms with subscription management, auth, and billing.',
    icon: '🚀',
    color: '#22c55e',
  },
  {
    title: 'Performance Optimization',
    description: 'Lighthouse 95+ scores, Core Web Vitals optimization, and load time reduction.',
    icon: '🎯',
    color: '#f59e0b',
  },
  {
    title: 'UI/UX Engineering',
    description: 'Pixel-perfect, animated interfaces using Framer Motion, GSAP, and Three.js.',
    icon: '✨',
    color: '#ec4899',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Irfan Khan',
    role: 'Owner',
    company: 'Gani Enterprises',
    avatar: 'IK',
    color: '#0ea5e9',
    text: 'Mohsin delivered our StockPro inventory system beyond expectations. The dashboard is fast, intuitive, and has completely transformed how we manage our wholesale mobile components business. Real-time analytics alone saved us hours every week. Truly exceptional work — I would hire him again without hesitation.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'TechVentures India',
    avatar: 'SM',
    color: '#8b5cf6',
    text: "Working with Mohsin was a pleasure. He not only delivered clean, maintainable code but also proactively suggested architecture improvements that reduced our API response time by 40%. His TypeScript skills and attention to detail set him apart from other developers we've worked with.",
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'Eden Beauty Group',
    avatar: 'PS',
    color: '#ec4899',
    text: 'The Eden Sign platform Mohsin built handles thousands of salon bookings without a hitch. The UI is gorgeous, the booking flow is seamless, and our customers love it. He also provided excellent post-launch support. Highly recommend for any serious web project.',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Product Manager',
    company: 'DigitalCraft Agency',
    avatar: 'AA',
    color: '#22c55e',
    text: "Mohsin's ability to turn complex requirements into elegant solutions is remarkable. He built our agency website in record time with animations that genuinely impressed our clients. His communication is professional, and he delivers exactly what's promised on time.",
    rating: 5,
  },
];

export const GITHUB_USERNAME = 'mohsinhamza7248';

export const SOCIAL = {
  github: 'https://github.com/mohsinhamza7248',
  linkedin: 'https://www.linkedin.com/in/mohsin-ansari-195817254',
  instagram: 'https://www.instagram.com/mohsin_ansari_20',
  discord: 'https://discord.com/users/mohsin9579',
  email: 'mohsinhamza7248@gmail.com',
  resume: 'https://drive.google.com/file/d/1RAbM_FLWQ8JSUUkckZqrc6VluMrAFCDT/view?usp=drive_link',
  whatsapp: 'https://wa.me/917248437226', // TODO: Update with your WhatsApp number (with country code, e.g., 919999999999)
};

