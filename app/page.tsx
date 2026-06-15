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
    tags: ["go", "azure", "postgres"],
    year: "2024 — now",
    url: "https://empowerreg.ai",
  },
  {
    title: "soumilroy.com",
    description:
      "Personal site — a playground for type, motion, and design ideas I want to try before they land in real products. Source open on GitHub.",
    tags: ["next.js", "tailwind", "typescript"],
    year: "2026 — now",
    url: "https://github.com/roysoumil/soumilroy.com",
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-lg border border-[#27272a] bg-[#0d0d10]/60 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-[#3fb950]/40 focus-visible:border-[#3fb950]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-normal tracking-[-0.015em] text-[#f4f4f5]">
          {item.title}
        </h3>
        <HiOutlineExternalLink className="size-4 shrink-0 text-[#71717a] transition-colors group-hover:text-[#3fb950]" />
      </div>

      <p className="mt-3 text-pretty text-sm leading-[1.55] text-[#a1a1aa]">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] lowercase text-[#71717a]">
        {item.tags.map((tag, idx) => (
          <span key={tag} className="flex items-center gap-3">
            {idx > 0 && <span className="text-[#3f3f46]">·</span>}
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-[#27272a] pt-3 font-mono text-[11px] lowercase tabular-nums text-[#71717a]">
        {item.year}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <main className="relative bg-dark-grid font-sans">
      <HeroSection />

      <section className="relative px-6 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-8 lg:px-16 lg:pb-24 lg:pt-10">
        <div className="relative mx-auto max-w-7xl">
          <header className="mb-10 flex items-baseline justify-between gap-4">
            <h2 className="text-balance text-2xl font-normal tracking-[-0.02em] text-[#f4f4f5] sm:text-[1.75rem]">
              Selected work
            </h2>
            <span className="text-[11px] uppercase tracking-[0.16em] tabular-nums text-[#71717a]">
              {WORK.length.toString().padStart(2, "0")} / Live
            </span>
          </header>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {WORK.map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#18181b] px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[11px] lowercase tabular-nums text-[#71717a]">
            © {new Date().getFullYear()} Soumil Roy
          </p>
        </div>
      </footer>
    </main>
  );
}
