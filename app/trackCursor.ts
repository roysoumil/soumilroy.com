import type { MouseEvent } from "react";

// Written straight to the node rather than through state: this fires on every
// mousemove, and a re-render per frame would be wasted work for two custom
// properties the CSS reads directly. Pair with the .border-light class.
export default function trackCursor(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
