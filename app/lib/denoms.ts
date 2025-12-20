export type Denomination =
  | 'penny'
  | 'nickel'
  | 'dime'
  | 'quarter'
  | 'one'
  | 'five'
  | 'ten'
  | 'twenty'
  | 'fifty'
  | 'hundred';

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

export const COIN_ORDER: Denomination[] = ['penny', 'nickel', 'dime', 'quarter'];
export const BILL_ORDER: Denomination[] = [
  'one',
  'five',
  'ten',
  'twenty',
  'fifty',
  'hundred',
];

export type Counts = Record<Denomination, number>;

export const ZERO_COUNTS = (): Counts => ({
  penny: 0,
  nickel: 0,
  dime: 0,
  quarter: 0,
  one: 0,
  five: 0,
  ten: 0,
  twenty: 0,
  fifty: 0,
  hundred: 0,
});

export const ALL_ORDER: Denomination[] = [
  'hundred',
  'fifty',
  'twenty',
  'ten',
  'five',
  'one',
  'quarter',
  'dime',
  'nickel',
  'penny',
];

export function labelFor(d: Denomination): string {
  switch (d) {
    case 'penny':
      return 'Pennies';
    case 'nickel':
      return 'Nickels';
    case 'dime':
      return 'Dimes';
    case 'quarter':
      return 'Quarters';
    case 'one':
      return '$1';
    case 'five':
      return '$5';
    case 'ten':
      return '$10';
    case 'twenty':
      return '$20';
    case 'fifty':
      return '$50';
    case 'hundred':
      return '$100';
  }
}

