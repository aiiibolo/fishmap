import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "纽卡斯尔钓鱼地图 | Newcastle Fishing Map",
  description: "Newcastle NSW Shore Fishing Guide — Spot Map, Fish Guide, Season Guide, Regulations | 纽卡斯尔岸钓指南",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
