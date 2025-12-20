# UX Notes (Mobile-first)

## Layout
- Stacked cards: Coins, Bills, Summary. Minimal elevation, generous spacing.
- Sticky footer (TotalsBar) with total and take-out; primary CTA sized for thumbs.
- Safe-area insets respected (iOS notch, Android gesture areas).

## Controls
- Each denomination uses a Counter with large +/- buttons and a tappable value.
- Press-and-hold repeats; double-tap to zero a single counter (optional).
- Tapping value opens KeypadModal for direct entry.

## Readability & Feedback
- Use big numerals and currency formatting; avoid decimals visually (show dollars + cents clearly).
- Optional light haptic on increment/decrement; subtle animation on update.
- Color only for emphasis (e.g., green take-out, amber shortfall), otherwise neutral.

## Accessibility
- Proper labels, role=button for custom controls, focus outlines.
- Touch targets ≥ 44x44pt. Support dynamic text sizes.
- High contrast mode respected; no color-only state indicators.

## Persistence
- Offer “Remember last counts and float” toggle; store in localStorage.
- Reset confirms if non-zero counts.

## Empty/Edge States
- If total < float, show “Short by $X to reach $200” in Summary.
- If exact float not reachable, show closest kept amount and overage/shortfall.
