
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <img 
                src="https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/38e65b87e765ee6c5b132d3b70e2116b.png" 
                alt="Axelink" 
                className="h-8"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-[#1F2A44] hover:text-[#F49B28] transition-colors cursor-pointer">
              サービス
            </Link>
            <Link href="/#process" className="text-[#1F2A44] hover:text-[#F49B28] transition-colors cursor-pointer">
              導入フロー
            </Link>
            <Link href="/#faq" className="text-[#1F2A44] hover:text-[#F49B28] transition-colors cursor-pointer">
              FAQ
            </Link>
          </nav>
          <Link 
            href="/consultation"
            className="bg-[#F49B28] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap"
          >
            無料相談する
          </Link>
        </div>
      </div>
    </header>
  );
}