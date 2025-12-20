"use client";
import React from 'react';

type Props = {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  labelClassName?: string;
};

export default function Counter({ id, label, value, onChange, step = 1, min = 0, max, disabled = false, labelClassName }: Props) {
  const vibrate = () => (typeof navigator !== 'undefined' && 'vibrate' in navigator ? (navigator as any).vibrate(10) : undefined);
  const dec = () => {
    vibrate();
    onChange(Math.max(min, value - step));
  };
  const inc = () => {
    vibrate();
    onChange(Math.min(max ?? Number.MAX_SAFE_INTEGER, value + step));
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (Number.isFinite(next)) onChange(Math.min(Math.max(next, min), max ?? next));
    else if (e.target.value === '') onChange(min);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <label htmlFor={id} className={`text-sm text-neutral-700 dark:text-neutral-300 flex-1 ${labelClassName ?? ''}`}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={disabled}
          className="h-11 w-11 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xl leading-none"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-20 h-11 text-center rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent disabled:opacity-60"
          value={String(value)}
          onChange={onInput}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={inc}
          disabled={disabled}
          className="h-11 w-11 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xl leading-none"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
