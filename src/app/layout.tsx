import type { Metadata } from "next";
import {
  Caveat,
  DM_Sans,
  IBM_Plex_Mono,
  Instrument_Serif,
  Ma_Shan_Zheng,
} from "next/font/google";
import { CustomCursorLoader } from "@/components/CustomCursorLoader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-brand-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
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
      className={`${dmSans.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${caveat.variable} ${maShanZheng.variable}`}
    >
      <body>
        <CustomCursorLoader />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
