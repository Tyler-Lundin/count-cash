"use client";
import React from 'react';
import { Counts } from '../lib/denoms';
import { formatCurrency, planRemoval, totalCents } from '../lib/calc';

type Props = {
  counts: Counts;
  floatCents: number;
};

export default function TotalsBar({ counts, floatCents }: Props) {
  const total = totalCents(counts);
  const takeOut = planRemoval(counts, floatCents).takeOut;
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-xs text-neutral-500">Total</div>
          <div className="font-semibold">{formatCurrency(total)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-500">Take Out</div>
          <div className="font-semibold text-emerald-700">{formatCurrency(takeOut)}</div>
        </div>
      </div>
    </div>
  );
}

