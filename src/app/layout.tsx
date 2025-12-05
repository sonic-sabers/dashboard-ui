import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionConfig } from "motion/react";
import { StoreProvider } from "@/lib/redux/StoreProvider";
import { NavigationTracker } from "@/components/navigation/NavigationTracker";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Juspay UI - Modern SaaS Dashboard",
  description:
    "A modern, responsive SaaS dashboard built with Next.js, React, TypeScript, and Tailwind CSS. Features include dark/light theme, advanced data tables with filtering, sorting, pagination, and smooth animations.",
  keywords: [
    "dashboard",
    "saas",
    "nextjs",
    "react",
    "typescript",
    "tailwind",
    "juspay",
  ],
  authors: [{ name: "Ashish Gupta" }],
  creator: "Ashish Gupta",
  openGraph: {
    title: "Juspay UI - Modern SaaS Dashboard",
    description: "A modern, responsive SaaS dashboard with advanced features",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <StoreProvider>
          <NavigationTracker />
          <MotionConfig reducedMotion="user">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </MotionConfig>
        </StoreProvider>
      </body>
    </html>
  );
}
