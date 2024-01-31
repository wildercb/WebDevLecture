import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserPreferenceProvider } from "@/contexts/UserPreferenceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workshop",
  description: "Workshop by Dylan Bulmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserPreferenceProvider>{children}</UserPreferenceProvider>
      </body>
    </html>
  );
}
