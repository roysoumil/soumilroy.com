import HeroSection from "./HeroSection";
import WorkCard, { type WorkItem } from "./WorkCard";
import ContactDock from "./ContactDock";
import SiteFooter from "./SiteFooter";
import empowerregShot from "../public/work/empowerreg.jpg";
import vedicmathsShot from "../public/work/vedicmaths.jpg";

const WORK: WorkItem[] = [
  {
    title: "empowerreg.ai",
    description:
      "Regulatory intelligence platform for medical-device post-market surveillance.",
    highlights: [
      "Azure enterprise systems: identity, secrets, deployments and monitoring",
      "AI agents built into the product",
      "Compliance work for SOC 2, GDPR and ISO 27001",
      "OpenTelemetry tracing and metrics across the Go, Python and AI services",
      "Docker-based deploys, CI pipelines and Playwright end-to-end suites",
    ],
    layers: ["Interface", "AI", "Services", "Data", "Platform"],
    tags: ["react", "go", "python", "mysql", "azure"],
    year: "2023 — now",
    url: "https://empowerreg.ai",
    shot: empowerregShot,
  },
  {
    title: "vedicmaths.ai",
    description:
      "Learning platform for Vedic mathematics, built for the Vedic Maths Forum, India: a client I first worked with in 2020, back for a second product.",
    highlights: [
      "An AI tutor: a Llama-based chat agent that teaches the concepts to students",
      "The sixteen sutras and thirty practice topics",
      "Timed drills and a leaderboard",
    ],
    layers: ["Interface", "AI", "Data"],
    tags: ["tanstack start", "postgres", "llama"],
    year: "2026 — now",
    url: "https://vedicmaths.ai",
    shot: vedicmathsShot,
  },
];

// Verbatim excerpts from public LinkedIn recommendations: whole sentences,
// nothing reworded. The first one is set large; the rest sit in a row under it.
const RECOMMENDATIONS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "He is an incredibly talented designer, developer, and an end-to-end solution provider. He has a keen sense of business, eye for design details, and superior technical skills. He knows his stuff in and out, and to him, client satisfaction comes above everything.",
    name: "Surya Pathak",
    role: "CEO and founder, empowerreg.ai",
  },
  {
    quote:
      "From the outset, Soumil played a pivotal role in our main product launch, integrating seamlessly into our team and company culture. His exceptional communication skills and team spirit were as remarkable as his technical acumen.",
    name: "Mike Harris",
    role: "Hired Soumil as senior front end engineer at Sgnal",
  },
  {
    quote:
      "After handing him a small project his dedication, quality of work and clarity of thought convinced me to give a long term assignment to build out one of the company's critical products.",
    name: "Sachin Sukumar",
    role: "Former co-founder, Recruvia",
  },
  {
    quote:
      "He's helped firefight critical issues and has always been around when we've needed support. I strongly recommend Soumil to anyone looking to work with a talented engineer and a great person!",
    name: "Gokul Ramanujam",
    role: "Regular client",
  },
];

// What a client can hire for. Each line points at work shown elsewhere on
// the page rather than at a generic service name.
const SERVICES: { title: string; body: string }[] = [
  {
    title: "SaaS and web applications",
    body: "Full builds from first design to production, across the React front end, the API and the data behind it.",
  },
  {
    title: "AI features",
    body: "Chat tutors, assistants and agents built into a real product, on OpenAI or open models such as Llama.",
  },
  {
    title: "Cloud platform",
    body: "Azure infrastructure, Docker deploys, CI pipelines, monitoring, and the groundwork for SOC 2, GDPR and ISO 27001.",
  },
  {
    title: "Interface and design systems",
    body: "Component libraries and product interfaces built alongside designers, tested and documented.",
  },
];

// The About paragraph at a glance, for a reader who scans first.
const ABOUT_FACTS: [label: string, value: string][] = [
  ["Experience", "Nine years"],
  ["Based in", "India, working with teams anywhere"],
  ["Works in", "Go, Python and JavaScript"],
  ["Right now", "Full stack at empowerreg.ai"],
];

// From the LinkedIn experience section. `years` is optional so an entry
// with an unconfirmed date can still be listed.
const EARLIER: { years?: string; name: string; role: string; summary: string }[] = [
  {
    years: "2023",
    name: "Tarmak AI",
    role: "Project",
    summary: "An AI podcast product, built with React and PostgreSQL.",
  },
  {
    years: "2022",
    name: "Sgnal",
    role: "Senior front end engineer, six-month contract",
    summary:
      "Product Explorer, Collections and Supply dashboards for the main product launch, in React and Remix, with Chart.js visualisations of Web3 data.",
  },
  {
    years: "2021 — 22",
    name: "SKOOT",
    role: "Front end developer",
    summary:
      "Design system in React and Tailwind built with the product designers, a component test suite wired into CI, and 3DS card payments through Checkout.com.",
  },
  {
    years: "2020 — 21",
    name: "Vedic Maths Forum India",
    role: "Full stack engineer",
    summary:
      "CRM in React, TypeScript and NestJS that ran the sales team's leads across landing pages, social networks and chatbots. Also hired and mentored junior developers.",
  },
  {
    years: "2018 — 20",
    name: "ResuGo",
    role: "Full stack developer, freelance",
    summary:
      "Designed and built a resume builder for lawyers that reached 3,000+ sign-ups, on a Nuxt front end with a Fastify and MongoDB back end.",
  },
];

