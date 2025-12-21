import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import NavMenu from "./components/NavMenu";
import SiteFooter from "./components/SiteFooter";
import ThemeProvider from "./components/ThemeProvider";
import Background from "./components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cash Counter",
  description: "Simple mobile-first cash counter",
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Background />
          <NavMenu />
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[var(--background)]/80  text-[var(--foreground)] shadow-sm p-3 sm:p-6">
              {children}
            </div>
          </div>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
