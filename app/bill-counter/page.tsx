import type { Metadata } from "next";
import BillCounterTool from "../components/tools/BillCounterTool";

export const metadata: Metadata = {
  title: "Bill Counter",
  description: "Quickly count bills and see the total value.",
};

export default function Page() {
  return <BillCounterTool />;
}
