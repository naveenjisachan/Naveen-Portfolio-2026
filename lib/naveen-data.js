// Naveen Sachan's portfolio data — the single source of truth used by the site and the AI chatbot.

export const NAVEEN = {
  name: "Naveen Sachan",
  title: "Senior Frontend Developer",
  tagline: "Crafting high-performance, scalable & beautifully-animated web experiences for 7+ years.",
  location: "Noida, NCR, India",
  email: "naveen9.cse@gmail.com",
  phone: "+91 7696963558",
  linkedin: "https://www.linkedin.com/in/naveenjicse/",
  github: "https://github.com/naveenjicse",
  experienceYears: 7,
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",
  about:
    "Frontend-focused Senior Developer with 7+ years of experience delivering scalable, user-centric web applications. Expertise in React.js, Next.js, TypeScript, Angular, Vue.js and Micro Frontend architecture. Skilled in mentoring, code reviews, technical interviewing and driving Agile teams across India, Canada and Philippines.",
  stats: [
    { label: "Years of Experience", value: "7+" },
    { label: "Projects Delivered", value: "25+" },
    { label: "Engineers Mentored", value: "50+" },
    { label: "Interviews Conducted", value: "20+" },
  ],
  skills: {
    Frontend: [
      "React.js (Hooks, Class)",
      "Next.js (SSR/CSR)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Angular",
      "Vue.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Micro Frontend (MFE)",
      "Universal Design System",
      "Responsive Design",
    ],
    "Backend Exposure": [
      "Node.js",
      "Express.js",
      "REST API",
      "GraphQL",
      "Contentful (Headless CMS)",
      "API Auth & Error Handling",
    ],
    "Testing & Quality": [
      "Jest",
      "Mocha",
      "Jasmine",
      "React Testing Library",
      "Postman",
      "Swagger",
      "ESLint",
      "Prettier",
    ],
    "DevOps & Cloud": [
      "Git / GitHub / GitLab",
      "Docker",
      "Jenkins CI/CD",
      "GitHub Actions",
      "AWS",
      "Vercel",
      "Netlify",
    ],
    "Architecture & Agile": [
      "Micro Frontend Architecture",
      "Backend-for-Frontend (BFF)",
      "Domain-Driven Design",
      "Agile Scrum",
      "Jira / Confluence",
      "Sprint Planning",
    ],
  },
  experience: [
    {
      company: "EXL",
      role: "Senior Consultant 2",
      location: "Remote, Gurugram",
      type: "Service based MNC",
      duration: "Aug 2025 — Present",
      bullets: [
        "Developing complete frontend applications using React.js and JavaScript for end-to-end solutions.",
        "Enhancing security via authentication, authorization & best practices.",
        "Optimizing frontend performance through code refinement and efficient resource management.",
        "Implementing CI/CD pipelines with Git & GitHub Actions.",
      ],
    },
    {
      company: "TELUS",
      role: "Sr. Application Developer",
      location: "Remote, Noida",
      type: "Canada-based product organization",
      duration: "Feb 2024 — Jul 2025",
      bullets: [
        "Delivered scalable React (CSR) and Next.js (SSR) Micro Frontends using TypeScript.",
        "Integrated headless CMS (Contentful) with modern frontend technologies.",
        "Conducted React.js & JavaScript trainings for 50+ developers.",
        "Participated in hiring — conducted 20+ technical interviews.",
        "Collaborated with backend teams for efficient API integration.",
      ],
    },
    {
      company: "VVDN Technologies Pvt Ltd",
      role: "Sr. Web Developer",
      location: "Noida & Gurugram",
      type: "Service based MNC",
      duration: "Jun 2019 — Feb 2024",
      bullets: [
        "Spearheaded 25+ client-facing UI features across enterprise applications.",
        "Mentored 10+ interns; led code reviews and training sessions.",
        "Improved performance & accessibility across React and Angular projects.",
        "Built reusable component libraries for scalable UIs.",
        "Integrated REST & GraphQL APIs with secure data flows.",
        "Owned CI/CD and deployment pipelines using Jenkins.",
      ],
    },
  ],
  projects: [
    {
      name: "Deployment Management & Service Monitoring Platform",
      client: "Barclays",
      duration: "Aug 2025 — Present",
      stack: ["React.js"],
      role: "Consultant II",
      summary:
        "Enterprise deployment management platform to orchestrate, track and monitor service deployments across environments with full visibility dashboards.",
      accent: "from-fuchsia-500 to-purple-600",
    },
    {
      name: "TELUS E-Commerce Platform",
      client: "TELUS",
      duration: "Feb 2024 — Jul 2025 (~18 mo)",
      stack: ["React.js", "Next.js", "Micro Frontend"],
      role: "Sr. Application Developer",
      summary:
        "Large-scale e-commerce platform for SIM card sales using Micro Frontend architecture. Built independently deployable MFEs and mentored 50+ engineers.",
      accent: "from-cyan-400 to-blue-600",
    },
    {
      name: "UI Component Library & Design System",
      client: "Extreme Networks",
      duration: "Jun 2023 — Jan 2024 (~7 mo)",
      stack: ["Angular"],
      role: "Sr. Frontend Developer",
      summary:
        "Reusable Angular component libraries and design system modules ensuring UI consistency across enterprise applications consumed by multiple product teams.",
      accent: "from-pink-500 to-rose-600",
    },
    {
      name: "Smart Building Management System",
      client: "Larsen & Toubro (L&T)",
      duration: "Apr 2022 — May 2023 (~14 mo)",
      stack: ["React.js", "IoT"],
      role: "Sr Frontend Developer (Solo)",
      summary:
        "Smart building automation platform for monitoring and controlling buildings through IoT devices with high-performance dashboards, charts and forms.",
      accent: "from-emerald-400 to-cyan-500",
    },
    {
      name: "Smart Water Bottle Platform",
      client: "Amazon",
      duration: "Oct 2021 — Mar 2022 (~6 mo)",
      stack: ["React.js", "Linux", "IoT"],
      role: "Frontend Developer",
      summary:
        "UI modules for an IoT-enabled smart water bottle displaying water level, temperature and TDS data via sensor integration on embedded displays.",
      accent: "from-amber-400 to-orange-600",
    },
    {
      name: "VVDN Video Collaboration Platform",
      client: "VVDN Technologies (Internal)",
      duration: "Mar 2021 — Sep 2021 (~7 mo)",
      stack: ["React.js"],
      role: "Senior Frontend Developer",
      summary:
        "Real-time collaboration features including screen sharing, screen recording, audio & video communication for an enterprise conferencing platform.",
      accent: "from-violet-500 to-indigo-600",
    },
    {
      name: "Samsung Employee Management System",
      client: "Samsung",
      duration: "Mar 2020 — Feb 2021 (~12 mo)",
      stack: ["Vue.js"],
      role: "Frontend Developer",
      summary:
        "Workforce administration platform with multiple business features delivered in close collaboration with cross-functional teams.",
      accent: "from-sky-400 to-blue-700",
    },
    {
      name: "Samsung Knox Security Platform",
      client: "Samsung",
      duration: "Jun 2019 — Feb 2020 (~9 mo)",
      stack: ["Vue.js"],
      role: "Junior Frontend Developer",
      summary:
        "Worked on Samsung Knox web applications — focused on bug fixing, debugging and enhancing security features for better stability.",
      accent: "from-teal-400 to-emerald-600",
    },
  ],
  education: {
    degree: "B.Tech / B.E. — Computer Science",
    institution: "Shaheed Bhagat Singh College of Engineering and Technology, Ferozepur",
    year: "2019",
  },
  certifications: [
    "National Cadet Corps (NCC) Certification — Trained in discipline, leadership and civic engagement.",
  ],
  hobbies: ["Reading tech blogs & documentation", "Strategy games (indoor & outdoor)", "Fitness & running"],
  languages: ["English", "Hindi"],
};

