import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celebrity Language Tutor - Learn Languages with Famous Personalities",
  description: "Learn new languages through immersive conversations with celebrity roleplay. Practice Spanish with Shakira, Japanese with Miyazaki, and more!",
  keywords: ["language learning", "celebrity tutor", "language practice", "conversation", "Spanish", "French", "Japanese", "Korean", "German", "Italian"],
  authors: [{ name: "Celebrity Language Tutor" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Celebrity Language Tutor",
    description: "Learn languages through immersive celebrity roleplay conversations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrity Language Tutor",
    description: "Learn languages through immersive celebrity roleplay conversations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
