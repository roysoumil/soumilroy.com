"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineExternalLink, HiOutlineMail } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import trackCursor from "./trackCursor";

const FULL_NAME = "Soumil Roy";

const ROLES = ["Software engineer", "Full stack", "Infrastructure", "AI"];

const BODY_SEGMENTS: { type: "text" | "link"; text: string; href?: string }[] = [
  { type: "text", text: "I build software end-to-end — from the interface down to the systems underneath. At " },
  { type: "link", text: "empowerreg.ai", href: "https://empowerreg.ai" },
  { type: "text", text: " I work on the infrastructure that makes the rest possible." },
];

const STACK = ["azure", "docker", "go", "mysql", "postgres", "python", "react", "typescript"];

const CONSTELLATION = [
  { top: "8%", left: "6%", size: 2, opacity: 0.45 },
  { top: "14%", left: "82%", size: 1.5, opacity: 0.35 },
  { top: "22%", left: "94%", size: 2.5, opacity: 0.5 },
  { top: "38%", left: "3%", size: 1.5, opacity: 0.3 },
  { top: "46%", left: "78%", size: 2, opacity: 0.4 },
  { top: "58%", left: "97%", size: 1.5, opacity: 0.35 },
  { top: "72%", left: "5%", size: 2, opacity: 0.4 },
  { top: "78%", left: "55%", size: 1.5, opacity: 0.3 },
  { top: "85%", left: "88%", size: 2, opacity: 0.45 },
  { top: "92%", left: "18%", size: 1.5, opacity: 0.35 },
];

const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function StatusCard() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = TIME_FORMATTER.format(new Date());
      setTime(formatted);
      const hour = parseInt(formatted.slice(0, 2), 10);
      // Offline 23:00 - 08:59 IST
      setIsOffline(hour >= 23 || hour < 9);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText("soumilroy@pm.me")?.then(
      () => {
        setCopied(true);
        if (copyTimeout.current) clearTimeout(copyTimeout.current);
        copyTimeout.current = setTimeout(() => setCopied(false), 1800);
      },
      () => {},
    );
  };

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  return (
    <aside className="fade-in-block [animation-delay:900ms] lg:sticky lg:top-8 lg:self-start">
      {/* Two boxes on purpose: overflow-hidden clips to the padding box, so
          the border light's inset:-1px ring has to live on an unclipped
          parent while the inner box still rounds off the row hover fills. */}
      <div
        onMouseMove={trackCursor}
        className="border-light relative rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-[var(--card-shadow)]"
      >
       <div className="overflow-hidden rounded-[7px]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span role="status" aria-label={isOffline ? "Offline" : "Available"} className="relative flex size-2">
              {!isOffline && (
                <span aria-hidden="true" className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              )}
              <span
                aria-hidden="true"
                className={`relative inline-flex size-2 rounded-full ${isOffline ? "bg-[var(--text-3)]" : "bg-[var(--accent)]"}`}
              />
            </span>
            <span className="text-[13px] text-[var(--text-2)]">
              {isOffline ? "Offline" : "Online"}
            </span>
          </div>
          <span className="font-mono text-[12px] tabular-nums text-[var(--text-3)]">
            {time ? `${time} IST` : "~/now"}
          </span>
        </div>

        <dl className="space-y-4 px-5 py-5 text-sm">
          <div>
            <dt className="text-[13px] text-[var(--text-3)]">Focus</dt>
            <dd className="mt-1 text-[var(--text)]">Pipelines and platform reliability</dd>
          </div>
          <div>
            <dt className="text-[13px] text-[var(--text-3)]">Shipping</dt>
            <dd className="mt-1 text-[var(--text)]">Platform at empowerreg.ai</dd>
          </div>
          <div>
            <dt className="text-[13px] text-[var(--text-3)]">Stack</dt>
            <dd className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[13px] lowercase text-[var(--text-2)]">
              {STACK.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
          className="group flex w-full items-center justify-between border-t border-[var(--line)] px-5 py-3 text-left text-sm text-[var(--text-2)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)] focus-visible:bg-[var(--accent-wash)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
        >
          <span className="flex items-center gap-2.5">
            <HiOutlineMail aria-hidden="true" className="size-4 shrink-0 text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]" />
            <span>{copied ? "Copied to clipboard" : "Say hello"}</span>
          </span>
          <span className="font-mono text-[12px] tabular-nums text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]">
            soumilroy@pm.me {copied ? "✓" : "→"}
          </span>
        </button>

        <div className="flex border-t border-[var(--line)] text-sm">
          <a
            href="https://github.com/roysoumil"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-between border-r border-[var(--line)] px-5 py-3 text-[var(--text-2)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)] focus-visible:bg-[var(--accent-wash)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
          >
            <span className="flex items-center gap-2.5">
              <SiGithub aria-hidden="true" className="size-4 shrink-0 text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]" />
              <span>GitHub</span>
            </span>
            <span className="font-mono text-[12px] text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/soumilroy/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-between px-5 py-3 text-[var(--text-2)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)] focus-visible:bg-[var(--accent-wash)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
          >
            <span className="flex items-center gap-2.5">
              <FaLinkedin aria-hidden="true" className="size-4 shrink-0 text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]" />
              <span>LinkedIn</span>
            </span>
            <span className="font-mono text-[12px] text-[var(--text-3)] transition-colors group-hover:text-[var(--accent)]">↗</span>
          </a>
        </div>
       </div>
      </div>
    </aside>
  );
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-300 ease-out [@media(hover:none)]:hidden"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, var(--spotlight), transparent 65%)`,
        }}
      />

      <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:px-10 sm:pb-14 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {CONSTELLATION.map((star, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[var(--accent)]"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-y-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="text-left">
            <h1 className="fade-in-block [animation-delay:150ms] text-left font-serif text-[clamp(2.75rem,7.5vw,5.25rem)] font-light leading-[0.95] tracking-[-0.02em] text-[var(--text)]">
              {FULL_NAME}
            </h1>

            {/* Flex rather than inline text: the role names must not break
                mid-phrase, and there is no whitespace between the spans to
                break on, so the line needs wrap points of its own. */}
            <p className="fade-in-block [animation-delay:400ms] mt-4 flex flex-wrap items-baseline gap-x-2 text-left text-[0.95rem] text-[var(--text-2)]">
              <span aria-hidden="true" className="mr-0.5 text-[var(--accent)]">▸</span>
              {ROLES.map((role, idx) => (
                <span key={role} className="flex items-baseline gap-x-2">
                  {idx > 0 && <span aria-hidden="true" className="text-[var(--line)]">/</span>}
                  <span className="whitespace-nowrap">{role}</span>
                </span>
              ))}
            </p>

            <p className="fade-in-block [animation-delay:650ms] mt-7 max-w-[68ch] text-pretty text-left text-[clamp(1.05rem,2.1vw,1.25rem)] leading-[1.55] text-[var(--text-2)] lg:max-w-[54ch]">
              {BODY_SEGMENTS.map((seg, idx) =>
                seg.type === "link" ? (
                  <a
                    key={idx}
                    href={seg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm text-[var(--accent)] underline decoration-[var(--accent-ring)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--accent-hi)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[var(--bg)]"
                  >
                    {seg.text}
                    <HiOutlineExternalLink className="inline-block size-4 shrink-0 align-middle" />
                  </a>
                ) : (
                  <span key={idx}>{seg.text}</span>
                ),
              )}
            </p>
          </div>

          <StatusCard />
        </div>
      </section>
    </>
  );
}
