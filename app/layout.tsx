import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tzix",
  description: "a tiny physics engine written in typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono h-screen">{children}</body>
    </html>
  );
}
