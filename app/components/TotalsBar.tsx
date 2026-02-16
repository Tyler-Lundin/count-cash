"use client";
import React from 'react';
import { Counts } from '../lib/denoms';
import { formatCurrency, planRemoval, totalCents } from '../lib/calc';

type Props = {
  counts: Counts;
  floatCents: number;
  onReset?: () => void;
  onCopy?: (text: string) => void;
};

export default function TotalsBar({ counts, floatCents, onReset, onCopy }: Props) {
  const total = totalCents(counts);
  const takeOut = planRemoval(counts, floatCents).takeOut;
  const copyText = `Total: ${formatCurrency(total)} • Take out: ${formatCurrency(takeOut)}`;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-t border-neutral-200 dark:border-neutral-800" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom))' }}>
      <div className="mx-auto max-w-md px-3 sm:px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-xs text-neutral-500">Total</div>
          <div className="font-semibold">{formatCurrency(total)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-500">Take Out</div>
          <div className="font-semibold text-emerald-700">{formatCurrency(takeOut)}</div>
        </div>
        <div className="ml-2 flex items-center gap-2">
          {onReset && (
            <button onClick={onReset} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Reset</button>
          )}
          {onCopy && (
            <button onClick={() => onCopy(copyText)} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Copy</button>
          )}
        </div>
      </div>
    </div>
  );
}
