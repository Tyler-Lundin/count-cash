import type { Metadata } from "next";
import TipSplitCalculatorTool from "../components/tools/TipSplitCalculatorTool";

export const metadata: Metadata = {
  title: "Tip Split Calculator | Count Cash",
  description: "Split a bill and tip evenly across people with clear per‑person totals.",
};

function toCents(input: string): number {
  const num = Number(input.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8">
        <p className="-mt-2 mb-3 text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
          Example: $120 bill, 20% tip, 4 people → $36.00 each.
        </p>
      </div>
      <TipSplitCalculatorTool />
      <section className="mx-auto max-w-2xl px-4 mt-8 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
        <h2 className="text-base font-semibold">How it works</h2>
        <p>
          Enter your bill total, tip percentage, and number of people. The calculator computes tip, grand total, and a rounded‑up per‑person share so you never come up short when paying with cash.
        </p>
        <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Why round up per person? To cover any cents lost when splitting.</li>
          <li>Can I copy the result? Yes — select and copy totals or share via your OS.</li>
          <li>Offline? Yes — it works great as a PWA.</li>
        </ul>
      </section>
    </div>
  );
}
