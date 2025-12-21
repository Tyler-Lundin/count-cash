import type { Metadata } from "next";
import CoinCounterTool from "../components/tools/CoinCounterTool";

export const metadata: Metadata = {
  title: "Coin Counter Calculator | Count Cash",
  description: "Quickly count pennies, nickels, dimes, and quarters with big tap targets and an instant total.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8">
        <p className="-mt-2 mb-3 text-sm text-[var(--foreground)] text-center sm:text-left">
          Count coins fast. Example: 4 rolls of quarters (160 coins) → $40.00.
        </p>
      </div>
      <CoinCounterTool />
      <section className="mx-auto max-w-2xl px-4 mt-8 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
        <h2 className="text-base font-semibold">Why use this</h2>
        <p>
          This lightweight coin counter helps cashiers and managers tally coins quickly on mobile. Use the big plus/minus controls or tap the value to enter a count directly. Totals update instantly with clear dollars‑and‑cents formatting.
        </p>
        <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Which coins are supported? Pennies, nickels, dimes, and quarters.</li>
          <li>Does it work offline? Yes — it’s installable and offline‑friendly.</li>
          <li>Can I copy the total? Use the bottom bar to copy or reset.</li>
        </ul>
      </section>
    </div>
  );
}
