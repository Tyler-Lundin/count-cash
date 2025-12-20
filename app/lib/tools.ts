export type ToolLink = { href: string; title: string; desc: string };

export const TOOLS: ToolLink[] = [
  {
    href: "/cash-drawer-target-float",
    title: "Cash Drawer Target Float",
    desc: "Keep/pull to leave a target amount (e.g., $200).",
  },
  { href: "/coin-counter", title: "Coin Counter", desc: "Count coins quickly and see totals." },
  { href: "/bill-counter", title: "Bill Counter", desc: "Count bills quickly and see totals." },
  {
    href: "/change-maker",
    title: "Change Maker",
    desc: "Enter due and paid; return exact change.",
  },
  {
    href: "/tip-split-calculator",
    title: "Tip Split Calculator",
    desc: "Split bill + tip across people.",
  },
];

