import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarsFocus - Gamified Study Missions",
  description: "Turn your study sessions into Mars colonization missions. Stay focused, earn XP, unlock achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-b from-gray-900 via-mars-950 to-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
