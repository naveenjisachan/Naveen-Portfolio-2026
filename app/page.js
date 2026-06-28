"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Code2, Cpu, Download, Github, Linkedin, Mail, MapPin, Menu, Phone, Send, Sparkles, X,
  Briefcase, GraduationCap, Award, Rocket, ChevronDown, Bot, Sun, Moon, Quote, Layers,
  Users, Zap, Calendar, Clock, MessageSquare, CheckCircle2
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
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const ICONS = { Layers, Sparkles, Users, Rocket, Zap, Bot, Code2 };

// =================== THEME TOGGLE ===================
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative h-9 w-9 grid place-items-center rounded-full glass hover:scale-105 transition-transform"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <Moon className="h-4 w-4 text-fuchsia-300" />
          </motion.div>
        ) : (
          <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <Sun className="h-4 w-4 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// =================== HERO BACKGROUND ===================
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="stars absolute inset-0" />
      <div className="blob bg-fuchsia-600/40 w-[520px] h-[520px] -top-32 -left-32" />
      <div className="blob bg-cyan-500/30 w-[420px] h-[420px] top-1/3 -right-32" style={{ animationDelay: "3s" }} />
      <div className="blob bg-purple-700/30 w-[380px] h-[380px] bottom-0 left-1/3" style={{ animationDelay: "6s" }} />
      <div className="perspective-floor" />
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
      className="pointer-events-none fixed z-[1] h-[420px] w-[420px] rounded-full hidden md:block"
      style={{
        left: pos.x - 210, top: pos.y - 210,
        background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.08) 35%, transparent 70%)",
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

        <nav className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeId === s.id ? "bg-white/5 dark:bg-white/5" : "text-muted hover:bg-white/5"}`}>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={NAVEEN.resumeDownloadUrl} download="Naveen_Sachan_Resume.pdf" className="hidden md:inline-block">
            <Button className="btn-neon bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white border-0 hover:opacity-90 rounded-xl">
              <Download className="h-4 w-4 mr-2" /> Resume
            </Button>
          </a>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-auto mt-2 max-w-6xl glass-strong rounded-2xl p-3">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/5">
                {s.label}
              </a>
            ))}
            <a href={NAVEEN.resumeDownloadUrl} download="Naveen_Sachan_Resume.pdf" className="block mt-2">
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
  return (
    <section id="home" className="relative pt-32 pb-20 min-h-[100vh] flex items-center overflow-hidden">
      <HeroBackdrop />
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center w-full">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for senior frontend roles
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            Hi, I'm <span className="text-gradient">{NAVEEN.name.split(" ")[0]}</span>.
            <br />
            <span className="opacity-95">Senior Frontend</span> <span className="text-gradient">Developer.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-subtle">
            {NAVEEN.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3">
            <a href={NAVEEN.resumeDownloadUrl} download="Naveen_Sachan_Resume.pdf">
              <Button size="lg" className="btn-neon rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0 text-white hover:opacity-90">
                <Download className="h-4 w-4 mr-2" /> Download Resume
              </Button>
            </a>
            <a href="#projects">
              <Button size="lg" variant="outline" className="rounded-xl glass border-0">
                <Rocket className="h-4 w-4 mr-2" /> View Projects
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="ghost" className="rounded-xl">
                <Mail className="h-4 w-4 mr-2" /> Contact
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {NAVEEN.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Profile photo with luxurious circular frame */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative flex justify-center">
          <div className="ring-orbit relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-72 w-72 md:h-80 md:w-80 rounded-full glow-purple"
              style={{
                background: "conic-gradient(from 90deg, #a855f7, #22d3ee, #ec4899, #fbbf24, #a855f7)",
                padding: 3,
              }}>
              <div className="h-full w-full rounded-full bg-[#0a0418] grid place-items-center relative overflow-hidden">
                {/* photo */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 pro-photo"
                    style={{
                      backgroundImage: `url(${NAVEEN.photoUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 25%",
                    }}
                  />
                  {/* Replace background with dark gradient via radial mask */}
                  <div className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 60%, transparent 35%, rgba(6,3,15,0.55) 65%, rgba(6,3,15,0.95) 100%)",
                    }}
                  />
                  {/* color accent overlay */}
                  <div className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, transparent 40%, rgba(34,211,238,0.18) 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-grid opacity-25" />
                <Sparkles className="absolute top-6 right-8 text-fuchsia-300 h-5 w-5" />
                <Code2 className="absolute bottom-8 left-6 text-cyan-300 h-5 w-5" />
              </div>
            </motion.div>

            {/* floating tech badges arranged in a circle */}
            {NAVEEN.heroBadges.map((b, i) => {
              const total = NAVEEN.heroBadges.length;
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2; // start from top
              const radius = 200; // distance from center
              // Round to 2 decimals so SSR and CSR produce identical strings (avoids hydration mismatch)
              const x = (Math.cos(angle) * radius).toFixed(2);
              const y = (Math.sin(angle) * radius).toFixed(2);
              return (
                <motion.div
                  key={b.t}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
                  className="absolute pointer-events-none"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r ${b.c} shadow-xl whitespace-nowrap pointer-events-auto`}
                  >
                    {b.t}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Floating ring of dots */}
            <div className="absolute -inset-12 rounded-full pointer-events-none" aria-hidden />
          </div>
        </motion.div>
      </div>

      {/* Companies marquee */}
      <div className="absolute bottom-0 inset-x-0 py-5 border-t divider glass-strong">
        <div className="text-[10px] tracking-[0.4em] uppercase text-muted text-center mb-3">Trusted with work for</div>
        <div className="overflow-hidden">
          <div className="marquee marquee-slow gap-8 items-center text-lg font-bold opacity-70">
            {[...NAVEEN.companies, ...NAVEEN.companies, ...NAVEEN.companies].map((c, i) => (
              <span key={i} className="px-6 whitespace-nowrap">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted hover:opacity-100 transition-colors">
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
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-10">
          <Card className="glass border-0 p-7 md:col-span-2 text-subtle leading-relaxed">
            <p className="text-lg">{NAVEEN.about}</p>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <Info icon={<MapPin className="h-4 w-4 text-fuchsia-400" />} label="Location" value={NAVEEN.location} />
              <Info icon={<Briefcase className="h-4 w-4 text-cyan-400" />} label="Experience" value={`${NAVEEN.experienceYears}+ years`} />
              <Info icon={<GraduationCap className="h-4 w-4 text-pink-400" />} label="Education" value={NAVEEN.education.degree} />
              <Info icon={<Award className="h-4 w-4 text-amber-400" />} label="Cert" value="NCC Certified" />
            </div>
          </Card>
          <Card className="glass border-0 p-7">
            <h4 className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-400" /> Currently</h4>
            <ul className="mt-4 space-y-3 text-sm text-subtle">
              {NAVEEN.now.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 flex-shrink-0" />
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
        <div className="text-xs text-muted">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 font-semibold">{eyebrow}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h2>
      <div className="h-[2px] w-24 mt-1 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
    </motion.div>
  );
}

// =================== SERVICES ===================
function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="02 / Services" title="What I bring to your team." />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {NAVEEN.services.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <motion.div key={s.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="glass border-0 p-6 h-full tilt-card relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 blur-2xl group-hover:opacity-80 transition-opacity" />
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center text-white shadow-lg glow-purple">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-subtle leading-relaxed">{s.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.points.map((p) => (
                        <span key={p} className="text-[10px] px-2 py-1 rounded-full glass">{p}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =================== SKILLS ===================
function Skills() {
  const allSkills = useMemo(() => Object.values(NAVEEN.skills).flat(), []);
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="03 / Skills" title="The stack I've battle-tested." />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(NAVEEN.skills).map(([cat, items], i) => (
            <motion.div key={cat} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-0 p-6 h-full tilt-card">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold">{cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Badge key={s} variant="outline" className="border-white/10 dark:border-white/10 bg-white/[0.03] text-subtle hover:border-fuchsia-500/50">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <ContributionHeatmap />

        <div className="mt-12 overflow-hidden glass rounded-2xl p-4">
          <div className="marquee gap-3">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={i} className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium glass mr-3">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== CONTRIBUTION HEATMAP ===================
function ContributionHeatmap() {
  const [data, setData] = useState({ cells: [], total: 0 });
  useEffect(() => {
    fetch("/api/contributions").then((r) => r.json()).then(setData).catch(() => {});
  }, []);
  // Group into weeks of 7
  const weeks = [];
  for (let i = 0; i < data.cells.length; i += 7) weeks.push(data.cells.slice(i, i + 7));

  return (
    <Card className="glass border-0 p-6 mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-fuchsia-400 font-semibold">Activity</div>
          <h3 className="text-lg font-bold mt-1">
            <span className="text-gradient">{data.total || "—"}</span> contributions in the last year
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          Less
          {[0, 1, 2, 3, 4].map((l) => (<span key={l} className={`cb-cell cb-${l}`} />))}
          More
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((c, ci) => (
                <div key={ci} className={`cb-cell cb-${c.level}`} title={`${c.date}: ${c.level * 2} contributions`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// =================== EXPERIENCE ===================
function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="04 / Experience" title="Where I've delivered impact." />
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
                    <div className="text-subtle">{e.company} <span className="text-muted">· {e.location}</span></div>
                    <div className="text-xs text-muted mt-1">{e.type}</div>
                  </div>
                </div>
                <div className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"} mt-3 md:mt-0`}>
                  <Card className="glass border-0 p-5">
                    <ul className="space-y-2 text-sm text-subtle">
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
        <SectionTitle eyebrow="05 / Projects" title="Selected work across 8 enterprise products." />
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {NAVEEN.projects.map((p, i) => (
            <motion.div key={p.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-0 p-6 h-full tilt-card relative overflow-hidden group">
                <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-50 transition-opacity`} />
                <div className="relative">
                  <div className="text-xs font-semibold tracking-wider uppercase text-fuchsia-400">{p.client}</div>
                  <h3 className="text-xl font-bold mt-1">{p.name}</h3>
                  <div className="text-xs text-muted mt-1">{p.duration} · {p.role}</div>
                  <p className="mt-3 text-sm text-subtle leading-relaxed">{p.summary}</p>
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

// =================== TESTIMONIALS ===================
function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="06 / Testimonials" title="What collaborators say." />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {NAVEEN.testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-0 p-6 h-full relative overflow-hidden tilt-card">
                <Quote className="absolute -top-2 -left-2 h-16 w-16 text-fuchsia-500/15" />
                <div className="relative">
                  <p className="text-subtle italic leading-relaxed">"{t.quote}"</p>
                  <div className="mt-5 pt-4 border-t divider">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
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

// =================== CONTACT (with form) ===================
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="07 / Contact" title="Let's build something brilliant together." />
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Left: info cards */}
          <div className="space-y-4">
            <a href={`mailto:${NAVEEN.email}`} className="block">
              <Card className="glass border-0 p-5 hover:border-fuchsia-500/50 transition-all flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted">Email</div>
                  <div className="font-medium break-all">{NAVEEN.email}</div>
                </div>
              </Card>
            </a>
            <a href={`tel:${NAVEEN.phone.replace(/[^0-9+]/g, "")}`} className="block">
              <Card className="glass border-0 p-5 hover:border-cyan-500/50 transition-all flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted">Phone</div>
                  <div className="font-medium">{NAVEEN.phone}</div>
                </div>
              </Card>
            </a>
            <a href={NAVEEN.linkedin} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="glass border-0 p-5 hover:border-pink-500/50 transition-all flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-pink-500 to-blue-500 grid place-items-center">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted">LinkedIn</div>
                  <div className="font-medium">/in/naveenjicse</div>
                </div>
              </Card>
            </a>
            <a href={NAVEEN.resumeDownloadUrl} download="Naveen_Sachan_Resume.pdf" className="block">
              <Card className="glass-strong border-0 p-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Grab my full résumé</div>
                  <div className="text-xs text-muted mt-1">Latest PDF · 1 page</div>
                </div>
                <Button className="btn-neon rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0 text-white">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </Card>
            </a>
          </div>

          {/* Right: form */}
          <Card className="glass border-0 p-7">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" /> Send me a message
            </h3>
            <p className="text-sm text-muted mt-1">I usually respond within 24 hours.</p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required placeholder="Your name"
                  className="input-base rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-fuchsia-500/60" />
                <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required type="email" placeholder="Email"
                  className="input-base rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-fuchsia-500/60" />
              </div>
              <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required rows={5} placeholder="Tell me about your project or role…"
                className="input-base w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-fuchsia-500/60 resize-none" />
              <Button type="submit" disabled={status === "sending"}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 border-0 text-white hover:opacity-90">
                {status === "sending" ? "Sending…" : (<><Send className="h-4 w-4 mr-2" /> Send message</>)}
              </Button>
              {status === "sent" && (
                <div className="text-sm text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Message received! Naveen will reply soon.
                </div>
              )}
              {status === "error" && (
                <div className="text-sm text-rose-400">Hmm, couldn't send. Please email directly.</div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

// =================== FOOTER ===================
function Footer() {
  return (
    <footer className="relative py-10 border-t divider">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div>© {new Date().getFullYear()} Naveen Sachan. Crafted with React, Next.js & a lot of caffeine ☕</div>
        <div className="flex gap-4">
          <a href={NAVEEN.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100"><Linkedin className="h-4 w-4" /></a>
          <a href={`mailto:${NAVEEN.email}`} className="hover:opacity-100"><Mail className="h-4 w-4" /></a>
          <a href={NAVEEN.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100"><Github className="h-4 w-4" /></a>
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
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return "ssr";
    const k = "nb_sess";
    let v = window.localStorage.getItem(k);
    if (!v) { v = Math.random().toString(36).slice(2) + Date.now().toString(36); window.localStorage.setItem(k, v); }
    return v;
  });
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey there! I'm Naveen's Buddy 🤖✨ — ask me anything about Naveen's experience, skills, projects, or how to hire him!" },
  ]);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

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
        body: JSON.stringify({ message: q, history: newMsgs.slice(0, -1), sessionId }),
      });
      const data = await r.json();
      const answer = data?.answer || data?.error || "Hmm, I couldn't reach my brain right now. Please try again!";
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network hiccup — please try again in a moment!" }]);
    } finally { setLoading(false); }
  }

  return (
    <>
      <motion.button onClick={() => setOpen((v) => !v)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center glow-purple shadow-2xl"
        aria-label="Open Naveen's Buddy chatbot">
        {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
        {!open && <span className="absolute inset-0 rounded-full bg-fuchsia-500/40 animate-ping" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[560px] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 p-4 border-b divider bg-gradient-to-r from-fuchsia-600/20 to-cyan-500/20">
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center">
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-current" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Naveen's Buddy</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · GPT-powered
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`chat-pop max-w-[85%] px-3.5 py-2.5 text-sm rounded-2xl whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-fuchsia-600 to-cyan-500 text-white rounded-br-sm"
                      : "glass rounded-bl-sm"
                  }`}>{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl px-3.5 py-2.5 text-sm flex gap-1">
                    <span className="h-2 w-2 bg-fuchsia-400 rounded-full animate-bounce" />
                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1.5 rounded-full glass hover:border-fuchsia-500/50 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t divider flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Naveen…"
                className="flex-1 input-base rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500/60" />
              <Button type="submit" disabled={loading || !input.trim()}
                className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 border-0 hover:opacity-90">
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
    <motion.div style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-pink-500" />
  );
}

// =================== APP ===================
function App() {
  const [activeId, setActiveId] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar activeId={activeId} />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatBuddy />
    </main>
  );
}

export default App;
