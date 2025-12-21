import CashCounter from "../components/CashCounter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Drawer Target Float Calculator | Count Cash",
  description: "Enter cash counts and get a large-to-small removal breakdown to leave your target drawer float (e.g., $200).",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-8">
        <p className="-mt-2 mb-3 text-sm text-[var(--foreground)] text-center sm:text-left">
          Take out exactly what you need to leave your target float. Example: counts total $683.00, float is $200.00 → pull $483.00.
        </p>
      </div>
      <CashCounter title="Cash Drawer Target Float" />
      <section className="mx-auto max-w-2xl px-4 mt-8 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
        <h2 className="text-base font-semibold">How this works</h2>
        <p>
          Enter the number of each coin and bill. Set your target float (default $200). The calculator computes your total and shows a large‑to‑small breakdown of what to remove so your drawer is left as close as possible to the target amount.
        </p>
        <p>
          This tool uses integer math to avoid rounding issues and a greedy, high‑to‑low strategy that matches typical U.S. cash handling. If an exact float isn’t possible, it keeps the closest viable amount and shows any shortfall.
        </p>
        <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>What denominations are supported? Pennies through $100 bills.</li>
          <li>Can I change the float? Yes — quick presets and a custom amount are supported.</li>
          <li>Does this work offline? Yes — it’s a PWA designed for mobile use.</li>
        </ul>
      </section>
    </div>
  );
}
