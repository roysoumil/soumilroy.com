import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-grid font-sans">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-2xl text-left">
          <p className="font-mono text-[12px] lowercase tabular-nums text-[var(--text-2)]">
            404 · path not found
          </p>
          <h1 className="mt-5 text-left font-serif text-[clamp(2.75rem,7.5vw,5.25rem)] font-light leading-[0.95] tracking-[-0.02em] text-[var(--text)]">
            Nothing here.
          </h1>
          <p className="mt-6 max-w-[52ch] text-pretty text-left text-[clamp(1.05rem,2.1vw,1.25rem)] leading-[1.55] text-[var(--text-2)]">
            The page you’re looking for doesn’t exist — or doesn’t exist yet.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-sm font-mono text-sm lowercase text-[var(--accent)] underline decoration-[var(--accent-ring)] decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--accent-hi)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[var(--bg)]"
          >
            ← back home
          </Link>
        </div>
      </section>
    </main>
  );
}
