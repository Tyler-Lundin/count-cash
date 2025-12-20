"use client";
import React from "react";
import Card from "../../components/Card";
import BillCounters from "../../components/BillCounters";
import { BILL_ORDER, Counts, ZERO_COUNTS, Denomination, DENOMS } from "../../lib/denoms";
import { formatCurrency } from "../../lib/calc";

export default function BillCounterTool() {
  const [counts, setCounts] = React.useState<Counts>(ZERO_COUNTS());
  const update = (d: Denomination, v: number) => {
    setCounts((prev) => ({ ...prev, [d]: Math.max(0, Math.floor(v)) }));
  };
  const billsTotal = BILL_ORDER.reduce((sum, d) => sum + counts[d] * DENOMS[d], 0);
  const reset = () => setCounts(ZERO_COUNTS());
  const copy = async () => {
    const text = `Total bills: ${formatCurrency(billsTotal)}`;
    if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
      try { await (navigator as any).clipboard.writeText(text); } catch {}
    }
  };
  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">Bill Counter</h1>
      <BillCounters counts={counts} onChange={update} />
      <div className="h-3" />
      <Card>
        <div className="flex items-center text-sm">
          <span className="text-neutral-600">Total Bills</span>
          <span className="ml-auto font-semibold">{formatCurrency(billsTotal)}</span>
        </div>
      </Card>
      <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-t border-neutral-200 dark:border-neutral-800" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom))' }}>
        <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-neutral-500">Total</div>
            <div className="font-semibold">{formatCurrency(billsTotal)}</div>
          </div>
          <div className="ml-2 flex items-center gap-2">
            <button onClick={reset} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Reset</button>
            <button onClick={copy} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
