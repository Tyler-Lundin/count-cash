"use client";
import React from 'react';
import Card from './Card';
import Counter from './Counter';
import { BILL_ORDER, Counts, Denomination, labelFor } from '../lib/denoms';

type Props = {
  counts: Counts;
  onChange: (d: Denomination, v: number) => void;
  disabled?: boolean;
};

export default function BillCounters({ counts, onChange, disabled }: Props) {
  return (
    <Card title="Bills">
      {BILL_ORDER.map((d) => (
        <Counter
          key={d}
          id={`bill-${d}`}
          label={labelFor(d)}
          value={counts[d]}
          onChange={(v) => onChange(d, v)}
          disabled={disabled}
        />
      ))}
    </Card>
  );
}
