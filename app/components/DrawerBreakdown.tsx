"use client";
import React from 'react';
import Card from './Card';
import { ALL_ORDER, Counts, DENOMS, labelFor } from '../lib/denoms';
import { planRemoval, formatCurrency } from '../lib/calc';

type Props = {
  counts: Counts;
  floatCents: number;
};

export default function DrawerBreakdown({ counts, floatCents }: Props) {
  const plan = planRemoval(counts, floatCents);
  // Greedy removal, large -> small, using available counts to reach plan.takeOut
  let remaining = plan.takeOut;
  const greedy: { d: keyof typeof DENOMS; count: number; value: number }[] = [];
  for (const d of ALL_ORDER) {
    const value = DENOMS[d];
    const maxByValue = Math.floor(remaining / value);
    const canRemove = Math.min(counts[d], maxByValue);
    if (canRemove > 0) {
      greedy.push({ d, count: canRemove, value });
      remaining -= canRemove * value;
    }
  }
  const items = greedy.filter((x) => x.count > 0);

  if (items.length === 0) return null;

  return (
    <Card title="Removal Breakdown (Large → Small)">
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {items.map(({ d, count, value }) => (
          <li key={d} className="py-2 flex items-center">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">{labelFor(d)}</span>
            <span className="ml-auto text-sm tabular-nums">x{count}</span>
            <span className="ml-3 text-sm text-neutral-500">{formatCurrency(count * value)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center text-sm">
        <span className="text-neutral-600">Total to remove</span>
        <span className="ml-auto font-semibold text-emerald-700">{formatCurrency(plan.takeOut)}</span>
      </div>
    </Card>
  );
}
