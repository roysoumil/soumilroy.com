"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineExternalLink, HiOutlineMail } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const FULL_NAME = "Soumil Roy";

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
    <aside className="fade-in-block [animation-delay:1200ms] lg:sticky lg:top-8 lg:self-start">
      <div className="relative overflow-hidden rounded-lg border border-[#27272a] bg-[#0d0d10]/60 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#3fb950]/70 to-transparent" />

        <div className="flex items-center justify-between border-b border-[#27272a] px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span role="status" aria-label={isOffline ? "Offline" : "Available"} className="relative flex size-2">
              {!isOffline && (
                <span aria-hidden="true" className="absolute inline-flex size-full animate-ping rounded-full bg-[#3fb950] opacity-60" />
              )}
              <span
                aria-hidden="true"
                className={`relative inline-flex size-2 rounded-full ${isOffline ? "bg-[#71717a]" : "bg-[#3fb950]"}`}
              />
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#a1a1aa]">
              {isOffline ? "Offline" : "Online"}
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-[#71717a]">
            {time ? `${time} IST` : "~/now"}
          </span>
        </div>

        <dl className="space-y-4 px-5 py-5 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[#71717a]">Focus</dt>
            <dd className="mt-1 text-[#d4d4d8]">Pipelines and platform reliability</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[#71717a]">Shipping</dt>
            <dd className="mt-1 text-[#d4d4d8]">Platform at empowerreg.ai</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[#71717a]">Stack</dt>
            <dd className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[13px] lowercase text-[#d4d4d8]">
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
          className="group flex w-full items-center justify-between border-t border-[#27272a] px-5 py-3 text-left text-sm text-[#a1a1aa] transition-colors hover:bg-[#3fb950]/[0.04] hover:text-[#3fb950] focus-visible:bg-[#3fb950]/[0.06] focus-visible:text-[#3fb950] focus-visible:outline-none"
        >
          <span className="flex items-center gap-2.5">
            <HiOutlineMail aria-hidden="true" className="size-4 shrink-0 text-[#71717a] transition-colors group-hover:text-[#3fb950]" />
            <span>{copied ? "Copied to clipboard" : "Say hello"}</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums text-[#71717a] transition-colors group-hover:text-[#3fb950]">
            soumilroy@pm.me {copied ? "✓" : "→"}
          </span>
        </button>

        <div className="flex border-t border-[#27272a] text-sm">
          <a
            href="https://github.com/roysoumil"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-between border-r border-[#27272a] px-5 py-3 text-[#a1a1aa] transition-colors hover:bg-[#3fb950]/[0.04] hover:text-[#3fb950] focus-visible:bg-[#3fb950]/[0.06] focus-visible:text-[#3fb950] focus-visible:outline-none"
          >
            <span className="flex items-center gap-2.5">
              <SiGithub aria-hidden="true" className="size-4 shrink-0 text-[#71717a] transition-colors group-hover:text-[#3fb950]" />
              <span>GitHub</span>
            </span>
            <span className="font-mono text-[11px] text-[#71717a] transition-colors group-hover:text-[#3fb950]">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/soumilroy/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-between px-5 py-3 text-[#a1a1aa] transition-colors hover:bg-[#3fb950]/[0.04] hover:text-[#3fb950] focus-visible:bg-[#3fb950]/[0.06] focus-visible:text-[#3fb950] focus-visible:outline-none"
          >
            <span className="flex items-center gap-2.5">
              <FaLinkedin aria-hidden="true" className="size-4 shrink-0 text-[#71717a] transition-colors group-hover:text-[#3fb950]" />
              <span>LinkedIn</span>
            </span>
            <span className="font-mono text-[11px] text-[#71717a] transition-colors group-hover:text-[#3fb950]">↗</span>
          </a>
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
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(63, 185, 80, 0.15), transparent 65%)`,
        }}
      />

      <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:px-10 sm:pb-14 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {CONSTELLATION.map((star, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[#3fb950]"
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
          <div className="relative">
            <span
              aria-hidden="true"
              className="fade-in-block [animation-delay:150ms] pointer-events-none absolute -left-4 top-1 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-[#3fb950]/40 via-[#3fb950]/10 to-transparent sm:-left-6"
            />

            <p className="fade-in-block [animation-delay:150ms] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] sm:text-[0.8rem]">
              <span aria-hidden="true" className="mr-2.5 text-[#3fb950]">▸</span>
              <span>Software Engineer</span>
              <span className="mx-2 text-[#52525b]">•</span>
              <span>Full Stack</span>
              <span className="mx-2 text-[#52525b]">•</span>
              <span>Infrastructure</span>
            </p>

            <h1 className="fade-in-block [animation-delay:500ms] mt-5 max-w-[36ch] text-balance text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-[#f4f4f5]">
              {FULL_NAME}
            </h1>

            <p className="fade-in-block [animation-delay:850ms] mt-6 max-w-[68ch] text-pretty text-[clamp(1.05rem,2.1vw,1.3rem)] leading-[1.5] text-[#a1a1aa] lg:max-w-[56ch]">
              {BODY_SEGMENTS.map((seg, idx) =>
                seg.type === "link" ? (
                  <a
                    key={idx}
                    href={seg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm text-[#3fb950] underline decoration-[#3fb950]/50 decoration-1 underline-offset-[3px] transition-colors hover:text-[#56d364] hover:decoration-[#3fb950] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#09090b]"
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
