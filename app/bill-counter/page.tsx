import type { Metadata } from "next";
import BillCounterTool from "../components/tools/BillCounterTool";

export const metadata: Metadata = {
  title: "Bill Counter Calculator | Count Cash",
  description: "Quickly count $1, $5, $10, $20, $50, and $100 bills with instant totals.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8">
        <p className="-mt-2 mb-3 text-sm text-[var(--foreground)] text-center sm:text-left">
          Count bills fast. Example: ten $20s + five $10s → $250.00.
        </p>
      </div>
      <BillCounterTool />
      <section className="mx-auto max-w-2xl px-4 mt-8 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
        <h2 className="text-base font-semibold">How it helps</h2>
        <p>
          Built for speed at the counter. Large tap targets and clear totals reduce errors and speed up closeouts. Enter counts with plus/minus or tap to type, and quickly copy totals or reset.
        </p>
        <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Which bills are supported? $1 through $100.</li>
          <li>Offline? Yes — install to your home screen and use offline.</li>
          <li>Copy totals? Use the bottom bar actions.</li>
        </ul>
      </section>
    </div>
  );
}
