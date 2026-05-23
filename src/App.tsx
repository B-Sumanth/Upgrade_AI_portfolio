import { useEffect, useState, type FormEvent } from "react";
import logo from "@/assets/upgrade-ai-logo.jpeg";
import member1 from "@/assets/team/member-1.jpg";
import member2 from "@/assets/team/member-2.jpg";
import member3 from "@/assets/team/member-3.jpg";
import member4 from "@/assets/team/member-4.jpg";
import member5 from "@/assets/team/member-5.jpg";
import member6 from "@/assets/team/member-6.jpg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Sun, Moon, ArrowUp, Sparkles, BookOpen, FileText, Presentation, Palette,
  Users, ShieldCheck, Zap, Brain, AlertTriangle, ClipboardList, Clock,
  Wand2, GraduationCap, TrendingUp, Wallet, Award, Building2, UserCheck,
  Target, BarChart3, Cog, Lightbulb, MapPin, Phone, Mail, Linkedin,
  ArrowRight, CheckCircle2, Rocket, MessageCircle, Instagram, Twitter, Menu, X,
} from "lucide-react";

function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function ScrollTopBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 size-12 rounded-full gradient-brand text-white grid place-items-center shadow-glow hover:scale-110 transition-smooth"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Workflow" },
  { id: "contact", label: "Contact" },
  { id: "team", label: "Team" },
];

