"use client";

import { HiOutlineExternalLink } from "react-icons/hi";
import trackCursor from "./trackCursor";

export type WorkItem = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  url: string;
};

export default function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={trackCursor}
      style={{ animationDelay: `${550 + index * 250}ms` }}
      className="fade-in-block border-light group relative flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-colors duration-200 focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
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
