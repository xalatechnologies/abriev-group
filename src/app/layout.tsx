import type { CSSProperties, ReactNode } from "react";
import "./globals.css";

import { Manrope, Noto_Sans_Ethiopic } from "next/font/google";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ethiopic",
  display: "swap",
});

const htmlStyle = {
  "--font-serif": "var(--font-sans)",
  "--font-primary": "var(--font-sans)",
} as CSSProperties;

/** Default `lang` matches `routing.defaultLocale`; `DocumentLang` updates for other locales. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang={routing.defaultLocale}
      className={`${manrope.variable} ${notoSansEthiopic.variable}`}
      style={htmlStyle}
    >
      <body className="min-h-dvh bg-background font-primary text-on-background antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
