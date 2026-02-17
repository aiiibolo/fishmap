import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "纽卡斯尔钓鱼地图 | Newcastle Fishing Map",
  description: "纽卡斯尔（Newcastle, NSW）岸钓指南 — 钓点地图、鱼种图鉴、季节指南、法规信息",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
