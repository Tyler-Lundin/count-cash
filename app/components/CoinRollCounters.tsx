"use client";
import React from 'react';
import Card from './Card';
import Counter from './Counter';
import { COIN_ORDER, ROLL_SIZES } from '../lib/denoms';
import { formatCurrency } from '../lib/calc';
import { DENOMS } from '../lib/denoms';

type CoinKey = 'penny' | 'nickel' | 'dime' | 'quarter';

type Props = {
  rolls: Record<CoinKey, number>;
  coins: Record<CoinKey, number>;
  onChangeRolls: (d: CoinKey, v: number) => void;
  onChangeCoins: (d: CoinKey, v: number) => void;
  disabled?: boolean;
};

export default function CoinRollCounters({ rolls, coins, onChangeRolls, onChangeCoins, disabled }: Props) {
  return (
    <Card title="Coins (Rolls + Loose)">
      <div className="text-xs text-neutral-500 mb-3">Enter rolls and loose coins</div>
      <div className="hidden sm:grid grid-cols-[1fr,1fr,1fr,auto] gap-2 px-1 pb-1 text-xs text-neutral-500">
        <div>Denomination</div>
        <div>Rolls</div>
        <div>Loose</div>
        <div className="text-right">Value</div>
      </div>
      {COIN_ORDER.map((d) => {
        const dk = d as CoinKey;
        const totalCoins = rolls[dk] * ROLL_SIZES[dk] + coins[dk];
        const rowValue = totalCoins * DENOMS[dk];
        return (
          <div key={d} className="py-2 border-t first:border-t-0 border-neutral-200/70 dark:border-neutral-800/70">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,1fr,auto] gap-2 items-center">
              <div className="text-sm capitalize">{d}</div>
              <div>
                <Counter
                  id={`rolls-${d}`}
                  label={`Rolls (x${ROLL_SIZES[dk]})`}
                  value={rolls[dk]}
                  onChange={(v) => onChangeRolls(dk, v)}
                  disabled={disabled}
                  labelClassName="hidden sm:sr-only"
                />
              </div>
              <div>
                <Counter
                  id={`coins-${d}`}
                  label={`Loose`}
                  value={coins[dk]}
                  onChange={(v) => onChangeCoins(dk, v)}
                  disabled={disabled}
                  labelClassName="hidden sm:sr-only"
                />
              </div>
              <div className="hidden sm:block text-sm text-right tabular-nums text-neutral-600 dark:text-neutral-400">
                {formatCurrency(rowValue)}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
