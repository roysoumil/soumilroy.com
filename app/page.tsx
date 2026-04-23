"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  SiDocker,
  SiPython,
  SiReact,
  SiTypescript,
  SiGo,
} from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";

const TECH_ICONS = [
  {
    name: "Azure",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg"
        alt="Azure"
        className="size-6 sm:size-7 shrink-0 object-contain transition-opacity group-hover:opacity-90 invert"
      />
    ),
  },
  {
    name: "MySQL",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
        alt="MySQL"
        className="size-6 sm:size-7 shrink-0 object-contain transition-opacity group-hover:opacity-90"
      />
    ),
  },
  {
    name: "Docker",
    Icon: SiDocker,
    iconClass: "text-[#2496ed]",
  },
  {
    name: "Python",
    Icon: SiPython,
    iconClass: "text-[#3776ab]",
  },
  {
    name: "React",
    Icon: SiReact,
    iconClass: "text-[#61dafb]",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    iconClass: "text-[#3178c6]",
  },
  {
    name: "Golang",
    Icon: SiGo,
    iconClass: "text-[#00add8]",
  },
];

const FULL_NAME = "I'm Soumil Roy";

const BODY_SEGMENTS: { type: "text" | "link"; text: string; href?: string }[] = [
  { type: "text", text: "I build products from the UI down to the deep-level architecture. Right now, I'm focused on building infrastructure at " },
  { type: "link", text: "empowerreg.ai", href: "https://empowerreg.ai" },
  { type: "text", text: ", where I make sure our distributed systems are as robust as they are scalable. Say hello on " },
  { type: "link", text: "LinkedIn", href: "https://www.linkedin.com/in/soumilroy/" },
  { type: "text", text: " or " },
  { type: "link", text: "GitHub", href: "https://github.com/roysoumil" },
  { type: "text", text: "." },
];

// Precompute word tokens per segment so we don't split on every render
const SEGMENT_TOKENS = BODY_SEGMENTS.map((seg) =>
  seg.text.trim() === "" ? [] : seg.text.split(/(\s+)/)
);
const SEGMENT_WORD_COUNTS = SEGMENT_TOKENS.map(
  (tokens) => tokens.filter((w) => w.trim()).length
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
    <span className={`inline-block w-[0.3em] bg-white align-baseline ml-0.5 cursor-blink ${
      isTitle ? "h-[0.85em] translate-y-[0.05em]" : "h-[0.9em] translate-y-[0.1em]"
    }`} />
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [phase, setPhase] = useState<"greeting" | "title" | "body" | "done-cursor">("greeting");
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [displayedName, setDisplayedName] = useState("");
  const [bodyWordCount, setBodyWordCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [techVisible, setTechVisible] = useState(false);
  // Tracks previous bodyWordCount so newly revealed words get the fade-in animation.
  // Updated in useEffect (runs after render), so during render it still holds the prior value.
  const prevWordCount = useRef(0);
  const pendingTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const bodyVisible = phase === "body" || phase === "done-cursor";

  useEffect(() => {
    const t = setTimeout(() => {
      setGreetingVisible(true);
      const t2 = setTimeout(() => setPhase("title"), 600);
      pendingTimeouts.current.push(t2);
    }, 200);
    return () => clearTimeout(t);
  }, []);

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
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
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
          className="inline-flex items-center gap-1 font-bold text-[#3fb950] underline decoration-[#3fb950]/30 decoration-2 underline-offset-4 transition-colors hover:text-[#56d364] hover:decoration-[#3fb950]"
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
    <main
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 font-sans sm:px-10 lg:px-16 bg-dark-grid"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(63, 185, 80, 0.07), transparent 60%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-[0.3]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(228, 228, 231, 0.07) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <section className="relative z-10 w-full max-w-7xl mx-auto">
        <p
          className={`font-mono text-[0.8rem] font-normal tracking-wider text-[#6b7280] sm:text-[18px] transition-opacity duration-700 ease-out ${
            greetingVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Hello · Hola · Bonjour · 你好 · Namaste · Ciao · こんにちは
        </p>

        <h1 className="mt-5 max-w-[36ch] text-[clamp(2.8rem,7.5vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#f4f4f5]">
          {displayedName}
          {phase === "title" && showCursor && <Cursor variant="title" />}
        </h1>

        <div
          className={`transition-opacity duration-500 ease-out ${
            bodyVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {bodyVisible && (
            <p className="mt-6 max-w-[68ch] text-[clamp(1.15rem,2.8vw,1.6rem)] leading-[1.7] text-[#a1a1aa]">
              {renderBodySegments()}
              {phase === "done-cursor" && showCursor && <Cursor />}
            </p>
          )}
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center gap-3 sm:gap-4 transition-opacity duration-500 ease-out ${
            techVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {TECH_ICONS.map(({ name, Icon, icon, iconClass }) => (
            <div
              key={name}
              className="group flex items-center gap-2.5 sm:gap-3 rounded-lg border border-[#27272a] bg-[#18181b]/80 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-sm transition-all duration-200 hover:border-[#3fb950]/40 hover:bg-[#3fb950]/5 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(63,185,80,0.08)]"
            >
              {icon ?? (
                <Icon
                  className={`size-6 sm:size-7 shrink-0 ${
                    iconClass ?? "text-[#e4e4e7]"
                  }`}
                />
              )}
              <span className="font-mono text-[clamp(0.9rem,1.5vw,1.05rem)] font-bold uppercase tracking-[0.08em] text-[#a1a1aa] group-hover:text-[#e4e4e7] transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
