import type { Metadata } from "next";
import { Space_Mono, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const space = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeoGeek - Explore the geographer inside you",
  description: "Interactive geography explorer and rankings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${space.variable}`}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
