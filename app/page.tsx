import Link from "next/link";
import Image from "next/image";
import { TOOLS } from "./lib/tools";

export default function Home() {
  return (
    <div className="relative overflow-hidden rounded-lg mx-auto max-w-5xl px-3 sm:px-4 py-8">
      <header className="mb-6">
        <nav aria-label="Primary" className="hidden" />
      </header>
      <main className="">
        <h1 className="text-3xl font-semibold text-center sm:text-left">Cash Tools</h1>
        <p className="mt-2 text-[var(--foreground)] text-center sm:text-left">
          Fast, mobile-first calculators for counting cash, making change, and closing tills.
        </p>
        <section className="mt-6 grid grid-cols-1 gap-4">
          {TOOLS.map((it) => <Tool it={it} key={it.href}/>)}
        </section>
      </main>
    </div>
  );
}


function Tool({ it }: { it: typeof TOOLS[number] }) {
  return (
    <Link
      href={it.href}
      className={[
        // layout
        "group relative block overflow-hidden rounded-2xl p-4 sm:p-5",
        // surface
        "bg-[var(--background)] text-[var(--foreground)]",
        "border border-neutral-200/70 dark:border-neutral-800/80",
        // depth
        "shadow-sm hover:shadow-lg transition-all duration-200",
        // focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
      ].join(" ")}
    >
      {/* subtle hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute -inset-24 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 rotate-12" />
      </div>

      <div className="relative flex items-start gap-4 sm:gap-5">
        {/* icon well */}
        <div
          className={[
            "shrink-0 relative grid place-items-center",
            "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
            "border border-neutral-200/70 dark:border-neutral-800/80",
            "bg-neutral-50 dark:bg-neutral-900",
            "shadow-inner",
            "transition-transform duration-200 group-hover:-translate-y-0.5",
          ].join(" ")}
        >
          {it.image ? (
            <Image
              src={it.image}
              alt={it.imageAlt ?? ""}
              width={72}
              height={72}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm"
              priority={false}
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          )}
        </div>

        {/* text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold tracking-tight leading-snug line-clamp-2">
                {it.title}
              </div>
            </div>

            {/* CTA arrow */}
            <div
              className={[
                "mt-0.5 shrink-0",
                "rounded-full border border-neutral-200/70 dark:border-neutral-800/80",
                "bg-neutral-50 dark:bg-neutral-900",
                "w-9 h-9 grid place-items-center",
                "transition-all duration-200",
                "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              ].join(" ")}
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </div>
          </div>

          <div className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-[var(--foreground)]/70 line-clamp-2">
            {it.desc}
          </div>

          {/* tiny “meta” row */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--foreground)]/55">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/70 px-2 py-1 bg-neutral-50/60 dark:bg-neutral-900/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              Tool
            </span>
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              Open →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

