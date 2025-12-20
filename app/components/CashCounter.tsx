"use client";
import React from 'react';
import { BILL_ORDER, COIN_ORDER, Counts, Denomination, ZERO_COUNTS } from '../lib/denoms';
import { FLOAT_DEFAULT_CENTS } from '../lib/calc';
import CoinCounters from './CoinCounters';
import BillCounters from './BillCounters';
import DrawerSummary from './DrawerSummary';
import DrawerBreakdown from './DrawerBreakdown';
import FloatSettings from './FloatSettings';
import TotalsBar from './TotalsBar';
import ActionsBar from './ActionsBar';

export default function CashCounter({ title = 'Cash Counter' }: { title?: string }) {
  const [counts, setCounts] = React.useState<Counts>(ZERO_COUNTS());
  const [floatCents, setFloatCents] = React.useState<number>(FLOAT_DEFAULT_CENTS);
  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  const update = (d: Denomination, v: number) => {
    setCounts((prev) => ({ ...prev, [d]: Math.max(0, Math.floor(v)) }));
  };

  const reset = () => {
    setCounts(ZERO_COUNTS());
    setFloatCents(FLOAT_DEFAULT_CENTS);
    setConfirmed(false);
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">{title}</h1>
      <FloatSettings floatCents={floatCents} onChange={setFloatCents} />
      <div className="h-3" />
      <CoinCounters counts={counts} onChange={update} disabled={confirmed} />
      <div className="h-3" />
      <BillCounters counts={counts} onChange={update} disabled={confirmed} />
      <div className="h-3" />
      <DrawerSummary counts={counts} floatCents={floatCents} />
      {confirmed ? (
        <>
          <div className="h-3" />
          <DrawerBreakdown counts={counts} floatCents={floatCents} />
        </>
      ) : null}
      <div className="h-3" />
      <ActionsBar
        confirmed={confirmed}
        onConfirm={() => setConfirmed(true)}
        onEdit={() => setConfirmed(false)}
        onReset={reset}
      />
      <TotalsBar counts={counts} floatCents={floatCents} />
    </div>
  );
}