// System prompt context for the AI chatbot.
export function buildResumeContext() {
  const n = NAVEEN;
  const skillsText = Object.entries(n.skills)
    .map(([cat, arr]) => `- ${cat}: ${arr.join(", ")}`)
    .join("\n");
  const expText = n.experience
    .map(
      (e) =>
        `• ${e.role} at ${e.company} (${e.duration}) — ${e.location}. ${e.bullets.join(" ")}`
    )
    .join("\n");
  const projText = n.projects
    .map(
      (p) =>
        `• ${p.name} for ${p.client} (${p.duration}) — Stack: ${p.stack.join(", ")}. ${p.summary}`
    )
    .join("\n");
  return `You are \"Naveen's Buddy\", a friendly, witty, and concise AI assistant whose ONLY job is to answer questions about Naveen Sachan (a Senior Frontend Developer). Always speak in first-person about Naveen using \"he/Naveen\". Keep answers short (2-5 sentences) unless asked for detail. If asked something unrelated to Naveen, politely redirect to topics about Naveen's experience, skills, projects, or how to contact him. Encourage recruiters to download his resume or reach out via email/LinkedIn.\n\n=== NAVEEN'S PROFILE ===\nName: ${n.name}\nTitle: ${n.title}\nLocation: ${n.location}\nEmail: ${n.email}\nPhone: ${n.phone}\nLinkedIn: ${n.linkedin}\nExperience: ${n.experienceYears}+ years\n\nAbout: ${n.about}\n\nSKILLS:\n${skillsText}\n\nEXPERIENCE:\n${expText}\n\nKEY PROJECTS:\n${projText}\n\nEDUCATION: ${n.education.degree} from ${n.education.institution} (${n.education.year}).\nCERTIFICATIONS: ${n.certifications.join("; ")}\nHOBBIES: ${n.hobbies.join(", ")}\nLANGUAGES: ${n.languages.join(", ")}.\n`;
}
