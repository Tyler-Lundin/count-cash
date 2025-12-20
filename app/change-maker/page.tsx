import type { Metadata } from "next";
import ChangeMakerTool from "../components/tools/ChangeMakerTool";

export const metadata: Metadata = {
  title: "Change Maker Calculator | Count Cash",
  description: "Enter amount due and paid; get an exact change breakdown from large to small bills and coins.",
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
          Make change instantly. Example: due $13.27, paid $20.00 → $6.73 back.
        </p>
      </div>
      <ChangeMakerTool />
      <section className="mx-auto max-w-2xl px-4 mt-8 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
        <h2 className="text-base font-semibold">About this tool</h2>
        <p>
          Enter the total due and the amount paid. The change maker calculates the exact change using a high‑to‑low denomination strategy and shows a simple, scannable breakdown. Perfect for training or reconciling at close.
        </p>
        <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Does it support coins and bills? Yes — pennies through $100s.</li>
          <li>Can I copy the breakdown? Use your OS share/copy after selecting the list.</li>
          <li>Offline? Yes — install it and use without a connection.</li>
        </ul>
      </section>
    </div>
  );
}
