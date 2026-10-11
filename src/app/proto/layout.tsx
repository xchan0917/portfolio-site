import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-besty",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Besty.AI Message Queue — Prototype",
  description: "Standalone high-fidelity prototype of the unified message queue.",
};

export default function ProtoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.variable} data-besty-proto-root>
      {children}
    </div>
  );
}