// Each section below the hero carries its own faint line pattern (the
// .section-bg rules in globals.css), masked so it fades out before the
// section's edges and never meets its neighbour's.
export default function Home() {
  return (
    <main className="relative font-sans">
      <HeroSection />

      <section id="about" className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="section-bg is-strata" />
        <div className="fade-in-block [animation-delay:1000ms] relative mx-auto grid max-w-7xl gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-balance font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-normal tracking-[-0.034em] text-[var(--text)]">
              About
            </h2>
            <p className="mt-5 max-w-[58ch] text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.65] text-[var(--text-2)]">
              For nine years I have been building and owning end-to-end systems, from the first design through to
              production. I work mainly in Go, Python and JavaScript, and I design, deploy and operate cloud-native
              systems on Azure. I like the scaling problems most: systems that have to keep working as the data, the
              traffic and the team all grow. Right now I work across the whole product at{" "}
              <a
                href="https://empowerreg.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-[var(--accent)] underline decoration-[var(--accent-ring)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--accent-hi)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[var(--bg)]"
              >
                empowerreg.ai
              </a>
              , a regulatory intelligence platform.
            </p>
          </div>

          <dl className="self-end text-sm">
            {ABOUT_FACTS.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-3 last:border-b"
              >
                <dt className="shrink-0 text-[var(--text-3)]">{label}</dt>
                <dd className="text-right text-[var(--text)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="services" className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="section-bg is-columns" />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-8 text-balance font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-normal tracking-[-0.034em] text-[var(--text)]">
            What I can help with
          </h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.title} className="border-t border-[var(--line)] pt-5">
                <h3 className="font-display text-[1.04rem] leading-tight tracking-[-0.02em] text-[var(--text)]">{service.title}</h3>
                <p className="mt-2.5 text-pretty text-[0.95rem] leading-[1.6] text-[var(--text-2)]">{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="section-bg is-dots" />
        <div className="relative mx-auto max-w-7xl">
          <header className="fade-in-block [animation-delay:200ms] mb-10 flex items-baseline justify-between gap-4">
            <h2 className="text-balance font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-normal tracking-[-0.034em] text-[var(--text)]">
              Selected work
            </h2>
            <span className="font-mono text-[12px] lowercase tabular-nums text-[var(--text-3)]">
              {WORK.length.toString().padStart(2, "0")} live
            </span>
          </header>
          <div className="grid gap-5 sm:gap-6">
            {WORK.map((item, index) => (
              <WorkCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="recommendations" className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="section-bg is-rings" />
        <div className="relative mx-auto max-w-7xl">
          <header className="mb-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h2 className="text-balance font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-normal tracking-[-0.034em] text-[var(--text)]">
              Recommendations
            </h2>
            <a
              href="https://www.linkedin.com/in/soumilroy/details/recommendations/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-sm text-[13px] text-[var(--text-2)] underline decoration-[var(--line)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[var(--bg)]"
            >
              All nine on LinkedIn
            </a>
          </header>

          {RECOMMENDATIONS.slice(0, 1).map((rec) => (
            <figure key={rec.name} className="max-w-[58rem]">
              <blockquote className="text-pretty font-display text-[clamp(1.05rem,2.1vw,1.5rem)] font-light leading-[1.4] tracking-[-0.022em] text-[var(--text)]">
                “{rec.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-[var(--text-2)]">
                <span className="text-[var(--text)]">{rec.name}</span>, {rec.role}
              </figcaption>
            </figure>
          ))}

          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {RECOMMENDATIONS.slice(1).map((rec) => (
              <figure key={rec.name} className="flex flex-col border-t border-[var(--line)] pt-5">
                <blockquote className="text-pretty text-[0.95rem] leading-[1.6] text-[var(--text-2)]">
                  “{rec.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-4 text-[13px] text-[var(--text-3)]">
                  <span className="block text-sm text-[var(--text)]">{rec.name}</span>
                  {rec.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="earlier" className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="section-bg is-iso" />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-8 text-balance font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-normal tracking-[-0.034em] text-[var(--text)]">
            Earlier work
          </h2>
          <ol className="border-b border-[var(--line)]">
            {EARLIER.map((job) => (
              <li
                key={job.name}
                className="grid gap-x-10 gap-y-1.5 border-t border-[var(--line)] py-5 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline"
              >
                <p className="font-mono text-[12px] tabular-nums text-[var(--text-3)]">{job.years}</p>
                <div>
                  <h3 className="font-display text-[1.04rem] leading-tight tracking-[-0.02em] text-[var(--text)]">{job.name}</h3>
                  <p className="mt-1 text-[13px] text-[var(--text-3)]">{job.role}</p>
                </div>
                <p className="max-w-[60ch] text-pretty text-[0.95rem] leading-[1.6] text-[var(--text-2)]">
                  {job.summary}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />

      <ContactDock />
    </main>
  );
}
