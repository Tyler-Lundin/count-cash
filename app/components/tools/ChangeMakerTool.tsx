"use client";
import React from "react";
import Card from "../../components/Card";
import { ALL_ORDER, DENOMS, labelFor } from "../../lib/denoms";
import { formatCurrency } from "../../lib/calc";

function toCents(input: string): number {
  const num = Number(input.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export default function ChangeMakerTool() {
  const [due, setDue] = React.useState<string>("0");
  const [paid, setPaid] = React.useState<string>("0");
  const dueCents = toCents(due);
  const paidCents = toCents(paid);
  const change = Math.max(0, paidCents - dueCents);

  let remaining = change;
  const breakdown: { label: string; count: number; value: number }[] = [];
  for (const d of ALL_ORDER) {
    const value = DENOMS[d];
    const count = Math.floor(remaining / value);
    if (count > 0) {
      breakdown.push({ label: labelFor(d), count, value });
      remaining -= count * value;
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">Change Maker</h1>
      <Card title="Inputs">
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-700 dark:text-neutral-300 w-28">Amount Due</label>
          <input
            inputMode="decimal"
            className="flex-1 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            placeholder="$0.00"
          />
        </div>
        <div className="h-2" />
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-700 dark:text-neutral-300 w-28">Amount Paid</label>
          <input
            inputMode="decimal"
            className="flex-1 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            placeholder="$0.00"
          />
        </div>
      </Card>
      <div className="h-3" />
      <Card title="Change Due">
        <div className="flex items-center text-sm">
          <span className="text-neutral-600">Total Change</span>
          <span className="ml-auto font-semibold">{formatCurrency(change)}</span>
        </div>
        {paidCents < dueCents ? (
          <div className="mt-2 text-amber-600 text-sm">Paid is less than due. No change.</div>
        ) : null}
      </Card>
      {breakdown.length > 0 ? (
        <>
          <div className="h-3" />
          <Card title="Breakdown (Large → Small)">
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {breakdown.map((b) => (
                <li key={b.label} className="py-2 flex items-center">
                  <span className="text-sm">{b.label}</span>
                  <span className="ml-auto text-sm tabular-nums">x{b.count}</span>
                  <span className="ml-3 text-sm text-neutral-500">{formatCurrency(b.count * b.value)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      ) : null}
    </div>
  );
}
