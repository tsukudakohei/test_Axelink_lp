import type { Metadata } from "next";
import "./seminar.css";
import "./hide-lp-layout.css";

export const metadata: Metadata = {
  title: "生成AIを実務の武器に変える「業務解像度」向上セミナー｜お申し込み",
  description: "生成AIを「優秀な部下」として使いこなし、実務で確かな成果を出すために不可欠な「業務を設計する力」を習得するための実践的プログラムです。",
  icons: {
    icon: "/seminar-apple-touch-icon.png",
    apple: "/seminar-apple-touch-icon.png",
  },
};

export default function SeminarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
