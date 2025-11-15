
'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-[#1F2A44] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          まずは無料相談から
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          30〜45分で課題整理と最短の進め方をご提案します。<br />
          AI活用の第一歩を一緒に踏み出しましょう。
        </p>
        
        <div className="mb-8">
          <Link 
            href="/consultation"
            className="bg-[#F49B28] text-white px-12 py-5 rounded-lg text-xl font-bold hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap inline-block shadow-lg"
          >
            無料相談を予約する
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-time-line text-2xl text-[#F49B28]"></i>
            </div>
            <h3 className="font-bold mb-2">30-45分の相談</h3>
            <p className="text-sm opacity-75">お忙しい方でも参加しやすい時間設定</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lightbulb-line text-2xl text-[#F49B28]"></i>
            </div>
            <h3 className="font-bold mb-2">課題の整理</h3>
            <p className="text-sm opacity-75">現状を可視化し、最適な解決策を提案</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-presentation-line text-2xl text-[#F49B28]"></i>
            </div>
            <h3 className="font-bold mb-2">具体的な提案</h3>
            <p className="text-sm opacity-75">実行可能なアクションプランをお渡し</p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white/10 rounded-lg">
          <p className="text-sm opacity-90">
            ✓ 完全無料　✓ オンライン・対面どちらでも対応
          </p>
        </div>
      </div>
    </section>
  );
}
