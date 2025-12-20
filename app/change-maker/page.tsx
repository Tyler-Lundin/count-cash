import type { Metadata } from "next";
import ChangeMakerTool from "../components/tools/ChangeMakerTool";

export const metadata: Metadata = {
  title: "Change Maker",
  description: "Enter amount due and paid; get exact change breakdown (large to small).",
};

function toCents(input: string): number {
  const num = Number(input.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export default function Page() { return <ChangeMakerTool />; }