function Navbar({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "glass shadow-elegant border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-18 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
          <span className="relative size-9 rounded-full p-[2px] gradient-brand shadow-cyan">
            <span className="size-full rounded-full overflow-hidden grid place-items-center bg-background">
              <img src={logo} alt="Upgrade AI" className="size-full object-cover" />
            </span>
          </span>
          <span className="font-bold text-base gradient-text">Upgrade AI</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-smooth group ${
                    isActive ? "text-[var(--cyan-glow)]" : "text-foreground/80 hover:text-[var(--cyan-glow)]"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[var(--purple-glow)] to-[var(--cyan-glow)] transition-all duration-300 ${
                      isActive ? "w-6 opacity-100 shadow-cyan" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="size-10 rounded-full glass grid place-items-center hover:scale-110 transition-smooth shadow-elegant"
          >
            {dark ? <Sun className="size-4.5 text-[var(--cyan-glow)]" /> : <Moon className="size-4.5 text-primary" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden size-10 rounded-full glass grid place-items-center hover:scale-110 transition-smooth shadow-elegant"
          >
            {open ? <X className="size-5 text-[var(--cyan-glow)]" /> : <Menu className="size-5 text-[var(--cyan-glow)]" />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-5 pb-5 pt-2 space-y-1 glass border-t border-white/10">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                  active === l.id
                    ? "bg-white/5 text-[var(--cyan-glow)]"
                    : "text-foreground/80 hover:bg-white/5 hover:text-[var(--cyan-glow)]"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function AIBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-[var(--purple-glow)] opacity-30 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 size-[600px] rounded-full bg-[var(--cyan-glow)] opacity-20 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/3 size-[400px] rounded-full bg-[var(--purple-glow)] opacity-20 blur-3xl animate-pulse-glow" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase text-[var(--cyan-glow)]">
        <Sparkles className="size-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl md:text-5xl font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-glow ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const { dark, toggle } = useDarkMode();

  const problems = [
    { icon: Clock, title: "Teacher Workload", desc: "Hours lost to repetitive admin and prep tasks." },
    { icon: ClipboardList, title: "Manual Lesson Planning", desc: "Crafting plans from scratch every single week." },
    { icon: FileText, title: "Question Paper Prep", desc: "Time-consuming creation, formatting and review." },
    { icon: Brain, title: "Lack of AI Awareness", desc: "Educators unsure where AI fits in classrooms." },
    { icon: AlertTriangle, title: "Fear of AI", desc: "Misconceptions blocking confident adoption." },
    { icon: Building2, title: "Low Tech Adoption", desc: "Classrooms underusing modern digital tools." },
  ];

  const solutions = [
    { icon: BookOpen, title: "AI Lesson Planning" },
    { icon: FileText, title: "Question Paper Generation" },
    { icon: Presentation, title: "PPT & Content Creation" },
    { icon: Palette, title: "Canva AI Support" },
    { icon: Users, title: "Student Engagement" },
    { icon: ShieldCheck, title: "Responsible AI Usage" },
    { icon: Zap, title: "Productivity Training" },
  ];

  const tools = [
  {
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "Canva AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
  },
  {
    name: "Google Gemini",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg",
  },
  {
    name: "Perplexity AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg",
  },
  {
    name: "NotebookLM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_NotebookLM_logo.svg",
  },
  {
    name: "Microsoft Copilot",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_Copilot_Icon.svg",
  },
  {
    name: "Notion AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    name: "MagicSchool AI",
    logo: "https://seeklogo.com/images/M/magicschool-ai-logo-7C5D3F9B2A-seeklogo.com.png",
  },
  {
    name: "Otter.ai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Otter.ai_logo.svg",
  },
  {
    name: "Adobe Firefly",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Adobe_Firefly_Logo.png",
  },
  {
    name: "Gamma AI",
    logo: "https://seeklogo.com/images/G/gamma-logo-2B0A0F4E50-seeklogo.com.png",
  },
];

  const workshop = [
    { t: "Introduction to AI", d: "Foundations of artificial intelligence in plain language." },
    { t: "AI Myths & Awareness", d: "Separating reality from hype for educators." },
    { t: "AI vs Traditional Teaching", d: "Where AI augments — and where humans lead." },
    { t: "Hands-on Practice", d: "Live tool walkthroughs with real prompts." },
    { t: "Real Classroom Implementation", d: "Step-by-step rollout in your school." },
  ];

  const reasons = [
    { icon: Clock, t: "Reduced Workload" },
    { icon: TrendingUp, t: "Better Productivity" },
    { icon: Rocket, t: "Future-ready Faculty" },
    { icon: Wallet, t: "Affordable Implementation" },
    { icon: BarChart3, t: "High ROI" },
  ];

  const methodology = [
    { icon: Target, t: "Analysis", d: "Assess current workflows & pain points." },
    { icon: GraduationCap, t: "Training", d: "Hands-on, role-specific AI workshops." },
    { icon: Cog, t: "Implementation", d: "Embed AI into daily teaching practice." },
    { icon: BarChart3, t: "Impact Measurement", d: "Track time saved & outcomes improved." },
  ];

  const impact = [
    { icon: GraduationCap, t: "Teachers", d: "Save hours weekly. Plan smarter, teach better, grow professionally with AI as a co-pilot." },
    { icon: UserCheck, t: "Students", d: "More engaging lessons, personalized content, and exposure to responsible AI from day one." },
    { icon: Building2, t: "Schools", d: "Future-ready faculty, measurable productivity gains, and a competitive institutional edge." },
  ];

  const team = [
    { name: "Nettem Sai Sathwik", role: "Project Lead", photo: member1 },
    { name: "Tadaka Sriharshitha", role: "Outreaching Communication Lead", photo: member2 },
    { name: "Sarvu Varshitha", role: "Content & Social Media Lead", photo: member3 },
    { name: "Bopparaju Sumanth", role: "Training Coordinator", photo: member4 },
    { name: "Thatiparti Ashritha", role: "Design & Branding Lead", photo: member5 },
    { name: "Kamineni Sravani", role: "Technical & Practical Support", photo: member6 },
  ];

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      school_name: String(fd.get("school_name") || "").trim() || null,
      location: String(fd.get("location") || "").trim() || null,
      mobile: String(fd.get("mobile") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
    if (!payload.name || !payload.email || !payload.mobile || !payload.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Could not send your message. Please try again.");
      return;
    }
    toast.success("Thank you! We'll get back to you shortly.");
    form.reset();
  };
  void onSubmit;
  void submitting;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AIBackdrop />
      <Navbar dark={dark} toggle={toggle} />
      <ScrollTopBtn />
      <Toaster position="top-center" />

      <section id="home" className="relative pt-36 md:pt-40 pb-24 px-6 scroll-mt-20">
        <div className="absolute left-1/2 top-32 -translate-x-1/2 w-[640px] h-[640px] max-w-full rounded-full bg-gradient-to-br from-[var(--purple-glow)]/25 via-transparent to-[var(--cyan-glow)]/25 blur-3xl -z-10 animate-pulse-glow" />
        <div className="max-w-6xl mx-auto text-center animate-fade-up">
          <div className="relative mx-auto mb-8 w-40 h-40 md:w-48 md:h-48 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--purple-glow)]/50 to-[var(--cyan-glow)]/50 blur-2xl opacity-80 -z-10 animate-pulse-glow" />
            <div className="absolute inset-0 rounded-full gradient-brand p-[3px] shadow-glow transition-smooth group-hover:scale-105 group-hover:shadow-cyan">
              <div className="size-full rounded-full glass overflow-hidden grid place-items-center p-2">
                <img src={logo} alt="Upgrade AI logo" className="size-full object-contain rounded-full transition-smooth group-hover:scale-110" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            <span className="gradient-text">Upgrade AI</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-medium text-[var(--cyan-glow)]">
            Transforming Learning into Smart Learning
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We help teachers and schools adopt AI with clarity, confidence, and practical guidance through hands-on workshops tailored for modern education.
            Our approach focuses on real classroom workflows instead of complex technical jargon, making AI easy to understand and apply in everyday teaching.
            Educators learn how to use AI tools to save time, improve productivity, and create more engaging learning experiences for students.
            From lesson planning and assessments to communication and classroom management, we provide actionable strategies that schools can implement immediately.
            Our mission is to make AI accessible, responsible, and truly valuable for every educational institution.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#services">
              <Button size="lg" className="gradient-brand text-white border-0 shadow-glow hover:scale-105 transition-smooth h-12 px-7 text-base">
                Explore Services <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="glass h-12 px-7 text-base hover:scale-105 transition-smooth">
                Book a Workshop
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="About Us" title="AI Training, Built for Educators"
            sub="Upgrade AI is on a mission to make artificial intelligence accessible, practical and transformative for every classroom in India and beyond." />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: GraduationCap, t: "AI Training for Educators", d: "Curriculum designed specifically for teachers, professors and academic leaders." },
              { icon: Lightbulb, t: "Beginner-Friendly", d: "Start from zero — no prior AI experience required to get powerful results." },
              { icon: ShieldCheck, t: "No Technical Background Needed", d: "Plain language, visual demos, and step-by-step guidance throughout." },
              { icon: Rocket, t: "Practical Classroom Implementation", d: "Walk away with workflows you can use Monday morning." },
            ].map((f) => (
              <GlassCard key={f.t} className="flex gap-4 items-start">
                <div className="size-12 rounded-xl gradient-brand grid place-items-center shrink-0 shadow-cyan">
                  <f.icon className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{f.t}</h3>
                  <p className="text-muted-foreground mt-1">{f.d}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="The Challenge" title="Problems We Solve"
            sub="Real obstacles every modern educator and institution faces today." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p) => (
              <GlassCard key={p.title}>
                <div className="size-12 rounded-xl bg-[var(--purple-glow)]/20 grid place-items-center mb-4">
                  <p.icon className="size-6 text-[var(--cyan-glow)]" />
                </div>
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="What We Do" title="Our AI Solutions"
            sub="Practical, classroom-ready workflows powered by the world's best AI tools." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s) => (
              <GlassCard key={s.title} className="text-center">
                <div className="mx-auto size-14 rounded-2xl gradient-brand grid place-items-center mb-4 shadow-cyan">
                  <s.icon className="size-7 text-white" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
              </GlassCard>
            ))}
          </div>
          <div className="mt-12 glass rounded-2xl p-8">
            <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-6">Tools We Train On</p>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((t) => (
                <span key={t} className="px-5 py-2.5 rounded-full glass font-semibold text-sm hover:scale-105 transition-smooth">
                  <Wand2 className="inline size-4 mr-2 text-[var(--cyan-glow)]" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Workshop Structure" title="A Proven Learning Journey" />
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--purple-glow)] via-[var(--cyan-glow)] to-transparent md:-translate-x-px" />
            {workshop.map((w, i) => (
              <div key={w.t} className={`relative flex md:items-center mb-10 md:mb-14 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 size-12 rounded-full gradient-brand grid place-items-center text-white font-bold shadow-glow -translate-x-1/2 z-10">
                  {i + 1}
                </div>
                <div className={`pl-20 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <GlassCard>
                    <h3 className="font-semibold text-xl">{w.t}</h3>
                    <p className="text-muted-foreground mt-2">{w.d}</p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Why Us" title="Why Schools Choose Upgrade AI" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {reasons.map((r) => (
              <GlassCard key={r.t} className="text-center">
                <div className="mx-auto size-12 rounded-xl gradient-brand grid place-items-center mb-3 shadow-cyan">
                  <r.icon className="size-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm">{r.t}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="How We Work" title="Our Methodology" />
          <div className="grid md:grid-cols-4 gap-6">
            {methodology.map((m, i) => (
              <GlassCard key={m.t}>
                <div className="text-5xl font-bold gradient-text mb-3">0{i + 1}</div>
                <m.icon className="size-7 text-[var(--cyan-glow)] mb-3" />
                <h3 className="font-semibold text-lg">{m.t}</h3>
                <p className="text-muted-foreground text-sm mt-2">{m.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Recognition" title="Certification That Counts" />
          <GlassCard className="md:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[var(--purple-glow)] opacity-30 blur-3xl" />
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center relative">
              <div className="size-32 rounded-3xl gradient-brand grid place-items-center shadow-glow mx-auto md:mx-0">
                <Award className="size-16 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">FDP-Style Participation Certificates</h3>
                <p className="text-muted-foreground mt-2">
                  Every participant receives a professionally designed certificate, recognized for faculty development records.
                </p>
                <ul className="mt-5 space-y-2">
                  {["Unique Verification ID for every certificate", "Professional teacher recognition", "Shareable on LinkedIn & academic profiles"].map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-[var(--cyan-glow)] mt-0.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Outcomes" title="Impact Across the Ecosystem" />
          <div className="grid md:grid-cols-3 gap-6">
            {impact.map((i) => (
              <GlassCard key={i.t} className="md:p-8">
                <div className="size-14 rounded-2xl gradient-brand grid place-items-center mb-5 shadow-cyan">
                  <i.icon className="size-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">{i.t}</h3>
                <p className="text-muted-foreground mt-3">{i.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Get in Touch" title="Let's Upgrade Your Institution"
            sub="Ready to bring practical AI to your faculty? Reach out and we'll design the perfect workshop for you." />
          <div className="max-w-2xl mx-auto">
            <GlassCard className="md:p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", v: "Warangal, 506015, India" },
                  { icon: Phone, label: "Phone", v: "+91 6303101478", href: "tel:+916303101478" },
                  { icon: Mail, label: "Email", v: "info.upgradeai@gmail.com", href: "mailto:info.upgradeai@gmail.com" },
                  { icon: Linkedin, label: "LinkedIn", v: "Connect with us", href: "https://www.linkedin.com/in/upgrade-ai/" },
                ].map((c) => (
                  <a key={c.label} href={c.href ?? "#"} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                     className="flex gap-4 items-start group">
                    <div className="size-11 rounded-xl gradient-brand grid place-items-center shrink-0 shadow-cyan group-hover:scale-110 transition-smooth">
                      <c.icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="font-medium mt-0.5">{c.v}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section id="team" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Our Team" title="Meet the People Behind Upgrade AI"
            sub="A passionate team driving practical AI adoption in classrooms." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <GlassCard key={m.name} className="text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-glow)]/0 to-[var(--cyan-glow)]/0 group-hover:from-[var(--purple-glow)]/15 group-hover:to-[var(--cyan-glow)]/15 transition-smooth" />
                <div className="relative">
                  <div className="mx-auto size-28 rounded-full gradient-brand p-[2px] shadow-glow group-hover:scale-105 transition-smooth">
                    <div className="size-full rounded-full glass overflow-hidden">
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        width={224}
                        height={224}
                        className="size-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="mt-5 font-semibold text-lg">{m.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative pt-16 pb-8 px-6 mt-12 border-t border-border/50 glass">
        <div className="max-w-6xl mx-auto text-center">
          <img src={logo} alt="Upgrade AI" className="h-14 mx-auto mb-4 rounded-xl" />
          <p className="gradient-text font-semibold text-lg">Transforming Learning into Smart Learning</p>
          <div className="flex justify-center gap-3 mt-6">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/in/upgrade-ai/", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:info.upgradeai@gmail.com", label: "Email" },
              { Icon: MessageCircle, href: "https://wa.me/916303101478", label: "WhatsApp" },
              { Icon: Instagram, href: "https://www.instagram.com/upgradeai_official/", label: "Instagram" },
              { Icon: Twitter, href: "https://x.com/Upgrade__Ai", label: "X (Twitter)" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                 className="size-11 rounded-full glass grid place-items-center hover:scale-110 hover:shadow-cyan transition-smooth">
                <Icon className="size-5 text-[var(--cyan-glow)]" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Upgrade AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
