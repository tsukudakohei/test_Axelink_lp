
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ParticleNetwork from './ParticleNetwork';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-20"
    >
      <ParticleNetwork />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-blue-900/20 pointer-events-none"></div>
      
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-orange-500">AI</span>で事業成長に
              <br />
              <span className="text-orange-500">アクセル</span>を
            </h1>
            <p className={`text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl text-center mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              データとテクノロジーの力で、あなたの事業を次のステージへ。<br />
              専門家と共に描く、デジタル変革の未来。
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Link 
                href="/consultation"
                className="bg-[#F49B28] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#e8912a] transition-all cursor-pointer whitespace-nowrap inline-block text-center shadow-md"
              >
                無料相談する
              </Link>
              <Link 
                href="#services"
                className="border-2 border-blue-300 text-blue-100 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-800/30 hover:border-blue-200 transition-all cursor-pointer whitespace-nowrap inline-block text-center backdrop-blur-sm"
              >
                サービス詳細
              </Link>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-blue-200 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2 justify-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                <span>AI・データ・DX相談実績多数</span>
              </div>
              <div className="flex items-center gap-2 justify-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                <span>専門家DB4,000名以上</span>
              </div>
              <div className="flex items-center gap-2 justify-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/30">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                <span>ワンストップ対応</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
}
