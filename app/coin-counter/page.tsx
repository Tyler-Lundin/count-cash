import type { Metadata } from "next";
import CoinCounterTool from "../components/tools/CoinCounterTool";

export const metadata: Metadata = {
  title: "Coin Counter",
  description: "Quickly count coins and see the total value.",
};

export default function Page() {
  return <CoinCounterTool />;
}
