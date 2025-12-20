# Cash Counter PWA — Docs

- Goal: Mobile-first, ultra-simple cash counter with clear guidance to “leave $200” in the till and show the amount to remove.
- Platform: Next.js (TypeScript). PWA for offline-first and installability.
- UX: Minimal cards, large tap targets, fast input, no clutter.
- Math: Integer cents only to avoid floating-point issues.

## v1 Scope
- Input counts for: pennies, nickels, dimes, quarters, $1, $5, $10, $20, $50, $100.
- Configurable closing float (default $200 / 20000 cents).
- Live totals: by group, overall, and over/under relative to float.
- Guidance: What to remove to leave the float, plus total “take out” amount.
- Offline-capable PWA basics (manifest, caching shell), no server dependency.

## Non-goals (v1)
- Multi-user sync, authentication, or server persistence.
- Complex reporting or exports.
- International currencies.

## Implementation Notes
- Keep state small and colocated; use a reducer or simple context if needed.
- Prefer controlled inputs with tap-friendly increment/decrement.
- Respect accessibility: focus order, labels, dynamic font sizes.

See `components.md`, `data-model.md`, `ux.md`, and `pwa.md` for details.
