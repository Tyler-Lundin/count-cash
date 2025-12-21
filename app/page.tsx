import Link from "next/link";
import { TOOLS } from "./lib/tools";

export default function Home() {
  return (
    <div className="relative overflow-hidden rounded-lg mx-auto max-w-3xl px-3 sm:px-4 py-8">
      <header className="mb-6">
        <nav aria-label="Primary" className="hidden" />
      </header>
      <main className="">
        <h1 className="text-3xl font-semibold text-center sm:text-left">Cash Tools</h1>
        <p className="mt-2 text-[var(--foreground)] text-center sm:text-left">
          Fast, mobile-first calculators for counting cash, making change, and closing tills.
        </p>
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[var(--background)] text-[var(--foreground)] p-4 hover:shadow-sm"
            >
              <div className="text-base font-medium">{it.title}</div>
              <div className="text-sm text-[var(--foreground)]/70">{it.desc}</div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
