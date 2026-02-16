export type ToolLink = {
  href: string;
  title: string;
  desc: string;
  image?: string;
  imageAlt?: string;
};

export const TOOLS: ToolLink[] = [
  {
    href: "/",
    title: "Cash Drawer Target Float",
    desc: "Keep/pull to leave a target amount (e.g., $200).",
    image: "/images/tools/cash-drawer.webp",
    imageAlt: "Drawer with cash float",
  },
];
