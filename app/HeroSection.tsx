"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import trackCursor from "./trackCursor";
import StackScene from "./StackScene";
import useCopyEmail, { EMAIL } from "./useCopyEmail";

const FULL_NAME = "Soumil Roy";

const ROLE_LINE = "Software engineer, full stack, infrastructure and AI";

const STATEMENT = "I build software across the whole stack, from the interface to the platform under it.";

const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function StatusCard() {
  const [copied, copyEmail] = useCopyEmail();
  const [time, setTime] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

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

  const iconLink =
    "grid size-10 place-items-center rounded-md border border-[var(--line)] text-[var(--text-2)] transition-colors hover:border-[var(--accent-ring)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]";

  return (
    <aside id="contact" className="fade-in-block [animation-delay:900ms]">
      <div
        onMouseMove={trackCursor}
        className="border-light relative flex flex-col gap-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] lg:flex-row lg:items-end lg:justify-between lg:p-8"
      >
        <div>
          <p className="text-balance font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-light leading-tight tracking-[-0.015em] text-[var(--text)]">
            Open to freelance and consulting work.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[var(--text-3)]">
            <span role="status" aria-label={isOffline ? "Offline" : "Available"} className="relative flex size-2">
              {!isOffline && (
                <span aria-hidden="true" className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              )}
              <span
                aria-hidden="true"
                className={`relative inline-flex size-2 rounded-full ${isOffline ? "bg-[var(--text-3)]" : "bg-[var(--accent)]"}`}
              />
            </span>
            {isOffline ? "Offline, back at 09:00 IST" : "Online now"}
            <span className="font-mono text-[12px] tabular-nums">{time ? `${time} IST` : "~/now"}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] sm:w-auto"
          >
            <HiOutlineMail aria-hidden="true" className="size-4 shrink-0" />
            {/* Fixed width so the button does not jump when the label swaps. */}
            <span className="min-w-[15ch] text-left font-mono text-[13px]">
              {copied ? "Copied" : EMAIL}
            </span>
          </button>
          <a
            href="https://github.com/roysoumil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconLink}
          >
            <SiGithub aria-hidden="true" className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/soumilroy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLink}
          >
            <FaLinkedin aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // The stack's tilt is the sum of two inputs: where the cursor is on the
  // page, and how far the stack itself has been dragged. Both land in
  // --tilt-x / --tilt-z as custom properties, so nothing re-renders; a rAF
  // loop eases toward the target and stops once it has settled. Letting go
  // of a drag just zeroes its share, so the stack swings back on its own.
  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    const scene = section?.querySelector<HTMLElement>(".stack-scene");
    if (!section || !spotlight || !scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

    let hoverX = 0;
    let hoverZ = 0;
    let dragX = 0;
    let dragZ = 0;
    let x = 0;
    let z = 0;
    let frame = 0;
    let dragStart: { x: number; y: number } | null = null;

    const tick = () => {
      const targetX = hoverX + dragX;
      const targetZ = hoverZ + dragZ;
      x += (targetX - x) * 0.08;
      z += (targetZ - z) * 0.08;
      section.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
      section.style.setProperty("--tilt-z", `${z.toFixed(2)}deg`);
      const settled = Math.abs(targetX - x) < 0.01 && Math.abs(targetZ - z) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      spotlight.style.setProperty("--sx", `${e.clientX}px`);
      spotlight.style.setProperty("--sy", `${e.clientY}px`);
      hoverZ = ((e.clientX / window.innerWidth) * 2 - 1) * 9;
      hoverX = ((e.clientY / window.innerHeight) * 2 - 1) * 5;
      wake();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragStart = { x: e.clientX, y: e.clientY };
      scene.setPointerCapture(e.pointerId);
      scene.setAttribute("data-dragging", "");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragStart) return;
      // Dragging right swings the near corner right, which is a negative
      // turn about Z. Kept under 45° in total with the hover share so a
      // plate never shows an edge that has no wall (see .stack-side).
      dragZ = clamp((e.clientX - dragStart.x) * -0.25, -32, 32);
      // Vertical drags belong to page scrolling on touch.
      dragX = e.pointerType === "touch" ? 0 : clamp((e.clientY - dragStart.y) * -0.1, -10, 10);
      wake();
    };
    const onPointerEnd = () => {
      if (!dragStart) return;
      dragStart = null;
      dragX = 0;
      dragZ = 0;
      scene.removeAttribute("data-dragging");
      wake();
    };

    // Cursor-following only makes sense with a cursor; dragging works anywhere.
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) window.addEventListener("mousemove", onMouseMove, { passive: true });
    scene.addEventListener("pointerdown", onPointerDown);
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerup", onPointerEnd);
    scene.addEventListener("pointercancel", onPointerEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      scene.removeEventListener("pointerdown", onPointerDown);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerup", onPointerEnd);
      scene.removeEventListener("pointercancel", onPointerEnd);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 [@media(hover:none)]:hidden"
        style={{
          background: "radial-gradient(600px circle at var(--sx, 50%) var(--sy, 50%), var(--spotlight), transparent 65%)",
        }}
      />

      <section
        ref={sectionRef}
        id="top"
        className="relative overflow-hidden px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-16 lg:pb-20 lg:pt-24"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-y-6 xl:grid-cols-[minmax(0,1fr)_540px] xl:items-center xl:gap-x-10">
            <div className="text-left">
              {/* The name stays the page's h1 (it is what people search
                  for) even though the statement below is set larger. */}
              <div className="fade-in-block [animation-delay:150ms] flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.95rem] text-[var(--text-2)]">
                <h1 className="font-serif text-[1.35rem] font-normal text-[var(--text)]">{FULL_NAME}</h1>
                {/* Only when the roles fit beside the name; alone on a line it
                    is a stray mark. */}
                <span aria-hidden="true" className="hidden text-[var(--line)] sm:inline">/</span>
                <p>{ROLE_LINE}</p>
              </div>

              <p className="fade-in-block [animation-delay:400ms] mt-6 max-w-[15em] text-balance font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em] text-[var(--text)]">
                {STATEMENT}
              </p>
            </div>

            <div className="fade-in-block [animation-delay:300ms]">
              <StackScene />
            </div>
          </div>

          <div className="mt-10 xl:mt-8">
            <StatusCard />
          </div>
        </div>
      </section>
    </>
  );
}
