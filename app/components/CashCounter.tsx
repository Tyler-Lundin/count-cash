"use client";
import React from 'react';
import { Counts, Denomination, ZERO_COUNTS, ROLL_SIZES, ALL_ORDER, labelFor } from '../lib/denoms';
import { FLOAT_DEFAULT_CENTS } from '../lib/calc';
import CoinCounters from './CoinCounters';
import CoinRollCounters from './CoinRollCounters';
import BillCounters from './BillCounters';
import DrawerSummary from './DrawerSummary';
import DrawerBreakdown from './DrawerBreakdown';
import FloatSettings from './FloatSettings';
import TotalsBar from './TotalsBar';
import ActionsBar from './ActionsBar';
import Card from './Card';

export default function CashCounter({ title = 'Cash Counter' }: { title?: string }) {
  const [counts, setCounts] = React.useState<Counts>(ZERO_COUNTS());
  const [floatCents, setFloatCents] = React.useState<number>(FLOAT_DEFAULT_CENTS);
  const [confirmed, setConfirmed] = React.useState<boolean>(false);
  const [useRolls, setUseRolls] = React.useState<boolean>(false);
  const [zenMode, setZenMode] = React.useState<boolean>(false);
  const [zenIndex, setZenIndex] = React.useState<number>(0);
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
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" checked={useRolls} onChange={(e) => setUseRolls(e.target.checked)} disabled={confirmed} />
          Include coin rolls
        </label>
        <button 
          onClick={() => setZenMode(!zenMode)}
          className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${zenMode ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white' : 'bg-transparent border-neutral-300 dark:border-neutral-700'}`}
        >
          {zenMode ? 'Standard Mode' : 'Zen Mode'}
        </button>
      </div>
      {!zenMode && <FloatSettings floatCents={floatCents} onChange={setFloatCents} />}
      <div className="h-3" />
      {zenMode ? (
        <ZenCounter 
          useRolls={useRolls} 
          counts={counts} 
          rolls={rolls} 
          loose={loose} 
          onChangeCount={update} 
          onChangeRoll={(d, v) => setRolls((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
          onChangeLoose={(d, v) => setLoose((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
          onFinished={() => setZenMode(false)}
        />
      ) : (
        <>
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
        </>
      )}
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

function ZenCounter({ 
  useRolls, 
  counts, 
  rolls, 
  loose, 
  onChangeCount, 
  onChangeRoll, 
  onChangeLoose,
  onFinished 
}: { 
  useRolls: boolean; 
  counts: Counts; 
  rolls: Record<string, number>; 
  loose: Record<string, number>;
  onChangeCount: (d: Denomination, v: number) => void;
  onChangeRoll: (d: 'penny'|'nickel'|'dime'|'quarter', v: number) => void;
  onChangeLoose: (d: 'penny'|'nickel'|'dime'|'quarter', v: number) => void;
  onFinished: () => void;
}) {
  const steps = React.useMemo(() => {
    const s: { type: 'count' | 'roll' | 'loose'; denom: Denomination; label: string }[] = [];
    
    // Bills first (Hundred to One)
    ['hundred', 'fifty', 'twenty', 'ten', 'five', 'two', 'one'].forEach((d) => {
      s.push({ type: 'count', denom: d as Denomination, label: labelFor(d as Denomination) });
    });

    // Coins
    ['quarter', 'dime', 'nickel', 'penny'].forEach((d) => {
      if (useRolls) {
        s.push({ type: 'roll', denom: d as Denomination, label: `${labelFor(d as Denomination)} (Rolls)` });
        s.push({ type: 'loose', denom: d as Denomination, label: `${labelFor(d as Denomination)} (Loose)` });
      } else {
        s.push({ type: 'count', denom: d as Denomination, label: labelFor(d as Denomination) });
      }
    });

    return s;
  }, [useRolls]);

  const [index, setIndex] = React.useState(0);
  const step = steps[index];

  const value = React.useMemo(() => {
    if (step.type === 'count') return counts[step.denom] || 0;
    if (step.type === 'roll') return rolls[step.denom] || 0;
    if (step.type === 'loose') return loose[step.denom] || 0;
    return 0;
  }, [step, counts, rolls, loose]);

  const updateValue = (v: number) => {
    if (step.type === 'count') onChangeCount(step.denom, v);
    if (step.type === 'roll') onChangeRoll(step.denom as any, v);
    if (step.type === 'loose') onChangeLoose(step.denom as any, v);
  };

  const next = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
    } else {
      onFinished();
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      next();
    }
  };

  return (
    <Card>
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800 overflow-hidden rounded-t-xl">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out" 
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="py-10 flex flex-col items-center text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          Step {index + 1} of {steps.length}
        </div>
        <h2 className="text-3xl font-bold mb-8">{step.label}</h2>
        
        <div className="relative w-full max-w-[240px] mb-10">
          <input
            key={index}
            type="number"
            inputMode="numeric"
            value={value || ''}
            onChange={(e) => updateValue(Number(e.target.value))}
            onKeyDown={onKeyDown}
            autoFocus
            className="w-full text-6xl font-black text-center bg-transparent border-b-4 border-neutral-300 dark:border-neutral-700 focus:border-blue-500 outline-none pb-4 transition-colors"
            placeholder="0"
          />
        </div>

        <div className="flex gap-4 w-full justify-center px-6">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex-1 max-w-[120px] h-12 rounded-xl border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 font-medium active:scale-95 transition-transform"
          >
            Back
          </button>
          <button
            onClick={next}
            className="flex-1 max-w-[160px] h-12 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold shadow-lg active:scale-95 transition-transform"
          >
            {index === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </Card>
  );
}
