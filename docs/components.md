# Component Map

## Top-Level View
- CashCounter: Orchestrates counts, float, and summaries. Mobile-first layout using simple cards.
  - Children: CoinCounters, BillCounters, FloatSettings, DrawerSummary, TotalsBar, ActionsBar.

## Reusable Primitives
- Counter: Generic counter for a denomination.
  - Props: `id`, `label`, `value`, `onChange(value)`, `step` (default 1), `min` (0), `max` (optional).
  - Behavior: +/- buttons with press-and-hold repeat; direct input via keypad.
- Card: Minimal container with padding and subtle shadow/border.

## Groups
- CoinCounters: Group of `Counter` for coins.
  - Items: pennies, nickels, dimes, quarters.
- BillCounters: Group of `Counter` for bills.
  - Items: $1, $5, $10, $20, $50, $100.

## Summary & Controls
- DrawerSummary: Shows total by group and overall; displays “Take out” breakdown to leave float; handles shortfall cases.
- FloatSettings: Configure closing float (default $200). Optional lock toggle.
- TotalsBar: Sticky footer card with Overall Total and Take Out amount.
- ActionsBar: Clear/Reset, Quick preset (optional), Share/Copy (optional).
- KeypadModal (optional): Large numeric keypad for direct entry on mobile.
- PWAInstallPrompt (later): Lightweight prompt to add to home screen.

## State Flow
- Local component state or lightweight reducer in CashCounter.
- Derived selectors compute totals and removal plan from counts + float.
- Persistence: Save counts + float to `localStorage` (opt-in) for quick reopen.

## Routing (Next.js)
- Single main screen under `/` or `/counter` as the primary app shell.
- PWA meta in `app/layout.tsx` (or `pages/_document.tsx` if using Pages router).
