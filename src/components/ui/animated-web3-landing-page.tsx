/**
 * Web3HeroAnimated — A futuristic Web3-style animated landing page
 * for the Advanced Online Polling & Voting System.
 *
 * Animations:
 * - fadeInUp: staggered entrance for text and UI elements
 * - subtlePulse: ambient glow orbs in the background
 * - pillarGrow: animated skyline bars in the hero
 * - gridScroll: perspective-scrolling grid overlay
 * - shimmer: gradient shimmer on the CTA button
 * - float: gentle floating motion on tech icons
 */

import { useState } from "react";
import {
  Vote,
  BarChart3,
  Shield,
  Zap,
  Database,
  Code2,
  Palette,
  LineChart,
  FlaskConical,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ───────────────── Navbar ───────────────── */

const navLinks = ["Home", "Vote", "Results", "Dashboard", "Admin"] as const;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Vote className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Voting <span className="web3-gradient-text">System</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(110deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 45%, hsl(var(--primary)) 55%, hsl(var(--primary)) 100%)",
              backgroundSize: "200% 100%",
            }}
          >
            Start Voting
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="w-full justify-center text-muted-foreground">
                Sign In
              </Button>
              <Button size="sm" className="w-full bg-primary text-primary-foreground">
                Start Voting
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ───────────────── Skyline Pillars ───────────────── */

const pillarHeights = [40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 50, 85, 55, 68, 42];

function SkylinePillars() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1.5 overflow-hidden opacity-20 sm:gap-2">
      {pillarHeights.map((h, i) => (
        <div
          key={i}
          className="animate-pillar-grow rounded-t-sm"
          style={{
            height: `${h}px`,
            width: "clamp(8px, 2vw, 18px)",
            animationDelay: `${i * 0.1}s`,
            background: `linear-gradient(to top, hsl(var(--primary) / 0.7), hsl(var(--secondary) / 0.3))`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────── Hero Section ───────────────── */

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background layers */}
      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--primary) / 0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, hsl(var(--secondary) / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Perspective grid */}
      <div className="absolute inset-0 web3-grid-bg animate-grid-scroll opacity-30" />

      {/* Glow orbs */}
      <div className="animate-subtle-pulse absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20" />
      <div
        className="animate-subtle-pulse absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-secondary/20"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="animate-subtle-pulse absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-accent/15"
        style={{ animationDelay: "3s" }}
      />

      {/* Skyline bars */}
      <SkylinePillars />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 backdrop-blur-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            Blockchain-Grade Security
          </span>
        </div>

        {/* Headline — staggered animation */}
        <h1 className="animate-fade-in-up-delay-1 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Secure Digital Voting{" "}
          <span className="web3-gradient-text">for the Future</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A secure and transparent online voting platform with real-time analytics and live results.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Start Voting
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 px-8 text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            View Live Results
          </Button>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up-delay-4 mt-16 grid grid-cols-3 gap-6 border-t border-border/30 pt-8">
          {[
            { value: "10M+", label: "Votes Cast" },
            { value: "99.99%", label: "Uptime" },
            { value: "150+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Tech Stack Section ───────────────── */

const techStack = [
  { name: "Flask", icon: FlaskConical, color: "var(--primary)" },
  { name: "SQLite", icon: Database, color: "var(--accent)" },
  { name: "React", icon: Code2, color: "var(--secondary)" },
  { name: "Chart.js", icon: LineChart, color: "var(--glow-primary)" },
  { name: "Tailwind CSS", icon: Palette, color: "var(--primary)" },
];

function TechStackSection() {
  return (
    <section className="relative border-t border-border/30 py-24">
      {/* Subtle bg glow */}
      <div
        className="animate-subtle-pulse absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/5"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="animate-fade-in-up font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Powered by <span className="web3-gradient-text">Modern Tech</span>
        </h2>
        <p className="animate-fade-in-up-delay-1 mx-auto mt-4 max-w-lg text-muted-foreground">
          Built with battle-tested technologies for reliability, speed, and developer experience.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              className="animate-float group flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <tech.icon
                className="h-8 w-8 transition-transform group-hover:scale-110"
                style={{ color: `hsl(${tech.color})` }}
              />
              <span className="text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Exported Component ───────────────── */

export function Web3HeroAnimated() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TechStackSection />
    </div>
  );
}

export default Web3HeroAnimated;
