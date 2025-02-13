import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { lazy, Suspense } from "react";
const Navbar = lazy(() => import("./components/Navbar"));
import { Loader2Icon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Ticketly",
  description: "E-Ticket Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Loader2Icon className="animate-spin text-gray-800" size={48} />
          </div>
        }>
          <nav>
            <Navbar />
          </nav>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
