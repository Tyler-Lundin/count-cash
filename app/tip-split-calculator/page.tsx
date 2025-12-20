import type { Metadata } from "next";
import TipSplitCalculatorTool from "../components/tools/TipSplitCalculatorTool";

export const metadata: Metadata = {
  title: "Tip Split Calculator",
  description: "Split a bill with tip across people with per-person totals.",
};

function toCents(input: string): number {
  const num = Number(input.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export default function Page() { return <TipSplitCalculatorTool />; }
