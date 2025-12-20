# Data Model & Calculations

## Denominations (cents)
```ts
export type Denomination =
  | 'penny' | 'nickel' | 'dime' | 'quarter'
  | 'one' | 'five' | 'ten' | 'twenty' | 'fifty' | 'hundred';

export const DENOMS: Record<Denomination, number> = {
  penny: 1,
  nickel: 5,
  dime: 10,
  quarter: 25,
  one: 100,
  five: 500,
  ten: 1000,
  twenty: 2000,
  fifty: 5000,
  hundred: 10000,
};

export type Counts = Record<Denomination, number>; // non-negative integers
```

## Derived Values
- totalCents(counts): Sum of `counts[d] * DENOMS[d]`.
- groupTotals(counts): `{ coins: <sum of coins>, bills: <sum of bills> }`.
- overUnder(total, floatCents): `{ over: Math.max(0, total - floatCents), under: Math.max(0, floatCents - total) }`.

## Removal Plan (Leave Float)
Goal: Given `counts` and `floatCents` (default 20000), compute which items to remove so the drawer left-over is as close as possible to `floatCents` without going below it when possible.

Strategy (greedy, high-to-low):
1. Compute `total = totalCents(counts)`.
2. If `total <= floatCents`: nothing to remove; shortfall `floatCents - total`.
3. Else, target remaining value `remain = floatCents`.
4. Build `remainCounts` by trying to keep as many high-denomination items as needed to reach `remain` without exceeding available counts.
5. `removeCounts = counts - remainCounts` per denomination. `takeOut = total - value(remainCounts)`.

Edge Handling:
- If exact `remain` cannot be formed with available counts, keep the closest possible value >= floatCents when feasible. If only values below float are possible, keep the maximum possible (< float) and report shortfall.

Pseudo-code:
```ts
function planRemoval(counts: Counts, floatCents: number) {
  const order: Denomination[] = ['hundred','fifty','twenty','ten','five','one','quarter','dime','nickel','penny'];
  const total = totalCents(counts);
  if (total <= floatCents) {
    return { remove: zeroCounts(), remain: counts, takeOut: 0, shortfall: floatCents - total };
  }

  // Attempt greedy keep to reach float
  let remain = floatCents;
  const remainCounts = zeroCounts();
  for (const d of order) {
    const value = DENOMS[d];
    const need = Math.floor(remain / value);
    const keep = Math.min(need, counts[d]);
    remainCounts[d] = keep;
    remain -= keep * value;
  }

  // If we couldn't reach exact float, try to round up using smaller denoms when possible (best-effort)
  if (remain > 0) {
    for (const d of [...order].reverse()) { // try from smallest up
      const value = DENOMS[d];
      while (remain > 0 && remainCounts[d] < counts[d]) {
        remainCounts[d]++;
        remain -= value;
      }
      if (remain <= 0) break;
    }
  }

  const remainValue = totalCents(remainCounts);
  const remove: Counts = mapDenoms(d => counts[d] - remainCounts[d]);
  const takeOut = total - remainValue;
  const shortfall = Math.max(0, floatCents - remainValue);
  return { remove, remain: remainCounts, takeOut, shortfall };
}
```

Notes:
- Greedy works well for USD denominations; we add a small round-up pass to better approach float.
- UI should show when exact float isn’t possible and by how much.
