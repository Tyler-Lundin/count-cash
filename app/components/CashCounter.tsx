"use client";
import React from 'react';
import { Counts, Denomination, ZERO_COUNTS, ROLL_SIZES } from '../lib/denoms';
import { FLOAT_DEFAULT_CENTS } from '../lib/calc';
import CoinCounters from './CoinCounters';
import CoinRollCounters from './CoinRollCounters';
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
  const [useRolls, setUseRolls] = React.useState<boolean>(false);
  const [rolls, setRolls] = React.useState<Record<'penny'|'nickel'|'dime'|'quarter', number>>({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
  const [loose, setLoose] = React.useState<Record<'penny'|'nickel'|'dime'|'quarter', number>>({ penny: 0, nickel: 0, dime: 0, quarter: 0 });

  const update = (d: Denomination, v: number) => {
    setCounts((prev) => ({ ...prev, [d]: Math.max(0, Math.floor(v)) }));
  };

  // Effective counts: if rolls mode enabled, convert rolls+loose to coin counts
  const effectiveCounts: Counts = React.useMemo(() => {
    const c: Counts = { ...counts };
    if (useRolls) {
      (['penny','nickel','dime','quarter'] as const).forEach((k) => {
        c[k] = Math.max(0, Math.floor(rolls[k] * ROLL_SIZES[k] + loose[k]));
      });
    }
    return c;
  }, [counts, useRolls, rolls, loose]);

  const reset = () => {
    setCounts(ZERO_COUNTS());
    setFloatCents(FLOAT_DEFAULT_CENTS);
    setConfirmed(false);
    setRolls({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
    setLoose({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
  };

  const copySummary = async () => {
    const { formatCurrency, planRemoval, totalCents } = await import('../lib/calc');
    const total = totalCents(effectiveCounts);
    const plan = planRemoval(effectiveCounts, floatCents);
    const text = `Total: ${formatCurrency(total)} • Take out: ${formatCurrency(plan.takeOut)} • Target: ${formatCurrency(floatCents)}`;
    if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
      try { await (navigator as any).clipboard.writeText(text); } catch {}
    }
  };

  return (
    <div className="mx-auto max-w-md px-3 sm:px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">{title}</h1>
      <div className="mb-2 flex items-center justify-center sm:justify-start gap-2 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" checked={useRolls} onChange={(e) => setUseRolls(e.target.checked)} disabled={confirmed} />
          Include coin rolls
        </label>
      </div>
      <FloatSettings floatCents={floatCents} onChange={setFloatCents} />
      <div className="h-3" />
      {useRolls ? (
        <CoinRollCounters
          rolls={rolls}
          coins={loose}
          onChangeRolls={(d, v) => setRolls((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
          onChangeCoins={(d, v) => setLoose((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
          disabled={confirmed}
        />
      ) : (
        <CoinCounters counts={counts} onChange={update} disabled={confirmed} />
      )}
      <div className="h-3" />
      <BillCounters counts={counts} onChange={update} disabled={confirmed} />
      <div className="h-3" />
      <DrawerSummary counts={effectiveCounts} floatCents={floatCents} />
      {confirmed ? (
        <>
          <div className="h-3" />
          <DrawerBreakdown counts={effectiveCounts} floatCents={floatCents} />
        </>
      ) : null}
      <div className="h-3" />
      <ActionsBar
        confirmed={confirmed}
        onConfirm={() => setConfirmed(true)}
        onEdit={() => setConfirmed(false)}
        onReset={reset}
        onCopy={copySummary}
      />
      <TotalsBar counts={effectiveCounts} floatCents={floatCents} onReset={reset} onCopy={copySummary} />
    </div>
  );
}
