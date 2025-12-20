"use client";
import React from 'react';
import Card from './Card';
import { Counts } from '../lib/denoms';
import { formatCurrency, groupTotals, planRemoval, totalCents } from '../lib/calc';

type Props = {
  counts: Counts;
  floatCents: number;
};

export default function DrawerSummary({ counts, floatCents }: Props) {
  const total = totalCents(counts);
  const { coins, bills } = groupTotals(counts);
  const plan = planRemoval(counts, floatCents);

  return (
    <Card title="Summary">
      <dl className="grid grid-cols-2 gap-y-1 text-sm">
        <dt className="text-neutral-500">Coins</dt>
        <dd className="text-right">{formatCurrency(coins)}</dd>
        <dt className="text-neutral-500">Bills</dt>
        <dd className="text-right">{formatCurrency(bills)}</dd>
        <dt className="text-neutral-700 font-medium">Total</dt>
        <dd className="text-right font-medium">{formatCurrency(total)}</dd>
      </dl>
      <div className="mt-3 border-t border-neutral-200 dark:border-neutral-800 pt-3 text-sm">
        <div className="flex items-center">
          <span className="text-neutral-600">Take out to leave {formatCurrency(floatCents)}:</span>
          <span className="ml-auto font-semibold text-emerald-600">{formatCurrency(plan.takeOut)}</span>
        </div>
        {plan.shortfall > 0 ? (
          <div className="mt-1 text-amber-600">Short by {formatCurrency(plan.shortfall)} to reach target.</div>
        ) : null}
      </div>
    </Card>
  );
}

