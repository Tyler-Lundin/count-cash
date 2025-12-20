import { ALL_ORDER, Counts, DENOMS, Denomination } from './denoms';

export const FLOAT_DEFAULT_CENTS = 20000; // $200

export function totalCents(counts: Counts): number {
  return (Object.keys(DENOMS) as Denomination[]).reduce(
    (sum, d) => sum + counts[d] * DENOMS[d],
    0
  );
}

export function formatCurrency(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const remainder = abs % 100;
  return `${sign}$${dollars.toLocaleString()}${remainder ? `.${remainder
    .toString()
    .padStart(2, '0')}` : remainder === 0 ? '.00' : ''}`;
}

export function groupTotals(counts: Counts): { coins: number; bills: number } {
  let coins = 0;
  let bills = 0;
  for (const [d, v] of Object.entries(DENOMS) as [Denomination, number][]) {
    const add = v * counts[d];
    if (['penny', 'nickel', 'dime', 'quarter'].includes(d)) coins += add;
    else bills += add;
  }
  return { coins, bills };
}

export type RemovalPlan = {
  remain: Counts;
  remove: Counts;
  takeOut: number; // cents
  shortfall: number; // cents needed to reach float; 0 when at/above float
};

export function zeroCounts(): Counts {
  return (
    ALL_ORDER.reduce((acc, d) => {
      acc[d] = 0;
      return acc;
    }, {} as Counts)
  );
}

export function planRemoval(counts: Counts, floatCents: number): RemovalPlan {
  const total = totalCents(counts);
  if (total <= floatCents) {
    return {
      remain: counts,
      remove: zeroCounts(),
      takeOut: 0,
      shortfall: floatCents - total,
    };
  }

  let remainValueTarget = floatCents;
  const remainCounts = zeroCounts();

  for (const d of ALL_ORDER) {
    const value = DENOMS[d];
    const need = Math.floor(remainValueTarget / value);
    const keep = Math.min(need, counts[d]);
    remainCounts[d] = keep;
    remainValueTarget -= keep * value;
  }

  if (remainValueTarget > 0) {
    // Try to round up using smaller denoms if possible
    for (const d of [...ALL_ORDER].reverse()) {
      const value = DENOMS[d];
      while (remainValueTarget > 0 && remainCounts[d] < counts[d]) {
        remainCounts[d]++;
        remainValueTarget -= value;
      }
      if (remainValueTarget <= 0) break;
    }
  }

  const remainValue = totalCents(remainCounts);
  const remove: Counts = zeroCounts();
  for (const d of ALL_ORDER) remove[d] = counts[d] - remainCounts[d];
  const takeOut = total - remainValue;
  const shortfall = Math.max(0, floatCents - remainValue);
  return { remain: remainCounts, remove, takeOut, shortfall };
}

