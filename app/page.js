"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "framer-motion";
import {
  Code2, Cpu, Download, Github, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Phone, Send, Sparkles, X, Briefcase, GraduationCap, Award, Rocket, ChevronDown, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAVEEN } from "@/lib/naveen-data";

// --- helpers ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.6, ease: "easeOut" } }),
};

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// =================== HERO BACKGROUND ===================
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="stars absolute inset-0" />
      <div className="blob bg-fuchsia-600/40 w-[520px] h-[520px] -top-32 -left-32" />
      <div className="blob bg-cyan-500/30 w-[420px] h-[420px] top-1/3 -right-32" style={{ animationDelay: "3s" }} />
      <div className="blob bg-purple-700/30 w-[380px] h-[380px] bottom-0 left-1/3" style={{ animationDelay: "6s" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#06030f]" />
    </div>
  );
}

// =================== CURSOR GLOW ===================
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[420px] w-[420px] rounded-full"
      style={{
        left: pos.x - 210,
        top: pos.y - 210,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.08) 35%, transparent 70%)",
        transition: "left 60ms linear, top 60ms linear",
        mixBlendMode: "screen",
      }}
    />
  );
}

// =================== NAVBAR ===================
function Navbar({ activeId }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass-strong px-5 py-3">
        <a href="#home" className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center text-sm font-black text-black">
            NS
            <span className="absolute -inset-0.5 rounded-lg blur opacity-50 bg-gradient-to-br from-fuchsia-500 to-cyan-400 -z-10" />
          </div>
          <span className="font-semibold tracking-wide">Naveen<span className="text-fuchsia-400">.</span>dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeId === s.id ? "text-white bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={NAVEEN.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button className="btn-neon hidden md:inline-flex bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white border-0 hover:opacity-90 rounded-xl">
              <Download className="h-4 w-4 mr-2" /> Resume
            </Button>
          </a>
          <button onClick={() => setOpen((v) => !v)} className="md:hidden text-white/80 p-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-auto mt-2 max-w-6xl glass-strong rounded-2xl p-3"
          >
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-white/80 hover:bg-white/5">
                {s.label}
              </a>
            ))}
            <a href={NAVEEN.resumeUrl} target="_blank" rel="noopener noreferrer" className="block mt-2">
              <Button className="w-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0">
                <Download className="h-4 w-4 mr-2" /> Download Resume
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// =================== HERO ===================
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="home" ref={ref} className="relative pt-32 pb-20 min-h-[100vh] flex items-center">
      <HeroBackdrop />
      <motion.div style={{ y: yShift }} className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for senior frontend roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
          >
            Hi, I'm <span className="text-gradient">{NAVEEN.name.split(" ")[0]}</span>.
            <br />
            <span className="text-white/90">Senior Frontend</span> <span className="text-gradient">Developer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            {NAVEEN.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={NAVEEN.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-neon rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0 text-white hover:opacity-90">
                <Download className="h-4 w-4 mr-2" /> Download Resume
              </Button>
            </a>
            <a href="#projects">
              <Button size="lg" variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Rocket className="h-4 w-4 mr-2" /> View Projects
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="ghost" className="rounded-xl text-white/80 hover:text-white hover:bg-white/5">
                <Mail className="h-4 w-4 mr-2" /> Contact
              </Button>
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {NAVEEN.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D-ish avatar with orbits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          <div className="ring-orbit relative">
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-60 w-60 md:h-72 md:w-72 rounded-full glow-purple"
              style={{
                background:
                  "conic-gradient(from 90deg, #a855f7, #22d3ee, #ec4899, #a855f7)",
                padding: 3,
              }}
            >
              <div className="h-full w-full rounded-full bg-[#0a0418] grid place-items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="relative text-7xl md:text-8xl font-black text-gradient select-none">NS</div>
                <Sparkles className="absolute top-6 right-8 text-fuchsia-400 h-5 w-5" />
                <Code2 className="absolute bottom-8 left-6 text-cyan-300 h-5 w-5" />
              </div>
            </motion.div>
            {/* floating tech badges */}
            {[
              { t: "React", c: "from-cyan-400 to-blue-500", x: -90, y: -30 },
              { t: "Next.js", c: "from-white to-zinc-300 text-black", x: 110, y: -50 },
              { t: "TypeScript", c: "from-blue-500 to-indigo-600", x: 130, y: 60 },
              { t: "MFE", c: "from-fuchsia-500 to-purple-600", x: -120, y: 80 },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
                className="absolute"
                style={{ left: `calc(50% + ${b.x}px)`, top: `calc(50% + ${b.y}px)` }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${b.c} shadow-lg`}
                >
                  {b.t}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors">
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}

// =================== ABOUT ===================
function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="01 / About" title="A senior dev who ships polished, scalable UI." />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mt-10">
          <Card className="glass border-0 p-7 md:col-span-2 text-white/80 leading-relaxed">
            <p className="text-lg">{NAVEEN.about}</p>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <Info icon={<MapPin className="h-4 w-4 text-fuchsia-400" />} label="Location" value={NAVEEN.location} />
              <Info icon={<Briefcase className="h-4 w-4 text-cyan-400" />} label="Experience" value={`${NAVEEN.experienceYears}+ years`} />
              <Info icon={<GraduationCap className="h-4 w-4 text-pink-400" />} label="Education" value={NAVEEN.education.degree} />
              <Info icon={<Award className="h-4 w-4 text-amber-400" />} label="Cert" value="NCC Certified" />
            </div>
          </Card>
          <Card className="glass border-0 p-7 text-white/80">
            <h4 className="font-semibold text-white">What I do best</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Build scalable Micro Frontend architectures",
                "Ship pixel-perfect, accessible UI",
                "Mentor & train teams (50+ devs)",
                "Lead code reviews & sprint planning",
                "Drive CI/CD with Jenkins & GH Actions",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 flex-shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg glass grid place-items-center">{icon}</div>
      <div>
        <div className="text-xs text-white/50">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

// =================== SECTION TITLE ===================
function SectionTitle({ eyebrow, title }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 font-semibold">{eyebrow}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight">
        {title}
      </h2>
      <div className="h-[2px] w-24 mt-1 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
    </motion.div>
  );
}

// =================== SKILLS ===================
function Skills() {
  const allSkills = useMemo(() => Object.values(NAVEEN.skills).flat(), []);
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="02 / Skills" title="The stack I've battle-tested." />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(NAVEEN.skills).map(([cat, items], i) => (
            <motion.div key={cat} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-0 p-6 h-full tilt-card">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-white">{cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Badge key={s} variant="outline" className="border-white/10 bg-white/[0.03] text-white/80 hover:border-fuchsia-500/50 hover:text-white">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-12 overflow-hidden glass rounded-2xl p-4">
          <div className="marquee gap-3">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={i} className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.03] border border-white/10 text-white/80 mr-3">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== EXPERIENCE TIMELINE ===================
function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="03 / Experience" title="Where I've delivered impact." />
        <div className="relative mt-12">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/60 via-cyan-400/40 to-transparent" />
          <div className="space-y-10">
            {NAVEEN.experience.map((e, i) => (
              <motion.div key={e.company} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 items-start ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                <div className={`md:text-right md:pr-10 ${i % 2 === 0 ? "" : "md:text-left md:pl-10 md:pr-0"}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-2 h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 glow-purple" />
                  <div className="ml-12 md:ml-0">
                    <div className="text-xs text-fuchsia-400 font-semibold tracking-wider uppercase">{e.duration}</div>
                    <div className="text-xl md:text-2xl font-bold mt-1">{e.role}</div>
                    <div className="text-white/70">{e.company} <span className="text-white/40">· {e.location}</span></div>
                    <div className="text-xs text-white/40 mt-1">{e.type}</div>
                  </div>
                </div>
                <div className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"} mt-3 md:mt-0`}>
                  <Card className="glass border-0 p-5">
                    <ul className="space-y-2 text-sm text-white/80">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== PROJECTS ===================
function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="04 / Projects" title="Selected work across 8 enterprise products." />
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {NAVEEN.projects.map((p, i) => (
            <motion.div key={p.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-0 p-6 h-full tilt-card relative overflow-hidden group">
                <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-50 transition-opacity`} />
                <div className="relative">
                  <div className="text-xs font-semibold tracking-wider uppercase text-fuchsia-400">{p.client}</div>
                  <h3 className="text-xl font-bold mt-1">{p.name}</h3>
                  <div className="text-xs text-white/50 mt-1">{p.duration} · {p.role}</div>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Badge key={s} className={`bg-gradient-to-r ${p.accent} border-0 text-white text-xs`}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== CONTACT ===================
function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="05 / Contact" title="Let's build something brilliant together." />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <a href={`mailto:${NAVEEN.email}`} className="block">
            <Card className="glass border-0 p-6 h-full hover:border-fuchsia-500/50 transition-all">
              <Mail className="h-6 w-6 text-fuchsia-400" />
              <div className="mt-3 text-xs text-white/50">Email</div>
              <div className="font-medium break-all">{NAVEEN.email}</div>
            </Card>
          </a>
          <a href={`tel:${NAVEEN.phone.replace(/[^0-9+]/g, "")}`} className="block">
            <Card className="glass border-0 p-6 h-full hover:border-cyan-500/50 transition-all">
              <Phone className="h-6 w-6 text-cyan-400" />
              <div className="mt-3 text-xs text-white/50">Phone</div>
              <div className="font-medium">{NAVEEN.phone}</div>
            </Card>
          </a>
          <a href={NAVEEN.linkedin} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="glass border-0 p-6 h-full hover:border-pink-500/50 transition-all">
              <Linkedin className="h-6 w-6 text-blue-400" />
              <div className="mt-3 text-xs text-white/50">LinkedIn</div>
              <div className="font-medium">/in/naveenjicse</div>
            </Card>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 glass rounded-2xl p-6">
          <div>
            <div className="text-lg font-semibold">Ready to see my full résumé?</div>
            <div className="text-sm text-white/60">Download the latest PDF with all my projects & references.</div>
          </div>
          <a href={NAVEEN.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-neon rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0 text-white hover:opacity-90">
              <Download className="h-4 w-4 mr-2" /> Download Resume
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// =================== FOOTER ===================
function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <div>© {new Date().getFullYear()} Naveen Sachan. Crafted with React, Next.js & a lot of caffeine ☕</div>
        <div className="flex gap-4">
          <a href={NAVEEN.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
          <a href={`mailto:${NAVEEN.email}`} className="hover:text-white"><Mail className="h-4 w-4" /></a>
          <a href={NAVEEN.github} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Github className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

// =================== CHATBOT: Naveen's Buddy ===================
function ChatBuddy() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! I'm Naveen's Buddy 🤖✨ — ask me anything about Naveen's experience, skills, projects, or how to hire him!",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const suggestions = [
    "What is Naveen's experience?",
    "Show me his top projects",
    "What tech stack does he use?",
    "How can I contact him?",
  ];

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content: q }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: newMsgs.slice(0, -1) }),
      });
      const data = await r.json();
      const answer =
        data?.answer ||
        data?.error ||
        "Hmm, I couldn't reach my brain right now. Please try again!";
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network hiccup — please try again in a moment!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center glow-purple shadow-2xl"
        aria-label="Open Naveen's Buddy chatbot"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
        {!open && <span className="absolute inset-0 rounded-full bg-fuchsia-500/40 animate-ping" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[560px] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-fuchsia-600/20 to-cyan-500/20">
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center">
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a0418]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Naveen's Buddy</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · GPT powered
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`chat-pop max-w-[85%] px-3.5 py-2.5 text-sm rounded-2xl ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-fuchsia-600 to-cyan-500 text-white rounded-br-sm"
                        : "bg-white/[0.06] border border-white/10 text-white/90 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl px-3.5 py-2.5 text-sm flex gap-1">
                    <span className="h-2 w-2 bg-fuchsia-400 rounded-full animate-bounce" />
                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80 hover:border-fuchsia-500/50 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="p-3 border-t border-white/10 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Naveen…"
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-fuchsia-500/60"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 border-0 hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =================== SCROLL PROGRESS ===================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-pink-500"
    />
  );
}

// =================== APP ===================
function App() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar activeId={activeId} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ChatBuddy />
    </main>
  );
}

export default App;
