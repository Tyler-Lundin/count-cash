"use client";
import React from 'react';
import Card from './Card';
import { formatCurrency } from '../lib/calc';

type Props = {
  floatCents: number;
  onChange: (cents: number) => void;
};

export default function FloatSettings({ floatCents, onChange }: Props) {
  const [value, setValue] = React.useState(String(floatCents / 100));

  React.useEffect(() => {
    setValue(String(floatCents / 100));
  }, [floatCents]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    const num = Number(raw);
    if (!Number.isNaN(num)) onChange(Math.round(num * 100));
  };

  return (
    <Card title="Closing Float">
      <div className="flex items-center gap-3">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">Target left in drawer</div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-neutral-500">USD</span>
          <input
            inputMode="decimal"
            className="w-28 h-10 text-right rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2"
            value={value}
            onChange={onInput}
            aria-label="Closing float amount in dollars"
          />
        </div>
      </div>
      <div className="mt-2 text-xs text-neutral-500">Current: {formatCurrency(Math.round(Number(value.replace(/[^0-9.]/g, '') || '0') * 100))}</div>
    </Card>
  );
}

