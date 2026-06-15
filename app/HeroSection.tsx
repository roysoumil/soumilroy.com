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

const SEGMENT_TOKENS = BODY_SEGMENTS.map((seg) =>
  seg.text.trim() === "" ? [] : seg.text.split(/(\s+)/),
);
const SEGMENT_WORD_COUNTS = SEGMENT_TOKENS.map(
  (tokens) => tokens.filter((w) => w.trim()).length,
);
const TOTAL_WORDS = SEGMENT_WORD_COUNTS.reduce((a, b) => a + b, 0);

function getTitleInterval(i: number, total: number): number {
  const t = i / total;
  const ease = t < 0.3 ? 150 - t * 166 : t > 0.7 ? 50 + (t - 0.7) * 333 : 60;
  return Math.round(ease);
}

function Cursor({ variant = "body" }: { variant?: "title" | "body" }) {
  const isTitle = variant === "title";
  return (
    <span
      className={`inline-block w-[0.3em] bg-[#3fb950] align-baseline ml-0.5 cursor-blink ${
        isTitle ? "h-[0.85em] translate-y-[0.05em]" : "h-[0.9em] translate-y-[0.1em]"
      }`}
    />
  );
}

const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function StatusCard({ visible }: { visible: boolean }) {
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
    navigator.clipboard?.writeText("soumilroy@pm.me").then(
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
    <aside
      className={`transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
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
  const [phase, setPhase] = useState<"greeting" | "title" | "body" | "done-cursor">("greeting");
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [displayedName, setDisplayedName] = useState("");
  const [bodyWordCount, setBodyWordCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [techVisible, setTechVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [cursorRetired, setCursorRetired] = useState(false);
  const prevWordCount = useRef(0);
  const pendingTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const bodyVisible = phase === "body" || phase === "done-cursor";

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("seen-hero") === "1"; } catch {}
    if (reducedMotion || seen) {
      setShouldAnimate(false);
      setGreetingVisible(true);
      setDisplayedName(FULL_NAME);
      setBodyWordCount(TOTAL_WORDS);
      setPhase("done-cursor");
      setTechVisible(true);
      setCursorRetired(true);
      prevWordCount.current = TOTAL_WORDS;
    } else {
      try { sessionStorage.setItem("seen-hero", "1"); } catch {}
    }
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => {
      setGreetingVisible(true);
      const t2 = setTimeout(() => setPhase("title"), 600);
      pendingTimeouts.current.push(t2);
    }, 200);
    return () => clearTimeout(t);
  }, [shouldAnimate]);

  useEffect(() => {
    if (phase !== "title") return;
    let i = 0;

    function typeNext() {
      i++;
      setDisplayedName(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) {
        const t1 = setTimeout(() => {
          const t2 = setTimeout(() => setPhase("body"), 300);
          pendingTimeouts.current.push(t2);
        }, 400);
        pendingTimeouts.current.push(t1);
        return;
      }
      const t = setTimeout(typeNext, getTitleInterval(i, FULL_NAME.length));
      pendingTimeouts.current.push(t);
    }

    const t = setTimeout(typeNext, getTitleInterval(0, FULL_NAME.length));
    pendingTimeouts.current.push(t);

    return () => {
      pendingTimeouts.current.forEach(clearTimeout);
      pendingTimeouts.current = [];
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "body") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBodyWordCount(i);
      if (i >= TOTAL_WORDS) {
        clearInterval(interval);
        setPhase("done-cursor");
        const t = setTimeout(() => setTechVisible(true), 300);
        pendingTimeouts.current.push(t);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "done-cursor") return;
    const t = setTimeout(() => setCursorRetired(true), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    prevWordCount.current = bodyWordCount;
  }, [bodyWordCount]);

  function renderBodySegments() {
    let wordsSoFar = 0;
    return BODY_SEGMENTS.map((seg, idx) => {
      const segTokens = SEGMENT_TOKENS[idx];
      const segWordCount = SEGMENT_WORD_COUNTS[idx];
      const segStart = wordsSoFar;
      wordsSoFar += segWordCount;

      if (bodyWordCount <= segStart) return null;

      const wordsToShow = Math.min(bodyWordCount - segStart, segWordCount);
      const isLast = bodyWordCount < wordsSoFar;

      let visibleCount = 0;
      const tokens: { text: string; isNew: boolean }[] = [];
      for (const token of segTokens) {
        if (token.trim()) {
          visibleCount++;
          if (visibleCount > wordsToShow) break;
          const globalWordIdx = segStart + visibleCount;
          tokens.push({ text: token, isNew: globalWordIdx > prevWordCount.current });
        } else {
          tokens.push({ text: token, isNew: false });
        }
      }

      const renderedText = tokens.map((tok, ti) => (
        <span key={ti} className={tok.isNew ? "animate-[fadeIn_200ms_ease-out]" : undefined}>
          {tok.text}
        </span>
      ));

      const content = seg.type === "link" ? (
        <a
          href={seg.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm text-[#3fb950] underline decoration-[#3fb950]/50 decoration-1 underline-offset-[3px] transition-colors hover:text-[#56d364] hover:decoration-[#3fb950] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#09090b]"
        >
          {renderedText}
          {!isLast && (
            <HiOutlineExternalLink className="inline-block size-4 shrink-0 align-middle sm:size-5" />
          )}
        </a>
      ) : (
        <>{renderedText}</>
      );

      return (
        <span key={idx}>
          {content}
          {isLast && phase === "body" && showCursor && <Cursor />}
        </span>
      );
    });
  }

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
              className={`pointer-events-none absolute -left-4 top-1 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-[#3fb950]/40 via-[#3fb950]/10 to-transparent transition-opacity duration-700 ease-out sm:-left-6 ${
                greetingVisible ? "opacity-100" : "opacity-0"
              }`}
            />

            <p
              className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] sm:text-[0.8rem] transition-opacity duration-700 ease-out ${
                greetingVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span aria-hidden="true" className="mr-2.5 text-[#3fb950]">▸</span>
              <span>Software Engineer</span>
              <span className="mx-2 text-[#52525b]">•</span>
              <span>Full Stack</span>
              <span className="mx-2 text-[#52525b]">•</span>
              <span>Infrastructure</span>
            </p>

            <h1 className="mt-5 max-w-[36ch] text-balance text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-[#f4f4f5]">
              {displayedName}
              {phase === "title" && showCursor && <Cursor variant="title" />}
            </h1>

            <div
              className={`transition-opacity duration-500 ease-out ${
                bodyVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {bodyVisible && (
                <p className="mt-6 max-w-[68ch] text-pretty text-[clamp(1.05rem,2.1vw,1.3rem)] leading-[1.5] text-[#a1a1aa] lg:max-w-[56ch]">
                  {renderBodySegments()}
                  {phase === "done-cursor" && !cursorRetired && showCursor && <Cursor />}
                </p>
              )}
            </div>
          </div>

          <StatusCard visible={techVisible} />
        </div>
      </section>
    </>
  );
}
