import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
// import { ChatWidget } from "@/components/chatbot/ChatWidget"; // uncomment to enable chatbot

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet_niRo",
  description:
    "Senior full-stack engineer specialising in distributed systems, React/Next.js, and Go. Available for contracts and consulting.",
  keywords: [
    "full-stack engineer",
    "Next.js",
    "React",
    "Go",
    "distributed systems",
    "freelance developer",
  ],
  authors: [{ name: "niRo" }],
  openGraph: {
    title: "Meet_niRo",
    description:
      "Senior full-stack engineer specialising in distributed systems, React/Next.js, and Go.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/niRoooooooooo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet_niRo",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-base text-warm antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <ChatWidget /> */}
      </body>
    </html>
  );
}
