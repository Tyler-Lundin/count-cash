"use client";
import React from "react";
import Card from "../../components/Card";
import CoinCounters from "../../components/CoinCounters";
import CoinRollCounters from "../../components/CoinRollCounters";
import { COIN_ORDER, Counts, ZERO_COUNTS, Denomination, DENOMS, ROLL_SIZES } from "../../lib/denoms";
import { formatCurrency } from "../../lib/calc";

export default function CoinCounterTool() {
  const [counts, setCounts] = React.useState<Counts>(ZERO_COUNTS());
  const [useRolls, setUseRolls] = React.useState<boolean>(false);
  const [rolls, setRolls] = React.useState<Record<'penny'|'nickel'|'dime'|'quarter', number>>({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
  const [loose, setLoose] = React.useState<Record<'penny'|'nickel'|'dime'|'quarter', number>>({ penny: 0, nickel: 0, dime: 0, quarter: 0 });

  const update = (d: Denomination, v: number) => {
    setCounts((prev) => ({ ...prev, [d]: Math.max(0, Math.floor(v)) }));
  };
  const coinsTotalSimple = COIN_ORDER.reduce((sum, d) => sum + counts[d] * DENOMS[d], 0);
  type CoinKey = 'penny'|'nickel'|'dime'|'quarter';
  const coinsTotalRolls = COIN_ORDER.reduce((sum, d) => {
    const dk = d as CoinKey;
    return sum + (rolls[dk] * ROLL_SIZES[dk] + loose[dk]) * DENOMS[dk];
  }, 0);
  const coinsTotal = useRolls ? coinsTotalRolls : coinsTotalSimple;
  const reset = () => {
    setCounts(ZERO_COUNTS());
    setRolls({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
    setLoose({ penny: 0, nickel: 0, dime: 0, quarter: 0 });
  };
  const copy = async () => {
    const text = `Total coins: ${formatCurrency(coinsTotal)}`;
    if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
      try { await (navigator as any).clipboard.writeText(text); } catch {}
    }
  };
  return (
    <div className="mx-auto max-w-md px-3 sm:px-4 pb-24 pt-8">
      <h1 className="text-xl font-semibold mb-3 text-center sm:text-left">Coin Counter</h1>
      <div className="mb-2 flex items-center justify-center sm:justify-start gap-2 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" checked={useRolls} onChange={(e) => setUseRolls(e.target.checked)} />
          Include rolls
        </label>
      </div>
      {useRolls ? (
        <CoinRollCounters
          rolls={rolls}
          coins={loose}
          onChangeRolls={(d, v) => setRolls((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
          onChangeCoins={(d, v) => setLoose((p) => ({ ...p, [d]: Math.max(0, Math.floor(v)) }))}
        />
      ) : (
        <CoinCounters counts={counts} onChange={update} />
      )}
      <div className="h-3" />
      <Card>
        <div className="flex items-center text-sm">
          <span className="text-neutral-600">Total Coins</span>
          <span className="ml-auto font-semibold">{formatCurrency(coinsTotal)}</span>
        </div>
      </Card>
      <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-t border-neutral-200 dark:border-neutral-800" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom))' }}>
        <div className="mx-auto max-w-md px-3 sm:px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-neutral-500">Total</div>
            <div className="font-semibold">{formatCurrency(coinsTotal)}</div>
          </div>
          <div className="ml-2 flex items-center gap-2">
            <button onClick={reset} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Reset</button>
            <button onClick={copy} className="h-9 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
