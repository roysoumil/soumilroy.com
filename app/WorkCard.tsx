"use client";

import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { LAYER_NAMES } from "./StackScene";
import trackCursor from "./trackCursor";

export type WorkItem = {
  title: string;
  description: string;
  highlights: string[];
  // Which layers of the hero stack the project covers, by name.
  layers: string[];
  tags: string[];
  year: string;
  url: string;
  // The product's public home page.
  shot: StaticImageData;
};

// A small copy of the hero stack with the project's layers lit. Drawn by the
// .mini-* rules in globals.css; it fans open when the card is hovered.
function MiniStack({ layers }: { layers: string[] }) {
  const lit = LAYER_NAMES.filter((name) => layers.includes(name));
  const caption = lit.length === LAYER_NAMES.length ? "Every layer of the stack" : lit.join(", ");

  return (
    <div className="flex items-center gap-4">
      <div className="mini-stack" aria-hidden="true">
        <div className="mini-stage">
          {LAYER_NAMES.map((name, idx) => (
            <span
              key={name}
              className={`mini-plate ${layers.includes(name) ? "is-lit" : ""}`}
              style={{ "--level": LAYER_NAMES.length - 1 - idx } as CSSProperties}
            />
          ))}
        </div>
      </div>
      <p className="text-[13px] leading-snug text-[var(--text-3)]">
        <span className="sr-only">Covers: </span>
        {caption}
      </p>
    </div>
  );
}

export default function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={trackCursor}
      style={{ animationDelay: `${550 + index * 250}ms` }}
      className="fade-in-block border-light group relative block rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-colors duration-200 focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:p-8 lg:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] font-normal leading-tight tracking-[-0.015em] text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {item.title}
        </h3>
        <span className="flex shrink-0 items-center gap-2.5 font-mono text-[12px] lowercase tabular-nums text-[var(--text-3)]">
          {item.year}
          <HiOutlineExternalLink
            aria-hidden="true"
            className="size-4 transition-colors group-hover:text-[var(--accent)]"
          />
        </span>
      </div>

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:items-center lg:gap-14">
        <div>
          <p className="max-w-[58ch] text-pretty text-[1.05rem] leading-[1.6] text-[var(--text-2)]">{item.description}</p>

          <ul className="mt-5 max-w-[58ch] space-y-2 text-[0.95rem] leading-[1.5] text-[var(--text-2)]">
            {item.highlights.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.62em] size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                <span className="text-pretty">{line}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-[12px] lowercase text-[var(--text-2)]">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-[var(--line)] px-2.5 py-0.5">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <MiniStack layers={item.layers} />
          </div>
        </div>

        {/* The product in a browser frame, turned away in 3D and dimmed so a
            bright page does not glare on the dark one; it swings round and
            comes up to full brightness when the card is hovered (.shot in
            globals.css). */}
        <div className="shot-scene">
          <figure className="shot">
            <figcaption className="shot-bar font-mono" aria-hidden="true">
              <span className="shot-dot" />
              {item.title}
            </figcaption>
            <Image
              src={item.shot}
              alt={`The ${item.title} home page`}
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              className="shot-image block h-auto w-full"
            />
          </figure>
        </div>
      </div>
    </a>
  );
}
