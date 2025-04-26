import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const patrickHand = localFont({
  src: "./fonts/PatrickHand-Regular.ttf",
});

export const metadata: Metadata = {
  title: "Wallmart-excalidraw",
  description: "It's excalidraw with but with multiplayer yay 😒",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={patrickHand.className}>{children}</body>
    </html>
  );
}
