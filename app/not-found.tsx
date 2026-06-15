import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-dark-grid font-sans">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#71717a] tabular-nums">
            404 · path not found
          </p>
          <h1 className="mt-5 text-balance text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-[#f4f4f5]">
            Nothing here.
          </h1>
          <p className="mt-6 max-w-[52ch] text-pretty text-[clamp(1.05rem,2.1vw,1.3rem)] leading-[1.5] text-[#a1a1aa]">
            The page you’re looking for doesn’t exist — or doesn’t exist yet.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-sm font-mono text-sm lowercase text-[#3fb950] underline decoration-[#3fb950]/50 decoration-1 underline-offset-[3px] transition-colors hover:text-[#56d364] hover:decoration-[#3fb950] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#09090b]"
          >
            ← back home
          </Link>
        </div>
      </section>
    </main>
  );
}
