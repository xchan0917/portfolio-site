"use client";

import dynamic from "next/dynamic";

const FooterFlorals = dynamic(
  () => import("@/components/FooterFlorals").then((mod) => mod.FooterFlorals),
  { ssr: false },
);

export function FooterFloralsLoader() {
  return <FooterFlorals />;
}
