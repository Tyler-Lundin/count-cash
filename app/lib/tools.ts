export type ToolLink = {
  href: string;
  title: string;
  desc: string;
  image?: string;
  imageAlt?: string;
};

export const TOOLS: ToolLink[] = [
  {
    href: "/cash-drawer-target-float",
    title: "Cash Drawer Target Float",
    desc: "Keep/pull to leave a target amount (e.g., $200).",
    image: "/images/tools/cash-drawer.webp",
    imageAlt: "Drawer with cash float",
  },
  {
    href: "/coin-counter",
    title: "Coin Counter",
    desc: "Count coins quickly and see totals.",
    image: "/images/tools/coin-counter.webp",
    imageAlt: "Coin stack icon",
  },
  {
    href: "/bill-counter",
    title: "Bill Counter",
    desc: "Count bills quickly and see totals.",
    image: "/images/tools/bill-counter.webp",
    imageAlt: "Dollar bills icon",
  },
  {
    href: "/change-maker",
    title: "Change Maker",
    desc: "Enter due and paid; return exact change.",
    image: "/images/tools/change-maker.webp",
    imageAlt: "Change being returned",
  },
  {
    href: "/tip-split-calculator",
    title: "Tip Split Calculator",
    desc: "Split bill + tip across people.",
    image: "/images/tools/tip-split-calculator.webp",
    imageAlt: "Tip split icon",
  },
];
