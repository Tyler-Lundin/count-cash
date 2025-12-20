import Link from "next/link";
import { TOOLS } from "./lib/tools";

export default function Home() {
  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Cash Tools</h1>
      <ul className="space-y-3">
        {TOOLS.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="block rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 hover:shadow-sm"
            >
              <div className="text-base font-medium">{it.title}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">{it.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
