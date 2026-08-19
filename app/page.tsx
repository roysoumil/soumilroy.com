import { HiOutlineExternalLink } from "react-icons/hi";
import HeroSection from "./HeroSection";

type WorkItem = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  url: string;
};

const WORK: WorkItem[] = [
  {
    title: "empowerreg.ai",
    description:
      "Regulatory intelligence platform. Building the infrastructure layer — distributed ingestion, search, and processing at scale.",
    tags: ["go", "azure", "python", "mysql"],
    year: "2024 — now",
    url: "https://empowerreg.ai",
  },
  {
    title: "vedicmaths.ai",
    description:
      "Learning platform for Vedic mathematics — the sixteen sutras, thirty practice topics, timed drills, and a leaderboard. Built for the Vedic Maths Forum, India.",
    tags: ["tanstack start", "postgres"],
    year: "2026 — now",
    url: "https://vedicmaths.ai",
  },
];

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${550 + index * 250}ms` }}
      className="fade-in-block group relative flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-colors duration-200 hover:border-[var(--accent-ring)] focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-[1.4rem] font-normal leading-tight tracking-[-0.01em] text-[var(--text)]">
          {item.title}
        </h3>
        <HiOutlineExternalLink className="mt-1 size-4 shrink-0 text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]" />
      </div>

      <p className="mt-3 text-pretty text-[0.95rem] leading-[1.6] text-[var(--text-2)]">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] lowercase text-[var(--text-3)]">
        {item.tags.map((tag, idx) => (
          <span key={tag} className="flex items-center gap-3">
            {idx > 0 && <span className="text-[var(--line)]">·</span>}
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-[var(--line)] pt-3 font-mono text-[12px] lowercase tabular-nums text-[var(--text-3)]">
        {item.year}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <main className="relative bg-grid font-sans">
      <HeroSection />

      <section className="relative px-6 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-8 lg:px-16 lg:pb-24 lg:pt-10">
        <div className="relative mx-auto max-w-7xl">
          <header className="fade-in-block [animation-delay:200ms] mb-10 flex items-baseline justify-between gap-4">
            <h2 className="text-balance font-serif text-[clamp(1.75rem,3.2vw,2.25rem)] font-normal tracking-[-0.015em] text-[var(--text)]">
              Selected work
            </h2>
            <span className="font-mono text-[12px] lowercase tabular-nums text-[var(--text-3)]">
              {WORK.length.toString().padStart(2, "0")} live
            </span>
          </header>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {WORK.map((item, index) => (
              <WorkCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[var(--line-soft)] px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[12px] lowercase tabular-nums text-[var(--text-2)]">
            © {new Date().getFullYear()} Soumil Roy
          </p>
        </div>
      </footer>
    </main>
  );
}
