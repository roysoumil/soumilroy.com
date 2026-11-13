"use client";

import { HiOutlineMail } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import useCopyEmail, { EMAIL } from "./useCopyEmail";

const iconLink =
  "grid size-10 place-items-center rounded-md border border-[var(--line)] text-[var(--text-2)] transition-colors hover:border-[var(--accent-ring)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

// The page ends on the ask: a reader who got this far is the one most
// likely to write. The contact dock steps aside while this is on screen
// (it watches #footer).
export default function SiteFooter() {
  const [copied, copyEmail] = useCopyEmail();

  return (
    <footer
      id="footer"
      className="relative border-t border-[var(--line-soft)] px-6 pb-8 pt-14 sm:px-10 sm:pt-16 lg:px-16 lg:pt-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-[16em] text-balance font-display text-[clamp(1.6rem,3.7vw,2.9rem)] font-light leading-[1.08] tracking-[-0.045em] text-[var(--text)]">
          Have something to build?
        </h2>
        <p className="mt-4 max-w-[46ch] text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.65] text-[var(--text-2)]">
          I am open to freelance and consulting work. Tell me what you are making and where it is stuck.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:w-auto"
          >
            <HiOutlineMail aria-hidden="true" className="size-4 shrink-0" />
            {/* Fixed width so the button does not jump when the label swaps. */}
            <span className="min-w-[15ch] text-left font-mono text-[13px]">{copied ? "Copied" : EMAIL}</span>
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

        <p className="mt-14 border-t border-[var(--line-soft)] pt-6 font-mono text-[12px] lowercase tabular-nums text-[var(--text-2)] sm:mt-16">
          © {new Date().getFullYear()} Soumil Roy
        </p>
      </div>
    </footer>
  );
}
