// 根布局：注入字体变量、全局样式，并在所有页面挂载光标与导航
import { Inter, Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ClientOnlyComponents from "@/components/ClientOnlyComponents";
import ThemeWrapper from "@/components/ThemeWrapper";

// 正文字体
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// 显示字体（签名 / 标题用）
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
});

export const metadata = {
  title: "Oneadto — Designer ",
  description: "Oneadto的个人网页",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable} ${pinyonScript.variable} bg-black`}
    >
      <body className="bg-black">
        {/* 路由感知主题包装：非首页时铺浅色底，主页则透出 Galaxy */}
        <ThemeWrapper>
          <ClientOnlyComponents />
          <Nav />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
