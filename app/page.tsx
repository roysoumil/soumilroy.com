"use client";

import { useRef } from "react";
import {
  SiDocker,
  SiPython,
  SiReact,
  SiTypescript,
  SiGo,
} from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FlowLineAnimation } from "./components/FlowLineAnimation";
import { ShapeMeshAnimation } from "./components/ShapeMeshAnimation";

const TECH_ICONS = [
  {
    name: "Azure",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg"
        alt="Azure"
        className="size-6 sm:size-7 shrink-0 object-contain transition-opacity group-hover:opacity-90"
      />
    ),
  },
  { name: "Docker", Icon: SiDocker },
  { name: "Python", Icon: SiPython },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Golang", Icon: SiGo },
];

export default function Home() {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#ffffff] px-6 py-24 font-sans sm:px-10 lg:px-16">
      {/* D3 flowing line animation */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <FlowLineAnimation contentRef={contentRef} />
      </div>

      {/* D3 animating shape mesh - circles, squares, triangles, hexagons around content */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShapeMeshAnimation />
      </div>

      {/* Gradient mesh background - GitHub light accents */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(221,244,255,0.6),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(209,217,224,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_80%,rgba(221,244,255,0.4),transparent)]" />
      </div>

      {/* Subtle dot grid - GitHub border color */}
      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-[0.6]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(31,35,40,0.08) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <section
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <p className="text-[0.8rem] font-semibold tracking-wider text-[#59636e] sm:text-[18px]">
          Hello · Hola · Bonjour · 你好 · Namaste · Ciao · こんにちは
        </p>
        <h1 className="mt-5 max-w-[36ch] text-[clamp(2.8rem,7.5vw,5.25rem)] font-thin leading-[1.05] tracking-tight text-[#1f2328]">
          I'm Soumil Roy
        </h1>
        <p className="mt-6 max-w-[68ch] text-[clamp(1.15rem,2.8vw,1.6rem)] leading-[1.7] text-[#59636e]">
          I build products from the UI down to the deep-level architecture.
          Right now, I’m focused on building infrastructure at{" "}
          <a
            href="https://empowerreg.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0969da] underline decoration-[#0969da]/30 decoration-2 underline-offset-4 transition-colors hover:text-[#0550ae] hover:decoration-[#0969da]"
          >
            empowerreg.ai
            <HiOutlineExternalLink className="inline-block size-4 shrink-0 align-middle sm:size-5" />
          </a>
          , where I make sure our distributed systems are as robust as they are
          scalable. Say hello on{" "}
          <a
            href="https://www.linkedin.com/in/soumilroy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0969da] underline decoration-[#0969da]/30 decoration-2 underline-offset-4 transition-colors hover:text-[#0550ae] hover:decoration-[#0969da]"
          >
            LinkedIn
            <HiOutlineExternalLink className="inline-block size-4 shrink-0 align-middle sm:size-5" />
          </a>{" "}
          or{" "}
          <a
            href="https://www.instagram.com/soumilroy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0969da] underline decoration-[#0969da]/30 decoration-2 underline-offset-4 transition-colors hover:text-[#0550ae] hover:decoration-[#0969da]"
          >
            Instagram
            <HiOutlineExternalLink className="inline-block size-4 shrink-0 align-middle sm:size-5" />
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          {TECH_ICONS.map(({ name, Icon, icon }) => (
            <div
              key={name}
              className="group flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-[#d1d9e0]/80 bg-white/80 px-4 py-2.5 sm:px-5 sm:py-3"
            >
              {icon ?? (
                <Icon className="size-6 sm:size-7 shrink-0 text-[#1f2328] transition-colors group-hover:text-[#0969da]" />
              )}
              <span className="text-[clamp(0.9rem,1.5vw,1.05rem)] font-semibold tracking-tight text-[#1f2328]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
