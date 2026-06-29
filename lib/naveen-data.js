// Naveen Sachan's portfolio data — the single source of truth used by the site and the AI chatbot.

export const NAVEEN = {
  name: "Naveen Sachan",
  title: "Senior Frontend Developer",
  tagline:
    "Crafting high-performance, scalable & beautifully-animated web experiences for 7+ years.",
  location: "Noida, NCR, India",
  email: "naveen9.cse@gmail.com",
  phone: "+91 7696963558",
  linkedin: "https://www.linkedin.com/in/naveenjicse/",
  github: "https://github.com/naveenjicse",
  experienceYears: 7,
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",
  resumeDownloadUrl: "/api/resume", // proxied to force PDF download with proper filename
  // Senior-level highlight badges shown orbiting the hero photo (no HTML/CSS basics)
  heroBadges: [
    { t: "React.js", c: "from-cyan-400 to-blue-500" },
    { t: "Next.js", c: "from-white to-zinc-300 text-black" },
    { t: "TypeScript", c: "from-blue-500 to-indigo-600" },
    { t: "Micro Frontends", c: "from-fuchsia-500 to-purple-600" },
    { t: "Frontend Architecture", c: "from-purple-500 to-pink-500" },
    { t: "Performance", c: "from-amber-400 to-orange-500" },
    { t: "System Design", c: "from-rose-500 to-pink-600" },
    { t: "Angular", c: "from-red-500 to-rose-600" },
    { t: "Vue.js", c: "from-emerald-400 to-green-600" },
    { t: "Redux Toolkit", c: "from-violet-500 to-purple-700" },
    { t: "Tech Leadership", c: "from-yellow-400 to-amber-500 text-black" },
    { t: "Team Mentoring", c: "from-teal-400 to-cyan-600" },
    { t: "Jest / RTL", c: "from-pink-400 to-rose-500" },
    { t: "CI/CD", c: "from-sky-400 to-blue-700" },
  ],
  photoUrl:
    "https://customer-assets.emergentagent.com/job_code-canvas-pro-3/artifacts/njwazn8r_Naveen_DP.jpeg",
  about:
    "Frontend-focused Senior Developer with 7+ years of experience delivering scalable, user-centric web applications. Expertise in React.js, Next.js, TypeScript, Angular, Vue.js and Micro Frontend architecture. Skilled in mentoring, code reviews, technical interviewing and driving Agile teams across India, Canada and Philippines.",
  stats: [
    { label: "Years of Experience", value: "7+" },
    { label: "Projects Delivered", value: "10+" },
    { label: "Engineers Mentored", value: "50+" },
    { label: "Interviews Conducted", value: "50+" },
  ],
  companies: [
    "EXL",
    "TELUS",
    "VVDN",
    "Barclays",
    "Samsung",
    "Amazon",
    "L&T",
    "Extreme Networks",
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
      "Socket API",
      "GraphQL",
      "MongoDB",
      "mySQL",
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
        "Participated in hiring — conducted 50+ technical interviews.",
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
  services: [
    {
      icon: "Layers",
      title: "Frontend Architecture",
      desc: "Design scalable Micro Frontend & Module Federation systems with clean boundaries and shared design tokens.",
      points: [
        "MFE Strategy",
        "Module Federation",
        "BFF Pattern",
        "Design Systems",
      ],
    },
    {
      icon: "Sparkles",
      title: "Premium UI Engineering",
      desc: "Ship polished, accessible, performant interfaces with React/Next.js — production-ready in record time.",
      points: ["React / Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    },
    {
      icon: "Users",
      title: "Team Mentorship",
      desc: "Train, code-review, and uplift engineering teams. 50+ devs mentored and 50+ hiring interviews conducted.",
      points: ["Training", "Code Reviews", "Interviewing", "Agile Coaching"],
    },
    {
      icon: "Rocket",
      title: "DevOps & Delivery",
      desc: "Set up CI/CD pipelines, environment-based deployments, and PR validation for fast & safe shipping.",
      points: ["GitHub Actions", "Jenkins", "Docker", "AWS / Vercel"],
    },
  ],
  testimonials: [
    {
      quote:
        "Naveen consistently delivered scalable Micro Frontend modules and made our React codebase a joy to work in. A natural mentor — the kind of engineer who lifts the whole team.",
      name: "Engineering Manager",
      role: "Product Org — TELUS (Canada)",
    },
    {
      quote:
        "He shipped 25+ UI features across enterprise clients and trained our interns from zero to productive. His code reviews are textbook material.",
      name: "Tech Lead",
      role: "VVDN Technologies",
    },
    {
      quote:
        "From Next.js SSR to Contentful integration, Naveen led with clarity. He's the rare frontend developer who thinks like an architect.",
      name: "Senior Architect",
      role: "E-Commerce Platform",
    },
  ],
  now: [
    "💼 Building deployment-management dashboards for Barclays at EXL.",
    "📚 Deep-diving into React Server Components & Next.js 15 App Router.",
    "🎯 Mentoring junior devs on Micro Frontend best-practices.",
    "🏃 Training for a half-marathon (because clean code = clean cardio).",
  ],
  education: {
    degree: "B.Tech / B.E. — Computer Science",
    institution:
      "Shaheed Bhagat Singh College of Engineering and Technology, Ferozepur",
    year: "2019",
  },
  certifications: [
    "National Cadet Corps (NCC) Certification — Trained in discipline, leadership and civic engagement.",
  ],
  hobbies: [
    "Reading tech blogs & documentation",
    "Strategy games (indoor & outdoor)",
    "Fitness & running",
  ],
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
        `• ${e.role} at ${e.company} (${e.duration}) — ${e.location}. ${e.bullets.join(" ")}`,
    )
    .join("\n");
  const projText = n.projects
    .map(
      (p) =>
        `• ${p.name} for ${p.client} (${p.duration}) — Stack: ${p.stack.join(", ")}. ${p.summary}`,
    )
    .join("\n");
  return `You are \"Naveen's Buddy\" 🤖 — a witty, warm, slightly cheeky AI assistant whose ONLY job is to help recruiters, hiring managers, and curious visitors learn about Naveen Sachan (a Senior Frontend Developer with 7+ years of experience).

PERSONALITY RULES:
- Be friendly, confident, professional, and a little fun. Use a tasteful emoji (1–2 max) per reply.
- Refer to Naveen by name or \"he\". Speak in 1st-person-friendly tone (\"Naveen has…\", \"He recently…\").
- Keep answers concise (2–5 sentences) unless explicitly asked for more detail.
- Always close with a small nudge — e.g. \"Want me to share his resume link?\" or \"Should I tell you about his projects?\" — but vary the wording so it never feels repetitive.
- If asked something unrelated to Naveen, politely steer back to his skills, projects, or how to contact him.
- Never invent companies, dates, or projects not in the data below.
- If someone is rude, stay polite and graceful.
- For \"how can I hire him / contact him\" — share his email, LinkedIn and the resume download link.

=== NAVEEN'S PROFILE ===
Name: ${n.name}
Title: ${n.title}
Location: ${n.location}
Email: ${n.email}
Phone: ${n.phone}
LinkedIn: ${n.linkedin}
Resume: ${n.resumeUrl}
Experience: ${n.experienceYears}+ years

About: ${n.about}

SKILLS:
${skillsText}

EXPERIENCE:
${expText}

KEY PROJECTS:
${projText}

EDUCATION: ${n.education.degree} from ${n.education.institution} (${n.education.year}).
CERTIFICATIONS: ${n.certifications.join("; ")}
HOBBIES: ${n.hobbies.join(", ")}
LANGUAGES: ${n.languages.join(", ")}.
`;
}
