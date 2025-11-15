
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ParticleNetwork from './ParticleNetwork';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div
          className="absolute top-1/3 -right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s',
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-t from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '2s',
          }}
        ></div>
      </div>

      <ParticleNetwork />

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-purple-900/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Main heading with glow effect */}
            <h1
              className={`text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{
                textShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(59, 130, 246, 0.3)',
              }}
            >
              <span
                className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse"
                style={{
                  textShadow: '0 0 30px rgba(249, 115, 22, 0.8)',
                }}
              >
                AI
              </span>
              で事業成長に
              <br />
              <span
                className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                style={{
                  animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              >
                アクセル
              </span>
              を
            </h1>

            {/* Subtitle with enhanced styling */}
            <p className={`text-xl md:text-2xl text-blue-50/90 mb-12 leading-relaxed max-w-2xl text-center mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-light">データとテクノロジーの力で、あなたの事業を次のステージへ。</span>
              <br />
              <span className="font-light bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                専門家と共に描く、デジタル変革の未来。
              </span>
            </p>

            {/* CTA buttons with enhanced effects */}
            <div className={`flex flex-col sm:flex-row gap-6 mb-16 justify-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                href="/consultation"
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 cursor-pointer whitespace-nowrap inline-block text-center overflow-hidden"
              >
                <span className="relative z-10">無料相談する</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                }}></div>
              </Link>
              <Link
                href="#services"
                className="group relative border-2 border-cyan-400/50 text-cyan-100 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-cyan-500/20 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer whitespace-nowrap inline-block text-center backdrop-blur-md bg-white/5"
              >
                <span className="relative z-10">サービス詳細</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Link>
            </div>

            {/* Feature badges with enhanced design */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm justify-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="group relative flex items-center gap-3 justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl px-6 py-3 border border-cyan-400/30 hover:border-cyan-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105">
                <div className="relative">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-cyan-50 font-medium">AI・データ・DX相談実績多数</span>
              </div>
              <div className="group relative flex items-center gap-3 justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl px-6 py-3 border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105">
                <div className="relative">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="absolute inset-0 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-purple-50 font-medium">専門家DB4,000名以上</span>
              </div>
              <div className="group relative flex items-center gap-3 justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl px-6 py-3 border border-orange-400/30 hover:border-orange-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105">
                <div className="relative">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="absolute inset-0 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>
                <span className="text-orange-50 font-medium">ワンストップ対応</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
    </section>
  );
}
