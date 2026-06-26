import type { Metadata } from "next";
import {
  Caveat,
  DM_Sans,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${caveat.variable}`}
    >
      <body>
        <CustomCursor />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
