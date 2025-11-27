import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ExecutiveNav from "@/components/ExecutiveNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Automotive BI Cockpit",
  description:
    "AI-powered executive dashboard for automotive parts manufacturing with InstantDB, Next.js, and FastAPI.",
  openGraph: {
    title: "Automotive BI Cockpit",
    description:
      "Secure, lightweight decision cockpit powered by InstantDB + FastAPI synthetic data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#030712]">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}>
        <div className="relative min-h-screen">
          {/* Global Background Gradient */}
          <div
            className="pointer-events-none fixed inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.15), transparent 50%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.15), transparent 40%)",
            }}
            aria-hidden
          />
          
          {/* Content Container */}
          <div className="relative container mx-auto max-w-7xl px-4 py-6">
            <ExecutiveNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

