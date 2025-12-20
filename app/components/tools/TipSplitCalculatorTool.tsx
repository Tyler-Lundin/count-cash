"use client";
import React from "react";
import Card from "../../components/Card";
import { formatCurrency } from "../../lib/calc";

function toCents(input: string): number {
  const num = Number(input.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export default function TipSplitCalculatorTool() {
  const [amount, setAmount] = React.useState<string>("0");
  const [tipPercent, setTipPercent] = React.useState<string>("20");
  const [people, setPeople] = React.useState<number>(2);

  const amountCents = toCents(amount);
  const tip = Math.round((amountCents * (Number(tipPercent) || 0)) / 100);
  const total = amountCents + tip;
  const perPerson = people > 0 ? Math.ceil(total / people) : total;

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">Tip Split Calculator</h1>
      <Card title="Inputs">
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-700 dark:text-neutral-300 w-28">Bill Amount</label>
          <input
            inputMode="decimal"
            className="flex-1 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
          />
        </div>
        <div className="h-2" />
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-700 dark:text-neutral-300 w-28">Tip %</label>
          <input
            inputMode="numeric"
            className="w-24 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 text-right"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        <div className="h-2" />
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-700 dark:text-neutral-300 w-28">People</label>
          <input
            inputMode="numeric"
            className="w-24 h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 text-right"
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value || '1', 10)))}
          />
        </div>
      </Card>
      <div className="h-3" />
      <Card title="Totals">
        <dl className="grid grid-cols-2 gap-y-1 text-sm">
          <dt className="text-neutral-500">Bill</dt>
          <dd className="text-right">{formatCurrency(amountCents)}</dd>
          <dt className="text-neutral-500">Tip</dt>
          <dd className="text-right">{formatCurrency(tip)}</dd>
          <dt className="text-neutral-700 font-medium">Total</dt>
          <dd className="text-right font-medium">{formatCurrency(total)}</dd>
        </dl>
        <div className="mt-3 flex items-center text-sm">
          <span className="text-neutral-600">Per person</span>
          <span className="ml-auto font-semibold">{formatCurrency(perPerson)}</span>
        </div>
      </Card>
    </div>
  );
}
