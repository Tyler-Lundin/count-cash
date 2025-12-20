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
    </div>
  );
}
