"use client";

import { useEffect, useState } from "react";
import { HiOutlineMail, HiX } from "react-icons/hi";
import useCopyEmail, { EMAIL } from "./useCopyEmail";

// A small bar that keeps the email one click away between the page's two
// fixed contact points: it shows once the hero's card (#contact) has scrolled
// off the top, and steps aside when the footer (#footer) comes into view.
export default function ContactDock() {
  const [past, setPast] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, copy] = useCopyEmail();

  useEffect(() => {
    const card = document.getElementById("contact");
    const footer = document.getElementById("footer");
    if (!card) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === card) setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        else setAtFooter(entry.isIntersecting);
      }
    });
    observer.observe(card);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const shown = past && !atFooter && !dismissed;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      <aside
        aria-label="Contact"
        inert={!shown}
        className={`contact-dock pointer-events-auto flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-4 pr-1.5 ${shown ? "is-shown" : ""}`}
      >
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[var(--accent)]" />
        <p className="ml-1 mr-2 hidden text-sm text-[var(--text)] sm:block">Open to freelance and consulting</p>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
          className="ml-1 flex h-9 items-center gap-2 rounded-full bg-[var(--accent)] px-3.5 text-[var(--bg)] transition-colors hover:bg-[var(--accent-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] sm:ml-0"
        >
          <HiOutlineMail aria-hidden="true" className="size-4 shrink-0" />
          <span className="min-w-[15ch] text-left font-mono text-[13px] font-medium">{copied ? "Copied" : EMAIL}</span>
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide contact bar"
          className="grid size-9 place-items-center rounded-full text-[var(--text-3)] transition-colors hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
        >
          <HiX aria-hidden="true" className="size-4" />
        </button>
      </aside>
    </div>
  );
}
