
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axelink | AIで事業成長にアクセルを",
  description: "データとテクノロジーの力で、あなたの事業を次のステージへ。専門家と共に描く、デジタル変革の未来。AI・データ・DX相談実績多数、専門家DB4,000名以上。",
  keywords: ["AI", "DX", "デジタル変革", "データ分析", "機械学習", "ビジネス成長", "コンサルティング"],
  authors: [{ name: "株式会社ビズリンク" }],
  icons: {
    icon: "/Axelink_icon_Bg.svg",
    shortcut: "/Axelink_icon_Bg.svg",
    apple: "/Axelink_icon_Bg.svg",
  },
  openGraph: {
    title: "Axelink | AIで事業成長にアクセルを",
    description: "データとテクノロジーの力で、あなたの事業を次のステージへ。専門家と共に描く、デジタル変革の未来。",
    url: "https://axelink.jp", // TODO: 実際のURLに変更してください
    siteName: "Axelink",
    images: [
      {
        url: "/og-image.png", // TODO: OGP画像を/publicフォルダに配置してください
        width: 1200,
        height: 630,
        alt: "Axelink - AIで事業成長にアクセルを",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axelink | AIで事業成長にアクセルを",
    description: "データとテクノロジーの力で、あなたの事業を次のステージへ。専門家と共に描く、デジタル変革の未来。",
    images: ["/og-image.png"], // TODO: OGP画像を/publicフォルダに配置してください
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <link rel="stylesheet" href="https://ichisan.jp/form/lib/ichisanForm.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Script src="https://ichisan.jp/form/lib/ichisanForm.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
