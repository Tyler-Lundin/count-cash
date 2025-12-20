import CashCounter from "../components/CashCounter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Drawer Target Float",
  description: "Enter counts and see what to pull to leave a target float (e.g., $200).",
};

export default function Page() {
  return <CashCounter title="Cash Drawer Target Float" />;
}

