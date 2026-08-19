"use client";

import { useSyncExternalStore } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

type Theme = "light" | "dark";

const OPTIONS: { value: Theme; label: string; Icon: typeof HiOutlineSun; icon: string }[] = [
  { value: "light", label: "Use light theme", Icon: HiOutlineSun, icon: "icon-sun" },
  { value: "dark", label: "Use dark theme", Icon: HiOutlineMoon, icon: "icon-moon" },
];

// The theme lives on the document element, not in React — the inline script in
// the layout sets it before first paint. useSyncExternalStore subscribes to it
// rather than mirroring it into state.
function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const onMedia = () => {
    // Keep following the OS until the visitor actually picks a side.
    if (localStorage.getItem("theme")) return;
    document.documentElement.setAttribute("data-theme", query.matches ? "dark" : "light");
    onStoreChange();
  };
  query.addEventListener("change", onMedia);
  window.addEventListener("themechange", onStoreChange);
  return () => {
    query.removeEventListener("change", onMedia);
    window.removeEventListener("themechange", onStoreChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Null on the server so the markup matches the first client render. Nothing
// visual depends on it — the knob and icons are positioned by CSS.
function getServerSnapshot(): Theme | null {
  return null;
}

function choose(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  // The theme-color metas are media-scoped for the no-JS default, so an
  // explicit choice has to overwrite both or mobile browser chrome keeps
  // tracking the OS instead of the toggle.
  document.querySelectorAll("meta[name=theme-color]").forEach((meta) => {
    meta.setAttribute("content", next === "dark" ? "#0a0a0b" : "#fafafa");
  });
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private browsing can refuse writes; the choice still holds for this page.
  }
  window.dispatchEvent(new Event("themechange"));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className="theme-toggle fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col rounded-r-xl border border-l-0 border-[var(--line)] bg-[var(--surface)] p-[3px] shadow-[var(--card-shadow)]"
      role="group"
      aria-label="Colour theme"
    >
      <span
        aria-hidden="true"
        className="theme-knob pointer-events-none absolute inset-x-[3px] top-[3px] h-[30px] rounded-lg border border-[var(--accent-ring)] bg-[var(--accent-wash)]"
      />
      {OPTIONS.map(({ value, label, Icon, icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => choose(value)}
          aria-label={label}
          aria-pressed={theme === null ? undefined : theme === value}
          className="relative grid size-[30px] place-items-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]"
        >
          <Icon aria-hidden="true" className={`${icon} size-[15px] transition-colors`} />
        </button>
      ))}
    </div>
  );
}
