
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/38e65b87e765ee6c5b132d3b70e2116b.png" 
                alt="Axelink" 
                className="h-8"
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              AI導入のパートナーとして、あなたの事業を加速します。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#F49B28] hover:text-white transition-colors cursor-pointer">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#F49B28] hover:text-white transition-colors cursor-pointer">
                <i className="ri-linkedin-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#F49B28] hover:text-white transition-colors cursor-pointer">
                <i className="ri-facebook-line text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#1F2A44]">サービス</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelAgent</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelConsulting</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelMarket</a></li>
              <li><Link href="/consultation" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">無料相談</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#1F2A44]">会社情報</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-600">
                <strong className="text-[#1F2A44]">株式会社ビズリンク</strong>
              </li>
              <li className="text-gray-600">
                代表者：姜 大成
              </li>
              <li className="text-gray-600">
                〒141-0022<br />
                東京都品川区東五反田2-3-5<br />
                五反田中央ビル8階
              </li>
              <li className="text-gray-600">
                TEL: 03-6722-6028
              </li>
              <li>
                <a href="mailto:info@bizlink.io" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">
                  info@bizlink.io
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-[#1F2A44] transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link href="#" className="hover:text-[#1F2A44] transition-colors cursor-pointer">利用規約</Link>
              <Link href="#" className="hover:text-[#1F2A44] transition-colors cursor-pointer">特定商取引法</Link>
              <Link href="https://readdy.ai/?origin=logo" className="hover:text-[#1F2A44] transition-colors cursor-pointer">Made with Readdy</Link>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 株式会社ビズリンク. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
